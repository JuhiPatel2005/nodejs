const mongoose = require('mongoose');
const Favourite = require('./favourites');

const homeSchema = mongoose.Schema({
  housename: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  location: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

homeSchema.pre('findOneAndDelete', async function(next) {
  const homeId = this.getQuery()._id;
  await Favourite.deleteMany({ houseId: homeId });
  next();
});

module.exports = mongoose.model('Home', homeSchema);