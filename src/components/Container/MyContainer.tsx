import React, { JSXElementConstructor, ReactElement } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

type Props = {
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | null
    | undefined;
};

export default function Container({ children }: Props) {
  return (
    <div className="container">
      <Header />
      {children}
    </div>
  );
}
