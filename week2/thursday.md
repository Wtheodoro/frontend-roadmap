# async/await and API Consumption with fetch

## Introduction

In today's lesson, we'll explore two powerful JavaScript features that have revolutionized asynchronous programming: `async/await` and the `fetch` API. These tools make it easier to work with asynchronous operations and consume web APIs, which are essential skills for modern web development.

## async/await

`async/await` is a syntactic sugar built on top of Promises that makes asynchronous code look and behave more like synchronous code. It was introduced in ES2017 (ES8) and has become the preferred way to handle asynchronous operations in JavaScript.

### The async Keyword

The `async` keyword is used to declare an asynchronous function. An async function always returns a Promise, even if you don't explicitly return one.

```javascript
// Regular function
function regularFunction() {
  return 'Hello'
}

// Async function
async function asyncFunction() {
  return 'Hello'
}

console.log(regularFunction()) // "Hello"
console.log(asyncFunction()) // Promise {<fulfilled>: "Hello"}
```

### The await Keyword

The `await` keyword can only be used inside an async function. It pauses the execution of the function until the Promise is resolved, and then returns the resolved value.

```javascript
async function fetchData() {
  const result = await somePromise()
  console.log(result)
}
```

### Converting Promise-based Code to async/await

Let's see how to convert Promise-based code to async/await:

#### Before (with Promises):

```javascript
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id, name: 'John Doe' })
    }, 1000)
  })
}

function fetchUserPosts(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Post 1', userId: user.id },
        { id: 2, title: 'Post 2', userId: user.id },
      ])
    }, 1000)
  })
}

fetchUser(1)
  .then((user) => {
    console.log('User fetched:', user)
    return fetchUserPosts(user)
  })
  .then((posts) => {
    console.log('User posts fetched:', posts)
  })
  .catch((error) => {
    console.error('Error:', error)
  })
```

#### After (with async/await):

```javascript
async function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id, name: 'John Doe' })
    }, 1000)
  })
}

async function fetchUserPosts(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'Post 1', userId: user.id },
        { id: 2, title: 'Post 2', userId: user.id },
      ])
    }, 1000)
  })
}

async function fetchUserAndPosts() {
  try {
    const user = await fetchUser(1)
    console.log('User fetched:', user)

    const posts = await fetchUserPosts(user)
    console.log('User posts fetched:', posts)
  } catch (error) {
    console.error('Error:', error)
  }
}

fetchUserAndPosts()
```

### Error Handling with async/await

Error handling with async/await is done using try/catch blocks, which is more intuitive than the Promise catch method:

```javascript
async function fetchData() {
  try {
    const result = await somePromise()
    console.log(result)
  } catch (error) {
    console.error('An error occurred:', error)
  }
}
```

### Parallel Execution with Promise.all()

When you need to execute multiple asynchronous operations in parallel, you can still use `Promise.all()` with async/await:

```javascript
async function fetchMultipleUsers() {
  try {
    const user1Promise = fetchUser(1)
    const user2Promise = fetchUser(2)
    const user3Promise = fetchUser(3)

    const [user1, user2, user3] = await Promise.all([
      user1Promise,
      user2Promise,
      user3Promise,
    ])

    console.log('All users fetched:', [user1, user2, user3])
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}
```

## The fetch API

The `fetch` API is a modern JavaScript interface for making HTTP requests. It returns a Promise that resolves to the Response object representing the response to the request.

### Basic Syntax

```javascript
fetch(url, options)
  .then((response) => {
    // Handle the response
  })
  .catch((error) => {
    // Handle any errors
  })
```

### Making a GET Request

```javascript
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.json()
  })
  .then((data) => {
    console.log(data)
    // {
    //   userId: 1,
    //   id: 1,
    //   title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    //   body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    // }
  })
  .catch((error) => {
    console.error('Error fetching data:', error)
  })
```

### Making a POST Request

```javascript
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'My Post',
    body: 'This is the content of my post',
    userId: 1,
  }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.json()
  })
  .then((data) => {
    console.log('Post created:', data)
    // {
    //   id: 101,
    //   title: "My Post",
    //   body: "This is the content of my post",
    //   userId: 1
    // }
  })
  .catch((error) => {
    console.error('Error creating post:', error)
  })
```

