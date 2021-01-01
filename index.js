const express = require ('express');
const app = express();
const indexRouter = require("./routes/index");
const port=5000;
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongo');


app.use(express.json());
app.use(cors());

app.use(express.urlencoded({
    extended:false
}))
app.use('/', indexRouter);


app.listen(port, ()=>{
    console.log("started at port" + port);
})
