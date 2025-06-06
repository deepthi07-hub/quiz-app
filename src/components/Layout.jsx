import React from "react";
import "./Layout.css"; // You can define layout styles here

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      {children}
    </div>
  );
};

export default Layout;
