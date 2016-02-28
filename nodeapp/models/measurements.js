var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var measurementSchema = new Schema({
	id: Number,
	date: Number,
	time: Number,
	dateElectric: Number,
	deviceElectric: Number,
	meter181kWh: Number,
	meter281kWh: Number,
	meter182kWh: Number,
	meter282kWh: Number,
	tarif: Number,
	powerDeliveredKw: Number,
	powerReceivedKw: Number,
	powerFailures: Number,
	longPowerFailures: Number,
	deviceGas: Number,
	dateGas: Number,
	gasMeasurementm3: Number
});

mongoose.model('measurements', measurementSchema);