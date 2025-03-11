import React from "react";

const Section = ({ className, children }) => {
  return (
    <section className={`${className} lg:px-10 px-5 py-5 bg-slate-100`}>
      {children}
    </section>
  );
};

export default Section;
