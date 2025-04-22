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

### Example 1: Basic API Calls

```javascript
// Função para buscar um post
async function fetchPost(id) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const post = await response.json()
    console.log('Post:', post)
    return post
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Função para criar um post
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
    console.log('Post created:', data)
    return data
  } catch (error) {
    console.error('Error creating post:', error)
    throw error
  }
}

// Testando as funções
async function main() {
  try {
    // Buscar um post
    const post = await fetchPost(1)
    console.log('Fetched post:', post)

    // Criar um novo post
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

### Example 2: Parallel Requests

```javascript
async function fetchUserAndPosts(userId) {
  try {
    // Fazendo duas requisições em paralelo
    const [userResponse, postsResponse] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
    ])

    if (!userResponse.ok || !postsResponse.ok) {
      throw new Error('One or more requests failed')
    }

    const user = await userResponse.json()
    const posts = await postsResponse.json()

    console.log('User:', user)
    console.log('User posts:', posts)

    return { user, posts }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Testando a função
fetchUserAndPosts(1)
```

## Practice Exercises

1. Crie uma função que busca um post específico pelo ID usando fetch
2. Crie uma função que busca todos os posts de um usuário específico
3. Crie uma função que busca os comentários de um post específico
4. Crie uma função que busca um usuário e seus posts em paralelo usando Promise.all

## Solutions

### Exercise 1: Fetch a Specific Post

```javascript
async function fetchPost(postId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const post = await response.json()
    console.log('Post:', post)
    return post
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Teste a função
fetchPost(1)
```

### Exercise 2: Fetch User Posts

```javascript
async function fetchUserPosts(userId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const posts = await response.json()
    console.log('User posts:', posts)
    return posts
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Teste a função
fetchUserPosts(1)
```

### Exercise 3: Fetch Post Comments

```javascript
async function fetchPostComments(postId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const comments = await response.json()
    console.log('Post comments:', comments)
    return comments
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Teste a função
fetchPostComments(1)
```

### Exercise 4: Fetch User and Posts in Parallel

```javascript
async function fetchUserAndPosts(userId) {
  try {
    const [userResponse, postsResponse] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
    ])

    if (!userResponse.ok || !postsResponse.ok) {
      throw new Error('One or more requests failed')
    }

    const user = await userResponse.json()
    const posts = await postsResponse.json()

    console.log('User:', user)
    console.log('User posts:', posts)

    return { user, posts }
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Teste a função
fetchUserAndPosts(1)
```

## Dicas para os Exercícios

1. Use sempre try/catch para tratar erros
2. Verifique se a resposta está ok antes de processar os dados
3. Use async/await para tornar o código mais legível
4. Use Promise.all quando precisar fazer múltiplas requisições em paralelo
5. Teste suas funções com diferentes IDs para garantir que funcionam corretamente

## Como Testar

1. Abra o console do navegador (F12)
2. Cole o código da função que você quer testar
3. Chame a função com um ID de teste (por exemplo: 1)
4. Verifique o resultado no console

## Conclusion

`async/await` and the `fetch` API are powerful tools that have transformed how we handle asynchronous operations and API consumption in JavaScript. They make our code more readable, maintainable, and easier to debug compared to callback-based approaches or even Promise chains.

Key takeaways:

- `async/await` provides a cleaner syntax for working with Promises
- The `fetch` API is a modern way to make HTTP requests
- Proper error handling is crucial when working with APIs
- Combining `async/await` with `fetch` creates elegant and readable code
- These tools are essential for modern web development

In the next lesson, we'll explore LocalStorage and JSON, which are important for client-side data persistence.
