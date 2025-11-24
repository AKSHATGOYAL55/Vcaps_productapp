// frontend/src/pages/ProductList.js
import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const load = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2>Products</h2>
      <Link to="/create">Create Product</Link>
      <ul>
        {products.map(p => (
          <li key={p._id}>
            <Link to={`/products/${p._id}`}>{p.name}</Link> - ₹{p.price} - {p.category} - {p.inStock ? "InStock" : "Out"}
            {p.image && <div><img src={process.env.REACT_APP_API_URL.replace("/api","") + p.image} alt="" width="80" /></div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
