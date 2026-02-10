const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  homeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home',
    required: true
  },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  nights: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, default: 'confirmed' }
});

module.exports = mongoose.model('Booking', bookingSchema);
