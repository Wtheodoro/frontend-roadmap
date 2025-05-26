# JSX and Basic Components

## 📚 Introduction to JSX

JSX is a syntax extension for JavaScript that lets you write HTML-like code inside JavaScript. It's not a template language, but a way to describe what the UI should look like.

### Basic JSX Syntax

```tsx
// Basic JSX
const element = <h1>Hello, World!</h1>

// JSX with JavaScript expressions
const name = 'John'
const element = <h1>Hello, {name}</h1>

// JSX with attributes
const element = <img src={user.avatarUrl} alt={user.name} />
```

## 🎯 Creating Basic Components

### 1. Function Components

```tsx
// Basic Function Component
function Welcome() {
  return <h1>Welcome to React!</h1>
}

// Function Component with Props
function Welcome(props: { name: string }) {
  return <h1>Welcome, {props.name}!</h1>
}

// Arrow Function Component
const Welcome = (props: { name: string }) => {
  return <h1>Welcome, {props.name}!</h1>
}
```

### 2. Component Composition

```tsx
// Parent Component
function App() {
  return (
    <div>
      <Welcome name='John' />
      <Welcome name='Jane' />
      <Welcome name='Bob' />
    </div>
  )
}
```

## 🎨 Styling Components

### 1. CSS Classes

```tsx
// Component with CSS class
function Button() {
  return <button className='btn btn-primary'>Click me</button>
}
```

### 2. Inline Styles

```tsx
// Component with inline styles
function ColoredText() {
  const styles = {
    color: 'blue',
    fontSize: '20px',
    fontWeight: 'bold',
  }

  return <p style={styles}>This is styled text</p>
}
```

## 📝 Practical Examples

### 1. Card Component

```tsx
interface CardProps {
  title: string
  description: string
  imageUrl?: string
}

function Card({ title, description, imageUrl }: CardProps) {
  return (
    <div className='card'>
      {imageUrl && <img src={imageUrl} alt={title} />}
      <div className='card-content'>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

// Usage
function App() {
  return (
    <Card
      title='React Basics'
      description='Learn the fundamentals of React'
      imageUrl='/images/react.png'
    />
  )
}
```

### 2. Button Component

```tsx
interface ButtonProps {
  text: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

function Button({ text, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {text}
    </button>
  )
}

// Usage
function App() {
  const handleClick = () => {
    console.log('Button clicked!')
  }

  return (
    <div>
      <Button text='Click me' onClick={handleClick} />
      <Button text='Secondary' variant='secondary' />
    </div>
  )
}
```

## 💡 Best Practices

1. **Component Naming**

   - Use PascalCase for component names
   - Use descriptive names that indicate purpose
   - Prefix with appropriate category (e.g., `UserProfile`, `ProductCard`)

2. **Props**

   - Use TypeScript interfaces for prop types
   - Keep props simple and focused
   - Use destructuring for cleaner code

3. **JSX**
   - Use parentheses for multi-line JSX
   - Keep components small and focused
   - Use fragments (`<>...</>`) to avoid extra divs

## 🎮 Hands-on Exercise

Create a simple profile card component that displays:

- User avatar
- Name
- Role
- Social media links

```tsx
interface ProfileCardProps {
  name: string
  role: string
  avatar: string
  socialLinks: {
    twitter?: string
    github?: string
    linkedin?: string
  }
}

function ProfileCard({ name, role, avatar, socialLinks }: ProfileCardProps) {
  return (
    <div className='profile-card'>
      <img src={avatar} alt={name} className='avatar' />
      <h2>{name}</h2>
      <p className='role'>{role}</p>
      <div className='social-links'>
        {socialLinks.twitter && (
          <a
            href={socialLinks.twitter}
            target='_blank'
            rel='noopener noreferrer'
          >
            Twitter
          </a>
        )}
        {/* Add other social links similarly */}
      </div>
    </div>
  )
}
```

## 📚 Additional Resources

- [React JSX Documentation](https://react.dev/learn/writing-markup-with-jsx)
- [React Components Documentation](https://react.dev/learn/your-first-component)
- [TypeScript with React](https://react-typescript-cheatsheet.netlify.app/)
- [React Component Patterns](https://reactpatterns.com/)
