import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <nav className="navbar navbar-dark bg-dark p-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">User Management</Link>
        <button className="btn btn-outline-light" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}