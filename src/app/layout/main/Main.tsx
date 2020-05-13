import React from "react";
import Header from "../header/Header";

export default function Main({ className = "" }: { className?: string }) {
  return (
    <div className={`main ${className}`}>
      <Header />
      <div className="wrapper">HELLO WALKME - START HERE</div>
    </div>
  );
}
