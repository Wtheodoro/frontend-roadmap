# List Manipulation in React (map)

## 🎯 Learning Objectives

- Master the `map()` method for rendering lists in React
- Learn how to handle dynamic data from APIs
- Understand key prop importance for list rendering
- Implement proper error handling and loading states
- Create reusable list components with TypeScript

## 📚 Core Concepts

### 1. The `map()` Method in React

The `map()` method is essential for rendering lists of data in React. It transforms each item in an array into a JSX element.

#### Basic Syntax

```javascript
// Basic map usage
const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map((number) => number * 2)
// Result: [2, 4, 6, 8, 10]

// In React JSX
const listItems = numbers.map((number) => <li key={number}>{number}</li>)
```

### 2. Rendering Lists in React

#### JavaScript Version

```javascript
// components/CommentList.jsx
import { useState, useEffect } from 'react'

export function CommentList() {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/comments'
      )
      const data = await response.json()
      setComments(data.slice(0, 10)) // Get first 10 comments
    } catch (err) {
      setError('Failed to fetch comments')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading comments...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='comment-list'>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className='comment-item'>
          <h3>{comment.name}</h3>
          <p>
            <strong>Email:</strong> {comment.email}
          </p>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  )
}
```

#### TypeScript Version

```typescript
// components/CommentList.tsx
import { useState, useEffect } from 'react'

interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export function CommentList() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/comments'
      )
      const data: Comment[] = await response.json()
      setComments(data.slice(0, 10)) // Get first 10 comments
    } catch (err) {
      setError('Failed to fetch comments')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading comments...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='comment-list'>
      <h2>Comments</h2>
      {comments.map((comment: Comment) => (
        <div key={comment.id} className='comment-item'>
          <h3>{comment.name}</h3>
          <p>
            <strong>Email:</strong> {comment.email}
          </p>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  )
}
```

### 3. The Importance of `key` Prop

The `key` prop is crucial for React's reconciliation process. It helps React identify which items have changed, been added, or been removed.

#### Good Key Examples

```javascript
// ✅ Good: Using unique IDs
{
  comments.map((comment) => <CommentCard key={comment.id} comment={comment} />)
}

// ✅ Good: Using index (only for static lists)
{
  staticItems.map((item, index) => <Item key={index} item={item} />)
}

// ❌ Bad: Using random values
{
  comments.map((comment) => (
    <CommentCard key={Math.random()} comment={comment} />
  ))
}
```

### 4. Creating Reusable List Components

#### JavaScript Version - Comment Card Component

```javascript
// components/CommentCard.jsx
export function CommentCard({ comment, onDelete }) {
  return (
    <div className='comment-card'>
      <div className='comment-header'>
        <h3>{comment.name}</h3>
        {onDelete && (
          <button onClick={() => onDelete(comment.id)} className='delete-btn'>
            Delete
          </button>
        )}
      </div>
      <p className='comment-email'>{comment.email}</p>
      <p className='comment-body'>{comment.body}</p>
    </div>
  )
}
```

#### TypeScript Version - Comment Card Component

```typescript
// components/CommentCard.tsx
interface CommentCardProps {
  comment: {
    id: number
    name: string
    email: string
    body: string
  }
  onDelete?: (id: number) => void
}

export function CommentCard({ comment, onDelete }: CommentCardProps) {
  return (
    <div className='comment-card'>
      <div className='comment-header'>
        <h3>{comment.name}</h3>
        {onDelete && (
          <button onClick={() => onDelete(comment.id)} className='delete-btn'>
            Delete
          </button>
        )}
      </div>
      <p className='comment-email'>{comment.email}</p>
      <p className='comment-body'>{comment.body}</p>
    </div>
  )
}
```

#### JavaScript Version - Enhanced Comment List

```javascript
// components/CommentList.jsx
import { useState, useEffect } from 'react'
import { CommentCard } from './CommentCard'

export function CommentList() {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/comments'
      )
      const data = await response.json()
      setComments(data.slice(0, 10))
    } catch (err) {
      setError('Failed to fetch comments')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteComment = (id) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    )
  }

  if (loading) return <div>Loading comments...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='comment-list'>
      <h2>Comments ({comments.length})</h2>
      {comments.length === 0 ? (
        <p>No comments found.</p>
      ) : (
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onDelete={handleDeleteComment}
          />
        ))
      )}
    </div>
  )
}
```

