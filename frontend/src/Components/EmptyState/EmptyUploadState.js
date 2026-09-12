import React from "react";
import { Link } from "react-router-dom";
import empty from "../../assets/img/empty.svg";

const EmptyUploadState = ({ message, target, targetDescription, noAction }) => {
  return (
    <div className="text-center">
      <img src={empty} alt="empty" />
      <p className="text-secondary mb-0 mt-3">{message}</p>
      {noAction ? null : (
        <Link to="#" data-toggle="modal" data-target={target}>
          {targetDescription}
        </Link>
      )}
    </div>
  );
};

export default EmptyUploadState;
