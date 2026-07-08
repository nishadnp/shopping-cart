// src/pages/Shop

import { useEffect, useState } from "react";
import { fetchStoreProducts } from "../services/storeApi";
import ProductCard from "../components/ProductCard";
import { useOutletContext } from "react-router-dom";

export default function Shop() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { handleAddToCart } = useOutletContext();

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
                {products.map(product => (
                    <ProductCard 
                    key={product.id} 
                    product={product}
                    onAddToCart={handleAddToCart}
                    />
                ))}
            </div>
        </div>
    );
}