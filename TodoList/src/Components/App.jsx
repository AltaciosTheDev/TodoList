import React from "react"
import {useState, useEffect, useRef} from 'react'
import { nanoid } from "nanoid"

function App() {
  const [task, setTask] = useState("")
  const [todos, setTodos] = useState([])
  const [editMode, setEditMode] = useState(false)

  const inputRef = useRef()

  useEffect(() => {
    console.log(todos)
    inputRef.current.focus()
  },[todos])

  function handleSubmit(e){
    e.preventDefault()

    if(/^\s*$/.test(task) === false){
      if(editMode){
        console.log("edit")
      }
      else{
        addTodo()
      }
      
      setTask("")
    }

    else{
      return 
    }

  }
  

  function addTodo(){
    let newTodo = {
      id: nanoid(),
      task: task,
      completed: false,
      showDelete: false
    }
    setTodos(prevTodos => {
      return [newTodo, ...prevTodos]
    })
  }

  function handleDelete(id){
    setTodos(prevTodos => {
      return prevTodos.filter(prevTodo => {
        return prevTodo.id !== id
      })
    })
  }

  function handleComplete(id, completed){
    setTodos(prevTodos => {
      return prevTodos.map(prevTodo => {
        return prevTodo.id === id ? {...prevTodo, completed: completed} : prevTodo
      })
    })
  }

  function toggleShowDelete(id){
    setTodos(prevTodos => {
      return prevTodos.map(prevTodo => {
        return prevTodo.id === id ? {...prevTodo, showDelete:!prevTodo.showDelete} : prevTodo
      })
    })
  }

  return (
    <>  
        <form className="new-item-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <label htmlFor="item">New item</label>
                <input ref={inputRef} id="item" value={task} onChange={(e) => setTask(e.target.value)}/>
            </div>
            <button className="btn">Add</button>
        </form>
        <h1 className="header">Todo List</h1>
        <ul className="list">

          {todos.length === 0 && "Nothing todo... do something with your life!"}

          {todos.map((todo) => {
              return(
                  <li key={todo.id} className="itemWrapper" onMouseEnter={() => toggleShowDelete(todo.id)} onMouseLeave={() => toggleShowDelete(todo.id)}>
                    <label>
                        <input type="checkbox" checked={todo.completed} onChange={(e) => handleComplete(todo.id, e.target.checked)}/>
                        {todo.task}
                    </label>
                    <div className="item-controls">
                        {todo.showDelete && <button className="btn btn-danger" onClick={() => handleDelete(todo.id)}>Delete</button>}
                        <button className="btn btn-warning" onClick={() => setEditMode(true)}>Modify</button>
                    </div>
                    
                  </li>
              )
          })}
        </ul>
    </>
  )
}

export default App
