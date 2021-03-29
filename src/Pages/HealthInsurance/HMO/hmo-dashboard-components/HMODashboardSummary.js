import React, { useContext } from "react";
import { fetchConfig } from "../../../../api/fetchConfig";
import { useRequest } from "../../../../api/fetcher";
import { getHMOCountersUrl } from "../../../../api/URLs";
import TableSize from "../../../../Components/DataTable/TableSize";
import { UserContext } from "../../../../mobx/UserState";

const HMODashboardSummary = () => {
  const { hmoId } = useContext(UserContext);
  const getHMOCounters = getHMOCountersUrl(hmoId);
  const getHMOCountersConfig = fetchConfig({
    url: getHMOCounters,
    method: "get",
  });
  const { data } = useRequest(getHMOCountersConfig, {
    revalidateOnFocus: false,
  });
  return (
    <div className="row">
      <TableSize size={data?.hmoHealthPlanCount || 0} heading="Number of Plans" />
      <TableSize size={data?.hmoHealthPlanPatientCount || 0} heading="Total Users" />
      <TableSize size={data?.hmoSubUserGroupCount || 0} heading="Total User Groups" />
    </div>
  );
};

export { HMODashboardSummary };
