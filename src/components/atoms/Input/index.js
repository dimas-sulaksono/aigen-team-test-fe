import React from "react";

const Input = ({
  type,
  className = "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-0",
  placeholder,
  onChange,
  value,
  defaultValue,
  name,
  id,
  required,
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
      required={required}
    />
  );
};

export default Input;
