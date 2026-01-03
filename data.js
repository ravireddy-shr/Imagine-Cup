// Mock data for shops and products
const shops = [
    {
        id: 1,
        name: "Grocery Store A",
        location: { lat: 40.7128, lng: -74.0060 }, // New York coordinates as example
        products: ["Apple", "Banana", "Milk", "Bread"]
    },
    {
        id: 2,
        name: "Electronics Shop B",
        location: { lat: 40.7589, lng: -73.9851 }, // Near Times Square
        products: ["Laptop", "Phone", "Headphones", "Charger"]
    },
    {
        id: 3,
        name: "Clothing Store C",
        location: { lat: 40.7505, lng: -73.9934 }, // Midtown Manhattan
        products: ["Shirt", "Pants", "Shoes", "Hat"]
    },
    {
        id: 4,
        name: "Bookstore D",
        location: { lat: 40.7614, lng: -73.9776 }, // Central Park area
        products: ["Novel", "Textbook", "Magazine", "Notebook"]
    }
];

// Function to find shops that have a specific product
function findShopsWithProduct(product) {
    return shops.filter(shop => shop.products.some(p => p.toLowerCase().includes(product.toLowerCase())));
}
