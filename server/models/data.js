var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var DataSchema   = new Schema({
	device: Schema.Types.ObjectId,
	battery: Number,
	temperature: Number,
	latitude: Number,
	longitude: Number,
	altitude: Number,
	speed: Number,
	course: Number,
	timestamp: Date,
	ttf: Number,
	satellites: Number,
});
module.exports = mongoose.model('Data', DataSchema);