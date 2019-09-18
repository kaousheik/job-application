const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RentSchema = new Schema({
  phoneNumber:{
      type:String,
      required: true
  },
  deliveryAddress:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('rent', RentSchema);