// Get env variables
import {} from 'dotenv/config';
import connect from './utils/db';
import app from './app';

const isProd = process.env.NODE_ENV;

// Connect to database
connect().catch(err => {
  if (!isProd) {
    console.error(`🙅‍♀️ 🚒 -> ${err.message}`);
  }
});

const port = process.env.PORT || '3000';

app.listen(port, () => {
  if (!isProd) {
    console.log(`Server listening on 🚪 => ${port}`);
  }
});
