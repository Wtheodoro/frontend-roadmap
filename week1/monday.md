# Week 1 - Monday: Variables, Data Types, and Operators

## Variables

Variables are containers for storing data values. In JavaScript, we have three ways to declare variables:

### 1. `var` (not recommended in modern JavaScript)

```javascript
var name = 'John'
var age = 25
```

### 2. `let` (recommended for variables that will change)

```javascript
let score = 0
score = 100 // Can be reassigned
```

### 3. `const` (recommended for values that won't change)

```javascript
const PI = 3.14159
// PI = 3.14; // Error: Cannot reassign a constant
```

## Data Types

JavaScript has several data types:

### 1. String

```javascript
const name = 'Walison'
const message = 'Hello 世界'
const template = `Hello ${name}` // Template literal
```

### 2. Number

```javascript
const age = 31
const price = 99.99
const infinity = Infinity
const notANumber = NaN
```

### 3. Boolean

```javascript
const isActive = true
const isLoggedIn = false
```

### 4. Undefined

```javascript
let undefinedVariable
console.log(undefinedVariable) // undefined
```

### 5. Null

```javascript
const emptyValue = null
```

### 6. Object

```javascript
const person = {
  name: 'Walison',
  age: 31,
  isStudent: true,
}
```

### 7. Array (special type of object)

```javascript
const fruits = ['apple', 'banana', 'orange']
const mixed = [1, 'hello', true, { name: 'John' }]
```

## Operators

### 1. Arithmetic Operators

```javascript
// Addition
let sum = 5 + 3 // 8

// Subtraction
let difference = 5 - 3 // 2

// Multiplication
let product = 5 * 3 // 15

// Division
let quotient = 6 / 2 // 3

// Modulus (remainder)
let remainder = 5 % 2 // 1

// Increment
let count = 5
count++ // 6
++count // 7

// Decrement
count-- // 6
--count // 5
```

### 2. Assignment Operators

```javascript
let x = 5
x = x + 3 // same as x += 3
x = x - 2 // same as x -= 2
x = x * 4 // same as x *= 4
x = x / 2 // same as x /= 2
x = x % 3 // same as x %= 3
```

### 3. Comparison Operators

```javascript
// Equal to
5 == '5' // true (loose equality)
5 === '5' // false (strict equality)

// Not equal to
5 != '5' // false
5 !== '5' // true

// Greater than
5 > 3 // true

// Less than
3 < 5 // true

// Greater than or equal to
5 >= 5 // true

// Less than or equal to
5 <= 5 // true
```

### 4. Logical Operators

```javascript
// AND (&&)
true && true // true
true && false // false

// OR (||)
true || false // true
false || false // false

// NOT (!)
!true // false
!false // true
```

## Type Checking

```javascript
// typeof operator
typeof 'hello' // "string"
typeof 42 // "number"
typeof 42.7 // "number"
typeof true // "boolean"
typeof undefined // "undefined"
typeof null // "object" (this is a known JavaScript quirk)
typeof {} // "object"
typeof [] // "object" (arrays are objects in JavaScript)
```

## Running JavaScript Code

To see the output of your JavaScript code, you can use the `console.log()` function:

```javascript
// Example of using console.log
const name = 'John'
console.log('Hello,', name) // Output: Hello, John

// You can log multiple values
const age = 25
const isStudent = true
console.log('Name:', name, 'Age:', age, 'Is Student:', isStudent)
// Output: Name: John Age: 25 Is Student: true

// You can log objects and arrays
const person = { name: 'John', age: 25 }
console.log(person)
// Output: { name: 'John', age: 25 }

const fruits = ['apple', 'banana', 'orange']
console.log(fruits)
// Output: ['apple', 'banana', 'orange']
```

To run a JavaScript file using Node.js, open your terminal and use the following command:

```bash
node <filename>.js
```

For example, to run a file named `exercise.js`:

```bash
node exercise.js
```

This will execute the JavaScript code in the file and display any `console.log()` output in the terminal.

## Practice Exercises

1. Create variables for your personal information:

```javascript
const name = 'Your Name'
const age = 25
const isStudent = true
const hobbies = ['reading', 'coding', 'gaming']
```

2. Perform basic calculations:

```javascript
const price = 99.99
const quantity = 3
const total = price * quantity
const discount = total * 0.1 // 10% discount
const finalPrice = total - discount
```

3. Compare values:

```javascript
const score = 85
const passingScore = 60
const isPassing = score >= passingScore
const isExcellent = score >= 90
```

## Common Pitfalls to Avoid

1. Using `var` instead of `let` or `const`
2. Using loose equality (`==`) instead of strict equality (`===`)
3. Trying to reassign values to `const` variables

## Additional Resources

- [MDN: Variables](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations)
- [MDN: Data Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [MDN: Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)
