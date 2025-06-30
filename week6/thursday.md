# API Consumption in React (fetch)

## 🎯 Learning Objectives

- Master the `fetch()` API for making HTTP requests in React
- Learn how to handle different HTTP methods (GET, POST, PUT, DELETE)
- Understand async/await patterns in React components
- Implement proper error handling and loading states
- Create reusable API service functions
- Work with JSON data and TypeScript interfaces

## 📚 Core Concepts

### 1. The `fetch()` API

The `fetch()` API is the modern way to make HTTP requests in JavaScript. It returns a Promise that resolves to the Response object.

#### Basic Syntax

```javascript
// Basic GET request
fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error))

// Using async/await
async function fetchPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### 2. Making API Calls in React Components

#### JavaScript Version

```javascript
// components/PostList.jsx
import { useState, useEffect } from 'react'

export function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setPosts(data.slice(0, 10)) // Get first 10 posts
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading posts...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='post-list'>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className='post-item'>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}
```

#### TypeScript Version

```typescript
// components/PostList.tsx
import { useState, useEffect } from 'react'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: Post[] = await response.json()
      setPosts(data.slice(0, 10))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading posts...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='post-list'>
      <h2>Posts</h2>
      {posts.map((post: Post) => (
        <div key={post.id} className='post-item'>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}
```

### 3. Creating Reusable API Services

#### JavaScript Version

```javascript
// services/api.js
const BASE_URL = 'https://jsonplaceholder.typicode.com'

// Custom error class
class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

// Generic fetch wrapper
async function fetchApi(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `HTTP error! status: ${response.status}`
    )
  }

  return response.json()
}

// Posts API
export const postsApi = {
  // GET all posts
  getAll: () => fetchApi('/posts'),

  // GET single post
  getById: (id) => fetchApi(`/posts/${id}`),

  // POST new post
  create: (data) =>
    fetchApi('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // PUT update post
  update: (id, data) =>
    fetchApi(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // DELETE post
  delete: (id) =>
    fetchApi(`/posts/${id}`, {
      method: 'DELETE',
    }),
}
```

#### TypeScript Version

```typescript
// services/api.ts
const BASE_URL = 'https://jsonplaceholder.typicode.com'

interface Post {
  id: number
  title: string
  body: string
  userId: number
}

interface CreatePostData {
  title: string
  body: string
  userId: number
}

interface UpdatePostData {
  title?: string
  body?: string
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

// Generic fetch wrapper
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `HTTP error! status: ${response.status}`
    )
  }

  return response.json()
}

// Posts API
export const postsApi = {
  // GET all posts
  getAll: (): Promise<Post[]> => fetchApi<Post[]>('/posts'),

  // GET single post
  getById: (id: number): Promise<Post> => fetchApi<Post>(`/posts/${id}`),

  // POST new post
  create: (data: CreatePostData): Promise<Post> =>
    fetchApi<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // PUT update post
  update: (id: number, data: UpdatePostData): Promise<Post> =>
    fetchApi<Post>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // DELETE post
  delete: (id: number): Promise<void> =>
    fetchApi<void>(`/posts/${id}`, {
      method: 'DELETE',
    }),
}
```

### 4. Advanced API Consumption Patterns

#### JavaScript Version - Custom Hook

```javascript
// hooks/useApi.js
import { useState, useEffect } from 'react'
import { postsApi } from '../services/api'

export function useApi(apiCall, dependencies = []) {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }))
        const data = await apiCall()
        setState({ data, loading: false, error: null })
      } catch (err) {
        const errorMessage =
          err.name === 'ApiError' ? err.message : 'An unexpected error occurred'
        setState({ data: null, loading: false, error: errorMessage })
      }
    }

    fetchData()
  }, dependencies)

  return state
}

// Usage example
export function usePosts() {
  return useApi(() => postsApi.getAll(), [])
}

export function usePost(id) {
  return useApi(() => postsApi.getById(id), [id])
}
```

#### TypeScript Version - Custom Hook

```typescript
// hooks/useApi.ts
import { useState, useEffect } from 'react'
import { postsApi, ApiError } from '../services/api'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export function useApi<T>(apiCall: () => Promise<T>, dependencies: any[] = []) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }))
        const data = await apiCall()
        setState({ data, loading: false, error: null })
      } catch (err) {
        const errorMessage =
          err instanceof ApiError ? err.message : 'An unexpected error occurred'
        setState({ data: null, loading: false, error: errorMessage })
      }
    }

    fetchData()
  }, dependencies)

  return state
}

// Usage example
export function usePosts() {
  return useApi(() => postsApi.getAll(), [])
}

