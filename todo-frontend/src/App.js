import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [list, setList] = useState([]);
  const [active, setActive] = useState({ title: "", idDone: false, id: null });
  const [edit, setEdit] = useState(false);
  const [call, setCall] = useState(0);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/todo/")
      .then((response) => setList(response.data));
  }, [call]);

  function handleSubmit(e) {
    e.preventDefault();
    if (edit == false) {
      axios.post("http://127.0.0.1:8000/api/todo/", active).then(() => {
        setCall(call + 1);
      });
    } else {
      axios.put(`http://127.0.0.1:8000/api/todo/${active.id}/`, active)
      .then(() => setEdit(false))
      .then(() => setActive({ title: "", idDone: false, id: null }))
      .then(() => setCall(call + 1))
    }
  }

  function handleDelete(id) {
    axios
      .delete(`http://127.0.0.1:8000/api/todo/${id}`)
      .then(() => setCall(call + 1));
  }

  function handleUpdate(todo) {
    setActive(todo);
    setEdit(true);
    setCall(call + 1);
  }

  return (
    <div className="App">
      <div className="header">
        <h1 className={"header"}>Todo Application</h1>
      </div>
      <div className="input-form">
        <form id="form" onSubmit={handleSubmit}>
          <label htmlFor={"element"}>Enter an element</label>
          <input
            type="text"
            id="element"
            name="element"
            value={active.title}
            onChange={(e) => {
              setActive({ ...active, title: e.target.value });
            }}
          />
          <button type="submit">Add</button>
        </form>
      </div>

      <div className="main">
        {list.map((todo, index) => {
          return (
            <div className="todo-element" key={todo.id}>
              <span>{todo.title}</span>

              <button onClick={() => handleUpdate(todo)}>Edit</button>
              <button onClick={() => handleDelete(todo.id)}>x</button>
              <hr className={{ width: "3px" }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