### Combining fetch with async/await

The fetch API works seamlessly with async/await, making API calls more readable:

```javascript
async function fetchPost(id) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching post:', error)
    throw error // Re-throw to allow caller to handle
  }
}

async function createPost(postData) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

// Usage
async function main() {
  try {
    const post = await fetchPost(1)
    console.log('Fetched post:', post)

    const newPost = await createPost({
      title: 'My New Post',
      body: 'This is the content of my new post',
      userId: 1,
    })
    console.log('Created post:', newPost)
  } catch (error) {
    console.error('Error in main function:', error)
  }
}

main()
```

## Response Object Methods

The Response object returned by fetch has several methods for handling different types of response data:

### response.json()

Parses the response body as JSON.

```javascript
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then((response) => response.json())
  .then((data) => console.log(data))
```

### response.text()

Returns the response body as plain text.

```javascript
fetch('https://example.com')
  .then((response) => response.text())
  .then((html) => console.log(html))
```

### response.blob()

Returns the response body as a Blob object (for binary data like images).

```javascript
fetch('https://example.com/image.jpg')
  .then((response) => response.blob())
  .then((blob) => {
    const img = document.createElement('img')
    img.src = URL.createObjectURL(blob)
    document.body.appendChild(img)
  })
```

### response.arrayBuffer()

Returns the response body as an ArrayBuffer (for binary data).

```javascript
fetch('https://example.com/file.pdf')
  .then((response) => response.arrayBuffer())
  .then((buffer) => {
    // Process the binary data
    console.log('PDF loaded, size:', buffer.byteLength)
  })
```

## Request Options

The fetch API accepts a second parameter with options for the request:

```javascript
fetch(url, {
  method: 'POST', // GET, POST, PUT, DELETE, etc.
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer token123',
  },
  body: JSON.stringify(data),
  mode: 'cors', // cors, no-cors, same-origin
  cache: 'no-cache', // default, no-cache, reload, force-cache, only-if-cached
  credentials: 'include', // include, same-origin, omit
  redirect: 'follow', // follow, error, manual
  referrer: 'no-referrer', // no-referrer, client
  referrerPolicy: 'no-referrer-when-downgrade',
})
```

## Error Handling

Proper error handling is crucial when working with APIs. Here's a comprehensive approach:

```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url)

    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      // Try to get error message from response
      let errorMessage
      try {
        const errorData = await response.json()
        errorMessage =
          errorData.message || `HTTP error! Status: ${response.status}`
      } catch (e) {
        errorMessage = `HTTP error! Status: ${response.status}`
      }

      throw new Error(errorMessage)
    }

    // Parse the response
    const data = await response.json()
    return data
  } catch (error) {
    // Handle network errors or parsing errors
    console.error('Error fetching data:', error)
    throw error // Re-throw to allow caller to handle
  }
}
```

## Practical Examples

### Example 1: Fetching and Displaying User Data

```javascript
async function fetchAndDisplayUser(userId) {
  try {
    // Show loading state
    document.getElementById('user-container').innerHTML = 'Loading...'

    // Fetch user data
    const user = await fetchData(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    )

    // Fetch user posts
    const posts = await fetchData(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    )

    // Display user data
    document.getElementById('user-container').innerHTML = `
      <h2>${user.name}</h2>
      <p>Email: ${user.email}</p>
      <p>Company: ${user.company.name}</p>
      <h3>Posts (${posts.length})</h3>
      <ul>
        ${posts.map((post) => `<li>${post.title}</li>`).join('')}
      </ul>
    `
  } catch (error) {
    document.getElementById('user-container').innerHTML = `
      <div class="error">Error: ${error.message}</div>
    `
  }
}

// Helper function for fetching data
async function fetchData(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json()
}

// Usage
fetchAndDisplayUser(1)
```

### Example 2: Creating a Simple API Client

```javascript
class ApiClient {
  constructor(baseUrl, defaultHeaders = {}) {
    this.baseUrl = baseUrl
    this.defaultHeaders = defaultHeaders
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`
    const headers = { ...this.defaultHeaders, ...options.headers }

    try {
      const response = await fetch(url, { ...options, headers })

      if (!response.ok) {
        let errorMessage
        try {
          const errorData = await response.json()
          errorMessage =
            errorData.message || `HTTP error! Status: ${response.status}`
        } catch (e) {
          errorMessage = `HTTP error! Status: ${response.status}`
        }

        throw new Error(errorMessage)
      }

      return response.json()
    } catch (error) {
      console.error(`API request failed: ${error.message}`)
      throw error
    }
  }

  // GET request
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' })
  }

  // POST request
  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // PUT request
  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // DELETE request
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' })
  }
}

