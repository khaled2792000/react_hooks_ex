import Login from "./pages/Login";
import Register from "./pages/Register";
import "../src/app.css";
import Profile from "./pages/loged-in/Profile";
import React, { useEffect, useState } from "react";
import Editdetails from "./pages/loged-in/Editdetails";

export const Context = React.createContext();
export const ProfileContext = React.createContext();
export const ShowContext = React.createContext();
function App() {
  const [loginUser, setLoginUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [userLogedIn, setUserLogedIn] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  useEffect(() => {
    // sessionStorage.clear();
    const loadData = localStorage.getItem("users");
    userLogedIn ?? setUserLogedIn(JSON.parse(sessionStorage.getItem("user")));
    const users =
      loadData &&
      JSON.parse(loadData.length == 0 ? [] : localStorage.getItem("users"));
    (users == null || users.length == 0) &&
      localStorage.setItem(
        "users",
        JSON.stringify([
          {
            type: "admin",
            username: "admin",
            password: "ad12343211ad",
          },
        ])
      );
  }, []);
  return (
    <>
      <Context.Provider value={[loginUser, setLoginUser]}>
        <ShowContext.Provider value={[setShowLogin, setShowRegister]}>
          {showLogin && loginUser == null && <Login />}
          {showRegister && <Register />}
          <ProfileContext.Provider value={[show, setShow]}>
            <Profile />
            {show && <Editdetails />}
          </ProfileContext.Provider>
        </ShowContext.Provider>
      </Context.Provider>
    </>
  );
}

export default App;
