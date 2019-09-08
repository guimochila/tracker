import { sign, verify } from 'jsonwebtoken';

import User from '../types/user/user.model';

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
