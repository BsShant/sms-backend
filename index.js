const express = require ('express');
const app = express();
const indexRouter = require("./routes/index");
const cors = require('cors');
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/mongo');


app.use(express.json());
app.use(cors());


app.use(express.urlencoded({
    extended:false
}))
app.set('port',process.env.PORT || 5000)
app.use('/', indexRouter);


var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});