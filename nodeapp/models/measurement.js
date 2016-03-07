var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var measurementSchema = new Schema({
	dateElectric: Number,
	deviceElectric: String,
	meter181kWh: String,
	meter281kWh: String,
	meter182kWh: String,
	meter282kWh: String,
	tariff: Number,
	powerDeliveredKw: String,
	powerReceivedKw: String,
	powerFailures: Number,
	powerFailuresLong: Number,
	deviceGas: Number,
	dateGas: Number,
	gasMeasurementm3: String
});

// module.exports = mongoose.model('Measurement', measurementSchema);
// var Mearsurement = mongoose.model('Measurement', measurementSchema);
mongoose.model('measurement', measurementSchema);
