// import modules
const mongoose = require('mongoose')

//declare and define QuestionSchema
const QuestionSchema = new mongoose.Schema({
	description: String,
	alternatives: [
		{
			text: {
				type: String,
				required: true
			},
			isCorrect: {
				type: Boolean,
				required: true,
				default: false
			}
		}
	]
})

module.exports = mongoose.model('Question', QuestionSchema)