export function usePost(id: number) {
  return useApi(() => postsApi.getById(id), [id])
}
```

#### Component Using Custom Hook

```javascript
// components/PostListWithHook.jsx
import { usePosts } from '../hooks/useApi'

export function PostListWithHook() {
  const { data: posts, loading, error } = usePosts()

  if (loading) return <div>Loading posts...</div>
  if (error) return <div>Error: {error}</div>
  if (!posts) return <div>No posts found</div>

  return (
    <div className='post-list'>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className='post-item'>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}
```

```typescript
// components/PostListWithHook.tsx
import { usePosts } from '../hooks/useApi'

export function PostListWithHook() {
  const { data: posts, loading, error } = usePosts()

  if (loading) return <div>Loading posts...</div>
  if (error) return <div>Error: {error}</div>
  if (!posts) return <div>No posts found</div>

  return (
    <div className='post-list'>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className='post-item'>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}
```

### 5. CRUD Operations with API

#### JavaScript Version - Complete CRUD Component

```javascript
// components/PostManager.jsx
import { useState, useEffect } from 'react'
import { postsApi } from '../services/api'

export function PostManager() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingPost, setEditingPost] = useState(null)
  const [formData, setFormData] = useState({ title: '', body: '' })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const data = await postsApi.getAll()
      setPosts(data.slice(0, 10))
    } catch (err) {
      setError(err.message || 'Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async (e) => {
    e.preventDefault()
    try {
      const newPost = await postsApi.create({
        title: formData.title,
        body: formData.body,
        userId: 1,
      })
      setPosts((prev) => [newPost, ...prev])
      setFormData({ title: '', body: '' })
    } catch (err) {
      setError(err.message || 'Failed to create post')
    }
  }

  const handleUpdatePost = async (id, data) => {
    try {
      const updatedPost = await postsApi.update(id, data)
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? updatedPost : post))
      )
      setEditingPost(null)
    } catch (err) {
      setError(err.message || 'Failed to update post')
    }
  }

  const handleDeletePost = async (id) => {
    try {
      await postsApi.delete(id)
      setPosts((prev) => prev.filter((post) => post.id !== id))
    } catch (err) {
      setError(err.message || 'Failed to delete post')
    }
  }

  if (loading) return <div>Loading posts...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='post-manager'>
      <h2>Post Manager</h2>

      {/* Create Post Form */}
      <form onSubmit={handleCreatePost} className='create-form'>
        <h3>Create New Post</h3>
        <input
          type='text'
          placeholder='Title'
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          required
        />
        <textarea
          placeholder='Body'
          value={formData.body}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, body: e.target.value }))
          }
          required
        />
        <button type='submit'>Create Post</button>
      </form>

      {/* Posts List */}
      <div className='posts-list'>
        {posts.map((post) => (
          <div key={post.id} className='post-item'>
            {editingPost?.id === post.id ? (
              <div className='edit-form'>
                <input
                  type='text'
                  value={editingPost.title}
                  onChange={(e) =>
                    setEditingPost((prev) =>
                      prev ? { ...prev, title: e.target.value } : null
                    )
                  }
                />
                <textarea
                  value={editingPost.body}
                  onChange={(e) =>
                    setEditingPost((prev) =>
                      prev ? { ...prev, body: e.target.value } : null
                    )
                  }
                />
                <button onClick={() => handleUpdatePost(post.id, editingPost)}>
                  Save
                </button>
                <button onClick={() => setEditingPost(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <div className='actions'>
                  <button onClick={() => setEditingPost(post)}>Edit</button>
                  <button onClick={() => handleDeletePost(post.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
```

#### TypeScript Version - Complete CRUD Component

```typescript
// components/PostManager.tsx
import { useState, useEffect } from 'react'
import { postsApi, Post, CreatePostData } from '../services/api'

export function PostManager() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [formData, setFormData] = useState({ title: '', body: '' })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const data = await postsApi.getAll()
      setPosts(data.slice(0, 10))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newPost = await postsApi.create({
        title: formData.title,
        body: formData.body,
        userId: 1,
      })
      setPosts((prev) => [newPost, ...prev])
      setFormData({ title: '', body: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post')
    }
  }

  const handleUpdatePost = async (
    id: number,
    data: { title?: string; body?: string }
  ) => {
    try {
      const updatedPost = await postsApi.update(id, data)
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? updatedPost : post))
      )
      setEditingPost(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post')
    }
  }

  const handleDeletePost = async (id: number) => {
    try {
      await postsApi.delete(id)
      setPosts((prev) => prev.filter((post) => post.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete post')
    }
  }

  if (loading) return <div>Loading posts...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='post-manager'>
      <h2>Post Manager</h2>

      {/* Create Post Form */}
      <form onSubmit={handleCreatePost} className='create-form'>
        <h3>Create New Post</h3>
        <input
          type='text'
          placeholder='Title'
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          required
        />
        <textarea
          placeholder='Body'
          value={formData.body}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, body: e.target.value }))
          }
          required
        />
        <button type='submit'>Create Post</button>
      </form>

      {/* Posts List */}
      <div className='posts-list'>
        {posts.map((post) => (
          <div key={post.id} className='post-item'>
            {editingPost?.id === post.id ? (
              <div className='edit-form'>
                <input
                  type='text'
                  value={editingPost.title}
                  onChange={(e) =>
                    setEditingPost((prev) =>
                      prev ? { ...prev, title: e.target.value } : null
                    )
                  }
                />
                <textarea
                  value={editingPost.body}
                  onChange={(e) =>
                    setEditingPost((prev) =>
                      prev ? { ...prev, body: e.target.value } : null
                    )
                  }
                />
                <button onClick={() => handleUpdatePost(post.id, editingPost)}>
                  Save
                </button>
                <button onClick={() => setEditingPost(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <div className='actions'>
                  <button onClick={() => setEditingPost(post)}>Edit</button>
                  <button onClick={() => handleDeletePost(post.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
```

### 6. Error Handling and Loading States

#### JavaScript Version - Error Boundary

```javascript
// components/ErrorBoundary.jsx
import React, { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className='error-boundary'>
            <h2>Something went wrong</h2>
            <p>{this.state.error?.message}</p>
            <button onClick={() => this.setState({ hasError: false })}>
              Try again
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
```

#### TypeScript Version - Error Boundary

```typescript
// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className='error-boundary'>
            <h2>Something went wrong</h2>
            <p>{this.state.error?.message}</p>
            <button onClick={() => this.setState({ hasError: false })}>
              Try again
            </button>
          </div>
        )
      )
    }

    return this.props.children
  }
}
```

#### Loading and Error Components

```javascript
// components/ui/LoadingSpinner.jsx
export function LoadingSpinner() {
  return (
    <div className='loading-spinner'>
      <div className='spinner'></div>
      <p>Loading...</p>
    </div>
  )
}

// components/ui/ErrorMessage.jsx
export function ErrorMessage({ error, onRetry }) {
  return (
    <div className='error-message'>
      <h3>Error</h3>
      <p>{error}</p>
      {onRetry && <button onClick={onRetry}>Try Again</button>}
    </div>
  )
}
```

```typescript
// components/ui/LoadingSpinner.tsx
export function LoadingSpinner() {
  return (
    <div className='loading-spinner'>
      <div className='spinner'></div>
      <p>Loading...</p>
    </div>
  )
}

// components/ui/ErrorMessage.tsx
interface ErrorMessageProps {
  error: string
  onRetry?: () => void
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className='error-message'>
      <h3>Error</h3>
      <p>{error}</p>
      {onRetry && <button onClick={onRetry}>Try Again</button>}
    </div>
  )
}
```

### 7. Styling for API Components

```css
/* styles/ApiComponents.css */
.post-manager {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.create-form {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.create-form input,
.create-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.create-form textarea {
  min-height: 100px;
  resize: vertical;
}

.post-item {
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background: white;
}

.post-item h3 {
  margin: 0 0 8px 0;
  color: #2c3e50;
}

.actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}

.actions button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}

.actions button:first-child {
  background: #3498db;
  color: white;
}

.actions button:last-child {
  background: #e74c3c;
  color: white;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-message {
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  padding: 16px;
  margin: 20px 0;
  text-align: center;
}

.error-message h3 {
  color: #c33;
  margin: 0 0 8px 0;
}
```

## 🛠️ Practical Exercises

### Exercise 1: Basic API Call

Create a component that fetches and displays posts from the JSONPlaceholder API.

### Exercise 2: Create and Delete

Add functionality to create new posts and delete existing ones.

### Exercise 3: Update Posts

Implement edit functionality for posts.

### Exercise 4: Search and Filter

Add search functionality to filter posts by title or body content.

## 🎯 Key Takeaways

1. **Always handle errors** when making API calls
2. **Use loading states** to improve user experience
3. **Create reusable API services** for better code organization
4. **Implement proper TypeScript interfaces** for type safety
5. **Use custom hooks** to encapsulate API logic
6. **Handle different HTTP status codes** appropriately

## 📚 Additional Resources

- [Fetch API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [React useEffect Hook](https://react.dev/reference/react/useEffect)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🚀 Next Steps

- Implement authentication with APIs
- Add request/response interceptors
- Use React Query for advanced data fetching
- Implement caching strategies
- Add real-time updates with WebSockets
