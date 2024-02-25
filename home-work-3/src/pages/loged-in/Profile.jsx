import React, { useContext, useState } from "react";
import { Context, ProfileContext } from "../../App";
import SystemAdmin from "./SystemAdmin";
export default function Profile() {
  const [user, setUser] = useContext(Context);
  const [show, setShow] = useContext(ProfileContext);
  const userLogedIn = JSON.parse(sessionStorage.getItem("user"));
  const showDetailsPage = () => {
    {
      user && setShow((prev) => !prev);
    }
  };
  const logoutUser = () => {
    sessionStorage.clear();
    setUser(null);
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
                  {userLogedIn.roadName}, {user.city}
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
