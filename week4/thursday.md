# Media Queries and Responsiveness

## 📚 Introduction to Responsive Design

Responsive design ensures your website looks great on all devices. Key concepts include:

- Fluid layouts
- Flexible images
- Media queries
- Mobile-first approach
- Breakpoints

## 🎮 Practical Learning Resources

1. [Responsive Design Checker](https://responsivedesignchecker.com/) - Teste seu site em diferentes dispositivos
2. [Am I Responsive?](https://ui.dev/amiresponsive) - Visualize seu site em múltiplos dispositivos
3. [Responsive Breakpoints Generator](https://www.responsivebreakpoints.com/) - Gerador de breakpoints para imagens

## 📱 Common Breakpoints

```css
/* Small devices (phones) */
@media (max-width: 576px) {
  ...;
}

/* Medium devices (tablets) */
@media (min-width: 577px) and (max-width: 768px) {
  ...;
}

/* Large devices (desktops) */
@media (min-width: 769px) and (max-width: 992px) {
  ...;
}

/* Extra large devices (large desktops) */
@media (min-width: 993px) {
  ...;
}
```

## 🎯 Mobile-First Approach

### 1. Base Styles (Mobile)

```css
.container {
  width: 100%;
  padding: 1rem;
  margin: 0 auto;
}
```

### 2. Progressive Enhancement

```css
/* Tablet */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
    padding: 3rem;
  }
}
```

## 🖼️ Responsive Images

### 1. Fluid Images

```css
img {
  max-width: 100%;
  height: auto;
}
```

### 2. Picture Element

```html
<picture>
  <source media="(min-width: 1024px)" srcset="large.jpg" />
  <source media="(min-width: 768px)" srcset="medium.jpg" />
  <img src="small.jpg" alt="Description" />
</picture>
```

## 📐 Viewport Units

```css
.element {
  width: 100vw; /* Full viewport width */
  height: 100vh; /* Full viewport height */
  font-size: 2vmin; /* 2% of viewport's smaller dimension */
  padding: 5vmax; /* 5% of viewport's larger dimension */
}
```

## 🔍 Media Query Features

### 1. Screen Size

```css
@media screen and (min-width: 768px) {
  ...;
}
```

### 2. Device Orientation

```css
@media (orientation: landscape) {
  ...;
}
```

### 3. Pixel Ratio

```css
@media (-webkit-min-device-pixel-ratio: 2) {
  ...;
}
```

### 4. Print Styles

```css
@media print {
  .no-print {
    display: none;
  }
}
```

## 🎨 Responsive Typography

```css
:root {
  --font-size-base: 16px;
  --font-size-scale: 1.2;
}

h1 {
  font-size: calc(var(--font-size-base) * var(--font-size-scale) * 2);
}

@media (min-width: 768px) {
  :root {
    --font-size-base: 18px;
  }
}
```

## 💡 Best Practices

- Start with mobile-first design
- Use relative units (em, rem, vw, vh)
- Test on real devices
- Use CSS Grid and Flexbox for layouts
- Implement proper image optimization
- Consider touch targets (minimum 44x44px)

## 📱 Testing Tools

- [Chrome DevTools Device Mode](https://developer.chrome.com/docs/devtools/device-mode/)
- [BrowserStack](https://www.browserstack.com/) - Teste em dispositivos reais
- [Responsive Design Checker](https://responsivedesignchecker.com/)
- [Mobile-Friendly Test (Google)](https://search.google.com/test/mobile-friendly)
- [Screenfly](http://quirktools.com/screenfly/) - Teste em diferentes resoluções

## 📚 Additional Resources

- [MDN Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries)
- [Google's Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Responsive Design Patterns](https://responsivedesign.is/patterns)
- [Responsive Web Design Basics](https://web.dev/responsive-web-design-basics/)
- [Responsive Images](https://responsiveimages.org/) - Guia completo de imagens responsivas
