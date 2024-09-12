const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the vendor user
});

module.exports = mongoose.model('Item', itemSchema);
