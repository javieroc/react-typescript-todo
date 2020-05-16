import React, { useState, useRef } from 'react';

interface ITodo {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTodo, setNewTodo] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const inputTodo = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTodos([...todos, { name: newTodo, done: false }]);
    setNewTodo('')
    inputTodo.current?.focus()
  }

  const toggleTodo = (i: number) => {
    const todoUpdated = {
      name: todos[i].name,
      done: !todos[i].done
    }
    const todosUpdated: ITodo[] = [...todos.slice(0, i), todoUpdated, ...todos.slice(i + 1)];
    setTodos(todosUpdated);
  }

  const removeTodo = (i: number) => {
    const todosUpdated: ITodo[] = [...todos.slice(0, i), ...todos.slice(i + 1)];
    setTodos(todosUpdated);
  }

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={(e) => setNewTodo(e.target.value)}
                  value={newTodo}
                  className="form-control"
                  autoFocus
                  ref={inputTodo}
                />
                <button className="btn btn-success btn-block mt-2">Save</button>
              </form>
            </div>
          </div>
          {
            todos.map((todo: ITodo, i: number) => (
              <div key={i} className="card card-body mt-2">
                <h3 style={{ textDecoration: todo.done ? 'line-through' : '' }}>
                  {todo.name} <button className="btn btn-info ml-2" onClick={() => toggleTodo(i)}>{todo.done ? '⨯' : '✓'}</button>
                  <button className="btn btn-secondary ml-2" onClick={() => removeTodo(i)}>🗑</button>
                </h3>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
