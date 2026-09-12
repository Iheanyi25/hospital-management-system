import { observer } from "mobx-react";
import React, {useContext} from "react";
import { UserContext } from "../../mobx/UserState";
import PatientHealthHistoryContainer from "../Components/PatientHistory/PatientHealthHistoryContainer";

function ViewHealthHistory(){
    const {user : {id}}= useContext(UserContext);
    
  return (
      <PatientHealthHistoryContainer patientId={id} />
  );
}
export default observer(ViewHealthHistory)

