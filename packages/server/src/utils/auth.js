import jwt from 'jsonwebtoken';
import { isEmail, isEmpty, isLength } from 'validator';
import User from '../resources/user/user.model';

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
    const token = jwt.sign(
      { userId: user.id, name: user.name, email: user.email },
      process.env.SECRET_KEY,
    );

    res.send({ token });
  } catch (error) {
    if (error.message.includes('duplicate key error')) {
      res.status(422).json({ error: 'Email is already in use' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
      if (err) return reject(err);

      resolve(payload);
    });
  });
};

export const isAuthenticated = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'You must be logged in' });
  }

  const token = authorization.replace('Bearer ', '');
  try {
    const payload = await verifyToken(token);

    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
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
