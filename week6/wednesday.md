# useEffect Hook and Lifecycle

## 🎯 Learning Objectives

- Understand the useEffect hook and its purpose
- Learn about component lifecycle in functional components
- Master different useEffect patterns and use cases
- Implement proper cleanup and side effects
- Understand dependency arrays and their importance

## 📚 Core Concepts

### 1. What is useEffect?

`useEffect` is a React Hook that lets you perform side effects in function components. Side effects are operations that happen outside of the normal render cycle, such as:

- Data fetching
- Subscriptions
- Manual DOM manipulations
- Timers
- API calls

### 2. Basic useEffect Syntax

```javascript
import { useEffect } from 'react'

function MyComponent() {
  useEffect(() => {
    // Side effect code here
    console.log('Component mounted')

    // Optional cleanup function
    return () => {
      console.log('Component will unmount')
    }
  }, []) // Dependency array

  return <div>My Component</div>
}
```

### 3. useEffect Patterns

#### 1. Run Once (Component Mount)

```javascript
useEffect(() => {
  console.log('Component mounted - runs only once')
}, []) // Empty dependency array
```

#### 2. Run on Every Render

```javascript
useEffect(() => {
  console.log('Runs on every render')
}) // No dependency array
```

#### 3. Run When Dependencies Change

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser(userId).then(setUser)
  }, [userId]) // Runs when userId changes
}
```

#### 4. Cleanup Function

```javascript
function Timer() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1)
    }, 1000)

    // Cleanup function
    return () => {
      clearInterval(interval)
    }
  }, [])

  return <div>Count: {count}</div>
}
```

### 4. Common Use Cases

#### 1. Data Fetching

```javascript
function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('/api/users')
        const data = await response.json()
        setUsers(data)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div>Loading...</div>
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}
```

#### 2. Event Listeners

```javascript
function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div>
      Window size: {size.width} x {size.height}
    </div>
  )
}
```

#### 3. Document Title Updates

```javascript
function PageTitle({ title }) {
  useEffect(() => {
    document.title = title
  }, [title])

  return <h1>{title}</h1>
}
```

### 5. Component Lifecycle with useEffect

#### Class Component vs Functional Component

**Class Component (Old Way):**

```javascript
class MyComponent extends React.Component {
  componentDidMount() {
    console.log('Component mounted')
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Component updated')
  }

  componentWillUnmount() {
    console.log('Component will unmount')
  }
}
```

**Functional Component (New Way):**

```javascript
function MyComponent() {
  useEffect(() => {
    console.log('Component mounted')

    return () => {
      console.log('Component will unmount')
    }
  }, [])

  useEffect(() => {
    console.log('Component updated')
  })

  return <div>My Component</div>
}
```

### 6. Best Practices

#### 1. Always Include Dependencies

```javascript
// ❌ Bad - missing dependency
useEffect(() => {
  fetchUser(userId)
}, []) // userId is used but not in dependencies

// ✅ Good - includes all dependencies
useEffect(() => {
  fetchUser(userId)
}, [userId])
```

#### 2. Use Multiple useEffect Hooks

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  // Separate concerns into different effects
  useEffect(() => {
    fetchUser(userId).then(setUser)
  }, [userId])

  useEffect(() => {
    fetchUserPosts(userId).then(setPosts)
  }, [userId])

  return <div>...</div>
}
```

#### 3. Cleanup Functions

```javascript
function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(roomId)
    connection.connect()

    return () => {
      connection.disconnect() // Cleanup
    }
  }, [roomId])
}
```

## 🎮 Practical Exercise: Componify Project

Let's add some lifecycle management to the Componify project:

1. **Add Loading States**

   ```javascript
   function Hero() {
     const [isLoaded, setIsLoaded] = useState(false)

     useEffect(() => {
       // Simulate loading time
       const timer = setTimeout(() => {
         setIsLoaded(true)
       }, 1000)

       return () => clearTimeout(timer)
     }, [])

     return (
       <div className={`hero ${isLoaded ? 'loaded' : 'loading'}`}>
         {isLoaded ? 'Welcome to Componify!' : 'Loading...'}
       </div>
     )
   }
   ```

2. **Add Scroll Effects**

   ```javascript
   function Header() {
     const [isScrolled, setIsScrolled] = useState(false)

     useEffect(() => {
       function handleScroll() {
         setIsScrolled(window.scrollY > 50)
       }

       window.addEventListener('scroll', handleScroll)
       return () => window.removeEventListener('scroll', handleScroll)
     }, [])

     return (
       <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
         {/* Header content */}
       </header>
     )
   }
   ```

3. **Add Animation Triggers**

   ```javascript
   function Card({ title, description }) {
     const [isVisible, setIsVisible] = useState(false)

     useEffect(() => {
       const observer = new IntersectionObserver(
         ([entry]) => {
           if (entry.isIntersecting) {
             setIsVisible(true)
           }
         },
         { threshold: 0.1 }
       )

       const card = document.querySelector('.card')
       if (card) observer.observe(card)

       return () => observer.disconnect()
     }, [])

     return (
       <div className={`card ${isVisible ? 'animate' : ''}`}>
         <h3>{title}</h3>
         <p>{description}</p>
       </div>
     )
   }
   ```

## 📝 Common Mistakes to Avoid

1. **Infinite Loops**

   ```javascript
   // ❌ Bad - causes infinite loop
   useEffect(() => {
     setCount(count + 1)
   }, [count])

   // ✅ Good - use functional update
   useEffect(() => {
     setCount((c) => c + 1)
   }, [])
   ```

2. **Missing Dependencies**

   ```javascript
   // ❌ Bad - missing dependency
   useEffect(() => {
     fetchData(userId)
   }, [])

   // ✅ Good - includes dependency
   useEffect(() => {
     fetchData(userId)
   }, [userId])
   ```

3. **Forgetting Cleanup**

   ```javascript
   // ❌ Bad - no cleanup
   useEffect(() => {
     const interval = setInterval(() => {
       console.log('tick')
     }, 1000)
   }, [])

   // ✅ Good - with cleanup
   useEffect(() => {
     const interval = setInterval(() => {
       console.log('tick')
     }, 1000)

     return () => clearInterval(interval)
   }, [])
   ```

## 📚 Additional Resources

- [React useEffect Documentation](https://react.dev/reference/react/useEffect)
- [React Lifecycle Methods](https://react.dev/learn/lifecycle-of-reactive-effects)
- [React Cleanup Functions](https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)
- [React Dependency Arrays](https://react.dev/learn/removing-effect-dependencies)
