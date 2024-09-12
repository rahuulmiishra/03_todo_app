import { useState } from "react";
import { loadFromCache, saveInLocalStorage } from "./utils";

const TODO_KEY = "my_todos";

const FilterType = {
  DONE: 1,
  PENDING: 2,
  UNKNOWN: 3,
};

function useHandler() {
  const [todos, setTodos] = useState(loadFromCache);
  const [todoToAdd, setTodoToAdd] = useState("");

  const [activeFilter, setActiveFilter] = useState(FilterType.UNKNOWN);

  function handleTodoChange(value) {
    setTodoToAdd(value);
  }

  function preserveTodos(data) {
    const strTodos = JSON.stringify(data);
    setTodos(data);
    saveInLocalStorage(TODO_KEY, strTodos);
  }

  function handleAddTodo() {
    const oldTodos = structuredClone(todos);

    const newTodo = {};
    newTodo.id = window.todoId++;
    newTodo.todo = todoToAdd;
    newTodo.isEditMode = false;
    newTodo.isCompleted = false;

    setTodoToAdd("");
    const newTodos = [newTodo, ...oldTodos];

    preserveTodos(newTodos);
  }

  function handleEdit(id) {
    const newTodos = todos.map((todo) => {
      todo.isEditMode = id === todo.id;

      return { ...todo };
    });

    preserveTodos(newTodos);
  }

  function handleDelete(id) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    window.todoId = window.todoId - 1;
    preserveTodos(newTodos);
  }

  function handleEditCancel(id) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isEditMode = false;
      }

      return { ...todo };
    });
    preserveTodos(newTodos);
  }

  function handleEditSave(id, newValue) {
    // TODO: use id instead this, will break

    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.todo = newValue;
        todo.isEditMode = false;
      }

      return { ...todo };
    });

    preserveTodos(newTodos);
  }

  function handleDone(id) {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = true;
      }

      return { ...todo };
    });
    preserveTodos(newTodos);
  }

  function handleFilter() {
    if (activeFilter === FilterType.UNKNOWN) {
      setActiveFilter(FilterType.DONE);
    } else if (activeFilter === FilterType.DONE) {
      setActiveFilter(FilterType.PENDING);
    } else if (activeFilter === FilterType.PENDING) {
      setActiveFilter(FilterType.DONE);
    }
  }

  return {
    handleFilter,
    handleDone,
    handleEditSave,
    handleEditCancel,
    handleDelete,
    handleEdit,
    handleAddTodo,
    handleTodoChange,
    activeFilter,
    todoToAdd,
    todos,
  };
}

export default useHandler;
