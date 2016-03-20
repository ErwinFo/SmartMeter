var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Alphabetic order */
var measurementSchema = new Schema({
	date : Date,
	dateElectric: Number,
	dateGas: String,
	dateTime: Date,
	deviceElectric: String,
	deviceGas: String,
	gasMeasurementm3: String,
	meter181kWh: String,
	meter182kWh: String,
	meter281kWh: String,
	meter282kWh: String,
	powerDeliveredKw: String,
	powerFailures: Number,
	powerFailuresLong: Number,
	powerReceivedKw: String,
	tariff: Number
});

mongoose.model('measurement', measurementSchema);
