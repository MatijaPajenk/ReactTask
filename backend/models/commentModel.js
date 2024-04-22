var mongoose = require('mongoose')
var Schema = mongoose.Schema

var commentSchema = new Schema({
	'content': String,
	'postedBy': {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	'postedOn': Schema.Types.ObjectId
})

module.exports = mongoose.model('comment', commentSchema)
