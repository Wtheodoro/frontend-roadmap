# DOM Events

## 🎯 Learning Objectives

- Understand what events are in the DOM
- Learn about different types of events
- Master event handling and event listeners
- Understand event propagation (bubbling and capturing)
- Learn about event objects and their properties

## 📚 Content

### Understanding Events

Events are actions or occurrences that happen in the browser, such as:

- User interactions (clicks, keyboard presses)
- Browser actions (page load, window resize)
- Form submissions
- Network requests

### Common Event Types

#### 1. Mouse Events

```javascript
// Click event
element.addEventListener('click', (event) => {
  console.log('Element clicked!')
})

// Mouse enter/leave
element.addEventListener('mouseenter', () => {
  console.log('Mouse entered element')
})

element.addEventListener('mouseleave', () => {
  console.log('Mouse left element')
})
```

#### 2. Keyboard Events

```javascript
// Key press
element.addEventListener('keydown', (event) => {
  console.log('Key pressed:', event.key)
})

// Key up
element.addEventListener('keyup', (event) => {
  console.log('Key released:', event.key)
})
```

#### 3. Form Events

```javascript
// Form submission
form.addEventListener('submit', (event) => {
  event.preventDefault() // Prevent default form submission
  console.log('Form submitted')
})

// Input change
input.addEventListener('input', (event) => {
  console.log('Input value:', event.target.value)
})
```

### Event Listeners

#### 1. Adding Event Listeners

```javascript
// Basic syntax
element.addEventListener('event', callback)

// With options
element.addEventListener('event', callback, {
  once: true, // Run only once
  capture: true, // Use capture phase
})
```

#### 2. Removing Event Listeners

```javascript
// Remove specific listener
element.removeEventListener('event', callback)

// Remove all listeners
element.replaceWith(element.cloneNode(true))
```

### Event Object

The event object contains information about the event:

```javascript
element.addEventListener('click', (event) => {
  // Event target (element that triggered the event)
  console.log(event.target)

  // Event type
  console.log(event.type)

  // Mouse coordinates
  console.log(event.clientX, event.clientY)

  // Prevent default behavior
  event.preventDefault()

  // Stop event propagation
  event.stopPropagation()
})
```

## 💻 Practice Exercises

1. Create a button that changes color when clicked
2. Implement a form with validation using events
3. Create a drag-and-drop interface
4. Build a keyboard shortcut system

## 📝 Example Code

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Events Practice</title>
    <style>
      .draggable {
        width: 100px;
        height: 100px;
        background-color: #3498db;
        cursor: move;
      }
      .dropzone {
        width: 200px;
        height: 200px;
        border: 2px dashed #2ecc71;
        margin: 20px;
      }
    </style>
  </head>
  <body>
    <div id="draggable" class="draggable"></div>
    <div id="dropzone" class="dropzone"></div>

    <script>
      const draggable = document.getElementById('draggable')
      const dropzone = document.getElementById('dropzone')

      // Mouse events for dragging
      draggable.addEventListener('mousedown', (e) => {
        const startX = e.clientX - draggable.offsetLeft
        const startY = e.clientY - draggable.offsetTop

        function move(e) {
          draggable.style.left = e.clientX - startX + 'px'
          draggable.style.top = e.clientY - startY + 'px'
        }

        function stop() {
          document.removeEventListener('mousemove', move)
          document.removeEventListener('mouseup', stop)
        }

        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', stop)
      })

      // Drop zone events
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault()
        dropzone.style.backgroundColor = '#e8f5e9'
      })

      dropzone.addEventListener('dragleave', () => {
        dropzone.style.backgroundColor = ''
      })

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault()
        dropzone.style.backgroundColor = '#c8e6c9'
        draggable.style.display = 'none'
      })
    </script>
  </body>
</html>
```

## 🔍 Common Pitfalls

- Forgetting to remove event listeners (memory leaks)
- Not preventing default behavior when needed
- Using inline event handlers (onclick="...")
- Not considering event delegation for dynamic elements
- Ignoring event propagation when it matters

## 📚 Additional Resources

- [MDN: Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)
- [MDN: EventTarget.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [JavaScript.info: Events](https://javascript.info/events)
