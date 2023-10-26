const mongoose = require('mongoose');

const schema = mongoose.Schema({
  // title: {
  //   type: String,
  //   required: true,
  // },
  // description: {
  //   type: String,
  //   required: true,
  // },
  user: {
    type: mongoose.Schema.ObjectId,
  },
  duration: {
    type: Number,
  },
  questions: {
    type: Array,
  },
});

// schema.v

// testSchema.methods.createPin = function () {
//   const pin = crypto.randomBytes(4).toString('hex');
//   this.pin = crypto.createHash('sha256').update(pin).digest('hex');
//   return pin;
// };

const Test = mongoose.model('test', schema);

module.exports = Test;
