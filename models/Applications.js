const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ApplicationSchema = new Schema({
  user:{
    type: String,
    required: true
  },
  idea:{
    type: String,
    required: true
  },
  name:{
    type:String,
    required: true
  },
  applicant:{
    type:String,
    required: true
  },
  status:{
    type:String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('application', ApplicationSchema);