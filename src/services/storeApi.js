// src/services/storeApi.js

const BASE_URL = 'https://fakestoreapi.com';

export async function fetchStoreProducts(signal) {
    const response = await fetch(`${BASE_URL}/products`, { signal })

    if (!response.ok) {
        throw new Error('Failed to fetch store items. Network response was not OK.');
    }

    return response.json();
}