import { getProductById } from './api.js';
import { addToCart } from './utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');

    if (productId) {
        try {
            const product = await getProductById(productId);
            renderProductDetails(product);

            addToCartButton.addEventListener('click', async () => {
                const quantity = parseInt(document.getElementById('quantityInput').value) || 1;
            
                if (isNaN(quantity) || quantity <= 0) {
                    alert('Please enter a valid quantity.');
                    return;
                }
            
                if (quantity < product.minimumOrderQuantity) {
                    alert(
                        `The minimum order quantity for this product is ${product.minimumOrderQuantity}. 
                        Please increase the quantity to proceed.`
                    );
                    return;
                }
            
                if (quantity > product.stock) {
                    alert(`Sorry, only ${product.stock} items are available in stock.`);
                    return;
                }
            
                try {
                    const cartData = await addToCart(product.id, quantity);
            
                    product.stock -= quantity;
            
                    const productAvailability = document.getElementById('productAvailability');
                    productAvailability.textContent = product.stock > 0
                        ? `In Stock: ${product.stock}`
                        : 'Out of stock';
            
                    alert(
                        `Product added to cart successfully! 
                        Cart Total: $${cartData.total}, 
                        Discounted Total: $${cartData.discountedTotal}`
                    );
                } catch (error) {
                    console.error('Error adding product to cart:', error.message);
                    alert('Failed to add product to cart. Please try again.');
                }
            });
        } catch (error) {
            console.error('Error fetching product details:', error.message);
            alert('Failed to load product details. Please try again.');
        }
    } else {
        alert('Invalid product ID');
        window.location.href = 'index.html';
    }
});

const renderProductDetails = (product) => {
    const requiredElements = [
        'productImage', 'productTitle', 'productPrice', 'productRating', 'productRatingCount',
        'productBrand', 'productWeight', 'productDimensions', 'productWarranty',
        'productShippingInfo', 'productAvailability', 'productReturnPolicy', 'productMinOrder'
    ].map(id => document.getElementById(id));

    if (requiredElements.includes(null)) {
        console.error('Missing DOM elements for product details');
        return;
    }

    const [
        productImage, productTitle, productPrice, productRating, 
        productRatingCount, productBrand, productWeight,
        productDimensions, productWarranty, productShippingInfo,
        productAvailability, productReturnPolicy, productMinOrder
    ] = requiredElements;

    productImage.src = product.thumbnail || '';
    productImage.alt = product.title || 'Product Image';

    productTitle.textContent = product.title || 'Product title not available';

    productPrice.textContent = product.price + " $"|| 'Product price not available';

    productRating.textContent = product.rating
        ? `Rating: ${product.rating.toFixed(2)}`
        : 'No ratings available';
    productRatingCount.textContent = product.reviews
        ? `(${product.reviews.length} reviews)`
        : 'No review count available';

    productBrand.textContent = product.brand || 'Brand information not available';

    productWeight.textContent = product.weight
        ? `${product.weight} kg`
        : 'Weight not specified';

    productDimensions.textContent = product.dimensions
        ? `Width: ${product.dimensions.width} cm, Height: ${product.dimensions.height} cm, Depth: ${product.dimensions.depth} cm`
        : 'Dimensions not specified';

    productWarranty.textContent = product.warrantyInformation || 'No warranty information available';

    productShippingInfo.textContent = product.shippingInformation || 'Shipping info not available';

    productAvailability.textContent = product.availabilityStatus
        ? `In Stock: ${product.stock}`
        : 'Out of stock';

    productReturnPolicy.textContent = product.returnPolicy || 'No return policy information';

    productMinOrder.textContent = product.minimumOrderQuantity
        ? `Minimum Order Quantity: ${product.minimumOrderQuantity}`
        : 'No minimum order specified';
};