import { useEffect, useState } from "react";
import axios from "axios";
import API, { authHeader } from "../api";
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import StatusAlert from "../components/StatusAlert";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function load() {
    try {
      const res = await axios.get(API + "/api/users", authHeader());
      setUsers(res.data);
    } catch (err) {
      handleAuthError(err);
    }
  }

  function handleAuthError(err) {
    const m = err.response?.data?.message;
    if (m === "User is blocked" || m === "Unauthorized") {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }

  function toggle(id) {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  }

  async function block() {
    try {
      const res = await axios.post(API + "/api/users/block", { ids: selected }, authHeader());
      setMsg(res.data.message);
      load();
    } catch (err) { handleAuthError(err); }
  }

  async function unblock() {
    try {
      const res = await axios.post(API + "/api/users/unblock", { ids: selected }, authHeader());
      setMsg(res.data.message);
      load();
    } catch (err) { handleAuthError(err); }
  }
  async function deleteSelected() {
    try {
      const res = await axios.post(API + "/api/users/delete", { ids: selected }, authHeader());
      setMsg(res.data.message);
      setSelected([]);
      load();
    } catch (err) {
      handleAuthError(err);
    }
  }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, []);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <StatusAlert message={msg} />
        <Toolbar onBlock={block} onUnblock={unblock} onDelete={deleteSelected}/>
        <table className="table table-striped">
          <thead>
          <input
          type="checkbox"
          onChange={e => {
          if (e.target.checked) {
            setSelected(users.map(u => u.id));
          } else {
            setSelected([]);
          }
          }}
          checked={selected.length === users.length && users.length > 0}
          />
          <p>Select All</p>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td><input type="checkbox" onChange={() => toggle(u.id)} checked={selected.includes(u.id)} /></td>
                <td className="text-start">{u.email}</td>
                <td className="text-center">{u.blocked ? "Blocked" : "Active"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
