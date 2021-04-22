import { observer } from "mobx-react";
import React, { useContext } from "react";
import { useParams } from "react-router";
import { UserContext } from "../../../../mobx/UserState";
import {
  DailyReport,
  NandaReport,
  NursingReportForm,
  ViewDailyReport,
  ViewNandaReport,
  ViewNursingReport,
} from "./forms";

const NursingReportTabContent = observer(({ view, report }) => {
  const { id } = useParams();
  const {
    user: { id: nurseId },
  } = useContext(UserContext);
  return (
    <div>
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane show fade active"
          id="pills-nursing-report"
          role="tabpanel"
          aria-labelledby="pills-nursing-report-tab"
        >
          {" "}
          {view ? (
            <ViewNursingReport report={report} />
          ) : (
            <NursingReportForm nurseId={nurseId} id={id} />
          )}
        </div>

        <div
          className="tab-pane fade"
          id="pills-nanda"
          role="tabpanel"
          aria-labelledby="pills-nanda-tab"
        >
          {view ? (
            <ViewNandaReport report={report} />
          ) : (
            <NandaReport nurseId={nurseId} id={id} />
          )}
        </div>

        <div
          className="tab-pane fade"
          id="pills-daily-report"
          role="tabpanel"
          aria-labelledby="pills-daily-report-tab"
        >
          {view ? (
            <ViewDailyReport report={report} />
          ) : (
            <DailyReport nurseId={nurseId} id={id} />
          )}
        </div>
      </div>
    </div>
  );
});

export default NursingReportTabContent;
