// mongoose for mongodb
var mongoose = require('mongoose');

// connect to mongoDB database on localhost
// var uriString = process.env.MONGOLAB_URI || 'mongodb://localhost/buoys';
mongoose.connect('mongodb://localhost/buoys');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongo connected!');
});

// schema for buoys
var buoySchema = mongoose.Schema({
  title: String,
  stationId: String,
  description: Array
});

// models for mongo database
var Buoy = mongoose.model('Buoy', buoySchema);

exports.Buoy = Buoy;
