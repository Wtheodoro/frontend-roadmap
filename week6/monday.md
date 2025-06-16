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

## 🎮 Practical Exercise

Create a simple e-commerce product listing with the following components:

##### JavaScript Version

```javascript
// components/ProductList.jsx
import { useState } from 'react'
import { ProductCard } from './ProductCard'
import { ProductFilter } from './ProductFilter'
import { ProductSort } from './ProductSort'

export function ProductList() {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('price')

  return (
    <div className='product-list'>
      <div className='controls'>
        <ProductFilter onFilter={setFilter} />
        <ProductSort onSort={setSortBy} />
      </div>
      <div className='products-grid'>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={(id) => console.log('Add to cart:', id)}
          />
        ))}
      </div>
    </div>
  )
}
```

##### TypeScript Version

```typescript
// components/ProductList.tsx
import { useState } from 'react'
import { ProductCard } from './ProductCard'
import { ProductFilter } from './ProductFilter'
import { ProductSort } from './ProductSort'

interface Product {
  id: string
  title: string
  price: number
  image: string
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState('')
  const [sortBy, setSortBy] = useState('price')

  return (
    <div className='product-list'>
      <div className='controls'>
        <ProductFilter onFilter={setFilter} />
        <ProductSort onSort={setSortBy} />
      </div>
      <div className='products-grid'>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onAddToCart={(id) => console.log('Add to cart:', id)}
          />
        ))}
      </div>
    </div>
  )
}
```

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

## 🎯 Challenge

Create a simple task management system with the following components:

1. `TaskList`: Main container component
2. `TaskItem`: Individual task component
3. `TaskForm`: Form for adding new tasks
4. `TaskFilter`: Component for filtering tasks
5. `TaskStats`: Component showing task statistics

Try implementing it first in JavaScript, then add TypeScript types to make it more robust!

## 📚 Additional Resources

- [React Component Patterns](https://reactpatterns.com/)
- [React Component Composition](https://react.dev/learn/composition-vs-inheritance)
- [React TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react)
- [JavaScript to TypeScript Migration Guide](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
