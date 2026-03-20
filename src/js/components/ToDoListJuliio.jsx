import React, { useEffect, useState } from "react";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = () => {
        fetch("https://playground.4geeks.com/todo/users/Julito01", { method: "GET" })
            .then((response) => {
                if (response.status === 404) {
                    // Create user if doesn't exist
                    return fetch("https://playground.4geeks.com/todo/users/Julito01", { method: "POST" })
                        .then(() => setTasks([]));
                }
                return response.json().then((data) => setTasks(data.todos ?? []));
            })
            .catch((error) => console.log(error));
    };

    const addTask = () => {
        if (input.trim() === "") return;
        fetch("https://playground.4geeks.com/todo/todos/marveen", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ label: input, is_done: false }), // :white_check_mark: correct body
        })
            .then(() => {
                setInput("");
                getTasks(); // :white_check_mark: refresh list
            })
            .catch((error) => console.log(error));
    };

    const deleteTask = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, { // :white_check_mark: correct URL with id
            method: "DELETE",
        })
            .then(() => getTasks())
            .catch((error) => console.log(error));
    };

    const clearAllTasks = () => {
        const promises = tasks.map((task) =>
            fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, { // :white_check_mark: each task's id
                method: "DELETE",
            })
        );
        Promise.all(promises)
            .then(() => getTasks())
            .catch((error) => console.log(error));
    };

    return (
        <div className="container">
            <h1 className="text-center">TODO LIST</h1>
            <input
                type="text"
                className="form-control"
                placeholder="Añade una tarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <ul className="list-group mt-3">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        {task.label}
                        <span
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteTask(task.id)}
                        >
                            :wastebasket:
                        </span>
                    </li>
                ))}
            </ul>
            <button className="btn btn-danger mt-3" onClick={clearAllTasks}>
                Borrar todas
            </button>
        </div>
    );
};

export default Home;
