function increaseId(todoList) {
  let maximumId = 0;
  for (const todo of todoList) {
    if (todo.id > maximumId) {
      maximumId = todo.id;
    }
  }
  return maximumId + 1;
}

module.exports = increaseId;
