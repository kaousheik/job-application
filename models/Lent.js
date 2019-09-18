const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LentSchema = new Schema({
  category:{
    type: String,
    required: true
  },
  brand:{
    type: String,
    required: true
  },
  pricePerDay:{
    type: Number,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  phoneNumber:{
      type:String,
      required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('lent', LentSchema);