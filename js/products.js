import { getAllProducts, getProductCategories, searchProducts } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const productsContainer = document.getElementById('productsContainer');
    const searchButton = document.getElementById('searchButton');
    const sortDropdown = document.getElementById('sortDropdown');
    const categoryDropdown = document.getElementById('categoryDropdown');
    const getAllProductsButton = document.getElementById('getAllProductsButton');

    let allProducts = [];
    let filteredProducts = [];

    try {
        const categories = await getProductCategories();
        populateCategories(categories);

        allProducts = await getAllProducts();
        filteredProducts = [...allProducts];
        renderProducts(filteredProducts);

        categoryDropdown.addEventListener('change', async (event) => {
            const selectedCategory = event.target.value;
        
            if (selectedCategory === 'all') {
                filteredProducts = [...allProducts];
            } else {
                try {
                    const formattedCategory = selectedCategory.toLowerCase().replace(/\s+/g, '-');
                    console.log(`Formatted Category: ${formattedCategory}`); 
        
                    const response = await fetch(`https://dummyjson.com/products/category/${formattedCategory}`);
                    console.log(`API Response Status: ${response.status}`);
        
                    if (!response.ok) {
                        throw new Error(`Failed to fetch products for the category: ${selectedCategory}`);
                    }
        
                    const data = await response.json();
                    filteredProducts = data.products;
                } catch (error) {
                    console.error("Error fetching category products:", error.message);
                    renderEmptyMessage(`Failed to load products for the selected category: ${selectedCategory}`);
                    filteredProducts = [];
                }
            }
        
            clearProducts();
            renderProducts(filteredProducts);
        });

        searchButton.addEventListener('click', async () => {
            const searchInput = document.getElementById('searchInput').value.trim();

            if (searchInput) {
                try {
                    const searchResults = await searchProducts(searchInput);
                    if (searchResults.length === 0) {
                        renderEmptyMessage("No products found for your search.");
                        filteredProducts = [];
                    } else {
                        filteredProducts = searchResults;
                    }
                } catch (error) {
                    console.error("Error searching products:", error.message);
                    renderEmptyMessage("An error occurred during the search.");
                    filteredProducts = [];
                }
            } else {
                alert('Please enter a search term.');
                return;
            }

            clearProducts();
            renderProducts(filteredProducts);
        });

        document.getElementById('searchInput').addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                searchButton.click();
            }
        });

        getAllProductsButton.addEventListener('click', async () => {
            try {
                filteredProducts = [...allProducts];
                clearProducts();
                renderProducts(filteredProducts);
            } catch (error) {
                console.error("Error fetching all products:", error.message);
                renderEmptyMessage("Failed to load all products.");
            }
        });

        sortDropdown.addEventListener('change', (event) => {
            const sortValue = event.target.value;

            if (filteredProducts.length === 0) return;

            if (sortValue === 'lowToHigh') {
                filteredProducts.sort((a, b) => a.price - b.price); 
            } else if (sortValue === 'highToLow') {
                filteredProducts.sort((a, b) => b.price - a.price);
            }

            clearProducts();
            renderProducts(filteredProducts);
        });

    } catch (error) {
        console.error("Error initializing products or categories:", error.message);
        renderEmptyMessage("Failed to load products.");
    }
});

const renderEmptyMessage = (message) => {
    const container = document.getElementById('productsContainer');
    container.innerHTML = `<p>${message}</p>`;
};


const clearProducts = () => {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';
};

const populateCategories = (categories) => {
    const dropdown = document.getElementById('categoryDropdown');
    dropdown.innerHTML = ''; 

    const defaultOption = document.createElement('option');
    defaultOption.value = 'all';
    defaultOption.textContent = 'All Categories';
    dropdown.appendChild(defaultOption);

    categories.forEach(category => {
        const categoryName = typeof category === 'object' ? category.name : category;
        const option = document.createElement('option');
        option.value = categoryName; 
        option.textContent = categoryName; 
        dropdown.appendChild(option);
    });
    
};

const renderProducts = (products) => {
    const container = document.getElementById('productsContainer');
    container.innerHTML = ''; 

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.onclick = () => {
            window.location.href = `product-detail.html?id=${product.id}`;
        };

        productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p class="price">Price: $${product.price}</p>
            <p class="rating">Rating: ${product.rating} (${product.reviews.length} reviews)</p>
        `;
        container.appendChild(productCard);
    });
};