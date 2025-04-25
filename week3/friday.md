# Basic CSS Introduction and JS Styling

## 🎯 Learning Objectives

- Understand basic CSS concepts and syntax
- Learn how to apply styles using JavaScript
- Master CSS selectors and specificity
- Understand CSS units and values
- Learn about CSS transitions and animations
- Practice combining CSS and JavaScript for dynamic styling

## 📚 Content

### Basic CSS Concepts

#### 1. CSS Syntax

```css
/* Basic syntax */
selector {
  property: value;
}

/* Example */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
```

#### 2. Common Properties

```css
/* Box Model */
element {
  margin: 10px;
  padding: 15px;
  border: 1px solid #000;
}

/* Typography */
element {
  font-family: Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

/* Layout */
element {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### JavaScript Styling

#### 1. Inline Styles

```javascript
// Single property
element.style.color = 'red'
element.style.backgroundColor = '#000'

// Multiple properties
element.style.cssText = `
    color: red;
    background-color: #000;
    padding: 20px;
`
```

#### 2. Class Manipulation

```javascript
// Add/remove classes
element.classList.add('active')
element.classList.remove('inactive')

// Toggle classes
element.classList.toggle('visible')

// Replace classes
element.classList.replace('old-class', 'new-class')
```

#### 3. Style Object

```javascript
// Get computed styles
const styles = window.getComputedStyle(element)
const color = styles.getPropertyValue('color')

// Set multiple styles
Object.assign(element.style, {
  color: 'red',
  backgroundColor: '#000',
  padding: '20px',
})
```

## 💻 Practice Exercises

1. Create a theme switcher (light/dark mode)
2. Build an animated button with hover effects
3. Implement a responsive navigation menu
4. Create a dynamic progress bar

## 📝 Example Code

```html
<!DOCTYPE html>
<html>
  <head>
    <title>CSS and JS Styling Practice</title>
    <style>
      /* Base styles */
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
      }

      /* Theme styles */
      .light-theme {
        background-color: #fff;
        color: #333;
      }

      .dark-theme {
        background-color: #333;
        color: #fff;
      }

      /* Button styles */
      .button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .button:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      /* Progress bar */
      .progress-container {
        width: 100%;
        height: 20px;
        background-color: #eee;
        border-radius: 10px;
        overflow: hidden;
      }

      .progress-bar {
        width: 0%;
        height: 100%;
        background-color: #4caf50;
        transition: width 0.3s ease;
      }
    </style>
  </head>
  <body class="light-theme">
    <div class="container">
      <h1>CSS and JS Styling Demo</h1>

      <button id="themeToggle" class="button">Toggle Theme</button>
      <button id="animateButton" class="button">Animate Button</button>

      <div class="progress-container">
        <div id="progressBar" class="progress-bar"></div>
      </div>
    </div>

    <script>
      // Theme toggler
      const themeToggle = document.getElementById('themeToggle')
      const body = document.body

      themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme')
        body.classList.toggle('dark-theme')

        // Update button text
        themeToggle.textContent = body.classList.contains('light-theme')
          ? 'Switch to Dark Theme'
          : 'Switch to Light Theme'
      })

      // Animated button
      const animateButton = document.getElementById('animateButton')

      animateButton.addEventListener('click', () => {
        // Add animation class
        animateButton.style.transform = 'scale(1.1)'

        // Remove animation class after animation
        setTimeout(() => {
          animateButton.style.transform = 'scale(1)'
        }, 200)
      })

      // Progress bar
      const progressBar = document.getElementById('progressBar')
      let progress = 0

      function updateProgress() {
        progress = (progress + 1) % 101
        progressBar.style.width = `${progress}%`

        if (progress < 100) {
          setTimeout(updateProgress, 50)
        }
      }

      // Start progress animation when page loads
      updateProgress()
    </script>
  </body>
</html>
```

## 🔍 Common Pitfalls

- Using inline styles when CSS classes would be better
- Not considering browser compatibility
- Forgetting to handle vendor prefixes
- Not using CSS transitions for smooth animations
- Overusing !important
- Not considering mobile responsiveness

## 📚 Additional Resources

- [MDN: CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [MDN: HTMLElement.style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style)
- [CSS-Tricks: A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS-Tricks: A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
