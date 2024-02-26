import React from "react";
import useValidation from "../hooks/useValidation";
import { Input } from "@mui/material";
export default function InputField(props) {
  const {
    listId,
    id,
    list,
    label,
    onChangeF,
    notAdmin = true,
    validationList,
    ...restProps
  } = props;
  const [validList, updateList] = useValidation(validationList);
  return (
    <>
      <div className="form-row" style={{ gridArea: restProps.name }}>
        <dir className="input-label">
          <label style={{ gridArea: "label" }} htmlFor={restProps.name}>
            {label}
          </label>{" "}
          <Input
            style={{ gridArea: "input" }}
            {...restProps}
            onChange={(e) => {
              console.log(notAdmin);
              onChangeF && onChangeF(e);
              notAdmin && updateList(e.target);
              !notAdmin && e.target.setCustomValidity("");
            }}
            list={listId}
          />
        </dir>
        {validList && notAdmin && (
          <ul style={{ gridArea: "validation" }}>
            {validList.map((elm) => (
              <li
                key={elm.errorMessage}
                style={{ color: elm.valid ? "green" : "red" }}
              >
                {elm.errorMessage}
              </li>
            ))}
          </ul>
        )}
        {list && (
          <datalist id={listId}>
            {list.map((elm) => (
              <option key={elm} value={elm}>
                {elm.errorMessage}
              </option>
            ))}
          </datalist>
        )}
      </div>
    </>
  );
}
