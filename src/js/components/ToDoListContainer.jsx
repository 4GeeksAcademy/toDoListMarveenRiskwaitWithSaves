
import { useState } from "react";

function TodoList() {


  const [inputValue, setInputValue] = useState('');
  const [tasks, setTasks] = useState([]);

  function addTask(e) {
    if (e.key === "Enter" && inputValue.trim() != "") {
      setTasks(tasks.concat(inputValue))
      setInputValue("")
    }
  }

  function deleteTask(itemToDelete) {

    const newArray = tasks.filter((item) => item != itemToDelete);
    setTasks(newArray);
  }

  return <>
    <div className="container bg-dark mx-auto mt-5 p-5 bg-light shadow-lg rounded text-center">
      <h1 className="fw-bold mb-4 text-primary">To Do List</h1>

      <div className="inputs mb-4">
        <input
          className="form-control form-control-lg shadow-sm"
          placeholder="Add a task..."
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={addTask}
          type="text"
          value={inputValue}
        />
      </div>

      <div className="new-task">
        <div className="container p-0">
          <ul className="list-group">
            {tasks.map((item) =>
              <li className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2 rounded">
                {item}
                <span
                  className="btn btn-danger rounded-pill cursor-pointer"
                  onClick={() => deleteTask(item)}
                >
                  X
                </span>
              </li>
            )}
          </ul>
        </div>
        <h5 className="text-light">You have {tasks.length ===0 ? "no task" : tasks.length === 1? "one task" :  tasks.length + " tasks"} to do!</h5>
      </div>
    </div>
  </>
}

export default TodoList;

