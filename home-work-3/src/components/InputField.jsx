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
      <div>
        <label htmlFor={restProps.name}>{label}</label>{" "}
        <input
          {...restProps}
          onChange={(e) => {
            onChange(e);
            notAdmin && updateList(e.target);
          }}
          list={listId}
        />
        {validList && notAdmin && (
          <ul>
            {validList.map((elm) => (
              <li
                key={elm.errorMessage}
                style={{ color: elm.valid ? "black" : "red" }}
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
