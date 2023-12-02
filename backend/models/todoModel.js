const fs = require("fs");
const path = require("path");

let filePath = path.join(__dirname, "..", "data", "todos.json");

function readTodos() {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function writeTodos(todos) {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), "utf8");
}

function getAll() {
  return readTodos();
}

function getOneById(id) {
  return readTodos().find((todo) => todo.id === id);
}

function createOne(todo) {
  const todos = readTodos();
  todos.push(todo);
  writeTodos(todos);
}

function updateOne(id, updatedTodo) {
  const todos = readTodos();
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...updatedTodo };
    writeTodos(todos);
  }
}

function deleteOne(id) {
  const todos = readTodos();
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    writeTodos(todos);
  }
}

function changeFilePath(newFilePath) {
  filePath = newFilePath;
}

module.exports = {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
  changeFilePath,
};
