import React from "react";

export const HorizontalLine = ({ lineWidth }) => {
    return (
      <div
        style={{ width: lineWidth || "45%" }}
        className="border-bottom py-4"
      ></div>
    );
  };