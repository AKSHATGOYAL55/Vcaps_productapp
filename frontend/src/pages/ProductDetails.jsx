// frontend/src/pages/ProductDetails.js
import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setP(res.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { load(); }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete product?")) return;
    await api.delete(`/products/${id}`);
    navigate("/");
  };

  if (!p) return <div>Loading...</div>;
  const base = process.env.REACT_APP_API_URL.replace("/api","");

  return (
    <div>
      <h2>{p.name}</h2>
      <p>Price: ₹{p.price}</p>
      <p>Category: {p.category}</p>
      <p>Status: {p.inStock ? "In stock" : "Out of stock"}</p>
      {p.image && <img src={base + p.image} alt={p.name} width="200" />}
      <div>
        <Link to={`/edit/${p._id}`}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
