const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//load env vars
dotenv.config({ path: __dirname + '/config/config.env'});

// load models
const User = require('./modules/user/models/User');

//connect to db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8'))
  const importData = async()=>{
      try {
        await User.create(users)
        console.log('Data imported...'.green.inverse);
        process.exit();
      } catch (error) {
          console.log(error)
      }
  }

  const deleteData = async()=>{
    try {
      await User.deleteMany()
      console.log('Data deleted...'.red.inverse);
      process.exit();
    } catch (error) {
        console.log(error)
    }
}

if(process.argv[2] === '-i'){
    importData()
}else if(process.argv[2] === '-d'){
    deleteData()
}
