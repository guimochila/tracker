// Get env variables
import {} from 'dotenv/config';
import { connect } from './utils/db';
import app from './app';

// Connect to database
connect().catch(err => {
  console.error(`🙅‍♀️ 🚒 -> ${err.message}`);
});

const port = process.env.PORT || '3000';

app.listen(port, () => console.log(`Server listening on 🚪 => ${port}`));
