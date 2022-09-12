const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/react-todo', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// MODELS
//#########

//get all route
app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

//create new todo
app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})
	todo.save();

	//sned response back to front end
	res.json(todo);
});

//delete by id
app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({result});
});

//"Cross of list" Todo Route
app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

    //toggle complete property
	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
})


app.listen(3001, ()=>{
    console.log("Listening on port 3001")
});


