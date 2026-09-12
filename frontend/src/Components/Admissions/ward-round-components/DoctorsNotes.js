import React, { useContext } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import user from "../../../assets/img/user.png";
import { getAdmissionsDoctorsNotesUrl } from "../../../api/URLs";
import formatDate from "../../../utils/formatDate";
import { PageLoader } from "../../Loader";
import EmptyUploadState from "../../EmptyState/EmptyUploadState";
import UpdateDoctorsNotes from "../../Modals/UpdateDoctorsNotes";
import { observer } from "mobx-react";
import { UserContext } from "../../../mobx/UserState";

const DoctorsNotes = observer(({ admissionId, dischargeStatus }) => {
  const {
    user: { userType },
  } = useContext(UserContext);
  const getAdmissionsDoctorsNotes = getAdmissionsDoctorsNotesUrl(admissionId);
  const getAdmissionsDoctorsNotesConfig = fetchConfig({
    url: getAdmissionsDoctorsNotes,
    method: "get",
  });
  const { data, mutate } = useRequest(getAdmissionsDoctorsNotesConfig, {
    revalidateOnFocus: false,
  });
  return (
    <>
      <div className="row justify-content-center mx-auto mt-5">
        <div className="col-md-6">
          <div className="card border-light">
            <div className="card-body">
              {data?.admissionNotes.length > 0 ? (
                <div className="d-flex justify-content-between align-item-between">
                  <h5 className="m-0">Doctor's Notes</h5>
                  {(userType === "Admin" || userType === "Doctor") &&
                  dischargeStatus === false ? (
                    <button
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#doctors-note"
                    >
                      Update
                    </button>
                  ) : null}
                </div>
              ) : null}

              <div id="accordion" className="mb-3">
                {!data ? (
                  <PageLoader />
                ) : data?.admissionNotes?.length === 0 &&
                  (userType === "Admin" || userType === "Doctor") &&
                  dischargeStatus === false ? (
                  <EmptyUploadState
                    message="No Doctors Notes"
                    target="#doctors-note"
                    targetDescription="Update notes"
                  />
                ) : data?.admissionNotes?.length === 0 ? (
                  <EmptyUploadState message="No Doctors Notes" />
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
                            {`Captured on ${
                              formatDate(doctorsnote.dateGenerated) ?? ""
                            }`}
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
                                {`Dr. ${doctorsnote.doctor.firstName}  ${doctorsnote.doctor.lastName}`}
                              </u>
                            </h5>
                            <p className="mb-2">
                              {" "}
                              {`Clerked patient on ${
                                formatDate(doctorsnote.dateGenerated) ?? ""
                              }`}
                            </p>
                          </div>
                        </div>
                        <div className="card-body w-50">
                          <div className="pl-5">
                            <p className="mb-0">{doctorsnote.note}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )) ?? null
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <UpdateDoctorsNotes admissionId={admissionId} mutate={mutate} />
    </>
  );
});

export default DoctorsNotes;
