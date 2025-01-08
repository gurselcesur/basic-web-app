export const showAlert = (message, type = 'success', duration = 3000) => {
    const alertBox = document.createElement('div');
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;

    let alertContainer = document.getElementById('alert-container');
    if (!alertContainer) {
        alertContainer = document.createElement('div');
        alertContainer.id = 'alert-container';
        alertContainer.style.position = 'fixed';
        alertContainer.style.top = '10px';
        alertContainer.style.right = '10px';
        alertContainer.style.zIndex = '1000';
        document.body.appendChild(alertContainer);
    }

    const maxAlerts = 3; 
    if (alertContainer.childElementCount >= maxAlerts) {
        alertContainer.firstChild.remove();
    }

    alertContainer.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), duration);
};
export const addToCart = async (productId, quantity, stock) => {
    if (quantity > stock) {
        throw new Error(`Cannot add more than ${stock} items to the cart. Stock is limited.`);
    }

    try {
        const response = await fetch('https://dummyjson.com/carts/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 1, 
                products: [{ id: productId, quantity }],
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to add product to cart');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding to cart:', error.message);
        throw error;
    }
};