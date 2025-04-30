# Dynamic CSS Styling

## 📚 Introduction to Dynamic Styling

Dynamic CSS styling allows you to change styles based on user interactions, data, or application state. This includes:

- CSS Variables (Custom Properties)
- CSS-in-JS
- Dynamic class names
- Style manipulation with JavaScript

## 🎨 CSS Variables (Custom Properties)

```css
:root {
  --primary-color: #007bff;
  --spacing-unit: 1rem;
  --max-width: 1200px;
}

.element {
  color: var(--primary-color);
  margin: var(--spacing-unit);
  max-width: var(--max-width);
}
```

### Dynamic Updates with JavaScript

```javascript
// Change CSS variable value
document.documentElement.style.setProperty('--primary-color', '#ff0000')
```

## 🎭 Dynamic Classes

### 1. Toggle Classes

```javascript
element.classList.toggle('active')
```

### 2. Add/Remove Classes

```javascript
element.classList.add('highlight')
element.classList.remove('inactive')
```

### 3. Conditional Classes

```javascript
element.className = isActive ? 'active' : 'inactive'
```

## 🎯 Style Manipulation

### 1. Direct Style Manipulation

```javascript
element.style.color = 'red'
element.style.backgroundColor = '#000'
```

### 2. Multiple Styles

```javascript
Object.assign(element.style, {
  color: 'red',
  backgroundColor: '#000',
  padding: '1rem',
})
```

## 📱 Responsive Design Patterns

### 1. Mobile-First Approach

```css
/* Base styles (mobile) */
.container {
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
```

### 2. Dynamic Font Sizes

```css
:root {
  --font-size-base: 16px;
  --font-size-scale: 1.2;
}

h1 {
  font-size: calc(var(--font-size-base) * var(--font-size-scale) * 2);
}
```

## 🎮 Interactive Examples

### 1. Dark Mode Toggle

```javascript
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode')
  localStorage.setItem(
    'darkMode',
    document.body.classList.contains('dark-mode')
  )
}
```

### 2. Dynamic Theme Colors

```javascript
function setThemeColor(color) {
  document.documentElement.style.setProperty('--primary-color', color)
}
```

## 💡 Best Practices

- Use CSS variables for theme values
- Prefer class toggling over direct style manipulation
- Keep styles in CSS, behavior in JavaScript
- Use CSS custom properties for dynamic values
- Implement proper fallbacks for older browsers

## 🎮 Practical Learning Resources

1. [CSS Variables Playground](https://codepen.io/collection/DgYaMj) - Exemplos práticos de CSS Variables
2. [CSS Custom Properties Generator](https://css-variables-generator.netlify.app/) - Gerador de variáveis CSS
3. [CSS Animation Playground](https://animista.net/) - Gerador de animações CSS

## 📚 Additional Resources

- [MDN CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS-Tricks CSS Variables Guide](https://css-tricks.com/a-complete-guide-to-custom-properties/)
- [Modern CSS Solutions](https://moderncss.dev/)
- [CSS Variables Generator](https://css-variables-generator.netlify.app/)
- [CSS Animation Cheat Sheet](https://www.joshwcomeau.com/animation/css-transitions/)
