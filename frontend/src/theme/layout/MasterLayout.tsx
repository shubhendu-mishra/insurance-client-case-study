import React, { useEffect } from "react";
import { Footer } from "./components/Footer";
import { useLocation } from "react-router-dom";
import { Header } from "./components/Header";

const MasterLayout: React.FC = ({ children }) => {
  return (
    <div className="d-flex flex-column flex-row-fluid">
      <Header />
      <div
        id="kt_content"
        className="content d-flex flex-column flex-column-fluid"
      >
        <div className="post d-flex flex-column-fluid bg-light" id="kt_post">
          {children}
        </div>
      </div>
      <div className=" bg-light">
        <Footer />
      </div>
    </div>
  );
};

export { MasterLayout };
