import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { CheckCircle2, Circle, Clock3, Plus, RefreshCw, Trash2 } from 'lucide-react'

type Status = 'todo' | 'doing' | 'done'

type Task = {
  id: number
  title: string
  description: string
  status: Status
  priority: 'low' | 'medium' | 'high'
  created_at?: string
}

const configuredApiBase = import.meta.env.VITE_API_BASE_URL
const API_BASE =
  configuredApiBase && !configuredApiBase.includes('YOUR-RENDER-URL')
    ? configuredApiBase
    : 'https://forge2-kanban-api-46xu.onrender.com/api'

const fallbackTasks: Task[] = [
  {
    id: 1,
    title: 'Wire Hermes to Slack',
    description: 'Brain posts plan in #sprint-main and routes coding work to OpenClaw.',
    status: 'todo',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Ship Laravel API',
    description: 'Expose task CRUD with SQLite-backed persistence.',
    status: 'doing',
    priority: 'high',
  },
  {
    id: 3,
    title: 'Capture submission proof',
    description: 'Screenshots for doctors, Slack loop, GitHub repo, and live URL.',
    status: 'done',
    priority: 'medium',
  },
]

const columns: Array<{ status: Status; label: string; icon: typeof Circle }> = [
  { status: 'todo', label: 'To Do', icon: Circle },
  { status: 'doing', label: 'Doing', icon: Clock3 },
  { status: 'done', label: 'Done', icon: CheckCircle2 },
]

export function App() {
  const [tasks, setTasks] = useState<Task[]>(fallbackTasks)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Task['priority']>('medium')
  const [loading, setLoading] = useState(false)
  const [apiState, setApiState] = useState<'checking' | 'online' | 'offline'>('checking')

  const groupedTasks = useMemo(
    () =>
      columns.map((column) => ({
        ...column,
        tasks: tasks.filter((task) => task.status === column.status),
      })),
    [tasks],
  )

  async function loadTasks() {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/tasks`)
      if (!response.ok) throw new Error('API unavailable')
      const data = (await response.json()) as Task[]
      setTasks(data)
      setApiState('online')
    } catch {
      setApiState('offline')
      setTasks((current) => (current.length ? current : fallbackTasks))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadTasks()
  }, [])

  async function createTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const cleanTitle = title.trim()
    if (!cleanTitle) return

    const draft: Omit<Task, 'id'> = {
      title: cleanTitle,
      description: description.trim(),
      status: 'todo',
      priority,
    }

    if (apiState === 'online') {
      const response = await fetch(`${API_BASE}/tasks`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      })
      if (response.ok) {
        const created = (await response.json()) as Task
        setTasks((current) => [created, ...current])
      }
    } else {
      setTasks((current) => [{ ...draft, id: Date.now() }, ...current])
    }

    setTitle('')
    setDescription('')
    setPriority('medium')
  }

  async function moveTask(task: Task, status: Status) {
    const nextTask = { ...task, status }
    setTasks((current) => current.map((item) => (item.id === task.id ? nextTask : item)))

    if (apiState === 'online') {
      await fetch(`${API_BASE}/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
    }
  }

  async function deleteTask(task: Task) {
    setTasks((current) => current.filter((item) => item.id !== task.id))

    if (apiState === 'online') {
      await fetch(`${API_BASE}/tasks/${task.id}`, { method: 'DELETE' })
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Forge 2 Edition 1</p>
          <h1>Qualifier Kanban</h1>
        </div>
        <button className="icon-button" onClick={loadTasks} type="button" aria-label="Refresh tasks">
          <RefreshCw size={18} className={loading ? 'spinning' : ''} />
        </button>
      </header>

      <section className="status-row" aria-label="Project status">
        <div>
          <span className={`status-dot ${apiState}`} />
          API {apiState}
        </div>
        <div>{tasks.length} tasks</div>
        <div>Free-stack build</div>
      </section>

      <section className="workspace">
        <form className="task-form" onSubmit={createTask}>
          <h2>New Task</h2>
          <label>
            Title
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Add a task" />
          </label>
          <label>
            Notes
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What needs to happen?"
            />
          </label>
          <label>
            Priority
            <select value={priority} onChange={(event) => setPriority(event.target.value as Task['priority'])}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
          <button className="primary-button" type="submit">
            <Plus size={18} />
            Add task
          </button>
        </form>

        <section className="board" aria-label="Kanban board">
          {groupedTasks.map((column) => {
            const Icon = column.icon
            return (
              <div className="column" key={column.status}>
                <div className="column-header">
                  <Icon size={18} />
                  <h2>{column.label}</h2>
                  <span>{column.tasks.length}</span>
                </div>
                <div className="task-list">
                  {column.tasks.map((task) => (
                    <article className="task-card" key={task.id}>
                      <div className="task-card-header">
                        <span className={`priority ${task.priority}`}>{task.priority}</span>
                        <button className="ghost-button" onClick={() => deleteTask(task)} type="button" aria-label="Delete task">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <h3>{task.title}</h3>
                      <p>{task.description || 'No notes added.'}</p>
                      <div className="move-row">
                        {columns.map((target) => (
                          <button
                            disabled={target.status === task.status}
                            key={target.status}
                            onClick={() => moveTask(task, target.status)}
                            type="button"
                          >
                            {target.label}
                          </button>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )
          })}
        </section>
      </section>
    </main>
  )
}
