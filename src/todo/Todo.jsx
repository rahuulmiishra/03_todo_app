import Button from "./button/Button";
import InputText from "./input-text/InputText";
import "./style.css";
import Todos from "./todos";

import useHandler from "./useHandler";

window.todoId = 1000;

const FilterType = {
  DONE: 1,
  PENDING: 2,
  UNKNOWN: 3,
};

function Todo() {
  const {
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
  } = useHandler();

  let todoToShow = [];
  // Todo: simply this. its on you 😁
  let doneTodos = [];
  let pendingTodos = [];

  todos.forEach((t) => {
    if (t.isCompleted) {
      doneTodos.push(t);
    } else {
      pendingTodos.push(t);
    }
  });
  if (activeFilter === FilterType.UNKNOWN) {
    todoToShow = [...pendingTodos, ...doneTodos];
  } else if (activeFilter === FilterType.PENDING) {
    todoToShow = [...pendingTodos];
  } else {
    todoToShow = [...doneTodos];
  }

  return (
    <div>
      <div>
        <form>
          <InputText value={todoToAdd} onChange={handleTodoChange} />
        </form>
        <Button onClick={handleAddTodo} label={"Add ToDo"} />
      </div>

      <Button label="Show Me Done Todos" onClick={handleFilter} />

      <Todos
        onEditCancel={handleEditCancel}
        onEditSave={handleEditSave}
        onDone={handleDone}
        onEdit={handleEdit}
        onDelete={handleDelete}
        todos={todoToShow}
      />
    </div>
  );
}

export default Todo;
