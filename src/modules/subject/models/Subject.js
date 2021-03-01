const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  code:{
    type: String,
    required: [true, 'Please add a subject code']
  },
  description:{
    type: String,
    required: [true, 'Please add a subject code']
  },
  importance: {
    type: String,
    required: [true,'Please add subject importance'],
    enum:['cumpolsary', 'optional']
  },
  faculty:{
    type: String,
    required: [true, 'Please add subject\'s faculty']
  },
  hours: {
    type: Number,
    required: [true,'Please add subject\'s total teaching hours'],
  },
  assigned:{
    
  }
  
});





module.exports = mongoose.model("Subjets", SubjectSchema);