// Usage
const api = new ApiClient('https://jsonplaceholder.typicode.com')

async function main() {
  try {
    // Get all posts
    const posts = await api.get('/posts')
    console.log('All posts:', posts)

    // Get a specific post
    const post = await api.get('/posts/1')
    console.log('Post 1:', post)

    // Create a new post
    const newPost = await api.post('/posts', {
      title: 'My New Post',
      body: 'This is the content of my new post',
      userId: 1,
    })
    console.log('Created post:', newPost)

    // Update a post
    const updatedPost = await api.put('/posts/1', {
      id: 1,
      title: 'Updated Post',
      body: 'This post has been updated',
      userId: 1,
    })
    console.log('Updated post:', updatedPost)

    // Delete a post
    await api.delete('/posts/1')
    console.log('Post deleted')
  } catch (error) {
    console.error('Error:', error)
  }
}

main()
```

### Example 3: Fetching Data in Parallel

```javascript
async function fetchDashboardData() {
  try {
    // Fetch multiple resources in parallel
    const [users, posts, comments] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
        res.json()
      ),
      fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
        res.json()
      ),
      fetch('https://jsonplaceholder.typicode.com/comments').then((res) =>
        res.json()
      ),
    ])

    // Process the data
    const userCount = users.length
    const postCount = posts.length
    const commentCount = comments.length

    // Calculate some statistics
    const postsPerUser = postCount / userCount
    const commentsPerPost = commentCount / postCount

    // Return the dashboard data
    return {
      userCount,
      postCount,
      commentCount,
      postsPerUser,
      commentsPerPost,
      recentPosts: posts.slice(0, 5),
      recentComments: comments.slice(0, 5),
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    throw error
  }
}

// Usage
fetchDashboardData()
  .then((dashboardData) => {
    console.log('Dashboard data:', dashboardData)
    // Update UI with dashboard data
  })
  .catch((error) => {
    console.error('Failed to load dashboard:', error)
    // Show error message to user
  })
```

## Practice Exercises

1. Create a function that fetches a user's profile and their recent posts from an API.
2. Implement a function that creates a new resource and then updates it.
3. Create a function that fetches data from multiple endpoints and combines the results.
4. Implement error handling for API requests with retry logic.
5. Create a simple search function that fetches results from an API as the user types.

## Solutions

### Exercise 1: Fetch User Profile and Posts

```javascript
async function fetchUserProfileAndPosts(userId) {
  try {
    // Fetch user profile
    const userResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    )

    if (!userResponse.ok) {
      throw new Error(`Failed to fetch user: ${userResponse.status}`)
    }

    const user = await userResponse.json()

    // Fetch user's posts
    const postsResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    )

    if (!postsResponse.ok) {
      throw new Error(`Failed to fetch posts: ${postsResponse.status}`)
    }

    const posts = await postsResponse.json()

    // Return combined data
    return {
      profile: user,
      posts: posts.slice(0, 5), // Get only the 5 most recent posts
    }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Usage
fetchUserProfileAndPosts(1)
  .then((data) => {
    console.log('User profile:', data.profile)
    console.log('Recent posts:', data.posts)
  })
  .catch((error) => {
    console.error('Failed to fetch user data:', error)
  })
```

### Exercise 2: Create and Update Resource

```javascript
async function createAndUpdatePost() {
  try {
    // Create a new post
    const createResponse = await fetch(
      'https://jsonplaceholder.typicode.com/posts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'My New Post',
          body: 'This is the content of my new post',
          userId: 1,
        }),
      }
    )

    if (!createResponse.ok) {
      throw new Error(`Failed to create post: ${createResponse.status}`)
    }

    const newPost = await createResponse.json()
    console.log('Created post:', newPost)

    // Update the post
    const updateResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${newPost.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newPost,
          title: 'Updated Post Title',
          body: 'This post has been updated',
        }),
      }
    )

    if (!updateResponse.ok) {
      throw new Error(`Failed to update post: ${updateResponse.status}`)
    }

    const updatedPost = await updateResponse.json()
    console.log('Updated post:', updatedPost)

    return updatedPost
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Usage
createAndUpdatePost()
  .then((post) => {
    console.log('Final post:', post)
  })
  .catch((error) => {
    console.error('Operation failed:', error)
  })
