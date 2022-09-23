import React from "react";

export default function Checkbox({ id, label, ...props }) {
  //   console.log(props.checked, props.value);
  return (
    <>
      <input type="checkbox" className="form-check-input" id={id} {...props} />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </>
  );
}
