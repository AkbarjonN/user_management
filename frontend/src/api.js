const API = "http://localhost:4000/api";

export function authHeader() {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: "Bearer " + token }
  };
}

export default API;