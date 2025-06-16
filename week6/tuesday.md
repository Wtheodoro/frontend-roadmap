# Component Communication (Props Drilling)

## 🎯 Learning Objectives

- Understand how components communicate in React
- Learn about props drilling and its implications
- Master different patterns for component communication
- Implement proper data flow in React applications
- Identify when to use different communication patterns

## 📚 Core Concepts

### 1. Props Drilling

Props drilling occurs when you pass data through multiple levels of components to reach a deeply nested component that needs the data.

#### Example of Props Drilling

```javascript
// App.jsx
function App() {
  const [user, setUser] = useState({ name: 'John', role: 'admin' })

  return (
    <div>
      <Header user={user} />
    </div>
  )
}

// Header.jsx
function Header({ user }) {
  return (
    <header>
      <Navigation user={user} />
    </header>
  )
}

// Navigation.jsx
function Navigation({ user }) {
  return (
    <nav>
      <UserMenu user={user} />
    </nav>
  )
}

// UserMenu.jsx
function UserMenu({ user }) {
  return <div>Welcome, {user.name}!</div>
}
```

### 2. Problems with Props Drilling

1. **Maintenance Issues**

   - Hard to track data flow
   - Components become tightly coupled
   - Changes require modifications in multiple places

2. **Performance Concerns**

   - Unnecessary re-renders
   - Components receive props they don't use
   - Increased complexity in component tree

3. **Code Readability**
   - Props passed through components that don't use them
   - Hard to understand data flow
   - Increased boilerplate code

### 3. Solutions to Props Drilling

#### 1. Component Composition

```javascript
// Instead of passing user through multiple components
function App() {
  const [user, setUser] = useState({ name: 'John', role: 'admin' })

  return (
    <div>
      <Header>
        <UserMenu user={user} />
      </Header>
    </div>
  )
}

function Header({ children }) {
  return (
    <header>
      <Navigation>{children}</Navigation>
    </header>
  )
}

function Navigation({ children }) {
  return <nav>{children}</nav>
}
```

#### 2. Context API

```javascript
// UserContext.jsx
const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'John', role: 'admin' })

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

// App.jsx
function App() {
  return (
    <UserProvider>
      <div>
        <Header />
      </div>
    </UserProvider>
  )
}

// UserMenu.jsx
function UserMenu() {
  const { user } = useContext(UserContext)
  return <div>Welcome, {user.name}!</div>
}
```

#### 3. Custom Hooks

```javascript
// useUser.js
function useUser() {
  const [user, setUser] = useState({ name: 'John', role: 'admin' })
  return { user, setUser }
}

// App.jsx
function App() {
  const { user, setUser } = useUser()
  return (
    <div>
      <Header user={user} />
      <Profile user={user} setUser={setUser} />
    </div>
  )
}
```

### 4. When to Use Each Solution

1. **Component Composition**

   - When components are closely related
   - For UI elements that naturally compose
   - When you want to avoid prop drilling for a few levels

2. **Context API**

   - For global state that many components need
   - When props drilling goes beyond 2-3 levels
   - For theme, authentication, or user preferences

3. **Custom Hooks**
   - For reusable logic and state
   - When you need to share state between unrelated components
   - For complex state management needs

## 🎮 Practical Exercise: Componify Project

Let's improve the component communication in the Componify project:

1. **Identify Props Drilling**

   - Review the current component structure
   - Find instances of props being passed through multiple levels
   - Note which components actually use the props

2. **Implement Solutions**

   - Use component composition for related UI elements
   - Create a theme context for cyberpunk styling
   - Extract shared state into custom hooks

3. **Refactor Example**

   ```javascript
   // Before
   function App() {
     const [theme, setTheme] = useState('cyberpunk')
     return (
       <div>
         <Header theme={theme} setTheme={setTheme} />
         <Hero theme={theme} />
         <Cards theme={theme} />
       </div>
     )
   }

   // After
   const ThemeContext = createContext()

   function App() {
     const [theme, setTheme] = useState('cyberpunk')
     return (
       <ThemeContext.Provider value={{ theme, setTheme }}>
         <div>
           <Header />
           <Hero />
           <Cards />
         </div>
       </ThemeContext.Provider>
     )
   }
   ```

## 📝 Best Practices

1. **Component Design**

   - Keep components focused and single-responsibility
   - Use composition over inheritance
   - Consider the component hierarchy before implementation

2. **State Management**

   - Lift state up only when necessary
   - Use context for global state
   - Keep state as close as possible to where it's used

3. **Performance**

   - Memoize components when needed
   - Use React.memo for expensive renders
   - Consider using useMemo and useCallback

4. **Code Organization**
   - Group related components together
   - Create shared contexts in a separate folder
   - Use custom hooks for reusable logic

## 📚 Additional Resources

- [React Context Documentation](https://react.dev/learn/passing-data-deeply-with-context)
- [React Composition vs Inheritance](https://react.dev/learn/composition-vs-inheritance)
- [React Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
