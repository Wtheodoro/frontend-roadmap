# Lists and Keys

## 📚 Understanding Lists and Keys

Lists and keys are essential concepts in React for rendering collections of elements efficiently. Keys help React identify which items have changed, been added, or been removed.

## 🎯 Why Keys are Important

1. **Helps React identify changes**

   - React uses keys to determine which elements need to be re-rendered
   - Without keys, React has to re-render the entire list on any change

2. **Maintains component state**

   - Keys help React maintain state between re-renders
   - Prevents state from being mixed up between list items

3. **Improves performance**

   - React can optimize re-rendering by only updating changed items
   - Reduces unnecessary DOM operations

4. **Prevents unexpected behavior**
   - Without keys, React might reorder elements incorrectly
   - Can cause issues with form inputs and component state

## 🎮 Basic List Rendering

### Simple List

```jsx
// JavaScript Version
function SimpleList() {
  const fruits = ['Apple', 'Banana', 'Orange']

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  )
}
```

```tsx
// TypeScript Version
function SimpleList() {
  const fruits: string[] = ['Apple', 'Banana', 'Orange']

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  )
}
```

### List with Objects

```jsx
// JavaScript Version
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Deploy to production', completed: false },
  ])

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type='checkbox'
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </span>
        </li>
      ))}
    </ul>
  )
}
```

```tsx
// TypeScript Version
interface Todo {
  id: number
  text: string
  completed: boolean
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Deploy to production', completed: false },
  ])

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type='checkbox'
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <span
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </span>
        </li>
      ))}
    </ul>
  )
}
```

## 🎯 Advanced List Operations

### Filtering and Sorting

```jsx
// JavaScript Version
function FilteredList() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', category: 'Fruit' },
    { id: 2, name: 'Carrot', category: 'Vegetable' },
    { id: 3, name: 'Banana', category: 'Fruit' },
    { id: 4, name: 'Broccoli', category: 'Vegetable' },
  ])
  const [category, setCategory] = useState('all')

  const filteredItems = items.filter((item) =>
    category === 'all' ? true : item.category === category
  )

  return (
    <div>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value='all'>All</option>
        <option value='Fruit'>Fruit</option>
        <option value='Vegetable'>Vegetable</option>
      </select>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

```tsx
// TypeScript Version
interface Item {
  id: number
  name: string
  category: 'Fruit' | 'Vegetable'
}

function FilteredList() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Apple', category: 'Fruit' },
    { id: 2, name: 'Carrot', category: 'Vegetable' },
    { id: 3, name: 'Banana', category: 'Fruit' },
    { id: 4, name: 'Broccoli', category: 'Vegetable' },
  ])
  const [category, setCategory] = useState<'all' | 'Fruit' | 'Vegetable'>('all')

  const filteredItems = items.filter((item) =>
    category === 'all' ? true : item.category === category
  )

  return (
    <div>
      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value as 'all' | 'Fruit' | 'Vegetable')
        }
      >
        <option value='all'>All</option>
        <option value='Fruit'>Fruit</option>
        <option value='Vegetable'>Vegetable</option>
      </select>
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

### Nested Lists

```jsx
// JavaScript Version
function NestedList() {
  const categories = [
    {
      id: 1,
      name: 'Fruits',
      items: ['Apple', 'Banana', 'Orange'],
    },
    {
      id: 2,
      name: 'Vegetables',
      items: ['Carrot', 'Broccoli', 'Spinach'],
    },
  ]

  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>
          <h3>{category.name}</h3>
          <ul>
            {category.items.map((item, index) => (
              <li key={`${category.id}-${index}`}>{item}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
```

```tsx
// TypeScript Version
interface Category {
  id: number
  name: string
  items: string[]
}

function NestedList() {
  const categories: Category[] = [
    {
      id: 1,
      name: 'Fruits',
      items: ['Apple', 'Banana', 'Orange'],
    },
    {
      id: 2,
      name: 'Vegetables',
      items: ['Carrot', 'Broccoli', 'Spinach'],
    },
  ]

  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>
          <h3>{category.name}</h3>
          <ul>
            {category.items.map((item, index) => (
              <li key={`${category.id}-${index}`}>{item}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
```

## 🎯 Virtual Lists

For large lists, consider using a virtual list library like `react-window` or `react-virtualized`. Here's a basic implementation:

