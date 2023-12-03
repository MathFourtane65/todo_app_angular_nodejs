const todoModel = require("../models/todoModel");

function getAllTodos(req, res) {
  res.json(todoModel.getAll());
}

function getTodoById(req, res) {
  const todo = todoModel.getOneById(req.params.id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send("Todo not found");
  }
}

function createTodo(req, res) {
  const todos = todoModel.getAll();
  let newId = 1;

  if (todos.length > 0) {
    // Trouver le plus grand ID actuel et ajouter 1
    newId = Math.max(...todos.map(todo => todo.id)) + 1;
  }

  const newTodo = { id: newId, ...req.body };
  console.log(newTodo);
  todoModel.createOne(newTodo);
  res.status(201).json(newTodo);
}

function updateTodo(req, res) {
  todoModel.updateOne(req.params.id, req.body);
  res.status(200).send("Todo updated");
}

function deleteTodo(req, res) {
  todoModel.deleteOne(req.params.id);
  res.status(200).send("Todo deleted");
}

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
