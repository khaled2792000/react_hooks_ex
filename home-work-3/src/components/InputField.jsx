import React from "react";
import useValidation from "../hooks/useValidation";

export default function InputField(props) {
  const {
    listId,
    list,
    label,
    onChange,
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
          <input
            style={{ gridArea: "input" }}
            {...restProps}
            onChange={(e) => {
              onChange(e);
              notAdmin && updateList(e.target);
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
