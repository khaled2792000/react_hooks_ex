import Login from "./pages/Login";
import Register from "./pages/Register";
import "../src/app.css";
import { Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
