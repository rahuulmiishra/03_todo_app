const TODO_KEY = "my_todos";

function loadFromCache() {
  const todoString = localStorage.getItem(TODO_KEY);
  const todoArr = JSON.parse(todoString ?? "[]");

  window.todoId = window.todoId + todoArr.length;
  return todoArr;
}

function saveInLocalStorage(key, data) {
  localStorage.setItem(key, data);
}

export { saveInLocalStorage, loadFromCache };
