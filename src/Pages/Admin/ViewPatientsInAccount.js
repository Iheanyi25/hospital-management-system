import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import { getPatientsInAccountUrl } from "../../api/URLs";
import AllPatients from "../Components/AllPatients";

const ViewPatientsInAccount = () => {
  const getPatients = getPatientsInAccountUrl();
  const getPatientsConfig = fetchConfig({ url: getPatients, method: "get" });
  const { data, error } = useRequest(getPatientsConfig, {
    revalidateOnFocus: false,
  });

  if (error) return <div>failed to load</div>;
  return <AllPatients patients={data?.patients} />;
};

export default ViewPatientsInAccount;
