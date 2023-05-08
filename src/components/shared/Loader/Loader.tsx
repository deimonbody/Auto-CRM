import React from "react";
import { Spinner } from "react-bootstrap";
import "./style.scss";

const Loader: React.FC = () => {
  return (
    <div className="position-fixed top-50 start-50 transform-middle">
      <Spinner animation="border" variant="primary" className="loader" />
    </div>
  );
};

export default Loader;
