import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Register />} />   
        <Route path="/users" element={localStorage.getItem("token") ? <Users /> : <Navigate to="/login" />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App