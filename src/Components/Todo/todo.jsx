import { useState } from "react";
import "./todo.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [editTodo, setEditTodo] = useState(null);

  const addtodo = () => {
    if (taskName.trim() === "" || description.trim() === "") {
      alert("Task name and description cannot be empty");
      return;
    }

    const newTodo = {
      id: new Date().getTime(),
      taskName,
      description,
      status: "Not Completed",
    };

    setTodos([...todos, newTodo]);
    setTaskName("");
    setDescription("");
  };

  const updateTodo = (id, updatedTask, updatedDescription, updatedStatus) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              taskName: updatedTask,
              description: updatedDescription,
              status: updatedStatus,
            }
          : todo
      )
    );
    setEditTodo(null);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const filterTodos = () => {
    switch (filter) {
      case "Completed":
        return todos.filter((todo) => todo.status === "Completed");
      case "Not Completed":
        return todos.filter((todo) => todo.status === "Not Completed");
      default:
        return todos;
    }
  };

  return (
    <>
      <div className="todo-container">
        <h1>My todo</h1>
        <div className="todo-form">
          <input
            type="text"
            placeholder="Todo Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Todo Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={addtodo}>Add Todo</button>
        </div>
        <div className="todo-filter">
          <h2>My Todos</h2>
          <div className="filter">
            <label>Status Filter:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
            </select>
          </div>
        </div>
        <div className="todo-list">
          {filterTodos().map((todo) => (
            <div key={todo.id} className="todo-card">
              <p>Name: {todo.taskName}</p>
              <p>Description: {todo.description}</p>
              <p>
                Status:
                <span
                  style={{
                    background:
                      todo.status === "Completed" ? "#15AC8A" : "#FF7F80",
                  }}
                >
                  {todo.status}
                </span>
              </p>
              <button className="button" onClick={() => setEditTodo(todo)}>
                Edit
              </button>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          ))}
        </div>
        {editTodo && (
          <div className="edit-popup">
            <h2>Edit Todo</h2>
            <input
              type="text"
              defaultValue={editTodo.taskName}
              id="editedTask"
            />
            <input
              type="text"
              defaultValue={editTodo.description}
              id="editedDescription"
            />
            <select defaultValue={editTodo.status} id="editedStatus">
              <option value="Not Completed">Not Completed</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              onClick={() => {
                const updatedTask = document.getElementById("editedTask").value;
                const updatedDescription =
                  document.getElementById("editedDescription").value;
                const updatedStatus =
                  document.getElementById("editedStatus").value;
                updateTodo(
                  editTodo.id,
                  updatedTask,
                  updatedDescription,
                  updatedStatus
                );
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Todo;
