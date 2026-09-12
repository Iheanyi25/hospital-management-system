import React from "react";
import { useParams } from "react-router-dom";
import { ManageBeds } from "./components";

const ViewBeds = () => {
  const { id } = useParams();
  return <ManageBeds wardId={id} />;
};

export default ViewBeds;
