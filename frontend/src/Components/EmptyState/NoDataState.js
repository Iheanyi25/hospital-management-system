import React from "react";
import empty from "../../assets/img/emptyData.svg";

const NoDataState = () => {
  return (
    <div className="d-flex justify-content-center my-4">
      <img src={empty} alt="empty states" />
    </div>
  );
};

export default NoDataState;
