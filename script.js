 console.log('script.js loaded');

// Azure Maps integration
const subscriptionKey = 'YOUR_AZURE_MAPS_KEY'; // Placeholder for API key

let map;
let markers = [];

function initMap() {
    try {
        map = new atlas.Map('map', {
            center: [-74.0060, 40.7128], // Default to New York
            zoom: 12,
            language: 'en-US',
            authOptions: {
                authType: atlas.AuthenticationType.subscriptionKey,
                subscriptionKey: subscriptionKey
            }
        });
        console.log('Map initialized successfully');
    } catch (error) {
        console.error('Map initialization failed:', error);
        const mapDiv = document.getElementById('map');
        mapDiv.innerHTML = '<p style="text-align: center; padding: 20px;">Map could not be loaded. Please check your Azure Maps API key.</p>';
    }
}

function clearMarkers() {
    markers.forEach(marker => map.markers.remove(marker));
    markers = [];
}

function addShopMarkers(shops) {
    clearMarkers();
    shops.forEach(shop => {
        const marker = new atlas.HtmlMarker({
            htmlContent: '<div style="background-color: red; width: 20px; height: 20px; border-radius: 50%;"></div>',
            position: [shop.location.lng, shop.location.lat]
        });
        map.markers.add(marker);
        markers.push(marker);
    });
    if (shops.length > 0) {
        map.setCamera({
            center: [shops[0].location.lng, shops[0].location.lat],
            zoom: 14
        });
    }
}

function displayResults(shops) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (shops.length === 0) {
        resultsDiv.innerHTML = '<p>No shops found with this product.</p>';
        return;
    }
    shops.forEach(shop => {
        const shopDiv = document.createElement('div');
        shopDiv.className = 'shop';
        shopDiv.innerHTML = `
            <h3>${shop.name}</h3>
            <p>Products: ${shop.products.join(', ')}</p>
        `;
        resultsDiv.appendChild(shopDiv);
    });
}

document.getElementById('search-btn').addEventListener('click', () => {
    const product = document.getElementById('product-search').value.trim();
    if (!product) return;
    const foundShops = findShopsWithProduct(product);
    displayResults(foundShops);
    addShopMarkers(foundShops);
});

// Initialize map when page loads
window.onload = initMap;
