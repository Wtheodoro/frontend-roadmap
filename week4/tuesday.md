# CSS Grid Layout

## 📚 Introduction to Grid

CSS Grid is a powerful two-dimensional layout system that allows you to create complex web layouts with rows and columns. It's perfect for:

- Creating magazine-style layouts
- Building responsive dashboards
- Designing complex web applications
- Creating photo galleries

## 🏗️ Grid Container Properties

```css
.container {
  display: grid; /* Activates grid */
  grid-template-columns: 1fr 1fr 1fr; /* Creates 3 equal columns */
  grid-template-rows: 100px 200px; /* Defines row heights */
  gap: 20px; /* Space between grid items */
  grid-template-areas:              /* Named grid areas */
    'header header header'
    'sidebar main main';
}
```

### Common Grid Properties

- `grid-template-columns`: Defines column sizes
- `grid-template-rows`: Defines row sizes
- `gap`: Space between grid items
- `grid-template-areas`: Named grid areas
- `justify-items`: Aligns items horizontally
- `align-items`: Aligns items vertically

## 📏 Grid Item Properties

```css
.item {
  grid-column: 1 / 3; /* Spans from column 1 to 3 */
  grid-row: 1 / 2; /* Spans from row 1 to 2 */
  grid-area: header; /* Places in named area */
  justify-self: center; /* Individual horizontal alignment */
  align-self: center; /* Individual vertical alignment */
}
```

## �� Practical Learning Resources

1. [Grid Garden](https://cssgridgarden.com/) - Jogo interativo para aprender CSS Grid
2. [CSS Grid Playground](https://cssgrid.io/) - Curso prático de CSS Grid
3. [Grid by Example](https://gridbyexample.com/) - Exemplos práticos de layouts com Grid

## 📝 Common Grid Patterns

### 1. Basic Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
```

### 2. Responsive Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

### 3. Magazine Layout

```css
.magazine {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    'header header'
    'main sidebar'
    'footer footer';
}
```

## 💡 Tips

- Use `fr` units for flexible grid tracks
- Combine Grid with Flexbox for complex layouts
- Use `minmax()` for responsive grids
- Name your grid areas for better maintainability
- Use `auto-fit` and `auto-fill` for responsive layouts

## 📚 Additional Resources

- [MDN Grid Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [CSS-Tricks Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Grid Garden](https://cssgridgarden.com/) - Interactive learning game
- [CSS Grid Generator](https://cssgrid-generator.netlify.app/) - Gerador visual de layouts Grid
- [Grid Cheat Sheet](https://grid.malven.co/) - Referência rápida de propriedades Grid
