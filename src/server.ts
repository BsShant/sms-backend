
const express = require('express')
const dotenv = require('dotenv')

const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')


//Defining App
const app = express();

dotenv.config()

//connection with database
require('./database');


app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);

  res.json({
    msg: err.msg || 'Error from error handling middleware',
    status: err.status || 500,
  });
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running in port ${process.env.PORT}`);
});
