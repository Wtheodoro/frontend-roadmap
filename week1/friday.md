# Week 1 - Friday: Objects and Arrays

## Introduction

Objects and Arrays are two of the most fundamental data structures in JavaScript. Objects store collections of key-value pairs, while Arrays store collections of values in an ordered sequence.

## 1. Objects

Objects are collections of properties, where each property is a key-value pair:

```javascript
// Basic object creation
const person = {
  name: 'John',
  age: 30,
  isStudent: true,
}

// Accessing properties
console.log(person.name) // Dot notation
console.log(person['age']) // Bracket notation

// Modifying properties
person.age = 31
person['isStudent'] = false

// Adding new properties
person.city = 'New York'
person['occupation'] = 'Developer'
```

### Object Methods

```javascript
// Method as a property
const calculator = {
  add(a, b) {
    return a + b
  },
  subtract: function (a, b) {
    return a - b
  },
  multiply: (a, b) => a * b,
}

console.log(calculator.add(5, 3)) // Output: 8
console.log(calculator.subtract(5, 3)) // Output: 2
console.log(calculator.multiply(5, 3)) // Output: 15
```

### Object Methods (Built-in)

```javascript
const person = {
  name: 'John',
  age: 30,
  city: 'New York',
}

// Object.keys() - returns array of keys
console.log(Object.keys(person)) // Output: ['name', 'age', 'city']

// Object.values() - returns array of values
console.log(Object.values(person)) // Output: ['John', 30, 'New York']

// Object.entries() - returns array of [key, value] pairs
console.log(Object.entries(person)) // Output: [['name', 'John'], ['age', 30], ['city', 'New York']]
```

## 2. Arrays

Arrays are ordered collections of values:

```javascript
// Array creation
const fruits = ['apple', 'banana', 'orange']
const numbers = [1, 2, 3, 4, 5]
const mixed = [1, 'hello', true, { name: 'John' }]

// Accessing elements
console.log(fruits[0]) // Output: 'apple'
console.log(fruits[1]) // Output: 'banana'

// Modifying elements
fruits[0] = 'grape'
console.log(fruits) // Output: ['grape', 'banana', 'orange']
```

### Array Methods

```javascript
const fruits = ['apple', 'banana', 'orange']

// push() - adds to end
fruits.push('grape')
console.log(fruits) // Output: ['apple', 'banana', 'orange', 'grape']

// pop() - removes from end
const lastFruit = fruits.pop()
console.log(lastFruit) // Output: 'grape'
console.log(fruits) // Output: ['apple', 'banana', 'orange']

// shift() - removes from beginning
const firstFruit = fruits.shift()
console.log(firstFruit) // Output: 'apple'
console.log(fruits) // Output: ['banana', 'orange']

// unshift() - adds to beginning
fruits.unshift('mango')
console.log(fruits) // Output: ['mango', 'banana', 'orange']
```

### Array Iteration Methods

```javascript
const numbers = [1, 2, 3, 4, 5]

// map() - transforms each element
const doubled = numbers.map((num) => num * 2)
console.log(doubled) // Output: [2, 4, 6, 8, 10]

// filter() - creates new array with elements that pass test
const evenNumbers = numbers.filter((num) => num % 2 === 0)
console.log(evenNumbers) // Output: [2, 4]

// reduce() - reduces array to single value
const sum = numbers.reduce((total, num) => total + num, 0)
console.log(sum) // Output: 15

// forEach() - executes function for each element
numbers.forEach((num) => console.log(num * 2))
// Output:
// 2
// 4
// 6
// 8
// 10
```

## 3. Array and Object Destructuring

```javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5]
console.log(first) // Output: 1
console.log(second) // Output: 2
console.log(rest) // Output: [3, 4, 5]

// Object destructuring
const { name, age, ...otherProps } = {
  name: 'John',
  age: 30,
  city: 'New York',
  occupation: 'Developer',
}
console.log(name) // Output: 'John'
console.log(age) // Output: 30
console.log(otherProps) // Output: { city: 'New York', occupation: 'Developer' }
```

## Running JavaScript Code

To see the output of your JavaScript code, you can use the `console.log()` function:

```javascript
// Example of using objects and arrays
const user = {
  name: 'John',
  scores: [85, 90, 95],
}

console.log(`User: ${user.name}`)
console.log(`Scores: ${user.scores.join(', ')}`)
```

To run a JavaScript file using Node.js, open your terminal and use the following command:

```bash
node <filename>.js
```

For example, to run a file named `objects-arrays.js`:

```bash
node objects-arrays.js
```

## Practice Exercises

1. Create an object representing a book:

```javascript
const book = {
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  year: 1925,
  isAvailable: true,
}

console.log(`Book: ${book.title} by ${book.author}`)
```

2. Create an array of numbers and use array methods:

```javascript
const numbers = [1, 2, 3, 4, 5]

// Double each number
const doubled = numbers.map((num) => num * 2)
console.log('Doubled:', doubled)

// Get even numbers
const evenNumbers = numbers.filter((num) => num % 2 === 0)
console.log('Even numbers:', evenNumbers)

// Calculate sum
const sum = numbers.reduce((total, num) => total + num, 0)
console.log('Sum:', sum)
```

## Common Pitfalls to Avoid

1. Mutating Objects Unexpectedly

```javascript
// Wrong - mutating original object
const user = { name: 'John' }
const userCopy = user
userCopy.name = 'Jane'
console.log(user.name) // Output: 'Jane'

// Correct - create a new object
const user = { name: 'John' }
const userCopy = { ...user }
userCopy.name = 'Jane'
console.log(user.name) // Output: 'John'
```

2. Array Methods that Modify Original Array

```javascript
// Wrong - modifying original array
const numbers = [1, 2, 3]
const reversed = numbers.reverse()
console.log(numbers) // Output: [3, 2, 1]

// Correct - create a new array
const numbers = [1, 2, 3]
const reversed = [...numbers].reverse()
console.log(numbers) // Output: [1, 2, 3]
```

3. Using Array Methods on Objects

```javascript
// Wrong - trying to use array methods on objects
const obj = { a: 1, b: 2 }
obj.push(3) // Error: obj.push is not a function

// Correct - use appropriate object methods
const obj = { a: 1, b: 2 }
obj.c = 3
```
