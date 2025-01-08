## Products Website

- This project is a web-based application designed to showcase and manage a collection of products. Users can search, sort, and filter products by categories, view product details, and interact with product data dynamically.

- This project was developed as a part of an assignment by Gürsel Cesur.

## Table of Contents
	1. Features
	2. Technologies Used
	3. Usage
	4. API Reference

## Features
- **Dynamic Product Listing:**
1. Displays a dynamically fetched list of products from a backend API.
2. Fully responsive design with clear product layouts.

- **Search Functionality:**
1. Users can search for specific products using keywords.
2. Real-time filtering to improve user experience.

- **Category Filtering:**
1. Filter products by categories like "beauty," "electronics," etc.

- **Product Sorting:**
1. Sort products by price (ascending/descending) for quick comparisons.

- **Detailed Product View:**
1. View detailed information for each product, including price, dimensions, warranty, and reviews.

- **Add to Cart with Stock Management:**
1. Dynamically reduce stock upon successful "Add to Cart" operation.
2. Minimum order quantity enforcement.

- **Error Handling:**
1. Clear error messages for invalid inputs or API failures.

- **Responsive Design:**
1. Optimized for desktop, tablet, and mobile devices.

## Technologies Used

- Frontend:
	•	HTML5
	•	CSS3
	•	JavaScript (Vanilla)
	
- Backend API:
	•	DummyJSON API

- ## Usage

	1.	View All Products:
	• Click the “Get All Products” button to load all available products.
	
    2.	Search Products:
	• Enter a keyword in the search bar and press Enter or click the Search button.
	
    3.	Filter by Category:
	• Select a category from the dropdown menu to filter products.
	
    4.	Sort Products:
	• Use the Sort by Price dropdown to arrange products in ascending or descending order.
	
    5.	View Product Details:
	• Click on any product card to view detailed information about the product.
	
    6.	Dynamic Stock Update:
	• Add products to the cart, and the stock count will be updated dynamically.

## API Reference

- Endpoints Used:
	1.	Get All Products:
	•	URL: https://dummyjson.com/products
	•	Method: GET

	2.	Get Product Categories:
	•	URL: https://dummyjson.com/products/categories
	•	Method: GET

	3.	Search Products:
	•	URL: https://dummyjson.com/products/search?q={query}
	•	Method: GET

	4.	Get Products by Category:
	•	URL: https://dummyjson.com/products/category/{category}
	•	Method: GET