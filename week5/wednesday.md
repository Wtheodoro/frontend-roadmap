# Props and State (useState)

## 📚 Understanding Props and State

Props and State are two fundamental concepts in React that help manage data and component behavior.

### Props (Properties)

- Read-only data passed from parent to child
- Cannot be modified by the child component
- Used for configuration and data passing

### State

- Internal data managed by the component
- Can be modified using setState
- Triggers re-renders when updated
- Maintains component's memory

## 🎯 Props in Detail

### Basic Props Usage

```jsx
// JavaScript Version
// Parent Component
function Parent() {
  return <Child name='John' age={25} />
}

// Child Component
function Child({ name, age }) {
  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Age: {age}</p>
    </div>
  )
}
```

```tsx
// TypeScript Version
// Parent Component
function Parent() {
  return <Child name='John' age={25} />
}

// Child Component
interface ChildProps {
  name: string
  age: number
}

function Child({ name, age }: ChildProps) {
  return (
    <div>
      <h2>Name: {name}</h2>
      <p>Age: {age}</p>
    </div>
  )
}
```

### Props with Children

```jsx
// JavaScript Version
function Card({ title, children }) {
  return (
    <div className='card'>
      <h2>{title}</h2>
      <div className='card-content'>{children}</div>
    </div>
  )
}

// Usage
function App() {
  return (
    <Card title='Welcome'>
      <p>This is the card content</p>
      <button>Click me</button>
    </Card>
  )
}
```

```tsx
// TypeScript Version
interface CardProps {
  title: string
  children: React.ReactNode
}

function Card({ title, children }: CardProps) {
  return (
    <div className='card'>
      <h2>{title}</h2>
      <div className='card-content'>{children}</div>
    </div>
  )
}
```

## 🎮 State with useState

### Basic State Management

```jsx
// JavaScript Version
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  )
}
```

```tsx
// TypeScript Version
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState<number>(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  )
}
```

### Multiple State Variables

```jsx
// JavaScript Version
function UserProfile() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [isActive, setIsActive] = useState(false)

  return (
    <div>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Enter name'
      />
      <input
        type='number'
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder='Enter age'
      />
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Deactivate' : 'Activate'}
      </button>
    </div>
  )
}
```

```tsx
// TypeScript Version
function UserProfile() {
  const [name, setName] = useState<string>('')
  const [age, setAge] = useState<number>(0)
  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <div>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Enter name'
      />
      <input
        type='number'
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
        placeholder='Enter age'
      />
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Deactivate' : 'Activate'}
      </button>
    </div>
  )
}
```

### State with Objects

```jsx
// JavaScript Version
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    age: 0,
    email: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <form>
      <input
        name='name'
        value={user.name}
        onChange={handleChange}
        placeholder='Name'
      />
      <input
        name='age'
        type='number'
        value={user.age}
        onChange={handleChange}
        placeholder='Age'
      />
      <input
        name='email'
        type='email'
        value={user.email}
        onChange={handleChange}
        placeholder='Email'
      />
    </form>
  )
}
```

```tsx
// TypeScript Version
interface User {
  name: string
  age: number
  email: string
}

function UserForm() {
  const [user, setUser] = useState<User>({
    name: '',
    age: 0,
    email: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <form>
      <input
        name='name'
        value={user.name}
        onChange={handleChange}
        placeholder='Name'
      />
      <input
        name='age'
        type='number'
        value={user.age}
        onChange={handleChange}
        placeholder='Age'
      />
      <input
        name='email'
        type='email'
        value={user.email}
        onChange={handleChange}
        placeholder='Email'
      />
    </form>
  )
}
```

## 📝 Practical Examples

### Todo Item Component

```jsx
// JavaScript Version
function TodoItem({ id, text, completed, onToggle, onDelete }) {
  return (
    <div className='todo-item'>
      <input
        type='checkbox'
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {text}
      </span>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  )
}

// Usage in parent component
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
  ])

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </div>
  )
}
```

```tsx
// TypeScript Version
interface TodoItemProps {
  id: number
  text: string
  completed: boolean
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

function TodoItem({ id, text, completed, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className='todo-item'>
      <input
        type='checkbox'
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {text}
      </span>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  )
}

// Usage in parent component
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
  ])

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </div>
  )
}
```

## 💡 Best Practices

1. **Props**

   - Keep props simple and focused
   - Use prop drilling sparingly
   - Consider using composition over props
   - Use TypeScript interfaces when using TypeScript

2. **State**

   - Keep state as local as possible
   - Use multiple useState calls for different concerns
   - Avoid deeply nested state objects
   - Use functional updates when new state depends on previous state

3. **Performance**
   - Memoize expensive calculations
   - Use React.memo for pure components
   - Avoid unnecessary re-renders
   - Use proper key props in lists

## 🎮 Hands-on Exercise

Create a simple shopping cart component that:

- Displays a list of products
- Allows adding/removing items
- Shows total price
- Maintains item quantities

```jsx
// JavaScript Version
function ShoppingCart() {
  const [cart, setCart] = useState([])
  const [products] = useState([
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
  ])

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          {product.name} - ${product.price}
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          {item.name} x {item.quantity} - ${item.price * item.quantity}
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <h3>Total: ${total}</h3>
    </div>
  )
}
```

```tsx
// TypeScript Version
interface Product {
  id: number
  name: string
  price: number
}

interface CartItem extends Product {
  quantity: number
}

function ShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [products] = useState<Product[]>([
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
  ])

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          {product.name} - ${product.price}
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          {item.name} x {item.quantity} - ${item.price * item.quantity}
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <h3>Total: ${total}</h3>
    </div>
  )
}
```

## 📚 Additional Resources

- [React Props Documentation](https://react.dev/learn/passing-props-to-a-component)
- [React State Documentation](https://react.dev/learn/state-a-components-memory)
- [React Hooks Documentation](https://react.dev/reference/react)
- [TypeScript with React](https://react-typescript-cheatsheet.netlify.app/)
- [React Patterns](https://reactpatterns.com/)
