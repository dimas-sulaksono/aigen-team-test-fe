import React from "react";

const Section = ({ className, children }) => {
  return (
    <section className={`${className} bg-slate-100 px-5 py-5 lg:px-10`}>
      {children}
    </section>
  );
};

export default Section;
