import React, { useContext, useEffect, useState } from "react";
import { Context, ProfileContext, ShowContext } from "../../App";
import SystemAdmin from "./SystemAdmin";
import { Button, Paper } from "@mui/material";

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
    console.log(userLogedIn);
    userLogedIn && setShow((prev) => !prev);
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
            <Paper
              style={{
                padding: "20px",
                borderRadius: "10px",
                backgroundColor: "#f0f0f0",
                width: "fit-content",
                backgroundColor: " rgba(255, 255, 255, 0.7)",
                boxShadow: "0 0 10px black",
                backdropFilter: "saturate(180%) blur(10px)",
              }}
            >
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
                  <Button
                    onClick={showDetailsPage}
                    variant="contained"
                    color="primary"
                  >
                    Update Profile
                  </Button>
                  <Button
                    href="https://snake.io/"
                    variant="contained"
                    color="primary"
                  >
                    Game
                  </Button>
                  <Button
                    onClick={logoutUser}
                    variant="contained"
                    color="primary"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </Paper>
          )}
          {userLogedIn.type == "admin" && <SystemAdmin />}
        </>
      )}
    </>
  );
}
