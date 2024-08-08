const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  macAddress: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Device', DeviceSchema);