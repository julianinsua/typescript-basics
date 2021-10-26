import { Router } from "express";
import { Todo } from "../models/todo";
const router = Router();

let todos: Array<Todo> = [];

router.get("/", (req, res, next) => {
  return res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const newTodo: Todo = { id: new Date().toISOString(), text: req.body.text };
  todos.push(newTodo);
  return res.status(201).json({ message: "uploaded todo", todo: newTodo });
});

router.put("/todo/:todoId", (req, res, next) => {
  const tid = req.params.todoId;
  const todoIndex = todos.findIndex((item) => item.id === tid);
  if (todoIndex > -1) {
    todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
    return res.status(201).json({ message: "updated todos", data: todos });
  }
  res.status(404).json({ message: "No such todo" });
});

router.delete("/todo/:todoId", (req, res, next) => {
  todos = todos.filter((todo) => todo.id !== req.params.todoId);
  return res.status(200).json({ message: "todo deleted", data: todos });
});

export default router;
