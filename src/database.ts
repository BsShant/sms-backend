const mon = require('mongoose')

mon
  .connect(`mongodb+srv://user11:sabin123@cluster0.svzqz.mongodb.net/shopme?retryWrites=true&w=majority`, {
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
