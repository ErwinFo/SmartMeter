var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var usersSchema = new Schema({
	id: String
});

mongoose.model('users', usersSchema);