import React, { useState, useEffect } from "react";


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch todos from the server
  const fetchTodos = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/todo/users/roseshay');
      const data = await response.json();
      if (data && Array.isArray(data.todos)) {
        setTodos(data.todos);
      } else {
        setTodos([]);
        console.error("The fetched data does not contain a valid 'todos' array:", data);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Update todos on the server
  const updateTodosOnServer = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/todo/users/roseshay', {
        method: "PUT",
        body: JSON.stringify({ todos }), // Note the wrapping object
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(response.ok);
      console.log(response.status);
      console.log(await response.text());
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error updating todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      updateTodosOnServer();
    }
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { label: newTodo, done: false }]);
      setNewTodo("");
    } else {
      alert("Please enter a valid task.");
    }
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="container-flex align-items-center">
      <div className="pt-2 fs-1 text-white">To Do List</div>
      <div className="card mt-3 mx-auto p-1" style={{ width: "45rem" }}>
        <input
          type="text"
          placeholder="What to do?"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo} className="btn btn-secondary">
          Add Task
        </button>
        <ul className="list-group d-flex flex-column my-1">
          {todos.length === 0 ? (
            <li className="list-group-item">No tasks, add a task</li>
          ) : (
            todos.map((todo, index) => (
              <li className="list-group-item d-flex justify-content-between px-3" key={index}>
                {todo.label}
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm border-0"
                  onClick={() => handleDeleteTodo(index)}
                >
                  <i className="fas fa-minus-circle"></i>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;


