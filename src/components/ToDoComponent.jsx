import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { saveTodo, getTodo, updateTodo } from "../services/ToDoService";

const ToDoComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  function saveOrUpdateToDo(e) {
    e.preventDefault();
    const todo = { title, description, completed };
    console.log(todo);

    if (id) {
      updateTodo(id, todo)
        .then((response) => {
          console.log(response);
          navigate("/todos");
        })
        .catch((err) => {
          console.errror(err);
        });
    } else {
      saveTodo(todo)
        .then((result) => {
          console.log(result.data);
          navigate("/todos");
        })
        .catch((err) => {
          console.errror(err);
        });
    }
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center">Update Todo</h2>;
    } else {
      return <h2 className="text-center">Add Todo</h2>;
    }
  }

  useEffect(() => {
    if (id) {
      getTodo(id)
        .then((response) => {
          console.log(response.data);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setCompleted(response.data.completed);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, id);

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Todo Title:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Todo Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Todo Description:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Todo Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Todo Completed:</label>
                <select
                  className="form-control"
                  value={completed}
                  onChange={(e) => setCompleted(e.target.value)}
                  name="completed"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              <button
                className="btn btn-success"
                onClick={(e) => saveOrUpdateToDo(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoComponent;
