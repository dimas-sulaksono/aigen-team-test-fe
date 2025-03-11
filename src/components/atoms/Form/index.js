import React from "react";

const Form = ({
  children,
  className,
  action,
  method,
  onSubmit,
  encType,
  target,
}) => {
  return (
    <form
      className={`${className}`}
      action={action}
      method={method}
      onSubmit={onSubmit}
      encType={encType}
      target={target}
    >
      {children}
    </form>
  );
};

export default Form;
