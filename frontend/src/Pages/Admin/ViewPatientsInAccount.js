import React, { useState } from "react";
import { useParams } from "react-router";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import { getPatientsInAccountUrl } from "../../api/URLs";
import AllPatients from "../Components/AllPatients";

const ViewPatientsInAccount = () => {
  const { id } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getPatients = getPatientsInAccountUrl(id, pageNumber, pageSize);
  const getPatientsConfig = fetchConfig({ url: getPatients, method: "get" });
  const { data, error } = useRequest(getPatientsConfig, {
    revalidateOnFocus: false,
  });

  if (error) return <div>failed to load</div>;
  return (
    <AllPatients
      patients={data?.patients}
      paginationDetails={data?.paginationDetails}
      setPageNumber={setPageNumber}
      setPageSize={setPageSize}
      pageSize={pageSize}
      pageNumber={pageNumber}
    />
  );
};

export default ViewPatientsInAccount;
