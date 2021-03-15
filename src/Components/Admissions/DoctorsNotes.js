import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import user from "../../assets/img/user.png";
import { getAdmissionsDoctorsNotesUrl } from "../../api/URLs";
import formatDate from "../../utils/formatDate";
import { PageLoader } from "../Loader";
import EmptyUploadState  from "../../Components/EmptyState/EmptyUploadState";

let $ = window.$;
$.DataTables = require("datatables.net");

const DoctorsNotes = ({ admissionId }) => {
  const getAdmissionsDoctorsNotes = getAdmissionsDoctorsNotesUrl(admissionId);
  const getAdmissionsDoctorsNotesConfig = fetchConfig({
    url: getAdmissionsDoctorsNotes,
    method: "get",
  });
  const { data, error } = useRequest(getAdmissionsDoctorsNotesConfig);
  return (
    <>
      <div className="card-body">
        <div id="accordion" className="mb-3">
          {!data ? (
              <PageLoader />
            ) 
            : data?.admissionNotes?.length === 0 ? (
              <EmptyUploadState message="No Doctors Notes"/>
            ) : (
             data?.admissionNotes.map((doctorsnote, index) => (            
            <div className="card mb-0">
              <div className="card-header" id={`heading${1}`}>
                <h5 className="mb-0">
                  <button
                    className="btn btn-outline-primary btn-block"
                    data-toggle="collapse"
                    data-target={`#collapseDrNote${index + 1}`}
                    aria-expanded="true"
                    aria-controls={`collapse${index + 1}`}
                  >
                    Doctors Notes
                    {`Captured on ${formatDate(doctorsnote.dateGenerated) ?? ""}`}
                  </button>
                </h5>
              </div>
              <div
                id={`collapseDrNote${index + 1}`}
                className="collapse"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div className="d-flex mt-3 mb-3">
                  <img
                    src={user}
                    style={{ height: "64px", width: "64px" }}
                    className="rounded-circle mr-3"
                    alt="user"
                  />
                  <div>
                    <h5 className="mb-2 mt-1 font-weight-bold">
                      <u>
                        {`Dr. ${
                          doctorsnote.doctor.firstName}  ${doctorsnote.doctor.lastName}`}                        
                      </u>
                    </h5>
                    <p className="mb-2">
                      {" "}
                      {`Clerked patient on ${formatDate(doctorsnote.dateGenerated) ?? ""}`}
                    </p>
                  </div>
                </div>
                <div className="card-body w-50">
                  <div className="pl-5">
                    <h6 className="font-weight-bold"></h6>
                    <p className="mb-0">{doctorsnote.note}</p>
                  </div>
                </div>
              </div>
            </div>
          )) ?? null
           )}
        </div>
      </div>
    </>
  );
};

export { DoctorsNotes };
