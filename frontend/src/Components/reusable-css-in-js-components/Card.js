import React from "react";

export const Card = (props) => {
  return (
    <div className="card border-light">
      <div className="card-body">{props.children}</div>
    </div>
  );
}
