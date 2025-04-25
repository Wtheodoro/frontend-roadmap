# Week 3 Project: Interactive Counter

## 🎯 Project Overview

Create an interactive counter application that demonstrates your understanding of DOM manipulation, events, and styling. The counter should have a clean, modern interface with smooth animations and responsive design.

## 📋 Requirements

### Core Features

1. Display a number that can be increased or decreased
2. Add buttons for increment and decrement
3. Add a reset button to return to zero
4. Implement a maximum and minimum limit
5. Add visual feedback when limits are reached

### Advanced Features (Optional)

1. Add keyboard controls (arrow keys)
2. Implement a custom input field to set specific values
3. Add animation when the number changes
4. Create a history of recent values
5. Add a dark/light theme toggle

## 💡 Implementation Guide

### 1. Basic Structure

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Interactive Counter</title>
    <style>
      /* Add your styles here */
    </style>
  </head>
  <body>
    <div class="counter-container">
      <h1>Interactive Counter</h1>
      <div class="counter-display">0</div>
      <div class="controls">
        <button class="decrement">-</button>
        <button class="reset">Reset</button>
        <button class="increment">+</button>
      </div>
    </div>
    <script>
      // Add your JavaScript here
    </script>
  </body>
</html>
```

### 2. Suggested Steps

1. Create the HTML structure
2. Style the components using CSS
3. Implement the basic counter functionality
4. Add event listeners for buttons
5. Implement the limit functionality
6. Add visual feedback
7. (Optional) Implement advanced features

### 3. CSS Suggestions

- Use flexbox for layout
- Add transitions for smooth animations
- Implement hover effects on buttons
- Use a modern color scheme
- Make the design responsive

### 4. JavaScript Concepts to Use

- DOM element selection
- Event handling
- Class manipulation
- Style manipulation
- Conditional logic

## 🎨 Design Inspiration

- Use a clean, minimal design
- Implement smooth transitions
- Add subtle shadows and rounded corners
- Use a consistent color scheme
- Ensure good contrast for accessibility

## 📝 Example Features

```javascript
// Counter functionality
let count = 0
const min = -10
const max = 10

function updateCounter() {
  counterDisplay.textContent = count

  // Add visual feedback
  if (count === min || count === max) {
    counterDisplay.classList.add('limit-reached')
  } else {
    counterDisplay.classList.remove('limit-reached')
  }
}

// Event listeners
decrementBtn.addEventListener('click', () => {
  if (count > min) {
    count--
    updateCounter()
  }
})

// Keyboard controls
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && count < max) {
    count++
    updateCounter()
  } else if (event.key === 'ArrowDown' && count > min) {
    count--
    updateCounter()
  }
})
```

## 🔍 Evaluation Criteria

1. Functionality

   - All core features work correctly
   - Smooth animations and transitions
   - Proper error handling

2. Code Quality

   - Clean, well-organized code
   - Proper use of DOM manipulation
   - Efficient event handling

3. Design

   - Modern, clean interface
   - Responsive layout
   - Consistent styling

4. User Experience
   - Intuitive controls
   - Clear visual feedback
   - Smooth interactions

## 📚 Resources

- [MDN: DOM Manipulation](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [MDN: Events](https://developer.mozilla.org/en-US/docs/Web/Events)
- [CSS-Tricks: Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)
