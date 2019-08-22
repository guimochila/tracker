import mongoose from 'mongoose';

export const connect = (url = process.env.DATABASE_URI, opts = {}) => {
  // Setting connection listeners for any error
  mongoose.connection.on('error', error =>
    console.error(`🙅‍♀️ 🚒 -> ${error.message}`),
  );

  return mongoose.connect(url, {
    ...opts,
    useCreateIndex: true,
    useNewUrlParser: true,
  });
};
