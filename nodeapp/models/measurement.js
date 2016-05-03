var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Alphabetic order */
var measurementSchema = new Schema({
	date : Date,
	dateElectric: Number,
	dateGas: String,
	dateTime: Date,
	deviceElectric: Number,
	deviceGas: Number,
	gasMeasurementm3: Number,
	meter181kWh: Number,
	meter182kWh: Number,
	meter281kWh: Number,
	meter282kWh: Number,
	powerDeliveredKw: Number,
	powerFailures: Number,
	powerFailuresLong: Number,
	powerReceivedKw: Number,
	tariff: Number
});

mongoose.model('measurement', measurementSchema);
