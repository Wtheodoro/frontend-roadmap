# Array Manipulation in JavaScript

## Introduction

Array manipulation is a fundamental skill in JavaScript programming. Today, we'll explore three powerful array methods that are essential for modern JavaScript development: `map()`, `filter()`, and `reduce()`. These methods allow us to transform, filter, and accumulate data in arrays efficiently.

## Map Method

The `map()` method creates a new array by performing a function on each element of the original array.

### Syntax

```javascript
array.map(function (currentValue, index, array) {
  // Return element for new array
}, thisValue)
```

### Example

```javascript
const numbers = [1, 2, 3, 4, 5]

// Double each number
const doubled = numbers.map((num) => num * 2)
console.log(doubled) // [2, 4, 6, 8, 10]

// Convert numbers to strings
const strings = numbers.map((num) => num.toString())
console.log(strings) // ["1", "2", "3", "4", "5"]
```

### Real-world Example

```javascript
const products = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Mouse', price: 29.99 },
  { id: 3, name: 'Keyboard', price: 59.99 },
]

// Apply 10% discount to all products
const discountedProducts = products.map((product) => ({
  ...product,
  price: product.price * 0.9,
}))

console.log(discountedProducts)
// [
//   { id: 1, name: 'Laptop', price: 899.991 },
//   { id: 2, name: 'Mouse', price: 26.991 },
//   { id: 3, name: 'Keyboard', price: 53.991 }
// ]
```

## Filter Method

The `filter()` method creates a new array with elements that pass a test.

### Syntax

```javascript
array.filter(function (currentValue, index, array) {
  // Return true to keep the element, false to discard it
}, thisValue)
```

### Example

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Get only even numbers
const evenNumbers = numbers.filter((num) => num % 2 === 0)
console.log(evenNumbers) // [2, 4, 6, 8, 10]

// Get numbers greater than 5
const greaterThanFive = numbers.filter((num) => num > 5)
console.log(greaterThanFive) // [6, 7, 8, 9, 10]
```

### Real-world Example

```javascript
const users = [
  { id: 1, name: 'Alice', age: 25, active: true },
  { id: 2, name: 'Bob', age: 30, active: false },
  { id: 3, name: 'Charlie', age: 35, active: true },
  { id: 4, name: 'David', age: 40, active: true },
]

// Get only active users
const activeUsers = users.filter((user) => user.active)
console.log(activeUsers)
// [
//   { id: 1, name: 'Alice', age: 25, active: true },
//   { id: 3, name: 'Charlie', age: 35, active: true },
//   { id: 4, name: 'David', age: 40, active: true }
// ]

// Get users over 30 years old
const usersOverThirty = users.filter((user) => user.age > 30)
console.log(usersOverThirty)
// [
//   { id: 2, name: 'Bob', age: 30, active: false },
//   { id: 3, name: 'Charlie', age: 35, active: true },
//   { id: 4, name: 'David', age: 40, active: true }
// ]
```

## Reduce Method

The `reduce()` method reduces an array to a single value by executing a reducer function for each element.

### Syntax

```javascript
array.reduce(function (total, currentValue, currentIndex, array) {
  // Return the accumulated value
}, initialValue)
```

### Example

```javascript
const numbers = [1, 2, 3, 4, 5]

// Sum all numbers
const sum = numbers.reduce((total, num) => total + num, 0)
console.log(sum) // 15

// Multiply all numbers
const product = numbers.reduce((total, num) => total * num, 1)
console.log(product) // 120
```

### Real-world Example

```javascript
const cart = [
  { item: 'Book', price: 15.99, quantity: 2 },
  { item: 'Pen', price: 1.99, quantity: 5 },
  { item: 'Notebook', price: 5.99, quantity: 3 },
]

// Calculate total cost
const totalCost = cart.reduce((total, item) => {
  return total + item.price * item.quantity
}, 0)

