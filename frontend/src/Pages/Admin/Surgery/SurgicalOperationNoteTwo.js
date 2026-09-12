import { observer } from "mobx-react";
import React, { useState, useContext } from "react";
import { useLocation } from "react-router";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { updateSurgeryOperationNoteTwoUrl } from "../../../api/URLs";
import { Card } from "../../../Components/reusable-css-in-js-components";
import { UserContext } from "../../../mobx/UserState";
import { notification } from "../../../utils/notification";
import { isNotEmptyString } from "../../../utils/validationUtils";

function SurgicalOperationNoteTwo({ surgeryId }) {
  const {
    user: { id: userId },
  } = useContext(UserContext);
  const { state: routeState } = useLocation();

  const [state, setState] = useState({
    postOperationMedication: routeState.postOperationMedication|| "",
    surgeons: routeState.surgeons ||"",
    anasthetics: routeState.anasthetics || "",
    operation: routeState.operation || "",
    surgeryIndication: routeState.surgeryIndication || "",
  });


  console.log(userId, 666);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handlePostSurgeryNoteTwo = async () => {
    const data = { ...state, doctorId: userId, id: surgeryId };
    try {
      const updateSurgeryOperationNoteTwo = updateSurgeryOperationNoteTwoUrl();
      console.log(updateSurgeryOperationNoteTwo, data, 3333);
      const updateSurgeryOperationNoteTwoConfig = fetchConfig({
        url: updateSurgeryOperationNoteTwo,
        data,
        method: "post",
      });
      const res = await fetchWrapper(updateSurgeryOperationNoteTwoConfig);
      console.log(res, 55555);
      notification.success({ message: res?.data?.message });
    } catch (error) {
      notification.error({ message: error?.response?.data?.message });
    }
  };

  const {
    postOperationMedication,
    surgeons,
    anasthetics,
    operation,
    surgeryIndication,
  } = state;

  return (
    <div>
      <div className="d-md-flex justify-content-between">
        <div style={{ flex: "1" }} className="mr-md-3">
          <Card>
            <h4>Post Op Medication</h4>
            <textarea
              className="form-control"
              placeholder="write post operation medication"
              rows={20}
              onChange={handleChange}
              value={postOperationMedication}
              name="postOperationMedication"
            />
          </Card>
        </div>
        <div className="d-md-flex flex-column" style={{ flex: "1" }}>
          <div>
            <Card>
              <h4>Surgeons</h4>
              <textarea
                className="form-control"
                placeholder="name the surgeons"
                rows={6}
                onChange={handleChange}
                value={surgeons}
                name="surgeons"
              />
            </Card>
          </div>
          <div>
            <Card>
              <h4>Anasthetics</h4>
              <textarea
                className="form-control"
                placeholder="Anasthetics"
                rows={6}
                onChange={handleChange}
                value={anasthetics}
                name="anasthetics"
              />
            </Card>
          </div>
        </div>
      </div>

      <div className="d-md-flex justify-content-between">
        <div className="d-md-flex flex-column" style={{ flex: "1" }}>
          <div className="h-50">
            <Card>
              <h4>Operation</h4>
              <textarea
                className="form-control"
                placeholder="write operation"
                rows={5}
                onChange={handleChange}
                value={operation}
                name="operation"
              />
            </Card>
          </div>
          <div>
            <Card>
              <h4>Surgery Indication</h4>
              <textarea
                className="form-control"
                placeholder="surgery medication"
                rows={12}
                onChange={handleChange}
                value={surgeryIndication}
                name="surgeryIndication"
              />
            </Card>
          </div>
        </div>
        <div style={{ flex: "1" }} className="col text-right">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handlePostSurgeryNoteTwo}
            disabled={
              !isNotEmptyString(postOperationMedication) &&
              !isNotEmptyString(surgeons) &&
              !isNotEmptyString(anasthetics) &&
              !isNotEmptyString(operation) &&
              !isNotEmptyString(surgeryIndication)
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default observer(SurgicalOperationNoteTwo);
