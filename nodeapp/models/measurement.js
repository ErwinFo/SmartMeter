var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var measurementSchema = new Schema({
	date : Date,
	// dateTime: Date,
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
	deviceGas: String,
	dateGas: String,
	gasMeasurementm3: String
});

mongoose.model('measurement', measurementSchema);