console.log(totalCost) // 52.90
```

## Chaining Methods

One of the most powerful features of these array methods is that they can be chained together to create complex data transformations.

### Example

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Get the sum of squares of even numbers
const sumOfEvenSquares = numbers
  .filter((num) => num % 2 === 0) // Get even numbers
  .map((num) => num * num) // Square each number
  .reduce((sum, num) => sum + num, 0) // Sum the squares

console.log(sumOfEvenSquares) // 220 (4 + 16 + 36 + 64 + 100)
```

### Real-world Example

```javascript
const products = [
  { id: 1, name: 'Laptop', price: 999.99, inStock: true },
  { id: 2, name: 'Mouse', price: 29.99, inStock: true },
  { id: 3, name: 'Keyboard', price: 59.99, inStock: false },
  { id: 4, name: 'Monitor', price: 299.99, inStock: true },
  { id: 5, name: 'Headphones', price: 89.99, inStock: false },
]

// Get names of in-stock products under $100
const affordableInStockNames = products
  .filter((product) => product.inStock && product.price < 100)
  .map((product) => product.name)

console.log(affordableInStockNames) // ["Mouse"]

// Calculate average price of in-stock products
const averageInStockPrice =
  products
    .filter((product) => product.inStock)
    .reduce((sum, product) => sum + product.price, 0) /
  products.filter((product) => product.inStock).length

console.log(averageInStockPrice) // 443.32
```

## Practice Exercises

1. Given an array of numbers, find the sum of all even numbers.
2. Given an array of strings, create a new array with the length of each string.
3. Given an array of objects with `{name, age}`, find the average age.
4. Given an array of products with `{name, price, category}`, group them by category.
5. Given an array of numbers, find the product of all positive numbers.

## Solutions

### Exercise 1: Sum of Even Numbers

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const sumOfEvens = numbers
  .filter((num) => num % 2 === 0)
  .reduce((sum, num) => sum + num, 0)

console.log(sumOfEvens) // 30
```

### Exercise 2: String Lengths

```javascript
const words = ['apple', 'banana', 'cherry', 'date', 'elderberry']

const wordLengths = words.map((word) => word.length)

console.log(wordLengths) // [5, 6, 6, 4, 10]
```

### Exercise 3: Average Age

```javascript
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
  { name: 'David', age: 40 },
]

const averageAge =
  people.reduce((sum, person) => sum + person.age, 0) / people.length

console.log(averageAge) // 32.5
```

### Exercise 4: Group by Category

```javascript
const products = [
  { name: 'Laptop', price: 999.99, category: 'Electronics' },
  { name: 'Mouse', price: 29.99, category: 'Electronics' },
  { name: 'Desk Chair', price: 199.99, category: 'Furniture' },
  { name: 'Coffee Maker', price: 79.99, category: 'Appliances' },
]

const groupedByCategory = products.reduce((groups, product) => {
  const category = product.category
  if (!groups[category]) {
    groups[category] = []
  }
  groups[category].push(product)
  return groups
}, {})

console.log(groupedByCategory)
// {
//   Electronics: [
//     { name: 'Laptop', price: 999.99, category: 'Electronics' },
//     { name: 'Mouse', price: 29.99, category: 'Electronics' }
//   ],
//   Furniture: [
//     { name: 'Desk Chair', price: 199.99, category: 'Furniture' }
//   ],
//   Appliances: [
//     { name: 'Coffee Maker', price: 79.99, category: 'Appliances' }
//   ]
// }
```

### Exercise 5: Product of Positive Numbers

```javascript
const numbers = [-2, 5, -3, 10, -8, 4, -1, 7]

const productOfPositives = numbers
  .filter((num) => num > 0)
  .reduce((product, num) => product * num, 1)

console.log(productOfPositives) // 1400 (5 * 10 * 4 * 7)
```

## Conclusion

Array manipulation methods like `map()`, `filter()`, and `reduce()` are powerful tools that make your code more readable, maintainable, and functional. By mastering these methods, you'll be able to handle complex data transformations with ease.

Remember:

- `map()` transforms each element
- `filter()` selects elements based on a condition
- `reduce()` accumulates values into a single result
- These methods can be chained together for powerful transformations

Practice these methods regularly to become comfortable with them, as they are essential for modern JavaScript development.
