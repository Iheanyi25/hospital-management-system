import { observer } from "mobx-react";
import React, { useContext } from "react";
import { fetchConfig } from "../../../../api/fetchConfig";
import { useRequest } from "../../../../api/fetcher";
import { getHMOCountersUrl } from "../../../../api/URLs";
import TableSize from "../../../../Components/DataTable/TableSize";
import { UserContext } from "../../../../mobx/UserState";

const HMODashboardSummary = observer(() => {
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
      <TableSize
        size={data?.hmoHealthPlanCount || 0}
        heading="Number of Plans"
      />
      <TableSize
        size={data?.hmoUserGroupCount || 0}
        heading="Total User Groups"
      />
    </div>
  );
});

export { HMODashboardSummary };
