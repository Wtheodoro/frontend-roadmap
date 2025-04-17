# Object Manipulation in JavaScript

## Introduction

Objects are one of the most fundamental data structures in JavaScript. Today, we'll explore powerful methods for working with objects: `Object.keys()`, `Object.values()`, `Object.entries()`, and `Object.fromEntries()`. These methods allow us to extract, transform, and manipulate object properties efficiently.

## Object.keys()

The `Object.keys()` method returns an array of a given object's own enumerable property names.

### Syntax

```javascript
Object.keys(obj)
```

### Example

```javascript
const person = {
  name: 'John',
  age: 30,
  city: 'New York',
}

const keys = Object.keys(person)
console.log(keys) // ["name", "age", "city"]
```

### Common Use Cases

1. **Iterating over object properties**:

   ```javascript
   const person = {
     name: 'John',
     age: 30,
     city: 'New York',
   }

   Object.keys(person).forEach((key) => {
     console.log(`${key}: ${person[key]}`)
   })
   // name: John
   // age: 30
   // city: New York
   ```

2. **Checking if an object has specific properties**:

   ```javascript
   const person = {
     name: 'John',
     age: 30,
     city: 'New York',
   }

   const hasName = Object.keys(person).includes('name')
   console.log(hasName) // true

   const hasEmail = Object.keys(person).includes('email')
   console.log(hasEmail) // false
   ```

3. **Counting object properties**:

   ```javascript
   const person = {
     name: 'John',
     age: 30,
     city: 'New York',
   }

   const propertyCount = Object.keys(person).length
   console.log(propertyCount) // 3
   ```

## Object.values()

The `Object.values()` method returns an array of a given object's own enumerable property values.

### Syntax

```javascript
Object.values(obj)
```

### Example

```javascript
const person = {
  name: 'John',
  age: 30,
  city: 'New York',
}

const values = Object.values(person)
console.log(values) // ["John", 30, "New York"]
```

### Common Use Cases

1. **Finding values of a specific type**:

   ```javascript
   const user = {
     id: 1,
     name: 'John Doe',
     email: 'john@example.com',
     age: 30,
     isActive: true,
   }

   // Find all string values
   const stringValues = Object.values(user).filter(
     (value) => typeof value === 'string'
   )
   console.log(stringValues) // ["John Doe", "john@example.com"]

   // Find all boolean values
   const booleanValues = Object.values(user).filter(
     (value) => typeof value === 'boolean'
   )
   console.log(booleanValues) // [true]
   ```

2. **Calculating with numeric values**:

   ```javascript
   const scores = {
     Alice: 85,
     Bob: 92,
     Charlie: 78,
     David: 95,
   }

   // Calculate average score
   const averageScore =
     Object.values(scores).reduce((sum, score) => sum + score, 0) /
     Object.values(scores).length
   console.log(averageScore) // 87.5
   ```

## Object.entries()

The `Object.entries()` method returns an array of a given object's own enumerable [key, value] pairs.

### Syntax

```javascript
Object.entries(obj)
```

### Example

```javascript
const person = {
  name: 'John',
  age: 30,
  city: 'New York',
}

const entries = Object.entries(person)
console.log(entries)
// [
//   ["name", "John"],
//   ["age", 30],
//   ["city", "New York"]
// ]
```

### Common Use Cases

1. **Converting objects to arrays for manipulation**:

   ```javascript
   const person = {
     name: 'John',
     age: 30,
     city: 'New York',
   }

   // Convert to array of strings like "name: John"
   const formattedEntries = Object.entries(person).map(
     ([key, value]) => `${key}: ${value}`
   )
   console.log(formattedEntries)
   // ["name: John", "age: 30", "city: New York"]
   ```

2. **Filtering object properties**:

   ```javascript
   const user = {
     id: 1,
     name: 'John Doe',
     email: 'john@example.com',
     age: 30,
     isActive: true,
   }

   // Get only string properties
   const stringProperties = Object.fromEntries(
     Object.entries(user).filter(([_, value]) => typeof value === 'string')
   )
   console.log(stringProperties)
   // { name: "John Doe", email: "john@example.com" }
   ```

## Object.fromEntries()

The `Object.fromEntries()` method transforms a list of key-value pairs into an object.

### Syntax

```javascript
Object.fromEntries(iterable)
```

### Example

```javascript
const entries = [
  ['name', 'Jane'],
  ['age', 25],
  ['city', 'Boston'],
]

const person = Object.fromEntries(entries)
console.log(person)
// { name: "Jane", age: 25, city: "Boston" }
```

### Common Use Cases

1. **Creating objects from arrays**:

   ```javascript
   const keys = ['name', 'age', 'city']
   const values = ['Jane', 25, 'Boston']

   // Create object from separate arrays
   const person = Object.fromEntries(
     keys.map((key, index) => [key, values[index]])
   )
   console.log(person)
   // { name: "Jane", age: 25, city: "Boston" }
   ```

2. **Transforming object properties**:

   ```javascript
   const user = {
     name: 'John Doe',
     email: 'john@example.com',
     age: 30,
   }

   // Transform all string values to uppercase
   const transformedUser = Object.fromEntries(
     Object.entries(user).map(([key, value]) => [
       key,
       typeof value === 'string' ? value.toUpperCase() : value,
     ])
   )
   console.log(transformedUser)
   // { name: "JOHN DOE", email: "JOHN@EXAMPLE.COM", age: 30 }
   ```

