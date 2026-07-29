const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  region: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String, 
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
}, {
  timestamps: true,
  autoCreate: true,
  autoIndex: true
});

destinationSchema.index({ location: '2dsphere' });

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;