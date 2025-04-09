# Week 1 - Wednesday: Loops

## Introduction

Loops are used to execute a block of code multiple times. In JavaScript, we have several types of loops and array methods for iteration.

## 1. for Loop

The most common loop in JavaScript:

```javascript
// Basic for loop
for (let i = 0; i < 5; i++) {
  console.log(`Iteration ${i}`)
}

// for...of loop (for arrays and other iterables)
const fruits = ['apple', 'banana', 'orange']
for (const fruit of fruits) {
  console.log(fruit)
}

// for...in loop (for object properties)
const person = {
  name: 'John',
  age: 30,
  city: 'New York',
}
for (const key in person) {
  console.log(`${key}: ${person[key]}`)
}
```

## 2. while Loop

Executes a block of code while a condition is true:

```javascript
// Basic while loop
let count = 0
while (count < 5) {
  console.log(`Count: ${count}`)
  count++
}

// do...while loop (executes at least once)
let i = 0
do {
  console.log(`Value: ${i}`)
  i++
} while (i < 5)
```

## 3. Array Methods

Modern JavaScript provides powerful array methods for iteration:

```javascript
// forEach - executes a function for each element
const numbers = [1, 2, 3, 4, 5]
numbers.forEach((number, index) => {
  console.log(`Number ${number} is at index ${index}`)
})

// map - creates a new array with the results
const doubled = numbers.map((number) => number * 2)
console.log(doubled) // [2, 4, 6, 8, 10]

// filter - creates a new array with elements that pass a test
const evenNumbers = numbers.filter((number) => number % 2 === 0)
console.log(evenNumbers) // [2, 4]

// reduce - reduces the array to a single value
const sum = numbers.reduce((acc, curr) => acc + curr, 0)
console.log(sum) // 15
```

## 4. Loop Control

```javascript
// break - exits the loop
for (let i = 0; i < 10; i++) {
  if (i === 5) break
  console.log(i)
}

// continue - skips the current iteration
for (let i = 0; i < 5; i++) {
  if (i === 2) continue
  console.log(i)
}
```

## 5. Nested Loops

```javascript
// Example of nested loops
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    console.log(`i: ${i}, j: ${j}`)
  }
}
```

## Running JavaScript Code

To see the output of your JavaScript code, you can use the `console.log()` function:

```javascript
// Example of using console.log with loops
const numbers = [1, 2, 3, 4, 5]

// Using for loop
for (let i = 0; i < numbers.length; i++) {
  console.log(`Number at index ${i}: ${numbers[i]}`)
}

// Using forEach
numbers.forEach((number, index) => {
  console.log(`Number at index ${index}: ${number}`)
})
```

To run a JavaScript file using Node.js, open your terminal and use the following command:

```bash
node <filename>.js
```

For example, to run a file named `loops.js`:

```bash
node loops.js
```

## Practice Exercises

1. Create a loop that prints numbers from 1 to 10:

```javascript
for (let i = 1; i <= 10; i++) {
  console.log(i)
}
```

2. Create a loop that prints even numbers from 2 to 20:

```javascript
for (let i = 2; i <= 20; i += 2) {
  console.log(i)
}
```

3. Use forEach to print greetings for an array of names:

```javascript
const names = ['John', 'Jane', 'Bob']
names.forEach((name) => {
  console.log(`Hello, ${name}!`)
})
```

4. Use map to transform numbers into their squares:

```javascript
const numbers = [1, 2, 3, 4, 5]
const squares = numbers.map((num) => num * num)
console.log(squares) // [1, 4, 9, 16, 25]
```

5. Create a grade calculator using loops:

```javascript
const grades = [85, 92, 78, 90, 88]
let sum = 0
let max = grades[0]
let min = grades[0]

// Calculate average
for (let i = 0; i < grades.length; i++) {
  sum += grades[i]
  if (grades[i] > max) max = grades[i]
  if (grades[i] < min) min = grades[i]
}

const average = sum / grades.length
console.log(`Average: ${average}`)
console.log(`Highest grade: ${max}`)
console.log(`Lowest grade: ${min}`)
```

## Common Pitfalls to Avoid

1. Infinite Loops

```javascript
// Wrong - will cause an infinite loop
let i = 0
while (i < 5) {
  console.log(i)
  // Missing i++
}

// Correct
let i = 0
while (i < 5) {
  console.log(i)
  i++
}
```

2. Modifying Array During Iteration

```javascript
// Wrong - can cause unexpected behavior
const numbers = [1, 2, 3, 4, 5]
for (let i = 0; i < numbers.length; i++) {
  numbers.push(numbers[i] * 2)
}

// Correct - create a new array
const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map((num) => num * 2)
```

3. Using var in Loops

```javascript
// Wrong - var is function-scoped
for (var i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100)
}

// Correct - use let (block-scoped)
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 100)
}
```
