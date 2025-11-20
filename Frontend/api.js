// Frontend/api.js (New or modified file)
import { logError, displayError } from './errorHandler.js';

const API_BASE_URL = 'http://localhost:5000/api'; // Your backend server URL

/**
 * Fetches products from your backend API.
 * @param {Function} showNotification - The function to display notifications to the user.
 * @returns {Promise<Array|null>} A promise that resolves to an array of products or null if an error occurs.
 */
export async function getProducts(showNotification) {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);

        if (!response.ok) {
            // Throw an error if the server response is not successful
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json();
        return products;

    } catch (error) {
        logError(error, 'getProducts');
        displayError('There was an issue fetching the products. Please try again later.', showNotification);
        return null;
    }
}
