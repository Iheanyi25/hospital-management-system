import { observer } from "mobx-react";
import React, { useContext } from "react";
import { useParams } from "react-router";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getAntenatalRecordsForAntenatalUrl } from "../../../api/URLs";
import { CreateAnteNatalRecord } from "../../../Components";
import NoDataState from "../../../Components/EmptyState/NoDataState";
import { UserContext } from "../../../mobx/UserState";
import formatDate from "../../../utils/formatDate";

const ViewAntenatalRecords = observer(() => {
  const { id: antenatalId } = useParams();
  const {
    user: { id: initiatorId },
  } = useContext(UserContext);
  const getAntenatalRecordsForAntenatal = getAntenatalRecordsForAntenatalUrl(
    antenatalId
  );
  const getAntenatalRecordsForAntenatalConfig = fetchConfig({
    url: getAntenatalRecordsForAntenatal,
    method: "get",
  });
  const { data, error, mutate } = useRequest(
    getAntenatalRecordsForAntenatalConfig,
    {
      revalidateOnFocus: false,
    }
  );
  if (error) return <div>failed to load</div>;
  return (
    <>
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title mb-0">Ante Natal</h4>
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#create-antenatal-record"
            >
              Create a Report
            </button>
          </header>

          <div className="page-content">
            <div id="accordion" className="mb-3">
              <div className="card border-light p-4">
                <div className="card-body">
                  {data?.antenatalRecords.length === 0 ? (
                    <NoDataState />
                  ) : (
                    data?.antenatalRecords.map((antenatalRecord, index) => (
                      <div className="card mb-0">
                        <div className="card-header" id="headingTwo">
                          <h5 className="mb-0">
                            <button
                              className="btn btn-outline-primary btn-block"
                              data-toggle="collapse"
                              data-target={`#collapse${index + 1}`}
                              aria-expanded="true"
                              aria-controls={`collapse${index + 1}`}
                            >
                              {`Captured on ${
                                formatDate(antenatalRecord?.dateGenerated) ??
                                "N/A"
                              }`}
                            </button>
                          </h5>
                        </div>
                        <div
                          id={`collapse${index + 1}`}
                          className="collapse px-5"
                          aria-labelledby="headingOne"
                        >
                          <div className="row">
                            <div className="col-12 col-md-4">
                              <h5>Fundal Height</h5>
                              <p>{antenatalRecord?.fundalHeight ?? "N/A"}</p>
                            </div>
                            <div className="col-12 col-md-4">
                              <h5>LIE</h5>
                              <p>{antenatalRecord?.lie ?? "N/A"}</p>
                            </div>
                            <div className="col-12 col-md-4">
                              <h5>Urine AI Bumin</h5>
                              <p>{antenatalRecord?.urineAIBumin ?? "N/A"}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-md-4">
                              <h5>Blood Pressure</h5>
                              <p>{antenatalRecord?.bloodPressure ?? "N/A"}</p>
                            </div>
                            <div className="col-12 col-md-4">
                              <h5>H, B</h5>
                              <p>{antenatalRecord?.hb ?? "N/A"}</p>
                            </div>
                            <div className="col-12 col-md-4">
                              <h5>Examiner</h5>
                              <p>{`${antenatalRecord?.firstName ?? "N/A"} ${
                                antenatalRecord?.lastname ?? ""
                              }`}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-md-4">
                              <h5>Present</h5>
                              <p>{antenatalRecord?.present ?? "N/A"}</p>
                            </div>
                            <div className="col-12 col-md-4">
                              <h5>Feotal Heart Rate</h5>
                              <p>{antenatalRecord?.feotalHeartRate ?? "N/A"}</p>
                            </div>
                            <div className="col-12 col-md-4">
                              <h5>Urine Sugar</h5>
                              <p>{antenatalRecord?.urineSugar ?? "N/A"}</p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-md-4">
                              <h5>Weight</h5>
                              <p>{antenatalRecord?.weight ?? "N/A"}</p>
                            </div>
                            <div className="col-12 col-md-4">
                              <h5>Odema</h5>
                              <p>{antenatalRecord?.odema ?? "N/A"}</p>
                            </div>
                            <div className="col-12 col-md-4">
                              <h5>Date of Return</h5>
                              <p>
                                {formatDate(antenatalRecord?.dateOfReturn) ??
                                  "N/A"}
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-12 col-md-4">
                              <h5>Remarks</h5>
                              <p>{antenatalRecord?.remarks ?? "N/A"}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <CreateAnteNatalRecord
        antenatalId={antenatalId}
        initiatorId={initiatorId}
        mutate={mutate}
      />
    </>
  );
});

export default ViewAntenatalRecords;
