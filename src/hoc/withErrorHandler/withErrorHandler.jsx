import React from "react";

import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Modal>
          <div style={{ height: "100px", width: "400px", textAlign: "center" }}>
            <p style={{ lineHeight: "100px" }}>{props.error}</p>
          </div>
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
