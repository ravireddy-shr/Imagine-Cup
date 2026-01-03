// Shopkeeper dashboard functionality
document.addEventListener('DOMContentLoaded', () => {
    const shopSelect = document.getElementById('shop-select');
    const productForm = document.getElementById('product-form');
    const shopProductsDiv = document.getElementById('shop-products');

    // Populate shop select dropdown
    shops.forEach(shop => {
        const option = document.createElement('option');
        option.value = shop.id;
        option.textContent = shop.name;
        shopSelect.appendChild(option);
    });

    // Display products for selected shop
    shopSelect.addEventListener('change', () => {
        const selectedShopId = parseInt(shopSelect.value);
        const selectedShop = shops.find(shop => shop.id === selectedShopId);
        if (selectedShop) {
            displayShopProducts(selectedShop);
        } else {
            shopProductsDiv.innerHTML = '';
        }
    });

    // Handle form submission to add product
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedShopId = parseInt(shopSelect.value);
        const productName = document.getElementById('product-name').value.trim();
        if (selectedShopId && productName) {
            const selectedShop = shops.find(shop => shop.id === selectedShopId);
            if (selectedShop && !selectedShop.products.includes(productName)) {
                selectedShop.products.push(productName);
                displayShopProducts(selectedShop);
                document.getElementById('product-name').value = '';
                alert('Product added successfully!');
            } else {
                alert('Product already exists or shop not selected.');
            }
        }
    });

    function displayShopProducts(shop) {
        shopProductsDiv.innerHTML = `<h2>Products in ${shop.name}</h2>`;
        const ul = document.createElement('ul');
        shop.products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = product;
            ul.appendChild(li);
        });
        shopProductsDiv.appendChild(ul);
    }
});
