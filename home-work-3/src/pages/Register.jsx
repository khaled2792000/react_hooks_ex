import React, { useState } from "react";
import InputField from "../components/InputField";
import * as validList from "../utils/validationLists.js";

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
  function onChange(e) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const cites = ["גת", "באקב", "חדרה"];
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
      validationList: validList.firstLastNameValidList,
      pattern: `^[A-Za-z]+$`,
      label: "First name",
      required: true,
    },
    {
      id: 6,
      name: "lastName",
      type: "text",
      placeholder: "LastName",
      validationList: validList.firstLastNameValidList,
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
    },
    {
      id: 11,
      name: "phone",
      type: "tel",
      pattern: "[0-9]{3}[0-9]{3}[0-9]{4}",
      placeholder: "Phone",
      label: "Phone",
    },
  ];
  return (
    <>
      <form
        action=""
        onSubmit={(e) => {
          console.log("submit");
          e.preventDefault();
        }}
      >
        {inputs.map((input) => (
          <InputField key={input.id} {...input} onChange={onChange} />
        ))}
        <button>submit</button>
      </form>
    </>
  );
}

export default Register;