```jsx
// JavaScript Version
function VirtualList() {
  const items = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    text: `Item ${i + 1}`,
  }))

  const [visibleItems, setVisibleItems] = useState([])
  const [scrollTop, setScrollTop] = useState(0)
  const itemHeight = 50
  const containerHeight = 400
  const visibleCount = Math.ceil(containerHeight / itemHeight)

  useEffect(() => {
    const startIndex = Math.floor(scrollTop / itemHeight)
    const endIndex = Math.min(startIndex + visibleCount + 1, items.length)
    setVisibleItems(items.slice(startIndex, endIndex))
  }, [scrollTop])

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop)
  }

  return (
    <div
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative',
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight }}>
        {visibleItems.map((item) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              top: item.id * itemHeight,
              height: itemHeight,
              width: '100%',
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  )
}
```

```tsx
// TypeScript Version
interface Item {
  id: number
  text: string
}

function VirtualList() {
  const items: Item[] = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    text: `Item ${i + 1}`,
  }))

  const [visibleItems, setVisibleItems] = useState<Item[]>([])
  const [scrollTop, setScrollTop] = useState(0)
  const itemHeight = 50
  const containerHeight = 400
  const visibleCount = Math.ceil(containerHeight / itemHeight)

  useEffect(() => {
    const startIndex = Math.floor(scrollTop / itemHeight)
    const endIndex = Math.min(startIndex + visibleCount + 1, items.length)
    setVisibleItems(items.slice(startIndex, endIndex))
  }, [scrollTop])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  return (
    <div
      style={{
        height: containerHeight,
        overflow: 'auto',
        position: 'relative',
      }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight }}>
        {visibleItems.map((item) => (
          <div
            key={item.id}
            style={{
              position: 'absolute',
              top: item.id * itemHeight,
              height: itemHeight,
              width: '100%',
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  )
}
```

## 💡 Best Practices

1. **Key Selection**

   - Use unique, stable IDs as keys
   - Avoid using array indices as keys
   - Don't use random numbers or timestamps

2. **Performance**

   - Use virtual lists for large datasets
   - Memoize list items when appropriate
   - Avoid unnecessary re-renders

3. **Accessibility**
   - Use semantic HTML elements
   - Add ARIA labels when needed
   - Ensure keyboard navigation works

## 🎮 Hands-on Exercise

Create a task list with:

- Add/remove tasks
- Mark tasks as complete
- Filter by status
- Sort by priority
- Search functionality

```jsx
// JavaScript Version
function TaskList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React', completed: false, priority: 'high' },
    { id: 2, text: 'Build a project', completed: false, priority: 'medium' },
    { id: 3, text: 'Deploy to production', completed: false, priority: 'low' },
  ])
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('priority')

  const addTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      priority: 'medium',
    }
    setTasks([...tasks, newTask])
  }

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'all') return true
      if (filter === 'completed') return task.completed
      if (filter === 'active') return !task.completed
      return true
    })
    .filter((task) => task.text.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      return 0
    })

  return (
    <div>
      <div>
        <input
          type='text'
          placeholder='Search tasks...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value='all'>All</option>
          <option value='completed'>Completed</option>
          <option value='active'>Active</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='priority'>Sort by Priority</option>
        </select>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type='checkbox'
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.text}
            </span>
            <span className={`priority ${task.priority}`}>{task.priority}</span>
            <button onClick={() => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

```tsx
// TypeScript Version
interface Task {
  id: number
  text: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
}

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Learn React', completed: false, priority: 'high' },
    { id: 2, text: 'Build a project', completed: false, priority: 'medium' },
    { id: 3, text: 'Deploy to production', completed: false, priority: 'low' },
  ])
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'priority'>('priority')

  const addTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      priority: 'medium',
    }
    setTasks([...tasks, newTask])
  }

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'all') return true
      if (filter === 'completed') return task.completed
      if (filter === 'active') return !task.completed
      return true
    })
    .filter((task) => task.text.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      }
      return 0
    })

  return (
    <div>
      <div>
        <input
          type='text'
          placeholder='Search tasks...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as 'all' | 'completed' | 'active')
          }
        >
          <option value='all'>All</option>
          <option value='completed'>Completed</option>
          <option value='active'>Active</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'priority')}
        >
          <option value='priority'>Sort by Priority</option>
        </select>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              type='checkbox'
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.text}
            </span>
            <span className={`priority ${task.priority}`}>{task.priority}</span>
            <button onClick={() => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## 📚 Additional Resources

- [React Lists and Keys Documentation](https://react.dev/learn/rendering-lists)
- [Virtual List Libraries](https://github.com/bvaughn/react-window)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Performance Optimization](https://react.dev/learn/render-and-commit)
