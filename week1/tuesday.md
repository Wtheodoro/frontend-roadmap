# Week 1 - Tuesday: Conditional Structures

## Introduction

Conditional structures allow your code to make decisions and execute different code blocks based on conditions. In JavaScript, we have several ways to implement conditional logic:

## 1. if Statement

The most basic conditional structure is the `if` statement:

```javascript
// Basic if statement
const age = 18

if (age >= 18) {
  console.log('You are an adult')
}

// if with else
if (age >= 18) {
  console.log('You are an adult')
} else {
  console.log('You are a minor')
}

// if-else if-else
const score = 85

if (score >= 90) {
  console.log('Grade: A')
} else if (score >= 80) {
  console.log('Grade: B')
} else if (score >= 70) {
  console.log('Grade: C')
} else {
  console.log('Grade: F')
}
```

## 2. Ternary Operator

A shorthand way to write simple if-else statements:

```javascript
// Ternary operator
const age = 20
const status = age >= 18 ? 'adult' : 'minor'

// Nested ternary (avoid for readability)
const score = 85
const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'F'
```

## 3. switch Statement

Useful when you have multiple conditions based on the same value:

```javascript
// Basic switch
const day = 'Monday'

switch (day) {
  case 'Monday':
    console.log('Start of the work week')
    break
  case 'Friday':
    console.log('End of the work week')
    break
  case 'Saturday':
  case 'Sunday':
    console.log('Weekend')
    break
  default:
    console.log('Midweek')
}

// Switch with fall-through (intentional)
const month = 2
let daysInMonth

switch (month) {
  case 4:
  case 6:
  case 9:
  case 11:
    daysInMonth = 30
    break
  case 2:
    daysInMonth = 28 // Simplified for example
    break
  default:
    daysInMonth = 31
}
```

## 3. switch Statement

Useful when you have multiple conditions based on the same value:

```javascript
// Basic switch
const grade = 'B'

switch (grade) {
  case 'A':
    console.log('Excellent!')
    break
  case 'B':
    console.log('Good job!')
    break
  case 'C':
    console.log('Acceptable')
    break
  case 'D':
    console.log('Needs improvement')
    break
  case 'F':
    console.log('Failed')
    break
  default:
    console.log('Invalid grade')
}

// Switch with fall-through (intentional)
// Fall-through happens when you omit the break statement
// This allows multiple cases to execute the same code
const season = 'summer'
let activity

switch (season) {
  case 'spring':
  case 'summer':
    activity = 'Go to the beach'
    break
  case 'autumn':
    activity = 'Visit parks and watch leaves fall'
    break
  case 'winter':
    activity = 'Drink hot chocolate and wear a coat'
    break
  default:
    activity = 'Enjoy the day'
}

console.log(`In ${season}, you can ${activity}`)
```

## 4. Logical Operators in Conditionals

```javascript
// AND (&&)
const age = 25
const hasLicense = true

if (age >= 18 && hasLicense) {
  console.log('You can drive')
}

// OR (||)
const isWeekend = true
const isHoliday = false

if (isWeekend || isHoliday) {
  console.log('You can sleep in')
}

// NOT (!)
const isLoggedIn = false

if (!isLoggedIn) {
  console.log('Please log in')
}
```

## 5. Short-Circuit Evaluation

JavaScript uses short-circuit evaluation for logical operators:

```javascript
// Using && for conditional execution
const user = { name: 'John' }
const userName = user && user.name // Returns 'John'
const userAge = user && user.age // Returns undefined

// Using || for default values
const name = user.name || 'Guest' // Returns 'John'
const age = user.age || 18 // Returns 18 (default value)
```

## 6. Nullish Coalescing Operator (??)

Introduced in ES2020, it's similar to || but only falls back to the right-hand side when the left is `null` or `undefined`:

```javascript
const count = 0
console.log(count || 10) // 10 (because 0 is falsy)
console.log(count ?? 10) // 0 (because 0 is not null or undefined)

const name = null
console.log(name ?? 'Anonymous') // 'Anonymous'
```

## 7. Optional Chaining (?.)

Introduced in ES2020, allows safe access to nested properties:

```javascript
const user = {
  profile: {
    address: {
      street: '123 Main St',
    },
  },
}

// Without optional chaining
const street1 =
  user && user.profile && user.profile.address && user.profile.address.street

// With optional chaining
const street2 = user?.profile?.address?.street

// Both return '123 Main St', but the second is cleaner
```

## Running JavaScript Code

To see the output of your JavaScript code, you can use the `console.log()` function:

```javascript
// Example of using console.log with conditionals
const age = 20
const hasLicense = true

if (age >= 18 && hasLicense) {
  console.log('You can drive')
} else {
  console.log('You cannot drive')
}
```

To run a JavaScript file using Node.js, open your terminal and use the following command:

```bash
node <filename>.js
```

For example, to run a file named `conditionals.js`:

```bash
node conditionals.js
```

## Practice Exercises

1. Create a program that determines if a number is positive, negative, or zero:

```javascript
const number = 10

if (number > 0) {
  console.log('Positive')
} else if (number < 0) {
  console.log('Negative')
} else {
  console.log('Zero')
}
```

2. Create a program that determines the day of the week based on a number (1-7):

```javascript
const dayNumber = 3
let dayName

switch (dayNumber) {
  case 1:
    dayName = 'Monday'
    break
  case 2:
    dayName = 'Tuesday'
    break
  case 3:
    dayName = 'Wednesday'
    break
  case 4:
    dayName = 'Thursday'
    break
  case 5:
    dayName = 'Friday'
    break
  case 6:
    dayName = 'Saturday'
    break
  case 7:
    dayName = 'Sunday'
    break
  default:
    dayName = 'Invalid day'
}

console.log(`Day ${dayNumber} is ${dayName}`)
```

3. **User Access Control System**: Create a program that determines a user's access level in a web application based on their role and subscription status. The program should:
   - Check if the user is an admin (full access)
   - Check if the user is a premium subscriber with an active subscription (premium features)
   - Check if the user is a premium subscriber with an expired subscription (subscription expired)
   - Check if the user is a regular user with an active subscription (basic features)
   - Default to limited access for any other combination
   - Display the access level in a user-friendly message

```javascript
const userRole = 'premium'
const subscriptionActive = true
let accessLevel

if (userRole === 'admin') {
  accessLevel = 'Full access'
} else if (userRole === 'premium' && subscriptionActive) {
  accessLevel = 'Premium features'
} else if (userRole === 'premium' && !subscriptionActive) {
  accessLevel = 'Subscription expired'
} else if (userRole === 'user' && subscriptionActive) {
  accessLevel = 'Basic features'
} else {
  accessLevel = 'Limited access'
}

console.log(`User has: ${accessLevel}`)
```

## Common Pitfalls to Avoid

1. Forgetting the `break` statement in `switch` cases (causing fall-through)
2. Using `=` (assignment) instead of `==` or `===` (comparison) in conditions
3. Overusing nested ternaries, making code hard to read
4. Not considering falsy values (`0`, `''`, `false`, `null`, `undefined`, `NaN`)

## Additional Resources

- [MDN: if...else](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else)
- [MDN: switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
- [MDN: Conditional (ternary) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
- [MDN: Nullish coalescing operator (??)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)
- [MDN: Optional chaining (?.)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
