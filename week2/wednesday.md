# Asynchronous Functions in JavaScript

## Introduction

JavaScript is a single-threaded language, but it can handle asynchronous operations through various mechanisms. Today, we'll explore three key concepts for handling asynchronous code: `setTimeout`, `setInterval`, and Promises. These tools allow us to perform operations that take time without blocking the main thread.

## Understanding Synchronous vs. Asynchronous

Before diving into specific methods, let's understand the difference between synchronous and asynchronous code:

### Synchronous Code

- Executes line by line
- Each line must complete before the next one starts
- Blocks the main thread until completion

```javascript
console.log('First')
console.log('Second')
console.log('Third')
// Output:
// First
// Second
// Third
```

### Asynchronous Code

- Allows other code to execute while waiting for an operation to complete
- Doesn't block the main thread
- Uses callbacks, promises, or async/await to handle completion

```javascript
console.log('First')
setTimeout(() => console.log('Second'), 1000)
console.log('Third')
// Output:
// First
// Third
// Second (after 1 second)
```

## setTimeout

The `setTimeout` function executes a function or evaluates an expression after a specified number of milliseconds.

### Syntax

```javascript
setTimeout(function, delay, param1, param2, ...)
```

### Example

```javascript
// Basic usage
setTimeout(() => {
  console.log('This message appears after 2 seconds')
}, 2000)

// With parameters
function greet(name) {
  console.log(`Hello, ${name}!`)
}

setTimeout(greet, 3000, 'John')
// After 3 seconds: "Hello, John!"
```

### Canceling setTimeout

You can cancel a timeout using the `clearTimeout` function, which requires the ID returned by `setTimeout`.

```javascript
const timeoutId = setTimeout(() => {
  console.log('This will not appear')
}, 2000)

clearTimeout(timeoutId)
console.log('Timeout canceled')
```

## setInterval

The `setInterval` function repeatedly calls a function or evaluates an expression at specified intervals (in milliseconds).

### Syntax

```javascript
setInterval(function, interval, param1, param2, ...)
```

### Example

```javascript
// Basic usage
setInterval(() => {
  console.log('This message appears every 1 second')
}, 1000)

// With parameters
function countdown(seconds) {
  console.log(`${seconds} seconds remaining`)
}

let count = 5
const intervalId = setInterval(() => {
  countdown(count)
  count--

  if (count < 0) {
    clearInterval(intervalId)
    console.log('Countdown finished!')
  }
}, 1000)
```

### Canceling setInterval

You can cancel an interval using the `clearInterval` function, which requires the ID returned by `setInterval`.

```javascript
const intervalId = setInterval(() => {
  console.log('This will appear every second')
}, 1000)

// Cancel after 5 seconds
setTimeout(() => {
  clearInterval(intervalId)
  console.log('Interval canceled')
}, 5000)
```

## Callback Hell

When dealing with multiple asynchronous operations that depend on each other, you might end up with deeply nested callbacks, known as "callback hell":

```javascript
// Callback hell example
function step1(callback) {
  setTimeout(() => {
    console.log('Step 1 completed')
    callback()
  }, 1000)
}

function step2(callback) {
  setTimeout(() => {
    console.log('Step 2 completed')
    callback()
  }, 1000)
}

function step3(callback) {
  setTimeout(() => {
    console.log('Step 3 completed')
    callback()
  }, 1000)
}

// Nested callbacks
step1(() => {
  step2(() => {
    step3(() => {
      console.log('All steps completed')
    })
  })
})
```

This code is hard to read, maintain, and debug. Promises were introduced to solve this problem.

## Promises

A Promise is an object representing the eventual completion (or failure) of an asynchronous operation. It provides a cleaner way to handle asynchronous code.

### Promise States

A Promise can be in one of three states:

- **Pending**: Initial state, neither fulfilled nor rejected
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

### Creating a Promise

```javascript
const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation
  const success = true

  if (success) {
    resolve('Operation successful')
  } else {
    reject('Operation failed')
  }
})
```

