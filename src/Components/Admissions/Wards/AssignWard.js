import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { ManageWards } from "./components";

const AssignWard = () => {
  const { id } = useParams();
  return (
    <Fragment>
      <ManageWards admissionId={id} />
    </Fragment>
  );
};

export default AssignWard;
