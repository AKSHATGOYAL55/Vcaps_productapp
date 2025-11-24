// frontend/src/pages/ProductForm.js
import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductForm() {
  const { id } = useParams(); // if editing, id exists
  const navigate = useNavigate();
  const [product, setProduct] = useState({ name: "", price: "", category: "", inStock: true });
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (id) {
      api.get(`/products/${id}`).then(r => setProduct(r.data)).catch(console.error);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // client-side validation
    if (!product.name || !product.price || !product.category) {
      setErrors("All fields required and price must be positive.");
      return;
    }
    if (Number(product.price) <= 0) {
      setErrors("Price must be positive.");
      return;
    }

    const fd = new FormData();
    fd.append("name", product.name);
    fd.append("price", product.price);
    fd.append("category", product.category);
    fd.append("inStock", product.inStock);
    if (imageFile) fd.append("image", imageFile);

    try {
      if (id) {
        await api.put(`/products/${id}`, fd, { headers: { "Content-Type": "multipart/form-data" }});
      } else {
        await api.post(`/products`, fd, { headers: { "Content-Type": "multipart/form-data" }});
      }
      navigate("/");
    } catch (err) {
      setErrors(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>{id ? "Edit" : "Create"} Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name</label>
          <input value={product.name} onChange={e=>setProduct({...product, name: e.target.value})} />
        </div>
        <div>
          <label>Price</label>
          <input type="number" value={product.price} onChange={e=>setProduct({...product, price: e.target.value})} />
        </div>
        <div>
          <label>Category</label>
          <input value={product.category} onChange={e=>setProduct({...product, category: e.target.value})} />
        </div>
        <div>
          <label>In Stock</label>
          <input type="checkbox" checked={product.inStock} onChange={e=>setProduct({...product, inStock: e.target.checked})} />
        </div>
        <div>
          <label>Image (optional)</label>
          <input type="file" accept="image/*" onChange={e=>setImageFile(e.target.files[0])} />
        </div>
        <button type="submit">{id ? "Save" : "Create"}</button>
        {errors && <div style={{color:"red"}}>{JSON.stringify(errors)}</div>}
      </form>
    </div>
  );
}
