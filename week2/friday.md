# LocalStorage, JSON, and Introduction to HTML with JavaScript

## 📚 JSON (JavaScript Object Notation)

JSON is a lightweight data format that's easy for humans to read and write, and easy for machines to parse and generate.

### Basic JSON Syntax

```javascript
// JSON string
const jsonString = '{"name": "John", "age": 30}'

// Converting JSON string to JavaScript object
const person = JSON.parse(jsonString)
console.log(person.name) // "John"

// Converting JavaScript object to JSON string
const object = { name: 'John', age: 30 }
const json = JSON.stringify(object)
console.log(json) // '{"name":"John","age":30}'
```

### Common JSON Methods

1. `JSON.stringify()`: Converts a JavaScript object to a JSON string

   ```javascript
   const user = {
     name: 'John',
     age: 30,
     isAdmin: true,
   }

   const jsonString = JSON.stringify(user)
   console.log(jsonString)
   // Output: '{"name":"John","age":30,"isAdmin":true}'
   ```

2. `JSON.parse()`: Converts a JSON string to a JavaScript object
   ```javascript
   const jsonString = '{"name":"John","age":30,"isAdmin":true}'
   const user = JSON.parse(jsonString)
   console.log(user.name) // "John"
   ```

## 💾 LocalStorage

LocalStorage is a web storage solution that allows websites to store data locally within the user's browser.

### Basic LocalStorage Operations

```javascript
// Storing data
localStorage.setItem('user', JSON.stringify({ name: 'John', age: 30 }))

// Retrieving data
const userData = JSON.parse(localStorage.getItem('user'))
console.log(userData.name) // "John"

// Removing data
localStorage.removeItem('user')

// Clearing all data
localStorage.clear()
```

### Practical Example: Todo List with LocalStorage

```javascript
// Save todos to localStorage
function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// Load todos from localStorage
function loadTodos() {
  const todos = localStorage.getItem('todos')
  return todos ? JSON.parse(todos) : []
}

// Add a new todo
function addTodo(text) {
  const todos = loadTodos()
  todos.push({ id: Date.now(), text, completed: false })
  saveTodos(todos)
}

// Toggle todo completion
function toggleTodo(id) {
  const todos = loadTodos()
  const todo = todos.find((t) => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
    saveTodos(todos)
  }
}
```

## 🌐 Introduction to HTML with JavaScript

### Basic HTML Structure

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Web Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <div id="app"></div>

    <script>
      // Your JavaScript code goes here
    </script>
  </body>
</html>
```

### Importing External JavaScript Files

To import external JavaScript files, use the `<script>` tag with the `src` attribute:

```html
<!-- At the end of the body (recommended) -->
<script src="script.js"></script>

<!-- Or in the head with defer attribute -->
<head>
  <script src="script.js" defer></script>
</head>
```

Best practices:

1. Place scripts at the end of body for better page loading
2. Use `defer` attribute when placing scripts in head
3. For multiple files, load dependencies first

Example project structure:

```
my-project/
  ├── index.html
  ├── js/
  │   ├── main.js
  │   └── utils.js
  └── css/
      └── styles.css
```

### Connecting JavaScript to HTML Elements

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Interactive Counter</title>
  </head>
  <body>
    <h1>Counter: <span id="counter">0</span></h1>
    <button onclick="increment()">Increment</button>
    <button onclick="decrement()">Decrement</button>

    <script>
      let count = 0
      const counterElement = document.getElementById('counter')

      function increment() {
        count++
        counterElement.textContent = count
      }

      function decrement() {
        count--
        counterElement.textContent = count
      }
    </script>
  </body>
</html>
```

### Practical Example: Todo List with HTML and LocalStorage

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Todo List</title>
  </head>
  <body>
    <h1>Todo List</h1>
    <input type="text" id="todoInput" placeholder="Enter a new todo" />
    <button onclick="addTodo()">Add Todo</button>
    <ul id="todoList"></ul>

    <script>
      // Load todos when page loads
      let todos = JSON.parse(localStorage.getItem('todos')) || []

      function renderTodos() {
        const todoList = document.getElementById('todoList')
        todoList.innerHTML = ''

        todos.forEach((todo) => {
          const li = document.createElement('li')
          li.textContent = todo.text
          li.onclick = () => toggleTodo(todo.id)
          if (todo.completed) {
            li.style.textDecoration = 'line-through'
          }
          todoList.appendChild(li)
        })
      }

      function addTodo() {
        const input = document.getElementById('todoInput')
        const text = input.value.trim()

        if (text) {
          todos.push({
            id: Date.now(),
            text,
            completed: false,
          })
          localStorage.setItem('todos', JSON.stringify(todos))
          input.value = ''
          renderTodos()
        }
      }

      function toggleTodo(id) {
        const todo = todos.find((t) => t.id === id)
        if (todo) {
          todo.completed = !todo.completed
          localStorage.setItem('todos', JSON.stringify(todos))
          renderTodos()
        }
      }

      // Initial render
      renderTodos()
    </script>
  </body>
</html>
```

## 📝 Exercises

1. Create a simple note-taking app that saves notes to localStorage
2. Build a shopping cart that persists data between page refreshes
3. Create a user preferences form that saves settings to localStorage
4. Build a todo list with the ability to edit and delete todos

## 🔍 Key Concepts to Remember

- JSON is used to convert JavaScript objects to strings and back
- LocalStorage can only store strings, so we need to use JSON.stringify() and JSON.parse()
- LocalStorage data persists even after closing the browser
- HTML provides the structure for web pages
- JavaScript can interact with HTML elements using the DOM (Document Object Model)
- Always handle errors when working with JSON.parse()

## 📚 Additional Resources

- [MDN Web Docs - LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN Web Docs - JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON)
- [MDN Web Docs - HTML Basics](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML)
