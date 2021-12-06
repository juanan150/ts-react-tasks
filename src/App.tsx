import React, { useState } from 'react'

type formElement = React.FormEvent<HTMLFormElement>
type changeElement = React.ChangeEvent<HTMLInputElement>

interface ITask {
  name: string
  done: boolean
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>('')
  const [tasks, setTasks] = useState<ITask[]>([])

  const handleChange = (e: changeElement) => {
    setNewTask(e.target.value)
  }

  const handleSubmit = (e: formElement) => {
    e.preventDefault()
    addTask(newTask)
    setNewTask('')
  }

  const addTask = (name: string) => {
    setTasks((prevTasks) => [...prevTasks, { name, done: false }])
  }
  return (
    <>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              value={newTask}
              onChange={(e) => handleChange(e)}
            />
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
      <ul>
        {tasks.map((task: ITask, i: number) => (
          <li key={i + task.name}>{task.name}</li>
        ))}
      </ul>
    </>
  )
}

export default App
