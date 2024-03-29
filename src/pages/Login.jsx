import React, { useContext, useState } from "react";
import InputField from "../components/InputField";
import { userNameValidList, passwordValidList } from "../utils/validationLists";
import { load_user_session } from "../utils/loadUserSesion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Context, ShowContext } from "../App";
import { Button, Paper } from "@mui/material";

export default function Login() {
  const [loginUserObj, setLoginUserObj] = useContext(Context);
  const [setShowLogin, setShowRegister] = useContext(ShowContext);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function onChange(e) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function gorRegister() {
    setShowLogin(false);
    setShowRegister(true);
  }
  function loginUser(e) {
    e.preventDefault();
    try {
      const data = new FormData(e.target);
      const userDetails = Object.fromEntries(data.entries());
      setLoginUserObj(load_user_session(userDetails));
      setShowLogin(false);
    } catch (error) {
      withReactContent(Swal).fire({
        title: "Try again",
        text: error.message,
        icon: "error",
      });
    } finally {
      e.target.reset();
      let formInputs = e.target.elements;
      for (let input of formInputs) {
        if (input.type !== "submit") {
          const event = new Event("change", { bubbles: true });
          input.dispatchEvent(event);
        }
      }
    }
  }
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      validationList: userNameValidList.map((elm) => ({ ...elm })),
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      validationList:
        user.username !== "admin"
          ? passwordValidList.map((elm) => ({ ...elm }))
          : [],
      pattern:
        user.username != "admin"
          ? `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`
          : "",
      required: true,
      notAdmin: user.username != "admin",
    },
  ];
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper
          style={{
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: " rgba(255, 255, 255, 0.7)",
            boxShadow: "0 0 10px black",
            backdropFilter: "saturate(180%) blur(10px)",
            width: "fit-content",
          }}
        >
          <form action="" onSubmit={loginUser} className="login-area">
            <h1>Login</h1>
            {inputs.map((input) => (
              <InputField key={input.id} {...input} onChangeF={onChange} />
            ))}
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>
          <p>
            Have no account?{" "}
            <span
              onClick={gorRegister}
              style={{
                color: "blue",
                cursor: "pointer",
              }}
            >
              Register
            </span>
          </p>
        </Paper>
      </div>
    </>
  );
}
