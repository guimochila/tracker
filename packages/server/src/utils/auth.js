import jwt, { sign, verify } from 'jsonwebtoken';
import { isEmail, isEmpty, isLength } from 'validator';

import User from '../types/user/user.model';

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  if (!name || isEmpty(name)) {
    return res.status(400).json({ error: 'You must provide a name' });
  }

  if (!email || !isEmail(email)) {
    return res.status(400).json({ error: 'You must provide a valid email' });
  }

  if (!isLength(password, { min: 6, max: 30 })) {
    return res
      .status(400)
      .json({ error: 'Password must have between 6 and 30 characters' });
  }

  try {
    const user = await User.create({ name, email, password });
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

    return res.send({ token });
  } catch (error) {
    if (error.message.includes('duplicate key error')) {
      return res.status(422).json({ error: 'Email is already in use' });
    }
    return res.status(500).json({ error: error.message });
  }
};

export const generateToken = (user, expiresIn) => {
  return sign(
    { userId: user.id, count: user.tokenCount },
    process.env.SECRET_KEY,
    { expiresIn },
  );
};

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) return reject(err);

      return resolve(payload);
    });
  });
};

export const isAuthenticated = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken && !refreshToken) {
    return next();
  }

  try {
    const { userId } = await verifyToken(accessToken);
    req.userId = userId;
    return next();
  } catch {
    /* 
      In case the accessToken is expired or invalid,
      we check if the refreshToken is valid, if so
      we generate new refreshToken and accessToken.
    */
    const data = await verifyToken(refreshToken);
    const user = await User.findOne({ _id: data.userId });

    /* 
      If there is no user in the data base, we call next();
      user.tokenCount is the mechanism we use to
      check if the refreshToken is sync with DB, in case is
      not we call next()
    */
    if (!user || user.tokenCount !== data.count) {
      return next();
    }

    const newRefreshToken = generateToken(user, '7d');
    const newAccessToken = generateToken(user, '15min');
    req.userId = user.id;

    res.cookie('refreshToken', newRefreshToken);
    res.cookie('accessToken', newAccessToken);

    return next();
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || !isEmail(email)) {
    return res
      .status(422)
      .json({ error: 'You must provide an email and password' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  try {
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) throw Error;

    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.name },
      process.env.SECRET_KEY,
    );

    return res.json({ token });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
};
