const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser');
const errorHandler = require("./middleware/error");
//const fileUpload = require("express-fileupload");

//load dotenv
dotenv.config({ path: __dirname + "/config/config.env" });

const connectDB = require("./config/db")


// connectdb
connectDB();


// route files
const auth = require('./routes/auth');

const app = express();

// body parser
app.use(express.json());

// cookie parser
app.use(cookieParser());


const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'));
}
// enable cors
app.use(cors());

// mount router
app.use('/api/auth', auth);

app.use(errorHandler)


const server = app.listen(PORT,()=>{
    console.log(`Server is running on ${process.env.NODE_ENV} mode and on port ${PORT}`.yellow.bold)
});

// unhandled promise rejection
process.on('unhandledRejection', (err, promise)=>{
    console.log(`Error: ${err.message}`.red.bold)

    // close server and exit process
    server.close(() => process.exit(1))
})
