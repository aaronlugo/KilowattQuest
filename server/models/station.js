const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  stationId: String ,
  locationId: String ,
  name: String ,
  status: String ,
  dateOpened: String ,
  stallCount: Number ,
  counted: Boolean ,
  elevationMeters: Number,
  powerKilowatt: Number,
  solarCanopy: Boolean ,
  battery: Boolean ,
  statusDays: Number,
  urlDiscuss: Boolean,
})

module.exports = mongoose.model('Station', stationSchema);