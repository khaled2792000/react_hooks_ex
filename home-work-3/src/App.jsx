import Login from "./pages/Login";
import Register from "./pages/Register";
import "../src/app.css";
import { Route, Router, Routes } from "react-router-dom";
import Profile from "./pages/loged-in/Profile";
import React, { useState } from "react";
import Editdetails from "./pages/loged-in/Editdetails";

export const Context = React.createContext();
export const ProfileContext = React.createContext();
function App() {
  const [loginUser, setLoginUser] = useState(null);
  const [show, setShow] = useState(false);
  return (
    <>
      <Context.Provider value={[loginUser, setLoginUser]}>
        <Login />
        <Register />
        <ProfileContext.Provider value={[show, setShow]}>
          <Profile />
          {show && <Editdetails />}
        </ProfileContext.Provider>
      </Context.Provider>
    </>
  );
}

export default App;
