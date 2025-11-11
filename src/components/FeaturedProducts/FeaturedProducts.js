import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FeaturedProducts.css";

/* ---------------- ฐานข้อมูลจำลอง (hard-coded) ---------------- */
const products = [
  /* Nirvana */
  {
    id: 1,
    name: "Nirvana - Come As You Are",
    image: "/imagestshirt/Nirvana-come-ass-you-are.jpg",
    price: "15,500 THB (USD 460)",
    category: "Nirvana",
  },
  {
    id: 2,
    name: "Nirvana - Silver",
    image: "/imagestshirt/nirvanasilver.jpg",
    price: "55,000 THB (USD 460)",
    category: "Nirvana",
  },

  /* Queen */
  {
    id: 3,
    name: "Queen - Classic Logo",
    image: "/imagestshirt/Queen.jpg",
    price: "8,000 THB (USD 237)",
    category: "Queen",
  },

  /* Green Day */
  {
    id: 4,
    name: "Green Day - Dookie",
    image: "/imagestshirt/Green-Day.jpg",
    price: "18,500 THB (USD 549)",
    category: "Green Day",
  },
  {
    id: 5,
    name: "Green Day - Kerplunk",
    image: "/imagestshirt/Green-Day-kerplunk-ID3.1.jpg",
    price: "12,000 THB (USD 347)",
    category: "Green Day",
  },

  /* Silverchair */
  {
    id: 6,
    name: "Silverchair",
    image: "/imagestshirt/silverchair.jpg",
    price: "5,000 THB (USD 147)",
    category: "Silverchair",
  },
  {
    id: 7,
    name: "Silverchair Red",
    image: "/imagestshirt/silverchairred.jpg",
    price: "6,500 THB (USD 191)",
    category: "Silverchair",
  },

  /* Alice in Chains */
  {
    id: 8,
    name: "Alice in Chains",
    image: "/imagestshirt/AliceinChainsid1.jpg",
    price: "25,000 THB (USD 724)",
    category: "Alice in Chains",
  },

  /* Eminem */
  {
    id: 9,
    name: "Eminem - Shady",
    image: "/imagestshirt/Eminemshadyid6.jpg",
    price: "18,000 THB (USD 521)",
    category: "Eminem",
  },
];

/* ---------------- component ---------------- */
export default function FeaturedProducts({ category, isInShopPage }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (category) {
      setList(products.filter(p => p.category === category));
    } else {
      setList(products);
    }
  }, [category]);

  if (!list.length) return <p className="no-product">ไม่พบสินค้า</p>;

  return (
    <section className={`featured-products ${isInShopPage ? "in-shop" : "in-home"}`}>
      <h2 className="section-title">VinTage-TShirt</h2>

      <div className="product-list">
        {list.map(p => (
          <div key={p.id} className="product-card">
            <Link to={`/ProductDetail/${p.id}`}>
              <img src={p.image} alt={p.name} className="product-image" />
            </Link>
            <h3 className="product-name">{p.name}</h3>
            <p className="product-price">{p.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
