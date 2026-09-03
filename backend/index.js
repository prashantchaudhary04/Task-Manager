const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors')


const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/task-manager')
  .then(() => console.log('Connected!'));


let taskSchema = mongoose.Schema({
  title : String,
  description : String,
  isCompleted : Boolean
});
let Task = mongoose.model("Task", taskSchema);


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.post('/tasks',async function(req,res){
  const formData = req.body;
  let tasks = await Task.create(formData);
  res.send(tasks);
})
app.get('/tasks',async function(req,res){
  let tasks = await Task.find();
  res.send(tasks);
});

app.get('/tasks/:id',async function(req,res){
  const id = req.params.id
  let tasks = await Task.findById(id);
  res.send(tasks);
})

app.delete('/tasks/:id',async function(req,res){
  const id = req.params.id
  let tasks = await Task.findByIdAndDelete(id);
  res.send(tasks);
})

app.patch('/tasks/:id',async function(req,res){
  const id = req.params.id
  const formData = req.body;
  let tasks = await Task.findByIdAndUpdate(id, formData,{new : true});
  res.send(tasks);
})

app.get("/users", function (req, res) {
  res.send({
    name: "John",
    age: 30,
  });
});
app.get("/users/:id", function (req, res) {
  const { id } = req.params;

  // Database Code

  res.send({
    id: id,
    name: "Test User",
  });
});

app.post("/users", function (req, res) {
  console.log(req.body);
  const formData = req.body;
  res.send(formData);
});

app.listen(3000);