### Using a Promise

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = Math.random() > 0.5

    if (success) {
      resolve('Data fetched successfully')
    } else {
      reject('Failed to fetch data')
    }
  }, 2000)
})

// Using .then() and .catch()
myPromise
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.error(error)
  })
```

### Promise Chaining

Promises can be chained to handle sequential asynchronous operations:

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

### Promise Methods

#### Promise.all()

`Promise.all()` takes an array of promises and returns a new promise that fulfills when all promises in the array fulfill, or rejects if any promise rejects.

```javascript
const promise1 = Promise.resolve(3)
const promise2 = new Promise((resolve) => setTimeout(() => resolve(1), 2000))
const promise3 = fetch('https://jsonplaceholder.typicode.com/todos/1').then(
  (response) => response.json()
)

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log(values) // [3, 1, {userId: 1, id: 1, title: "delectus aut autem", completed: false}]
  })
  .catch((error) => {
    console.error('One of the promises rejected:', error)
  })
```

#### Promise.race()

`Promise.race()` returns a promise that fulfills or rejects as soon as one of the promises in the array fulfills or rejects.

```javascript
const promise1 = new Promise((resolve) =>
  setTimeout(() => resolve('One'), 1000)
)
const promise2 = new Promise((resolve) => setTimeout(() => resolve('Two'), 500))

Promise.race([promise1, promise2]).then((value) => {
  console.log(value) // "Two" (because it resolves faster)
})
```

#### Promise.allSettled()

`Promise.allSettled()` returns a promise that fulfills after all of the given promises have either fulfilled or rejected, with an array of objects describing the outcome of each promise.

```javascript
const promise1 = Promise.resolve(3)
const promise2 = new Promise((resolve, reject) =>
  setTimeout(() => reject('Error'), 1000)
)

Promise.allSettled([promise1, promise2]).then((results) => {
  console.log(results)
  // [
  //   { status: "fulfilled", value: 3 },
  //   { status: "rejected", reason: "Error" }
  // ]
})
```

## Converting Callbacks to Promises

You can convert callback-based functions to promise-based functions:

```javascript
// Callback-based function
function fetchData(callback) {
  setTimeout(() => {
    callback(null, 'Data fetched')
  }, 1000)
}

// Promise-based version
function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched')
    }, 1000)
  })
}

// Usage
fetchDataPromise()
  .then((data) => console.log(data))
  .catch((error) => console.error(error))
```

## Practical Examples

### Example 1: Simulating API Calls

```javascript
// Simulating an API call to fetch users
function fetchUsers() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Bob Johnson' },
      ]

      // Simulate success 80% of the time
      if (Math.random() > 0.2) {
        resolve(users)
      } else {
        reject('Failed to fetch users')
      }
    }, 1000)
  })
}

// Using the promise
fetchUsers()
  .then((users) => {
    console.log('Users fetched:', users)
    // Process users...
  })
  .catch((error) => {
    console.error('Error fetching users:', error)
  })
```

### Example 2: Polling with setInterval

```javascript
// Function to check if a resource is available
function checkResource() {
  return new Promise((resolve, reject) => {
    const available = Math.random() > 0.7 // 30% chance of being available

    if (available) {
      resolve('Resource is available')
    } else {
      reject('Resource is not available')
    }
  })
}

// Polling function
function pollResource(maxAttempts = 5, interval = 1000) {
  let attempts = 0

  const poll = setInterval(() => {
    attempts++
    console.log(`Attempt ${attempts} of ${maxAttempts}`)

    checkResource()
      .then((result) => {
        console.log(result)
        clearInterval(poll)
      })
      .catch((error) => {
        console.log(error)

        if (attempts >= maxAttempts) {
          console.log('Max attempts reached, giving up')
          clearInterval(poll)
        }
      })
  }, interval)
}

