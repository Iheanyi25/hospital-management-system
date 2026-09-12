import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { ManageBeds } from "./components";

const AssignBed = ({ history }) => {
  const { state: wardId } = history.location;
  const { id } = useParams();
  return (
    <Fragment>
      <ManageBeds admissionId={id} wardId={wardId} />
    </Fragment>
  );
};

export default AssignBed;
