import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    // <Spinner
    //   animation="border"
    //   role="status"
    //   variant="warning"
    //
    // >
    //   <span class="sr-only">Lading...</span>
    // </Spinner>
    <div>
      <img
        className="MainLoader"
        src="https://www.fusionfirst.com/ecommerce/200.gif"
        alt="loader"
      />
    </div>
  );
};

export default Loader;
