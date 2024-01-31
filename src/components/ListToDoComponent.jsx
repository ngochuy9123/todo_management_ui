import React, { useEffect, useState } from "react";
import {
  getAllToDos,
  deleteTodo,
  completeTodo,
  inCompleteTodo,
} from "../services/ToDoService";
import { useNavigate } from "react-router-dom";

function ListToDoComponent() {
  const [todos, setToDo] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    listToDos();
  }, []);
  function listToDos() {
    getAllToDos()
      .then((response) => {
        setToDo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addNewTodo() {
    navigate("/add-todo");
  }

  function updateTodo(id) {
    console.log(id);
    navigate(`/update-todo/${id}`);
  }

  function removeToDo(id) {
    deleteTodo(id)
      .then((response) => {
        console.log(response);
        listToDos();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function markCompleteTodo(id) {
    completeTodo(id)
      .then((response) => {
        console.log(response);
        listToDos();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function markInCompleteTodo(id) {
    inCompleteTodo(id)
      .then((response) => {
        console.log(response);
        listToDos();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center">List of Todos</h2>
      <button className="btn btn-primary mb-2" onClick={addNewTodo}>
        Add Todo
      </button>
      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Todo Title</th>
              <th>Todo Description</th>
              <th>Todo Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed ? "YES" : "NO"}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => updateTodo(todo.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeToDo(todo.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => markCompleteTodo(todo.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Complete
                  </button>
                  <button
                    className="btn btn-info"
                    onClick={() => markInCompleteTodo(todo.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    In Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListToDoComponent;
