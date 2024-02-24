import React from "react";
import InputField from "../components/InputField";
const vallist = [
  {
    errorMessage: "just small letters",
    regex: new RegExp("^[a-z0-9_-]+$"),
  },
];
function onChange(e) {
  console.log("changeREg");
}
const inputs = [
  {
    label: "userName",
    name: "userName",
    onChange: onChange,
    validationList: vallist,
    type: "text",
  },
];

function Register() {
  return (
    <>
      <form
        action=""
        onSubmit={(e) => {
          console.log("yes");
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
