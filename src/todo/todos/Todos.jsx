import "./style.css";
import Button from "../button";
import { useRef } from "react";
import todos from ".";

function Todos({
  todos = [],
  onDelete,
  onDone,
  onEdit,
  onEditCancel,
  onEditSave,
}) {
  return (
    <div className="todo-list">
      {todos.map((data, index) => {
        return (
          <TodoItem
            key={data.id}
            index={index}
            data={data}
            onEdit={onEdit}
            onDone={onDone}
            onDelete={onDelete}
            onEditCancel={onEditCancel}
            onEditSave={onEditSave}
          />
        );
      })}
    </div>
  );
}
export default Todos;

function TodoItem({
  data,
  onDone,
  index,
  onDelete,
  onEdit,
  onEditSave,
  onEditCancel,
}) {
  const inputRef = useRef("");

  function handleEdit(id) {
    return () => {
      onEdit(id);
    };
  }

  function handleDelete(id) {
    return () => {
      onDelete(id);
    };
  }

  function handleEditCancel(id) {
    return () => {
      onEditCancel(id);
    };
  }

  function handleDone(id) {
    return () => {
      onDone(id);
    };
  }

  function handleSaveEdit(id) {
    return () => {
      const value = inputRef.current.value;

      onEditSave(id, value);
      inputRef.current.value = "";
    };
  }

  if (data.isEditMode) {
    return (
      <div>
        <input ref={inputRef} type="text" defaultValue={data.todo} />

        <Button onClick={handleSaveEdit(data.id)} label="Save" />
        <Button onClick={handleEditCancel(data.id)} label="Cancel" />
      </div>
    );
  }

  return (
    <div data-completed-todo={data.isCompleted}>
      <span>{data.todo}</span>

      <Button onClick={handleEdit(data.id)} label="Edit" />
      <Button
        onClick={handleDelete(data.id)}
        className="danger"
        label="Delete"
      />
      <Button onClick={handleDone(data.id)} className="success" label="Done" />
    </div>
  );
}
