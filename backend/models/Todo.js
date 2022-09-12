const mongoose = require('mongoose');

//create schema
const TodoSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	},
	complete: {
		type: Boolean,
		default: false
	},
	timestamp: {
		type: String,
		default: Date.now()
	}
});

//create model
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;