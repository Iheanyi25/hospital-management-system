import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { updateSurgeryOperationProcedureUrl } from "../../../api/URLs";
import { Card } from "../../../Components/reusable-css-in-js-components";
import { UserContext } from "../../../mobx/UserState";
import { notification } from "../../../utils/notification";

function SurgicalOperationsProcedure({ surgeryId }) {
  const {
    user: { id: userId },
  } = useContext(UserContext);
  const { state: routeState } = useLocation();
  const [operationProcedure, setoperationProcedure] = useState(
    routeState.operationProcedure || ""
  );

 
  console.log(routeState, 7777);

  const handleChange = (e) => {
    setoperationProcedure(e.target.value);
  };

  const handlePostOperationProcedure = async () => {
    const data = {
      id: surgeryId,
      operationProcedure,
      doctorId: userId,
    };
    try {
      const updateSurgeryOperationProcedure = updateSurgeryOperationProcedureUrl();
      const updateSurgeryOperationProcedureConfig = fetchConfig({
        url: updateSurgeryOperationProcedure,
        data,
        method: "post",
      });
      const res = await fetchWrapper(updateSurgeryOperationProcedureConfig);
      notification.success({ message: res?.data?.message });
    } catch (error) {
      console.error(error);
      notification.error({ message: error?.response?.data?.message });
    }
  };
  return (
    <div>
      <Card>
        <h5 className="mt-0">Operation Procedure</h5>
        <textarea
          className="form-control"
          placeholder="write procedure for operation"
          rows={20}
          onChange={handleChange}
          value={operationProcedure}
        />
        <div className="col text-right pt-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePostOperationProcedure}
            disabled={operationProcedure === "" ? true : false}
          >
            Save
          </button>
        </div>
      </Card>
    </div>
  );
}

export default observer(SurgicalOperationsProcedure);
