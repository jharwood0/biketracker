var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var DeviceSchema   = new Schema({
	devEUI: String
});
module.exports = mongoose.model('Device', DeviceSchema);