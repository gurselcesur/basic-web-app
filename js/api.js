const API_BASE = "https://dummyjson.com";

export const getAllProducts = async () => {
    try {
        const response = await fetch(`${API_BASE}/products?limit=0`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error("Error fetching products:", error.message);
        return [];
    }
};

export const searchProducts = async (query) => {
    try {
        const response = await fetch(`${API_BASE}/products/search?q=${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error("Error searching products:", error.message);
        return [];
    }
};

export const getSortedProducts = (products, sortBy) => {
    if (sortBy === 'price') {
        return products.sort((a, b) => a.price - b.price); 
    }
    if (sortBy === '-price') {
        return products.sort((a, b) => b.price - a.price); 
    }
    return products;
};

export const getProductCategories = async () => {
    try {
        const response = await fetch(`${API_BASE}/products/categories`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching categories:", error.message);
        return [];
    }
};

export const getProductById = async (id) => {
    try {
        const response = await fetch(`${API_BASE}/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching product details:", error.message);
        return null;
    }
};

export const addToCart = async (userId, products) => {
    try {
        const response = await fetch(`${API_BASE}/carts/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                products: products,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add products to cart');
        }
        return await response.json(); 
    } catch (error) {
        console.error("Error adding products to cart:", error.message);
        return null;
    }
};

export const getCartByUserId = async (userId) => {
    try {
        const response = await fetch(`${API_BASE}/carts/user/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch cart');
        }
        return await response.json(); 
    } catch (error) {
        console.error("Error fetching cart:", error.message);
        return null;
    }
};

export const updateCart = async (cartId, products) => {
    try {
        const response = await fetch(`${API_BASE}/carts/${cartId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                products: products, 
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update cart');
        }
        return await response.json(); 
    } catch (error) {
        console.error("Error updating cart:", error.message);
        return null;
    }
};