## Practical Examples

### Example 1: Filtering Object Properties

```javascript
// Function to filter object properties based on a predicate
const filterObject = (obj, predicate) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => predicate(value))
  )
}

const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  isActive: true,
}

// Get only string properties
const stringProperties = filterObject(
  user,
  (value) => typeof value === 'string'
)
console.log(stringProperties)
// { name: "John Doe", email: "john@example.com" }

// Get only properties with values greater than 20
const numericProperties = filterObject(
  user,
  (value) => typeof value === 'number' && value > 20
)
console.log(numericProperties)
// { age: 30 }
```

### Example 2: Transforming Object Values

```javascript
// Function to transform object values using a provided function
const transformObject = (obj, transformFn) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, transformFn(value)])
  )
}

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
}

// Convert all string values to uppercase
const uppercaseStrings = transformObject(user, (value) =>
  typeof value === 'string' ? value.toUpperCase() : value
)
console.log(uppercaseStrings)
// { name: "JOHN DOE", email: "JOHN@EXAMPLE.COM", age: 30 }

// Double all numeric values
const doubledNumbers = transformObject(user, (value) =>
  typeof value === 'number' ? value * 2 : value
)
console.log(doubledNumbers)
// { name: "John Doe", email: "john@example.com", age: 60 }
```

### Example 3: Merging Objects with Custom Logic

```javascript
// Function to merge objects with custom logic for handling conflicts
const mergeObjects = (target, source, mergeFn) => {
  return Object.fromEntries(
    Object.entries(target).map(([key, value]) => {
      if (key in source) {
        return [key, mergeFn(value, source[key])]
      }
      return [key, value]
    })
  )
}

const user1 = { name: 'John', age: 30, score: 100 }
const user2 = { name: 'John', age: 31, score: 150 }

// Merge objects, keeping the higher score
const mergedUser = mergeObjects(user1, user2, (a, b) => Math.max(a, b))
console.log(mergedUser)
// { name: "John", age: 30, score: 150 }
```

## Practice Exercises

1. Create a function that returns all keys of an object that have a specific value type.
2. Create a function that transforms all values of an object using a provided function.
3. Create a function that finds all properties in an object that match a specific condition.
4. Create a function that creates a new object with only the specified keys.
5. Create a function that counts the occurrences of each value type in an object.

## Solutions

### Exercise 1: Get Keys by Value Type

```javascript
function getKeysByType(obj, type) {
  return Object.entries(obj)
    .filter(([_, value]) => typeof value === type)
    .map(([key]) => key)
}

const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  isActive: true,
}

console.log(getKeysByType(user, 'string')) // ["name", "email"]
console.log(getKeysByType(user, 'number')) // ["id", "age"]
console.log(getKeysByType(user, 'boolean')) // ["isActive"]
```

### Exercise 2: Transform Values

```javascript
function transformValues(obj, transformFn) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, transformFn(value)])
  )
}

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
}

// Convert all strings to uppercase
const uppercaseUser = transformValues(user, (value) =>
  typeof value === 'string' ? value.toUpperCase() : value
)
console.log(uppercaseUser)
// { name: "JOHN DOE", email: "JOHN@EXAMPLE.COM", age: 30 }

// Double all numbers
const doubledUser = transformValues(user, (value) =>
  typeof value === 'number' ? value * 2 : value
)
console.log(doubledUser)
// { name: "John Doe", email: "john@example.com", age: 60 }
```

### Exercise 3: Find Properties by Condition

```javascript
function findPropertiesByCondition(obj, condition) {
  return Object.entries(obj)
    .filter(([_, value]) => condition(value))
    .map(([key]) => key)
}

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  score: 85,
}

// Find properties with values greater than 20
console.log(
  findPropertiesByCondition(
    user,
    (value) => typeof value === 'number' && value > 20
  )
)
// ["age", "score"]

// Find properties with values that are strings longer than 10 characters
console.log(
  findPropertiesByCondition(
    user,
    (value) => typeof value === 'string' && value.length > 10
  )
)
// ["email"]
```

### Exercise 4: Pick Specific Keys

```javascript
function pickKeys(obj, keys) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keys.includes(key))
  )
}

const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  isActive: true,
}

console.log(pickKeys(user, ['name', 'email']))
// { name: "John Doe", email: "john@example.com" }

console.log(pickKeys(user, ['id', 'age', 'isActive']))
// { id: 1, age: 30, isActive: true }
```

### Exercise 5: Count Value Types

```javascript
function countValueTypes(obj) {
  return Object.values(obj).reduce((counts, value) => {
    const type = typeof value
    counts[type] = (counts[type] || 0) + 1
    return counts
  }, {})
}

const user = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  isActive: true,
  scores: [85, 90, 95],
}

console.log(countValueTypes(user))
// { number: 1, string: 2, boolean: 1, object: 1 }
```

## Conclusion

Object manipulation methods like `Object.keys()`, `Object.values()`, `Object.entries()`, and `Object.fromEntries()` are powerful tools that make your code more readable, maintainable, and functional. By mastering these methods, you'll be able to handle complex object transformations with ease.

Remember:

- `Object.keys()` gets all property names
- `Object.values()` gets all property values
- `Object.entries()` gets all [key, value] pairs
- `Object.fromEntries()` creates an object from entries

These methods are particularly useful when working with APIs, form data, and complex data structures. Practice these methods regularly to become comfortable with them, as they are essential for modern JavaScript development.
