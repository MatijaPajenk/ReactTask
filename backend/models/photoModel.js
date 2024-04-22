var mongoose = require('mongoose')
var Schema = mongoose.Schema

var photoSchema = new Schema({
	'title': String,
	'description': String,
	'path': String,
	'postedBy': {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	'postedOn': Date,
	'views': [Schema.Types.ObjectId],
	'likes': [Schema.Types.ObjectId],
	'dislikes': [Schema.Types.ObjectId],
	'nsfw': [Schema.Types.ObjectId]
})

module.exports = mongoose.model('photo', photoSchema)
