import React from "react";

const Input = ({
  type,
  className = "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 w-full p-2.5",
  placeholder,
  onChange,
  value,
  defaultValue,
  name,
  id,
  required,
  disabled,
  readOnly,
}) => {
  return (
    <input
      type={type}
      className={`${className}`}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      name={name}
      id={id}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
    />
  );
};

export default Input;
