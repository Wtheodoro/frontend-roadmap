# Creating a Simple Website Layout

## 📚 Project Overview

Today we'll create a responsive website layout using all the concepts we've learned this week:

- Box Model
- Flexbox
- Grid
- Media Queries
- Responsive Design

## 🎮 Practical Learning Resources

1. [CodePen](https://codepen.io/) - Ambiente para testar e compartilhar layouts
2. [CSS Layout Generator](https://layout.bradwoods.io/) - Gerador de layouts CSS
3. [Frontend Mentor](https://www.frontendmentor.io/) - Desafios práticos de layouts

## 🏗️ Layout Structure

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Responsive Website</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header>
      <nav>
        <div class="logo">Logo</div>
        <ul class="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <div class="burger">
          <div class="line1"></div>
          <div class="line2"></div>
          <div class="line3"></div>
        </div>
      </nav>
    </header>

    <main>
      <section class="hero">
        <h1>Welcome to Our Website</h1>
        <p>Creating beautiful, responsive layouts</p>
      </section>

      <section class="features">
        <div class="feature-card">
          <h2>Feature 1</h2>
          <p>Description of feature 1</p>
        </div>
        <div class="feature-card">
          <h2>Feature 2</h2>
          <p>Description of feature 2</p>
        </div>
        <div class="feature-card">
          <h2>Feature 3</h2>
          <p>Description of feature 3</p>
        </div>
      </section>
    </main>

    <footer>
      <p>&copy; 2024 Your Website. All rights reserved.</p>
    </footer>
  </body>
</html>
```

## 🎨 CSS Styling

```css
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --background-color: #f8f9fa;
  --text-color: #212529;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
}

/* Header and Navigation */
header {
  background-color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  width: 100%;
  top: 0;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-color);
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--primary-color);
}

/* Hero Section */
.hero {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('hero-bg.jpg');
  background-size: cover;
  color: white;
}

/* Features Section */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

/* Footer */
footer {
  background-color: var(--secondary-color);
  color: white;
  text-align: center;
  padding: 2rem;
  margin-top: 4rem;
}

/* Mobile Navigation */
.burger {
  display: none;
  cursor: pointer;
}

.burger div {
  width: 25px;
  height: 3px;
  background-color: var(--text-color);
  margin: 5px;
  transition: all 0.3s ease;
}

/* Media Queries */
@media screen and (max-width: 768px) {
  .nav-links {
    position: fixed;
    right: -100%;
    top: 70px;
    height: calc(100vh - 70px);
    background-color: white;
    flex-direction: column;
    align-items: center;
    width: 50%;
    transition: 0.5s;
  }

  .nav-links.active {
    right: 0;
  }

  .burger {
    display: block;
  }
}
```

## 🎯 JavaScript for Mobile Menu

```javascript
const burger = document.querySelector('.burger')
const nav = document.querySelector('.nav-links')

burger.addEventListener('click', () => {
  nav.classList.toggle('active')
  burger.classList.toggle('toggle')
})
```

## 💡 Project Requirements

1. Create a responsive navigation bar
2. Implement a hero section with background image
3. Create a features section using CSS Grid
4. Add hover effects to feature cards
5. Make the layout mobile-friendly
6. Implement a mobile menu toggle

## 📱 Testing Checklist

- [ ] Test on desktop (1200px+)
- [ ] Test on tablet (768px-1199px)
- [ ] Test on mobile (<768px)
- [ ] Check navigation functionality
- [ ] Verify responsive images
- [ ] Test hover effects
- [ ] Check mobile menu toggle

## 📚 Additional Resources

- [MDN CSS Layout](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout)
- [CSS-Tricks Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Responsive Design Best Practices](https://web.dev/responsive-web-design-basics/)
- [CSS Layout Patterns](https://web.dev/patterns/layout/) - Padrões de layout comuns
- [CSS Layout Cookbook](https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_cookbook) - Receitas de layout
- [CSS Layout Generator](https://layout.bradwoods.io/) - Gerador de layouts CSS
- [Frontend Mentor](https://www.frontendmentor.io/) - Desafios práticos de layouts
