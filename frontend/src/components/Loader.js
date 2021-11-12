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
        src="https://www.fusionfirst.com/ecommerce/200.gif"
        alt="loader"
        style={{
          width: "500px",
          height: "500px",
          margin: "auto",
          display: "block",
        }}
      />
    </div>
  );
};

export default Loader;
