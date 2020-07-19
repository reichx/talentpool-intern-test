// import modules
const express = require('express')

// create a router from an instance of the express module
const router = express.Router()

// import the model
const Question = require('./models/Questions')

// create one quiz question
router.post('/questions', async (req, res) => {
	// wrap the request using a try/catch statement and retrieve the request data
	try {
		const { description } = req.body
		const { alternatives } = req.body
		
		// use the Question schema to create the question and return a 201 status code along with the created question
		const question = await Question.create({
			description,
			alternatives
		})
		return res.status(201).json(question)
	// return a 500 status code in case of an error
	} catch (error) {
		return res.status(500).json({"error":error})
	}
})

// get one quiz question
router.get('/questions/:id', async (req, res) => {
	// wrap the request using a try/catch statement, retrieve the request data from req.params using _id as the search parameter
	try {
		const _id = req.params.id
		
		const question = await Question.findOne({_id})
		if (!question){
			return res.status(404).json({})
		}else{
			return res.status(200).json(question)
		}
	} catch (error) {
		return res.status(500).json({"error":error})
	}
})

// get all quiz questions
router.get('/questions', async (req, res) => {
	// wrap the request using a try/catch statement, find all the questions in the database and return them to the client
	try {
		const questions = await Question.find()
		return res.status(200).json(questions)
	// return a 500 status code in case of an error
	} catch (error) {
		return res.status(500).json({"error":error})
	}
})

// update one quiz question
router.put('/questions/:id', async (req, res) => {
	// wrap the request using a try/catch statement, retrieve the question using the given _id if it exists within the database
	try {
		const _id = req.params.id
		const { description, alternatives } = req.body
		
		let question = await Question.findOne({_id})
		
		// if the question doesn't exist in the database, create it and return a 201 status code
		if(!question){
			question = await Question.create({
				description,
				alternatives
			})
			return res.status(201).json(question)
			
		// if the question exists in the database, update and save the question and then return a 201 status code along with the updated question
		}else{
			question.description = description
			question.alternatives = alternatives
			await question.save()
			return res.status(200).json(question)
		}
	} catch (error) {
		return res.status(500).json({"error":error})
	}
})

// delete one quiz question
router.delete('questions/:id', async (req, res) => {
	// wrap the request using a try/catch statement, retrieve and delete the question using the given _id if it exists within the database	
	try {
		const _id = req.params.id
		
		const question = await Question.deleteOne({_id})
		
		// if the number of deleted questions equals 0, then the question doesn't exist in the database - return a 404 status code
		if(question.deletedCount === 0){
			return res.status(404).json()
			
		// if the number of deleted questions doesn't equal 0, then the question existed and has been successfully deleted - return a 204 status code
		}else{
			return res.status(204).json()
		}
	} catch (error) {
		return res.status(500).json({"error":error})
	}
})

// router test
// router.get('/', (req, res) => {
	// res.send("It's Quiz time!")
// })


// export the router constant so that it can be imported in another file
module.exports = router