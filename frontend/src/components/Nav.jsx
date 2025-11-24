// frontend/src/components/Nav.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

export default function Nav(){
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => { setToken(null); navigate("/login"); };
  return (
    <nav>
      <Link to="/">Products</Link>
      {token ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
    </nav>
  );
}
