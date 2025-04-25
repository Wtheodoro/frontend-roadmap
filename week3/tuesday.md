# DOM Text and Class Manipulation

## 🎯 Learning Objectives

- Learn how to modify text content in DOM elements
- Understand different ways to manipulate classes
- Practice adding, removing, and toggling classes
- Learn about text content vs innerHTML

## 📚 Content

### Text Content Manipulation

#### 1. Modifying Text Content

```javascript
// Using textContent (safer, only text)
element.textContent = 'New text'

// Using innerText (formatted text)
element.innerText = 'New text'

// Using innerHTML (HTML content)
element.innerHTML = '<span>New text</span>'
```

#### 2. Getting Text Content

```javascript
// Get text content
const text = element.textContent

// Get formatted text
const formattedText = element.innerText

// Get HTML content
const html = element.innerHTML
```

### Class Manipulation

#### 1. Using classList

```javascript
// Add a class
element.classList.add('new-class')

// Remove a class
element.classList.remove('old-class')

// Toggle a class
element.classList.toggle('active')

// Check if element has a class
const hasClass = element.classList.contains('my-class')

// Replace a class
element.classList.replace('old-class', 'new-class')
```

#### 2. Using className

```javascript
// Set all classes
element.className = 'class1 class2'

// Add to existing classes
element.className += ' new-class'
```

## 💻 Practice Exercises

1. Create a button that changes text when clicked
2. Implement a dark/light mode toggle using class manipulation
3. Create a list where items can be marked as complete/incomplete

## 📝 Example Code

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Manipulation Practice</title>
    <style>
      .active {
        background-color: yellow;
        font-weight: bold;
      }
      .completed {
        text-decoration: line-through;
        color: gray;
      }
    </style>
  </head>
  <body>
    <div id="container">
      <h1 id="title">Hello World</h1>
      <button id="toggleBtn">Toggle Active</button>
      <ul id="todoList">
        <li>Task 1</li>
        <li>Task 2</li>
        <li>Task 3</li>
      </ul>
    </div>

    <script>
      // Text manipulation
      const title = document.getElementById('title')
      title.textContent = 'Welcome to DOM Manipulation'

      // Class manipulation
      const toggleBtn = document.getElementById('toggleBtn')
      toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('active')
      })

      // List item manipulation
      const todoList = document.getElementById('todoList')
      const items = todoList.getElementsByTagName('li')

      Array.from(items).forEach((item) => {
        item.addEventListener('click', () => {
          item.classList.toggle('completed')
        })
      })
    </script>
  </body>
</html>
```

## 🔍 Common Pitfalls

- Using innerHTML when textContent would be safer (XSS vulnerability)
- Forgetting that className overwrites all classes
- Not checking if elements exist before manipulating them
- Using classList methods on elements that don't exist

## 📚 Additional Resources

- [MDN: Element.classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
- [MDN: Node.textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
- [MDN: Element.innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