```

### Exercise 3: Fetch and Combine Data

```javascript
async function fetchCombinedData() {
  try {
    // Fetch data from multiple endpoints
    const [users, posts, comments] = await Promise.all([
      fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
        res.json()
      ),
      fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
        res.json()
      ),
      fetch('https://jsonplaceholder.typicode.com/comments').then((res) =>
        res.json()
      ),
    ])

    // Combine the data
    const combinedData = users.map((user) => {
      // Find posts by this user
      const userPosts = posts.filter((post) => post.userId === user.id)

      // Find comments by this user
      const userComments = comments.filter(
        (comment) => comment.email === user.email
      )

      // Return combined user data
      return {
        ...user,
        posts: userPosts,
        comments: userComments,
      }
    })

    return combinedData
  } catch (error) {
    console.error('Error fetching combined data:', error)
    throw error
  }
}

// Usage
fetchCombinedData()
  .then((data) => {
    console.log('Combined data:', data)

    // Example: Find user with most posts
    const userWithMostPosts = data.reduce((prev, current) =>
      current.posts.length > prev.posts.length ? current : prev
    )

    console.log('User with most posts:', userWithMostPosts.name)
    console.log('Post count:', userWithMostPosts.posts.length)
  })
  .catch((error) => {
    console.error('Failed to fetch combined data:', error)
  })
```

### Exercise 4: Retry Logic for API Requests

```javascript
async function fetchWithRetry(url, options = {}, maxRetries = 3, delay = 1000) {
  let retries = 0

  while (retries < maxRetries) {
    try {
      const response = await fetch(url, options)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      retries++

      if (retries === maxRetries) {
        throw new Error(`Failed after ${maxRetries} retries: ${error.message}`)
      }

      console.log(
        `Retry ${retries}/${maxRetries} after error: ${error.message}`
      )

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
}

// Usage
fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1')
  .then((data) => {
    console.log('Data fetched successfully:', data)
  })
  .catch((error) => {
    console.error('All retries failed:', error)
  })
```

### Exercise 5: Search as You Type

```javascript
// Debounce function to limit API calls
function debounce(func, delay) {
  let timeoutId

  return function (...args) {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// Search function
async function searchPosts(query) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const posts = await response.json()

    // Filter posts based on query (client-side filtering for this example)
    const filteredPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.body.toLowerCase().includes(query.toLowerCase())
    )

    return filteredPosts
  } catch (error) {
    console.error('Error searching posts:', error)
    throw error
  }
}

// Debounced search function
const debouncedSearch = debounce(async (query) => {
  try {
    // Show loading state
    document.getElementById('results').innerHTML = 'Searching...'

    const results = await searchPosts(query)

    // Display results
    document.getElementById('results').innerHTML =
      results.length > 0
        ? `<ul>${results.map((post) => `<li>${post.title}</li>`).join('')}</ul>`
        : 'No results found'
  } catch (error) {
    document.getElementById('results').innerHTML = `Error: ${error.message}`
  }
}, 300)

// Add event listener to search input
document.getElementById('search-input').addEventListener('input', (e) => {
  const query = e.target.value.trim()

  if (query) {
    debouncedSearch(query)
  } else {
    document.getElementById('results').innerHTML = ''
  }
})
```

## Conclusion

`async/await` and the `fetch` API are powerful tools that have transformed how we handle asynchronous operations and API consumption in JavaScript. They make our code more readable, maintainable, and easier to debug compared to callback-based approaches or even Promise chains.

Key takeaways:

- `async/await` provides a cleaner syntax for working with Promises
- The `fetch` API is a modern way to make HTTP requests
- Proper error handling is crucial when working with APIs
- Combining `async/await` with `fetch` creates elegant and readable code
- These tools are essential for modern web development

In the next lesson, we'll explore LocalStorage and JSON, which are important for client-side data persistence.
