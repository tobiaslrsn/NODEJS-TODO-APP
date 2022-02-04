const express = require("express");
const exphbs = require("express-handlebars");

const todos = require("./data/todos.js");
const increaseId = require("./functions/increase-id.js");

const app = express();

app.engine(
  "hbs",
  exphbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/todos", (req, res) => {
  res.render("todo-list", { todos });
  console.log({ todos });
});

app.post("/todos/", (req, res) => {
  const id = increaseId(todos);
  const date = new Date();

  const addTodo = {
    id: id,
    created: date.toLocaleString(),
    description: req.body.description,
    done: false,
  };
  console.log(addTodo);
  todos.push(addTodo);
  res.redirect("/todos/");
});

app.get("/new-to-old", (req, res) => {
  todos.sort((a, b) => {
    if (a.created > b.created) {
      return -1;
    } else {
      return 1;
    }
  });
  res.redirect("/todos");
});

app.get("/old-to-new", (req, res) => {
  todos.sort((a, b) => {
    if (b.created > a.created) {
      return -1;
    } else {
      return 1;
    }
  });
  res.redirect("/todos");
});

app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  res.render("todo-single", todo);
});

app.get("/todos/:id/done", (req, res) => {
  const id = parseInt(req.params.id);
  const changeStatus = todos.findIndex((t) => t.id === id);

  todos[changeStatus].done = !todos[changeStatus].done;
  console.log(todos);
  res.redirect("/todos/");
});

app.get("/todo-done", (req, res) => {
  res.render("todo-done", { todos });
});

app.get("/todo-undone", (req, res) => {
  res.render("todo-undone", { todos });
});

app.get("/todos/:id/delete-todo", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  res.render("todo-delete", todo);
});

app.post("/todos/:id/delete-todo", (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((t) => t.id === id);

  todos.splice(todoIndex, 1);
  res.redirect("/todos/");
});

app.get("/todos/:id/update-todo", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  res.render("todo-update", todo);
});

app.post("/todos/:id/update-todo", (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((t) => t.id === id);
  todos[todoIndex].description = req.body.description;

  res.redirect("/todos/");
});

app.listen(8000, () => {
  console.log("todo-app is running at http://localhost:8000/todos");
});
