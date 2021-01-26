import mongoose from 'mongoose'

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Databse Connection is established');
  })
  .catch((e) => {
    console.log('Database Error', e);
  });
