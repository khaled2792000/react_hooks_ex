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
            <img src={user.userImage} alt="" />
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
              <button>game</button>
              <button>logout</button>
            </dir>
          </div>
        </div>
      )}
    </>
  );
}
