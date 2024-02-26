import React, { useContext, useEffect, useState } from "react";
import { Context, ProfileContext, ShowContext } from "../../App";
import SystemAdmin from "./SystemAdmin";
export default function Profile() {
  const [setShowLogin] = useContext(ShowContext);
  const [user, setUser] = useContext(Context);
  const [show, setShow] = useContext(ProfileContext);

  const [userLogedIn, setUserLogedIn] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  useEffect(() => {
    userLogedIn ?? setUserLogedIn(JSON.parse(sessionStorage.getItem("user")));
  }, []);
  useEffect(() => {
    console.log("loged in", userLogedIn);
    userLogedIn ?? setUserLogedIn(JSON.parse(sessionStorage.getItem("user")));
  }, [user]);
  const showDetailsPage = () => {
    {
      userLogedIn && setShow((prev) => !prev);
    }
  };
  const logoutUser = () => {
    sessionStorage.clear();
    setUser(null);
    setUserLogedIn(null);
    setShowLogin(true);
  };
  return (
    <>
      {userLogedIn && (
        <>
          {userLogedIn.type != "admin" && (
            <div className="profile-area">
              <div className="profile-image" style={{ gridArea: "image" }}>
                <img
                  src={userLogedIn.userImage}
                  alt=""
                  onError={(e) => {
                    e.target.src =
                      "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light";
                  }}
                />
              </div>
              <div style={{ gridArea: "text" }}>
                <h2>{userLogedIn.username}</h2>
                <h3>{userLogedIn.email}</h3>
                <h3>
                  {userLogedIn.roadName}, {userLogedIn.city}
                </h3>
                <h3>{userLogedIn.birthday}</h3>
              </div>
              <div style={{ gridArea: "button" }} className="buttons">
                <button onClick={showDetailsPage}>update profile</button>
                <button>
                  <a href="https://snake.io/">game</a>
                </button>
                <button onClick={logoutUser}>logout</button>
              </div>
            </div>
          )}
          {userLogedIn.type == "admin" && <SystemAdmin />}
        </>
      )}
    </>
  );
}
