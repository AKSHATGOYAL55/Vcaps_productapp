// frontend/src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Nav from "./components/Nav";
import LoginPage from "./pages/LoginPage";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import ProductDetails from "./pages/ProductDetails";

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Nav />
        <main className="min-h-screen bg-gray-100 text-gray-900">
          <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={
            <ProtectedRoute><ProductForm /></ProtectedRoute>
          } />
          <Route path="/edit/:id" element={
            <ProtectedRoute><ProductForm /></ProtectedRoute>
          } />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
        </main>
        
      </div>
        
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
