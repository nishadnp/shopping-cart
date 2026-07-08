// src/pages/Home

import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
    return (
        <>
        {/* Hero Section */}
        <section className={styles.hero}>
            <h1>Curated Essentials, Delivered Swiftly</h1>
            <p>
            Discover premium tech, fashion accessories, and everyday gear curated specifically for modern developers and creators.
            </p>
            <Link to="/shop" className={styles.ctaButton}>
            Explore the Catalog
            </Link>
        </section>

        {/* Value Propositions Section */}
        <section>
            <h2 className={styles.sectionTitle}>Why Shop with SwiftStore?</h2>
            
            <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
                <div className={styles.iconWrapper}>⚡</div>
                <h3>Instant Dispatch</h3>
                <p>Orders processed within 2 hours with global, end-to-end package tracking metrics.</p>
            </div>

            <div className={styles.featureCard}>
                <div className={styles.iconWrapper}>🛡️</div>
                <h3>Secured Checkout</h3>
                <p>Your transactions are safeguarded with fully modern multi-layered encryption tokens.</p>
            </div>

            <div className={styles.featureCard}>
                <div className={styles.iconWrapper}>🔄</div>
                <h3>Hassle-Free Returns</h3>
                <p>Don't love it? Ship it back within 30 days for a zero-questions-asked immediate refund.</p>
            </div>
            </div>
        </section>
      </>
    );
}