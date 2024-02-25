import React, { useContext, useState } from "react";
import { Context, ProfileContext } from "../../App";
export default function Profile() {
  const [user, setUser] = useContext(Context);
  const [show, setShow] = useContext(ProfileContext);
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
      {user && (
        <div
          style={{
            display: "grid",
            gridTemplate: "1fr 2fr ",
          }}
        >
          <div>
            <img
              src={user.userImage}
              alt=""
              onError={() => {
                setUser((prev) => ({
                  ...prev,
                  userImage:
                    "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
                }));
              }}
            />
          </div>
          <div>
            <h2>{user.username}</h2>
            <h3>{user.email}</h3>
            <h3>
              {user.roadName}, {user.city}
            </h3>
            <h3>{user.birthday}</h3>
            <dir>
              <button onClick={showDetailsPage}>update profile</button>
              <button>
                <a href="https://snake.io/">game</a>
              </button>
              <button onClick={logoutUser}>logout</button>
            </dir>
          </div>
        </div>
      )}
    </>
  );
}
