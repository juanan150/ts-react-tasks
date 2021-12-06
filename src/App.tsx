import React, { useState, useRef } from 'react'

type formElement = React.FormEvent<HTMLFormElement>
type changeElement = React.ChangeEvent<HTMLInputElement>

interface ITask {
  name: string
  done: boolean
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>('')
  const [tasks, setTasks] = useState<ITask[]>([])

  const taskInput = useRef<HTMLInputElement>(null)

  const handleChange = (e: changeElement): void => {
    setNewTask(e.target.value)
  }

  const handleSubmit = (e: formElement): void => {
    e.preventDefault()
    addTask(newTask)
    setNewTask('')
    taskInput.current?.focus()
  }

  const addTask = (name: string): void => {
    setTasks((prevTasks) => [...prevTasks, { name, done: false }])
  }

  const toggleDoneTask = (name: string) => () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.name === name) {
          return { ...task, done: !task.done }
        }
        return task
      }),
    )
  }

  const removeTask = (name: string) => () => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.name !== name))
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
                  className="form-control"
                  value={newTask}
                  onChange={(e) => handleChange(e)}
                  autoFocus
                  ref={taskInput}
                />
                <button className="form-control btn btn-success btn-block mt-2">
                  Save
                </button>
              </form>
            </div>
          </div>
          <ul>
            {tasks.map((task: ITask, i: number) => (
              <li className="card card-body mt-2" key={i + task.name}>
                <h3
                  style={{
                    textDecoration: task.done ? 'line-through' : 'none',
                  }}
                >
                  {task.name}
                </h3>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={toggleDoneTask(task.name)}
                >
                  {task.done ? '❌' : '✔'}
                </button>
                <button
                  className="btn btn-danger mt-2"
                  onClick={removeTask(task.name)}
                >
                  🗑
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
