const API = "https://user-management-1ia7.onrender.com/api";

export function authHeader() {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: "Bearer " + token }
  };
}

export default API;