#### TypeScript Version - Enhanced Comment List

```typescript
// components/CommentList.tsx
import { useState, useEffect } from 'react'
import { CommentCard } from './CommentCard'

interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export function CommentList() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchComments()
  }, [])

  const fetchComments = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/comments'
      )
      const data: Comment[] = await response.json()
      setComments(data.slice(0, 10))
    } catch (err) {
      setError('Failed to fetch comments')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteComment = (id: number) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    )
  }

  if (loading) return <div>Loading comments...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='comment-list'>
      <h2>Comments ({comments.length})</h2>
      {comments.length === 0 ? (
        <p>No comments found.</p>
      ) : (
        comments.map((comment: Comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onDelete={handleDeleteComment}
          />
        ))
      )}
    </div>
  )
}
```

### 5. Advanced List Manipulation

#### JavaScript Version - Filtering Lists

```javascript
// components/CommentListWithFilter.jsx
import { useState, useEffect } from 'react'
import { CommentCard } from './CommentCard'

export function CommentListWithFilter() {
  const [comments, setComments] = useState([])
  const [filteredComments, setFilteredComments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchComments()
  }, [])

  useEffect(() => {
    const filtered = comments.filter(
      (comment) =>
        comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.body.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredComments(filtered)
  }, [comments, searchTerm])

  const fetchComments = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/comments'
      )
      const data = await response.json()
      setComments(data.slice(0, 20))
    } catch (err) {
      console.error('Failed to fetch comments:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading comments...</div>

  return (
    <div className='comment-list-with-filter'>
      <div className='search-section'>
        <input
          type='text'
          placeholder='Search comments...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='search-input'
        />
        <span>Found {filteredComments.length} comments</span>
      </div>

      <div className='comments-grid'>
        {filteredComments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
```

#### TypeScript Version - Filtering Lists

```typescript
// components/CommentListWithFilter.tsx
import { useState, useEffect } from 'react'
import { CommentCard } from './CommentCard'

interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export function CommentListWithFilter() {
  const [comments, setComments] = useState<Comment[]>([])
  const [filteredComments, setFilteredComments] = useState<Comment[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchComments()
  }, [])

  useEffect(() => {
    const filtered = comments.filter(
      (comment) =>
        comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.body.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredComments(filtered)
  }, [comments, searchTerm])

  const fetchComments = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/comments'
      )
      const data: Comment[] = await response.json()
      setComments(data.slice(0, 20))
    } catch (err) {
      console.error('Failed to fetch comments:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading comments...</div>

  return (
    <div className='comment-list-with-filter'>
      <div className='search-section'>
        <input
          type='text'
          placeholder='Search comments...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='search-input'
        />
        <span>Found {filteredComments.length} comments</span>
      </div>

      <div className='comments-grid'>
        {filteredComments.map((comment: Comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  )
}
```

### 6. Styling Lists

#### CSS for Comment Components

```css
/* styles/CommentList.css */
.comment-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.comment-card {
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.comment-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.comment-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.1rem;
}

.comment-email {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.comment-body {
  color: #34495e;
  line-height: 1.5;
  margin: 0;
}

.delete-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
}

.delete-btn:hover {
  background: #c0392b;
}

.search-section {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  margin-bottom: 8px;
}

.comments-grid {
  display: grid;
  gap: 16px;
}
```

## 🛠️ Practical Exercises

### Exercise 1: Basic Comment List

Create a simple component that fetches and displays comments from the JSONPlaceholder API.

### Exercise 2: Comment with Actions

Add delete functionality to the comment list.

### Exercise 3: Search and Filter

Implement search functionality to filter comments by name or body content.

### Exercise 4: Pagination

Add pagination to show only 10 comments per page.

## 🎯 Key Takeaways

1. **Always use unique keys** when rendering lists in React
2. **Handle loading and error states** when fetching data
3. **Break down complex lists** into smaller, reusable components
4. **Use TypeScript interfaces** for better type safety
5. **Implement proper error handling** for API calls
6. **Consider performance** when working with large lists

## 📚 Additional Resources

- [React Lists and Keys](https://react.dev/learn/rendering-lists)
- [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [JSONPlaceholder API Documentation](https://jsonplaceholder.typicode.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🚀 Next Steps

- Practice with different APIs
- Implement sorting functionality
- Add infinite scrolling
- Create virtualized lists for large datasets
- Explore React Query for better data fetching
