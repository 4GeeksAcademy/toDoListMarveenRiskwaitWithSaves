import { useState, useEffect } from "react";

function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const USER = "marveen";

  // -----------------------------
  // USER MANAGEMENT
  // -----------------------------
  async function crearUsuario() {
    try {
      const res = await fetch(
        `https://playground.4geeks.com/todo/users/${USER}`,
        { method: "POST" }
      );

      if (res.status === 201) {
        obtenerTareas();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function borrarUsuario() {
    try {
      await fetch(
        `https://playground.4geeks.com/todo/users/${USER}`,
        { method: "DELETE" }
      );
      setTasks([]);
    } catch (error) {
      console.log(error);
    }
  }

  // -----------------------------
  // TODOS
  // -----------------------------
  async function obtenerTareas() {
    try {
      const res = await fetch(
        `https://playground.4geeks.com/todo/users/${USER}`
      );

      if (res.status === 404) {
        await crearUsuario();
        return;
      }

      const data = await res.json();
      setTasks(data.todos || []);
    } catch (error) {
      console.log(error);
    }
  }

  async function addTask(e) {
    if (e.key !== "Enter" || inputValue.trim() === "") return;

    try {
      await fetch(
        `https://playground.4geeks.com/todo/todos/${USER}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            label: inputValue,
            is_done: false,
          }),
        }
      );

      setInputValue("");
      obtenerTareas();
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTask(id) {
    try {
      await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        { method: "DELETE" }
      );

      obtenerTareas();
    } catch (error) {
      console.log(error);
    }
  }

  // -----------------------------
  useEffect(() => {
    obtenerTareas();
  }, []);

  // -----------------------------
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid justify-content-between">
          <button
            onClick={crearUsuario}
            className="btn btn-secondary text-light mb-0 h1"
          >
            Crea tu usuario
          </button>

          <h2 className="text-light fs-1 fw-bold">
            The Todo List!
          </h2>

          <button
            onClick={borrarUsuario}
            className="btn btn-danger text-light mb-0 h1"
          >
            Borrar tu usuario
          </button>
        </div>
      </nav>

      <div className="container bg-dark mx-auto mt-5 p-5 bg-light shadow-lg rounded text-center">
        <h1 className="fw-bold mb-4 text-primary">To Do List</h1>

        {/* INPUT */}
        <div className="inputs mb-4">
          <input
            className="form-control form-control-lg shadow-sm"
            placeholder="Add a task..."
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={addTask}
            type="text"
            value={inputValue}
          />
        </div>

        {/* TASK LIST */}
        <div className="new-task">
          <div className="container p-0">
            <ul className="list-group">
              {tasks.length === 0 ? (
                <li className="list-group-item text-muted">
                  No tasks yet...
                </li>
              ) : (
                tasks.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2 rounded"
                  >
                    {item.label}

                    <span
                      className="btn btn-danger rounded-pill"
                      onClick={() => deleteTask(item.id)}
                      style={{ cursor: "pointer" }}
                    >
                      X
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* TASK COUNTER */}
          <h5 className="text-light mt-3">
            {tasks.length === 0
              ? "You have no tasks"
              : tasks.length === 1
              ? "You have one task"
              : `You have ${tasks.length} tasks`}
          </h5>
        </div>
      </div>
    </>
  );
}

export default TodoList;