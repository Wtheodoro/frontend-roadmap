# Week 1 - Thursday: Functions

## Introduction

Functions are reusable blocks of code that perform specific tasks. They are fundamental building blocks in JavaScript and help us write more organized and maintainable code.

## 1. Function Declaration

The most basic way to create a function:

```javascript
// Basic function declaration
function greet() {
  console.log('Hello!')
}

// Function with parameters
function greet(name) {
  console.log(`Hello, ${name}!`)
}

// Function with multiple parameters
function add(a, b) {
  return a + b
}
```

## 2. Function Expression

Functions can be assigned to variables:

```javascript
// Function expression
const greet = function () {
  console.log('Hello!')
}

// Named function expression
const greet = function sayHello() {
  console.log('Hello!')
}
```

## 3. Arrow Functions

Modern way to write functions, introduced in ES6:

```javascript
// Basic arrow function
const greet = () => {
  console.log('Hello!')
}

// Arrow function with parameters
const greet = (name) => {
  console.log(`Hello, ${name}!`)
}

// Arrow function with implicit return
const add = (a, b) => a + b

// Arrow function with single parameter (no parentheses needed)
const square = (x) => x * x
```

## 4. Parameters and Arguments

Parameters are the variables listed in the function definition, while arguments are the actual values passed to the function when it's called:

```javascript
// Parameters: name and age are parameters
function greet(name, age) {
  console.log(`Hello, ${name}! You are ${age} years old.`)
}

// Arguments: 'John' and 25 are arguments
greet('John', 25)
```

Think of parameters as empty boxes that will hold values, and arguments as the actual values you put in those boxes when you call the function.

### Default Parameters

```javascript
// Default parameters
function greet(name = 'Guest') {
  console.log(`Hello, ${name}!`)
}

greet() // Output: Hello, Guest!
greet('John') // Output: Hello, John!
```

### Rest Parameters

```javascript
// Rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0)
}

console.log(sum(1, 2, 3, 4)) // Output: 10
console.log(sum(10, 20)) // Output: 30
```

### Destructuring Parameters

```javascript
// Destructuring parameters
function printUser({ name, age, city }) {
  console.log(`${name} is ${age} years old and lives in ${city}`)
}

const user = {
  name: 'John',
  age: 30,
  city: 'New York',
}

printUser(user) // Output: John is 30 years old and lives in New York
```

## 5. Return Values

```javascript
// Basic return
function add(a, b) {
  return a + b
}

// Multiple returns
function getGrade(score) {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  return 'F'
}

// Returning objects
function createUser(name, age) {
  return {
    name,
    age,
    isAdult: age >= 18,
  }
}
```

## 6. Function Scope

```javascript
// Global scope
const globalVar = 'I am global'

function testScope() {
  // Local scope
  const localVar = 'I am local'
  console.log(globalVar) // Can access global variables
  console.log(localVar) // Can access local variables
}

// Block scope with let and const
function blockScope() {
  if (true) {
    const blockVar = 'I am block scoped'
    let anotherBlockVar = 'Me too'
  }
  // console.log(blockVar) // Error: blockVar is not defined
}
```

## Running JavaScript Code

To see the output of your JavaScript code, you can use the `console.log()` function:

```javascript
// Example of using functions
function greet(name) {
  console.log(`Hello, ${name}!`)
}

greet('John') // Output: Hello, John!

const result = add(5, 3)
console.log(result) // Output: 8
```

To run a JavaScript file using Node.js, open your terminal and use the following command:

```bash
node <filename>.js
```

For example, to run a file named `functions.js`:

```bash
node functions.js
```

## Practice Exercises

1. Create a function that calculates the area of a rectangle:

```javascript
function calculateArea(width, height) {
  return width * height
}

const area = calculateArea(5, 3)
console.log(`Area: ${area}`) // Output: Area: 15
```

2. Create a function that converts Celsius to Fahrenheit:

```javascript
const celsiusToFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32
}

const temp = celsiusToFahrenheit(25)
console.log(`Temperature: ${temp}°F`) // Output: Temperature: 77°F
```

3. Create a function that checks if a number is even:

```javascript
function isEven(number) {
  return number % 2 === 0
}

console.log(isEven(4)) // Output: true
console.log(isEven(7)) // Output: false
```

4. Create a function that returns the longest word in a sentence:

```javascript
function getLongestWord(sentence) {
  const words = sentence.split(' ')
  return words.reduce((longest, current) =>
    current.length > longest.length ? current : longest
  )
}

const longest = getLongestWord('The quick brown fox jumps over the lazy dog')
console.log(`Longest word: ${longest}`) // Output: Longest word: quick
```

5. Create a function that generates a random number between min and max:

```javascript
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const random = getRandomNumber(1, 10)
console.log(`Random number: ${random}`)
```

## Common Pitfalls to Avoid

1. Forgetting to Return Values

```javascript
// Wrong
function add(a, b) {
  a + b // Missing return
}

// Correct
function add(a, b) {
  return a + b
}
```

2. Using Arrow Functions for Methods

```javascript
// Wrong - 'this' context is lost
const person = {
  name: 'John',
  greet: () => {
    console.log(`Hello, ${this.name}`)
  },
}

// Correct
const person = {
  name: 'John',
  greet() {
    console.log(`Hello, ${this.name}`)
  },
}
```

3. Mutating Parameters

```javascript
// Wrong - mutating input parameters
function addToArray(arr, item) {
  arr.push(item)
  return arr
}

// Correct - create a new array
function addToArray(arr, item) {
  return [...arr, item]
}
```
