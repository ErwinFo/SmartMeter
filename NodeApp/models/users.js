var mongoose = require('mongoose');  
var userSchema = new mongoose.Schema({  
  name: String
});
mongoose.model('user', userSchema);