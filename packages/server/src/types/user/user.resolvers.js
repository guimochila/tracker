import { isEmail, isEmpty, isLength } from 'validator';
import bcrypt from 'bcryptjs';
import User from './user.model';
import { generateToken } from '../../utils/auth';

export default {
  Query: {
    me(_, __, { req }) {
      if (!req.userId) {
        return null;
      }

      return User.findOne({ _id: req.userId });
    },
  },
  Mutation: {
    async signup(_, { input }, { res }) {
      const { email, password, name } = input;

      if (!name || isEmpty(name)) {
        throw new Error('You must provide a name');
      }

      if (!email || !isEmail(email)) {
        throw new Error('You must provide a valid email');
      }

      if (!isLength(password, { min: 6, max: 30 })) {
        throw new Error('Password must have between 6 and 30 characters');
      }

      try {
        const user = await User.create({ name, email, password });
        const refreshToken = generateToken(user, '7d');
        const accessToken = generateToken(user, '15min');

        res.cookie('refreshToken', refreshToken);
        res.cookie('accessToken', accessToken);

        return user;
      } catch (error) {
        if (error.message.includes('duplicate key error')) {
          throw new Error('Email is already in use');
        }
        throw new Error(error.message);
      }
    },
    signout(_, __, { res }) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      return { message: 'Goodbye' };
    },
    async signin(_, { email, password }, { res }) {
      if (isEmpty(email) || !isEmail(email)) {
        throw new Error('You must provide a valid email.');
      }

      if (isEmpty(password)) {
        throw new Error('Password must not be empty');
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('Email or password invalid');
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        throw new Error('Email or password invalid1');
      }

      const refreshToken = generateToken(user, '7d');
      const accessToken = generateToken(user, '15min');

      res.cookie('refreshToken', refreshToken);
      res.cookie('accessToken', accessToken);

      return user;
    },
  },
};
