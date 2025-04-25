# DOM Element Selection

## 🎯 Learning Objectives

- Understand what the DOM is
- Learn different methods to select elements
- Practice selecting single and multiple elements
- Understand the difference between various selection methods

## 📚 Content

### What is the DOM?

The Document Object Model (DOM) is a programming interface for HTML documents. It represents the page as a tree of objects that can be manipulated with JavaScript.

### Element Selection Methods

#### 1. Selecting Single Elements

```javascript
// By ID (returns a single element)
const element = document.getElementById('myId')

// By CSS Selector (returns the first matching element)
const element = document.querySelector('.myClass')
const element = document.querySelector('#myId')
const element = document.querySelector('div')

// By Tag Name (returns the first matching element)
const element = document.getElementsByTagName('div')[0]
```

#### 2. Selecting Multiple Elements

```javascript
// By Class Name (returns HTMLCollection)
const elements = document.getElementsByClassName('myClass')

// By Tag Name (returns HTMLCollection)
const elements = document.getElementsByTagName('div')

// By CSS Selector (returns NodeList)
const elements = document.querySelectorAll('.myClass')
const elements = document.querySelectorAll('div')
```

### Differences Between Methods

1. **getElementById()**

   - Fastest method
   - Returns null if element not found
   - Only works with IDs

2. **querySelector()**

   - More flexible (can use any CSS selector)
   - Returns null if element not found
   - Can be slower than getElementById

3. **getElementsByClassName() / getElementsByTagName()**

   - Returns live HTMLCollection
   - Returns empty collection if nothing found
   - Can't use complex selectors

4. **querySelectorAll()**
   - Returns static NodeList
   - Returns empty NodeList if nothing found
   - Can use any CSS selector
   - Most flexible but potentially slowest

## 💻 Practice Exercises

1. Create an HTML file with different elements and practice selecting them using all methods
2. Try selecting nested elements using different combinations of selectors
3. Compare the performance of different selection methods

## 📝 Example Code

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DOM Selection Practice</title>
  </head>
  <body>
    <div id="container">
      <h1 class="title">Hello World</h1>
      <p class="text">This is a paragraph</p>
      <div class="box">
        <span>Nested element</span>
      </div>
    </div>

    <script>
      // Single element selection
      const container = document.getElementById('container')
      const title = document.querySelector('.title')

      // Multiple elements selection
      const paragraphs = document.getElementsByTagName('p')
      const boxes = document.getElementsByClassName('box')
      const allDivs = document.querySelectorAll('div')
    </script>
  </body>
</html>
```

## 🔍 Common Pitfalls

- Forgetting that getElementsByClassName and getElementsByTagName return collections
- Not checking if elements exist before trying to manipulate them
- Using complex selectors when simple ones would work better

## 📚 Additional Resources

- [MDN: Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [MDN: Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [JavaScript.info: DOM Nodes](https://javascript.info/dom-nodes)
