import React, { useContext, useState } from "react";
import InputField from "../../components/InputField";
import * as validList from "../../utils/validationLists.js";
import { Context } from "../../App";
import { update_user } from "../../utils/addUserToLocalSorage.js";

export default function Editdetails() {
  const [user, setUser] = useContext(Context);
  // if the user logout in the middle of the edit
  if (user == null) return;
  function onChange(e) {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const cites = ["גת", "באקב", "חדרה"];

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const adjusted_data = Object.fromEntries(data.entries());
    adjusted_data.userImage = URL.createObjectURL(adjusted_data.userImage);
    adjusted_data.email = user.email;
    update_user(adjusted_data);
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
      value: user.username,
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
      value: user.password,
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
      value: user.confirmPassword,
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
      value: user.firstName,
    },
    {
      id: 6,
      name: "lastName",
      type: "text",
      placeholder: "LastName",
      validationList: validList.lastNameValidList,
      pattern: `^[A-Za-z]+$`,
      label: "Last name",
      value: user.lastName,
      required: true,
    },
    {
      id: 8,
      name: "birthday",
      type: "date",
      validationList: validList.dateValidList,
      placeholder: "Birthday",
      value: user.birthday,
      label: "Birthday",
    },
    {
      id: 9,
      name: "city",
      type: "text",
      placeholder: "City",
      label: "City",
      listId: "cites",
      value: user.city,
      list: cites,
    },
    {
      id: 10,
      name: "roadName",
      type: "text",
      placeholder: "Road Name",
      label: "Road Name",
      value: user.roadName,
      validationList: validList.roadNameValidList,
    },
    {
      id: 11,
      name: "houseNumber",
      type: "number",
      min: 0,
      placeholder: "Phone",
      value: user.houseNumber,
      label: "HouseNumber",
    },
  ];
  return (
    <>
      {user && (
        <form action="" onSubmit={handleSubmit} className="edit-area">
          <h1 style={{ gridArea: "title" }}>Edit user info</h1>
          {inputs.map((input) => (
            <InputField key={input.id} {...input} onChange={onChange} />
          ))}
          <button style={{ gridArea: "button" }}>submit</button>
        </form>
      )}
    </>
  );
}
