# Creating Multiple Components in React

## 🎯 Learning Objectives

- Understand component composition and organization
- Learn how to break down UI into reusable components
- Master component file structure and naming conventions
- Implement proper component communication
- Follow React best practices for component creation

## 📚 Core Concepts

### 1. Component Organization

Components should be organized following these principles:

- **Single Responsibility**: Each component should do one thing well
- **Reusability**: Components should be designed for reuse
- **Maintainability**: Components should be easy to understand and modify
- **Composability**: Components should work well together

### 2. Component Types

#### Presentational Components

##### JavaScript Version

```javascript
// components/ui/Button.jsx
export function Button({ children, variant = 'primary', onClick }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  )
}
```

##### TypeScript Version

```typescript
// components/ui/Button.tsx
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
}

export function Button({
  children,
  variant = 'primary',
  onClick,
}: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  )
}
```

#### Container Components

##### JavaScript Version

```javascript
// components/UserProfile.jsx
import { useState, useEffect } from 'react'
import { UserCard } from './UserCard'
import { UserStats } from './UserStats'

export function UserProfile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch user data
    fetchUserData().then((data) => {
      setUser(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Loading...</div>
  if (!user) return <div>User not found</div>

  return (
    <div className='user-profile'>
      <UserCard user={user} />
      <UserStats stats={user.stats} />
    </div>
  )
}
```

##### TypeScript Version

```typescript
// components/UserProfile.tsx
import { useState, useEffect } from 'react'
import { UserCard } from './UserCard'
import { UserStats } from './UserStats'

interface User {
  id: string
  name: string
  email: string
  stats: {
    posts: number
    followers: number
    following: number
  }
}

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch user data
    fetchUserData().then((data) => {
      setUser(data)
      setLoading(false)
    })
  }, [])

  if (loading) return <div>Loading...</div>
  if (!user) return <div>User not found</div>

  return (
    <div className='user-profile'>
      <UserCard user={user} />
      <UserStats stats={user.stats} />
    </div>
  )
}
```

### 3. File Structure Best Practices

```
src/
  components/
    common/           # Shared components
      Button.jsx      # JavaScript version
      Button.tsx      # TypeScript version
      Input.jsx
      Card.jsx
    layout/           # Layout components
      Header.jsx
      Footer.jsx
      Sidebar.jsx
    features/         # Feature-specific components
      auth/
        LoginForm.jsx
        RegisterForm.jsx
      products/
        ProductCard.jsx
        ProductList.jsx
```

### 4. Component Communication

#### Props

##### JavaScript Version

```javascript
// components/ProductCard.jsx
export function ProductCard({ title, price, image, onAddToCart }) {
  return (
    <div className='product-card'>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>${price}</p>
      <button onClick={() => onAddToCart(title)}>Add to Cart</button>
    </div>
  )
}
```

##### TypeScript Version

```typescript
// components/ProductCard.tsx
interface ProductCardProps {
  title: string
  price: number
  image: string
  onAddToCart: (productId: string) => void
}

export function ProductCard({
  title,
  price,
  image,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className='product-card'>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>${price}</p>
      <button onClick={() => onAddToCart(title)}>Add to Cart</button>
    </div>
  )
}
```

## �� Practical Exercise: Componify Project

For this exercise, we'll be working with the [Componify](https://github.com/Wtheodoro/Componify) project, a React application with a cyberpunk theme. The goal is to break down the monolithic application into reusable components.

### Current Structure

```
src/
  ├── App.jsx        # Main component
  ├── App.css        # Global styles
  └── assets/        # Static resources
```

### Exercise Steps

1. **Analyze the Current Code**

   - Review the current `App.jsx` file
   - Identify logical sections and UI elements
   - Look for repeated patterns

2. **Create Component Structure**

   ```
   src/
     ├── components/
     │   ├── layout/
     │   │   ├── Header.jsx
     │   │   └── Footer.jsx
     │   ├── sections/
     │   │   ├── Hero.jsx
     │   │   └── Cards.jsx
     │   └── ui/
     │       ├── Card.jsx
     │       └── Button.jsx
     ├── App.jsx
     └── App.css
   ```

3. **Component Breakdown Tasks**

   - Extract the header navigation into `Header.jsx`
   - Create a `Hero` component for the main section
   - Break down the cards section into reusable components
   - Extract common UI elements into the `ui` folder

4. **Component Communication**

   - Identify shared state
   - Plan prop passing
   - Consider using context if needed

5. **Styling Organization**
   - Move component-specific styles to their respective files
   - Create a shared styles folder for common styles
   - Use CSS modules or styled-components if preferred

### Expected Outcome

After completing the exercise, you should have:

- A well-organized component structure
- Reusable UI components
- Clear separation of concerns
- Maintainable and scalable code
- Preserved cyberpunk styling and animations

## 📝 Best Practices

1. **Naming Conventions**

   - Use PascalCase for component names
   - Use descriptive names that indicate purpose
   - Add appropriate suffixes (Form, List, Card, etc.)

2. **Component Size**

   - Keep components small and focused
   - Split large components into smaller ones
   - Aim for components under 200 lines

3. **Props**

   - Use TypeScript interfaces for props (when using TypeScript)
   - Keep prop count reasonable (under 5-7 props)
   - Use prop spreading sparingly

4. **File Organization**
   - Group related components together
   - Use index files for clean exports
   - Keep component files close to where they're used

## 📚 Additional Resources

- [React Component Patterns](https://reactpatterns.com/)
- [React Component Composition](https://react.dev/learn/composition-vs-inheritance)
- [React TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react)
- [JavaScript to TypeScript Migration Guide](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
