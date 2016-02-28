var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var priceperiodSchema = new Schema({
	start					: String,
	end						: String,
	providerName			: Number, 
	priceElectricPeak		: Number, 
	priceElectricOffPeak	: Number

});

mongoose.model('priceperiod', priceperiodSchema);
