
import express from 'express'
import dotenv from 'dotenv'

//Defining App
const app = express();
dotenv.config();


//connection with database
require('./database');
require('./middleware/index')

app.listen(process.env.PORT, () => {
  console.log(`Server is running in port ${process.env.PORT}`);
});
