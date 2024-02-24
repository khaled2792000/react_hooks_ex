import React from "react";
import useValidation from "../hooks/useValidation";

function InputField(props) {
  const { label, onChange, validationList, ...restProps } = props;
  const [validList, updateList] = useValidation(validationList);
  return (
    <>
      <div>
        <label htmlFor={restProps.name}>{label}</label>
        <input
          {...restProps}
          onChange={(e) => {
            onChange(e);
            updateList(e.target);
          }}
        />
        {validList.map((elm) => (
          <span
            key={elm.errorMessage}
            style={{ color: elm.valid ? "black" : "red" }}
          >
            {elm.errorMessage}
          </span>
        ))}
      </div>
    </>
  );
}

export default InputField;
