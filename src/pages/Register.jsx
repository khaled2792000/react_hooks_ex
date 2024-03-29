import React, { useContext, useState } from "react";
import InputField from "../components/InputField";
import * as validList from "../utils/validationLists.js";
import { add_user_to_local_storage } from "../utils/addUserToLocalSorage.js";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ShowContext } from "../App.jsx";
import { Button, Paper } from "@mui/material";

function Register() {
  const [setShowLogin, setShowRegister] = useContext(ShowContext);
  const [user, setUser] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
    userImage: "",
    firstName: "",
    lastName: "",
    city: "",
    roadName: "",
    houseNumber: "",
  });
  function goLogin() {
    console.log("try");
    setShowLogin(true);
    setShowRegister(false);
  }
  function onChange(e) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const cites = ["גת", "באקב", "חדרה"];

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const adjusted_data = Object.fromEntries(data.entries());
    adjusted_data.userImage = URL.createObjectURL(adjusted_data.userImage);
    try {
      add_user_to_local_storage(adjusted_data);
      e.target.reset();
      let formInputs = e.target.elements;
      for (let input of formInputs) {
        if (input.type !== "submit") {
          const event = new Event("change", { bubbles: true });
          input.dispatchEvent(event);
        }
      }
      withReactContent(Swal).fire({
        title: "Added user successfully ",
        text: adjusted_data.username + " added successfully to the users list",
        icon: "success",
      });
      goLogin();
    } catch (error) {
      withReactContent(Swal).fire({
        title: "Try again",
        text: error.message,
        icon: "error",
      });
    }
  }
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      validationList: validList.userNameValidList.map((elm) => ({ ...elm })),
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      validationList: validList.passwordValidList.map((elm) => ({ ...elm })),
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      validationList: validList
        .confirmPasswordValidList(user.password)
        .map((elm) => ({ ...elm })),
      pattern: user.password,
      placeholder: "Confirm Password",
      label: "Confirm Password",
      required: true,
    },
    {
      id: 4,
      name: "userImage",
      type: "file",
      placeholder: "Image",
      accept: "image/jpg,image/jpeg",
      label: "Upload your Image",
    },
    {
      id: 5,
      name: "firstName",
      type: "text",
      placeholder: "FirstName",
      validationList: validList.firstNameValidList.map((elm) => ({ ...elm })),
      pattern: `^[A-Za-z]+$`,
      label: "First name",
      required: true,
    },
    {
      id: 6,
      name: "lastName",
      type: "text",
      placeholder: "LastName",
      validationList: validList.lastNameValidList.map((elm) => ({ ...elm })),
      pattern: `^[A-Za-z]+$`,
      label: "Last name",
      required: true,
    },
    {
      id: 7,
      name: "email",
      type: "email",
      placeholder: "Email",
      validationList: validList.emailValidList.map((elm) => ({ ...elm })),
      label: "Email",
      required: true,
    },
    {
      id: 8,
      name: "birthday",
      type: "date",
      validationList: validList.dateValidList.map((elm) => ({ ...elm })),
      placeholder: "Birthday",
      label: "Birthday",
    },
    {
      id: 9,
      name: "city",
      type: "text",
      placeholder: "City",
      label: "City",
      listId: "cites",
      list: cites,
    },
    {
      id: 10,
      name: "roadName",
      type: "text",
      placeholder: "Road Name",
      label: "Road Name",
      validationList: validList.roadNameValidList.map((elm) => ({ ...elm })),
    },
    {
      id: 11,
      name: "houseNumber",
      type: "number",
      validationList: validList.JustPositevNumber.map((elm) => ({ ...elm })),
      placeholder: "HouseNumber",
      label: "HouseNumber",
      pattern: "^\\d*$",
      required: true,
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
            width: "fit-content",
            backgroundColor: " rgba(255, 255, 255, 0.7)",
            boxShadow: "0 0 10px black",
            backdropFilter: "saturate(180%) blur(10px)",
          }}
        >
          <form action="" onSubmit={handleSubmit} className="register-area">
            <h1 style={{ gridArea: "title" }}>Sing up</h1>
            {inputs.map((input) => (
              <InputField key={input.id} {...input} onChangeF={onChange} />
            ))}
            <Button
              variant="contained"
              color="primary"
              style={{
                gridArea: "button",
              }}
              type="submit"
            >
              Sign up
            </Button>
            <p>
              Have an account?{" "}
              <span
                onClick={goLogin}
                style={{
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                login
              </span>
            </p>
          </form>
        </Paper>
      </div>
    </>
  );
}

export default Register;
