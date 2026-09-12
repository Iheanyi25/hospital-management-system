import React from "react";

export const FlexBetweenContainer = (props) => {
    return (
      <div
        className="d-md-flex justify-content-between py-2 flex-container-print"
        style={{ width: props.width }}
        id={props.id}
      >
        {props.children}
      </div>
    );
  };