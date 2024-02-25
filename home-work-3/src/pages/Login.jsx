import React, { useState } from "react";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import { userNameValidList, passwordValidList } from "../utils/validationLists";
import { load_user_session } from "../utils/loadUserSesion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  function onChange(e) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function loginUser(e) {
    e.preventDefault();
    try {
      const data = new FormData(e.target);
      load_user_session(Object.fromEntries(data.entries()));
      navigate("/profile");
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
      validationList: userNameValidList,
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      validationList: passwordValidList,
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];
  return (
    <>
      <form action="" onSubmit={loginUser}>
        <h1>Login</h1>
        {inputs.map((input) => (
          <InputField key={input.id} {...input} onChange={onChange} />
        ))}
        <button>submit</button>
        <p>
          you don't have an account? <Link to="/register">sing up</Link>
        </p>
      </form>
    </>
  );
}
