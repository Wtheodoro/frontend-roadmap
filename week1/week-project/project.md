# Week 1 Project: Simple Product Inventory System

## Objective

Create a simple console-based product inventory system that allows users to manage products using basic JavaScript concepts.

## Requirements

### Data Structure

- Use an array to store products
- Each product should be an object with the following properties:
  - `id` (number)
  - `name` (string)
  - `price` (number)
  - `category` (string)
  - `stock` (number)

### Functions to Implement

1. **addProduct(name, price, category, stock)**

   - Add a new product to the inventory
   - Validate that price and stock are positive numbers
   - Return true if successful, false otherwise

2. **removeProduct(id)**

   - Remove a product from the inventory by its ID
   - Return true if successful, false if product not found

3. **updateStock(id, newStock)**

   - Update the stock of a product by its ID
   - Validate that new stock is not negative
   - Return true if successful, false if product not found or invalid stock

4. **searchProducts(query)**

   - Search for products by name or category (case-insensitive)
   - Return an array of matching products

5. **getTotalValue()**

   - Calculate the total value of all products (price × stock)
   - Return the total value

6. **getLowStockProducts(threshold)**

   - Find products with stock below the threshold (default: 5)
   - Return an array of low stock products

7. **displayProducts()**
   - Display all products in a formatted way

## Example Usage

```javascript
// Add products
addProduct('Laptop', 999.99, 'Electronics', 10)
addProduct('Mouse', 29.99, 'Electronics', 20)
addProduct('Desk Chair', 199.99, 'Furniture', 5)
addProduct('Coffee Maker', 79.99, 'Appliances', 15)

// Display all products
displayProducts()

// Search for products
const electronicsProducts = searchProducts('electronics')
console.log('Electronics products:', electronicsProducts)

// Get low stock products
const lowStock = getLowStockProducts()
console.log('Low stock products:', lowStock)

// Get total inventory value
const totalValue = getTotalValue()
console.log('Total inventory value:', totalValue)

// Update stock
updateStock(1, 8)

// Display updated inventory
displayProducts()
```

## Evaluation Criteria

- Correct implementation of all required functions
- Proper validation of inputs
- Clean and readable code
- Efficient use of array methods (map, filter, reduce, etc.)
- Proper use of conditional statements and loops
