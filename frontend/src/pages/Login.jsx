import { useState } from "react";
import axios from "axios";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      const res = await axios.post(API + "/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setMsg(err.response?.data?.message);
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3>Login</h3>
      {msg && <div className="alert alert-danger">{msg}</div>}
      <form onSubmit={login}>
        <input className="form-control mb-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" className="form-control mb-2" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100">Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
  );
}