// Start polling
pollResource()
```

### Example 3: Debouncing with setTimeout

```javascript
// Debounce function
function debounce(func, delay) {
  let timeoutId

  return function (...args) {
    // Clear the previous timeout
    clearTimeout(timeoutId)

    // Set a new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// Example usage: Debouncing a search function
const searchInput = document.getElementById('search')
const searchResults = document.getElementById('results')

function performSearch(query) {
  console.log(`Searching for: ${query}`)
  // In a real app, this would make an API call
}

// Debounce the search function with a 300ms delay
const debouncedSearch = debounce(performSearch, 300)

// Add event listener
searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value)
})
```

## Practice Exercises

1. Create a function that returns a promise which resolves after a specified number of seconds.
2. Create a function that simulates fetching data from an API with a random chance of success or failure.
3. Implement a countdown timer using `setInterval` that stops when it reaches zero.
4. Create a function that retries a failed promise a specified number of times.
5. Implement a function that uses `Promise.all` to fetch multiple resources in parallel.

## Solutions

### Exercise 1: Delay Function

```javascript
function delay(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Resolved after ${seconds} seconds`)
    }, seconds * 1000)
  })
}

// Usage
delay(2).then((result) => console.log(result))
// After 2 seconds: "Resolved after 2 seconds"
```

### Exercise 2: Simulated API Call

```javascript
function fetchData(successRate = 0.8) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < successRate) {
        resolve({ data: 'Successfully fetched data' })
      } else {
        reject(new Error('Failed to fetch data'))
      }
    }, 1000)
  })
}

// Usage
fetchData()
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
```

### Exercise 3: Countdown Timer

```javascript
function startCountdown(seconds) {
  return new Promise((resolve) => {
    let remainingSeconds = seconds

    const intervalId = setInterval(() => {
      console.log(`${remainingSeconds} seconds remaining`)
      remainingSeconds--

      if (remainingSeconds < 0) {
        clearInterval(intervalId)
        resolve('Countdown finished')
      }
    }, 1000)
  })
}

// Usage
startCountdown(5).then((result) => console.log(result))
// Output:
// 5 seconds remaining
// 4 seconds remaining
// 3 seconds remaining
// 2 seconds remaining
// 1 seconds remaining
// Countdown finished
```

### Exercise 4: Retry Function

```javascript
function retry(fn, maxAttempts = 3, delay = 1000) {
  return new Promise((resolve, reject) => {
    let attempts = 0

    function attempt() {
      attempts++
      console.log(`Attempt ${attempts} of ${maxAttempts}`)

      fn()
        .then(resolve)
        .catch((error) => {
          if (attempts >= maxAttempts) {
            reject(
              new Error(
                `Failed after ${maxAttempts} attempts: ${error.message}`
              )
            )
          } else {
            setTimeout(attempt, delay)
          }
        })
    }

    attempt()
  })
}

// Example usage with the fetchData function from Exercise 2
retry(() => fetchData(0.3), 3, 1000)
  .then((result) => console.log('Success:', result))
  .catch((error) => console.error('Final error:', error))
```

### Exercise 5: Parallel Fetching

```javascript
// Simulated API endpoints
const endpoints = [
  'https://api.example.com/users',
  'https://api.example.com/posts',
  'https://api.example.com/comments',
]

// Function to fetch from an endpoint
function fetchFromEndpoint(endpoint) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve(`Data from ${endpoint}`)
      } else {
        reject(`Error fetching from ${endpoint}`)
      }
    }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
  })
}

// Fetch all endpoints in parallel
Promise.all(endpoints.map((endpoint) => fetchFromEndpoint(endpoint)))
  .then((results) => {
    console.log('All data fetched successfully:')
    results.forEach((result) => console.log(result))
  })
  .catch((error) => {
    console.error('One or more requests failed:', error)
  })
```

## Conclusion

Asynchronous programming is a fundamental concept in JavaScript, especially for web applications that need to handle operations like API calls, timers, and user interactions without blocking the main thread.

Key takeaways:

- `setTimeout` and `setInterval` are basic tools for handling time-based operations
- Promises provide a cleaner way to handle asynchronous operations compared to callbacks
- Promise methods like `Promise.all()` and `Promise.race()` enable advanced asynchronous patterns
- Understanding these concepts is crucial for modern JavaScript development

In the next lesson, we'll explore `async/await`, which provides an even more elegant way to work with promises.
