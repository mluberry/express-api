const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheetahSchema = new Schema({
  'name': {
    'type': String,
    'index': {'unique': true},
    'required': true
  },
  'age': {
    'type': Number,
    'trim': true
  }
});

module.exports = mongoose.model('Cheetah', CheetahSchema);
