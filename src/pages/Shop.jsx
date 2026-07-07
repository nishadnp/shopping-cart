// src/pages/Shop

import { useEffect, useState } from "react";
import { fetchStoreProducts } from "../services/storeApi";

export default function Shop() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function getProducts () {
            try {
                setLoading(true);
                const data = await fetchStoreProducts(controller.signal);
                setProducts(data);
            } catch (err) {
                if (err.name != 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        }

        getProducts();

        return () => controller.abort();
    }, []);

    if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading products...</div>;
    if (error) return <div style={{ color: 'red', padding: '2rem' }}>Error: {error}</div>;


    return (
        <div>
            <h2>Our Products</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
                {products.map((product) => (
                <div 
                    key={product.id} 
                    style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                    <div>
                    <img src={product.image} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'contain', marginBottom: '0.5rem' }} />
                    <h3 style={{ fontSize: '1rem', margin: '0.5rem 0' }}>{product.title}</h3>
                    <p style={{ fontWeight: 'bold' }}>${product.price.toFixed(2)}</p>
                    </div>
                    <button style={{ marginTop: '1rem', padding: '0.5rem', cursor: 'pointer' }}>View Item</button>
                </div>
                ))}
            </div>
        </div>
    );
}