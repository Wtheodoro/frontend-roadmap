let products = []
let id = 1

const addProduct = (name, price, category, stock) => {
    if (price <= 0 || stock < 0) {
        console.log('Fatal Error: Price and stock must be positive numbers\n')
        return
    }

    const product = {
        id: id++,
        name,
        price,
        category,
        stock,
    }

    products.push(product)
    console.log(`Added "${name}" successfully!\n`)
    return true
}

const removeProduct = (id) => {
    const findProduct = products.find((product) => product.id === id)
        if (!findProduct) {
            console.log(`The ID "${id}" is not found!\n`)
            return false
        }


    products = products.filter((product) => product.id !== id)
    console.log(`The ID "${findProduct.id}" is found!\nThe product is removed sucessfully!\n`)
    return true
}

const updateStock = (id, newStock) => {
    const findProduct = products.find((product) => product.id === id)
    if (!findProduct) {
        console.log(`The ID "${id}" is not found!\n`)
        return false
    }

    if (newStock <= 0) {
        console.log("Invalid value!\nThe value cannot be negative.\n")
        return false
    }
    
    findProduct.stock = newStock
    console.log(`The product "${findProduct.name}" has been updated, \nThe new stock value is "${findProduct.stock}"\n`)
}

const searchProducts = (query) => {
    const filterProducts = products.filter((product) => product.name === query || product.category === query)
        if (filterProducts.length === 0) {
            console.log("Product name or category not found!\n")
            return
        }

        console.log(`Here! Look what we found for "${query}"`)
        console.log(filterProducts)
        console.log("\n")
}

const getTotalValue = () => {
    let total = 0
    
    products.forEach((item)=>{
        const currentItemPrice = item.price * item.stock
        total = total + currentItemPrice
    })

    console.log(`Your stock balance is ${"$ " + total.toFixed(2)}\n`)
}

const getLowStockProducts = () => {
    const filteredStock = products.filter((product) => product.stock <= 5)
    if (filteredStock.length !== 0) {
        console.log(`This products is bellow to 5!`)
        console.log(filteredStock)
        console.log("Buy more?\n")
        return filteredStock
    }
}

const displayProducts = () => {
    if (products.length === 0) {
        console.log('You inventory is empty!\n')
        return
    }

    console.log('\nCurrent inventory:')
    console.log('----------------------------------------')

    products.forEach((product) => {
        const currentItemPrice = product.price * product.stock
        console.log(`
        ID: ${product.id}
        Name: ${product.name}
        Unit Price: ${"$ " + product.price}
        Category: ${product.category}
        Stock: ${product.stock}
        Balance: ${currentItemPrice.toFixed(2)}\n`) 
    })
    getTotalValue()
    console.log('----------------------------------------\n')
}

console.log("Welcome to the inventory system!\n")

addProduct('Desktop', -999.99, 'Electronics', 4) 
addProduct('Laptop', 999.99, 'Electronics', 4) 
addProduct('Mouse', 29.99, 'Electronics', 20) 
addProduct('Desk Chair', 199.99, 'Furniture', 5) 
addProduct('Coffee Maker', 79.99, 'Appliances', 15)

removeProduct(3)

removeProduct(300)

updateStock(2, 30)

updateStock(900, 30)

updateStock(2, -30)

searchProducts("Electronics")

searchProducts("Coffee Maker")

searchProducts("ErrorTest")

getTotalValue()

getLowStockProducts()

displayProducts()

removeProduct(1)

removeProduct(2)

removeProduct(4)

displayProducts()