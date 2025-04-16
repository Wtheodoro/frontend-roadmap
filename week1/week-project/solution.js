// Simple Product Inventory System

let products = []
let nextId = 1

function addProduct(name, price, category, stock) {
  // Validate inputs
  if (price <= 0 || stock < 0) {
    console.log('❌ Error: Price and stock must be positive numbers')
    return false
  }

  // Create product object
  const product = {
    id: nextId++,
    name,
    price,
    category,
    stock,
  }

  // Add to products array
  products.push(product)
  console.log(`✅ Product "${name}" added successfully!`)
  return true
}

function removeProduct(id) {
  // Check if product exists
  const productExists = products.some((product) => product.id === id)

  if (!productExists) {
    console.log('❌ Product not found!')
    return false
  }

  // Remove product using filter
  products = products.filter((product) => product.id !== id)
  console.log('✅ Product removed successfully!')
  return true
}

function updateStock(id, newStock) {
  // Find product
  const product = products.find((product) => product.id === id)

  // Check if product exists
  if (!product) {
    console.log('❌ Product not found!')
    return false
  }

  // Validate new stock
  if (newStock < 0) {
    console.log('❌ Stock cannot be negative!')
    return false
  }

  // Update stock
  product.stock = newStock
  console.log(`✅ Stock updated for "${product.name}"!`)
  return true
}

function searchProducts(query) {
  // Convert query to lowercase for case-insensitive search
  query = query.toLowerCase()

  // Filter products
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
  )
}

function getTotalValue() {
  return products.reduce(
    (total, product) => total + product.price * product.stock,
    0
  )
}

function getLowStockProducts(threshold = 5) {
  return products.filter((product) => product.stock < threshold)
}

function displayProducts() {
  if (products.length === 0) {
    console.log('📦 No products in inventory!')
    return
  }

  console.log('\n📦 Current Inventory:')
  console.log('----------------------------------------')

  products.forEach((product) => {
    console.log(`
      ID: ${product.id}
      Name: ${product.name}
      Price: $${product.price.toFixed(2)}
      Category: ${product.category}
      Stock: ${product.stock}
    ----------------------------------------`)
  })
}

// Example usage
console.log('🚀 Starting Simple Product Inventory System\n')

// Adding sample products
addProduct('Laptop', 999.99, 'Electronics', 10)
addProduct('Mouse', 29.99, 'Electronics', 20)
addProduct('Desk Chair', 199.99, 'Furniture', 5)
addProduct('Coffee Maker', 79.99, 'Appliances', 15)

// Display all products
displayProducts()

// Search for products
console.log("\n🔍 Searching for 'electronics':")
const electronicsProducts = searchProducts('electronics')
electronicsProducts.forEach((product) => {
  console.log(`- ${product.name} ($${product.price})`)
})

// Get low stock products
console.log('\n⚠️ Low Stock Products:')
const lowStock = getLowStockProducts()
lowStock.forEach((product) => {
  console.log(`- ${product.name}: ${product.stock} units`)
})

// Get total inventory value
console.log(`\n💰 Total Inventory Value: $${getTotalValue().toFixed(2)}`)

// Update stock
console.log('\n📝 Updating stock for Laptop:')
updateStock(1, 8)

// Display updated inventory
displayProducts()
