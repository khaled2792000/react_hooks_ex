import React, { useState } from "react";
import InputField from "../components/InputField";
import * as validList from "../utils/validationLists.js";
import { add_user_to_local_storage } from "../utils/addUserToLocalSorage.js";
import { Link } from "react-router-dom";

function Register() {
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
    phone: "",
  });

  // just for testing
  const [image, setImage] = useState("");

  function onChange(e) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const cites = ["גת", "באקב", "חדרה"];

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    add_user_to_local_storage(Object.fromEntries(data.entries()));
    e.target.reset();
    let formInputs = e.target.elements;
    for (let input of formInputs) {
      if (input.type !== "submit") {
        const event = new Event("change", { bubbles: true });
        input.dispatchEvent(event);
      }
    }
    // the load phono methods
    // setImage(URL.createObjectURL(Object.fromEntries(data.entries()).userImage));
    // console.log(
    //   URL.createObjectURL(Object.fromEntries(data.entries()).userImage)
    // );
  }
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      validationList: validList.userNameValidList,
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      validationList: validList.passwordValidList,
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "password",
      validationList: validList.confirmPasswordValidList(user.password),
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
      validationList: validList.firstNameValidList,
      pattern: `^[A-Za-z]+$`,
      label: "First name",
      required: true,
    },
    {
      id: 6,
      name: "lastName",
      type: "text",
      placeholder: "LastName",
      validationList: validList.lastNameValidList,
      pattern: `^[A-Za-z]+$`,
      label: "Last name",
      required: true,
    },
    {
      id: 7,
      name: "email",
      type: "email",
      placeholder: "Email",
      validationList: validList.emailValidList,
      label: "Email",
      required: true,
    },
    {
      id: 8,
      name: "birthday",
      type: "date",
      validationList: validList.dateValidList,
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
      validationList: validList.roadNameValidList,
    },
    {
      id: 11,
      name: "houseNumber",
      type: "number",
      min: 0,
      placeholder: "Phone",
      label: "HouseNumber",
    },
  ];
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <h1>Sing up</h1>
        {inputs.map((input) => (
          <InputField key={input.id} {...input} onChange={onChange} />
        ))}
        <button>submit</button>
        <p>
          I have an account <Link to="/">Login</Link>
        </p>
      </form>
    </>
  );
}

export default Register;
