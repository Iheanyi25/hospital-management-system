import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { updateSurgeryOperationNoteOneUrl } from "../../../api/URLs";
import { UserContext } from "../../../mobx/UserState";
import { notification } from "../../../utils/notification";
import AdmissionForm from "./surgical-operation-note-components/AdmissionForm";
import DietaryForm from "./surgical-operation-note-components/DietaryForm";
import NursingForm from "./surgical-operation-note-components/NursingForm";
import PreventionForm from "./surgical-operation-note-components/PreventionForm";
import RespiratoryCareForm from "./surgical-operation-note-components/RespiratoryCareForm";

function SurgicalOperationNote({ surgeryId }) {
  const {
    user: { id: userId },
  } = useContext(UserContext);
  const { state: routeState } = useLocation();
  const [admission, setAdmission] = useState({
    hospitalistService: routeState?.hospitalistService || false,
    medSurgService: routeState?.medSurgService || false,
    icu: routeState?.icu || false,
    tele: routeState?.tele || false,
    surgeryAndDiagnosis: routeState?.surgeryAndDiagnosis || "",
    secondaryDiagnosis: routeState?.secondaryDiagnosis || "",
    allergies: routeState?.allergies || false.valueOf,
    onChat: routeState?.onChat || false,
    completedByPCPCall: routeState?.completedByPCPCall || false,
  });
  const [dietary, setDietary] = useState({
    dietary: routeState?.dietary,
  });
  const [nursingPartOne, setNursingPartOne] = useState({
    vsEveryEightHours: routeState?.vsEveryEightHours || false,
    vsEveryFourHours: routeState?.vsEveryFourHours || false,
    vsPerUnitProtocol: routeState?.vsPerUnitProtocol || false,
    iAndDWeightDaily: routeState?.iAndDWeightDaily || false,
    bedRest: routeState?.bedRest || false,
    oobToChain: routeState?.oobToChain || false,
    ambAsTol: routeState?.ambAsTol || false,
    managementPerPDHPolicy: routeState?.managementPerPDHPolicy || false,
    jacksonPratt: routeState?.jacksonPratt || false,
    hamovac: routeState?.hamovac || false,
    penrose: routeState?.penrose || false,
    //endpoint returns boolean instead of string
    dressing: routeState?.dressing || false,
  });

  const [nursingPartTwo, setNursingPartTwo] = useState({
    hrLowerLimit: routeState?.hrLowerLimit,
    hrUpperLimit: routeState?.hrUpperLimit,
    rpLowerLimit: routeState?.rpLowerLimit,
    rpUpperLimit: routeState?.rpUpperLimit,
    sbpLowerLimit: routeState?.sbpLowerLimit,
    sbpUpperLimit: routeState?.sbpUpperLimit,
    dpbLowerLimit: routeState?.dpbLowerLimit,
    dpbUpperLimit: routeState?.dpbUpperLimit,
    spO2LowerLimit: routeState?.spO2LowerLimit,
    spO2UpperLimit: routeState?.spO2UpperLimit,
    temperatureLowerLimit: routeState?.temperatureLowerLimit,
    temperatureUpperLimit: routeState?.temperatureUpperLimit,

    urineOutput: routeState?.urineOutput || false,
    haemoglobin: routeState.haemoglobin,
    unusualWoundDrainage: routeState?.unusualWoundDrainage,
  });

  const [prevention, setPrevention] = useState({
    pantoprazole: routeState?.pantoprazole || false,
    famotidine: routeState?.famotidine || false,
    infectionPrevention: routeState?.infectionPrevention || "",
  });
  const [respiratory, setRespiratory] = useState({
    respiratoryCare: routeState?.respiratoryCare || "",
  });

  const handlePostNoteOne = async () => {
    const data = {
      ...admission,
      ...nursingPartOne,
      ...nursingPartTwo,
      ...dietary,
      ...prevention,
      ...respiratory,
      doctorId: userId,
      id: surgeryId,
    };
    try {
      const updateSurgeryOperationNoteOne = updateSurgeryOperationNoteOneUrl();
      console.log(updateSurgeryOperationNoteOne, data, 1113333);
      const updateSurgeryOperationNoteOneConfig = fetchConfig({
        url: updateSurgeryOperationNoteOne,
        data,
        method: "post",
      });
      const res = await fetchWrapper(updateSurgeryOperationNoteOneConfig);
      console.log(res, 111155555);
      notification.success({ message: res?.data?.message });
    } catch (error) {
      notification.error({ message: error?.response?.data?.message });
    }
  };

  return (
    <div>
      <div className="d-md-flex justify-content-between">
        <div className="d-md-flex flex-column mr-md-3" style={{ flex: "1" }}>
          <AdmissionForm admission={admission} setAdmission={setAdmission} />
          <DietaryForm dietaryState={dietary} setDietary={setDietary} />
        </div>
        <NursingForm
          nursingPartOne={nursingPartOne}
          setNursingPartOne={setNursingPartOne}
          nursingPartTwo={nursingPartTwo}
          setNursingPartTwo={setNursingPartTwo}
        />
      </div>

      <div className="d-md-flex justify-content-between">
        <PreventionForm prevention={prevention} setPrevention={setPrevention} />
        <RespiratoryCareForm
          respiratory={respiratory}
          setRespiratory={setRespiratory}
        />
      </div>
      <div style={{ flex: "1" }} className="col text-right">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handlePostNoteOne}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default observer(SurgicalOperationNote);
