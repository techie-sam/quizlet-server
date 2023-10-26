const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
  },
  questions: {
    type: Array,
  },
});

// testSchema.methods.createPin = function () {
//   const pin = crypto.randomBytes(4).toString('hex');
//   this.pin = crypto.createHash('sha256').update(pin).digest('hex');
//   return pin;
// };

const Test = mongoose.model('test', schema);

module.exports = Test;
