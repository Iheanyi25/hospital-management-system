import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getDoctorAllSurgeriesUrl } from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import SurgeryReferral from "../../../Components/Modals/SurgeryReferral";
import TableSize from "../../../Components/DataTable/TableSize";
import formatDate from "../../../utils/formatDate";
import formatTime from "../../../utils/formatTime";
import { DisplayNotes } from "../../../Components/Modals/DisplayNotes";

export default function ManageSurgeries() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const getDoctorAllSurgeries = getDoctorAllSurgeriesUrl(pageNumber, pageSize);
  const getDoctorAllSurgeriesConfig = fetchConfig({
    url: getDoctorAllSurgeries,
    method: "get",
  });
  const { data, error, mutate } = useRequest(getDoctorAllSurgeriesConfig, {
    revalidateOnFocus: false,
  });
  let tableData = [];
  if (data) {
    tableData = data.surgeries.map((surgery, index) => {
      return {
        "#": ++index,
        "Patient Name": `${surgery?.patient?.firstName} ${surgery?.patient?.lastName}`,
        "Initiator Name": `${surgery?.initiator?.firstName} ${surgery?.initiator?.lastName}`,
        "Surgery Date": formatDate(surgery?.dateOfSurgery) || "N/A",
        "Surgery Time": formatTime(surgery?.timeOfSurgery) || "N/A",
        // "Referral note": surgery.referralNote || "N/A",
        Actions: (
          <SurgeryTableAction
            surgery={surgery}
            surgeryNotes={`${surgery.referralNote || "N/A"}`}
          />
        ),
      };
    });
  }

  if (error) return <div>failed to load</div>;
  return (
    <Fragment>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header d-flex justify-content-between">
            <h4 className="page-title">All Surgeries</h4>
            <div>
              <Link
                to="#"
                data-toggle="modal"
                data-target="#surgery-referral"
                className="btn btn-outline-primary mr-2 mb-2"
              >
                Emergency Booking
              </Link>
            </div>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data?.surgeries?.length : 0}
              heading="No Of Surgeries"
            />
          </div>
          <div className="page-content">
            {data && (
              <Table
                content={tableData}
                paginationDetails={data.paginationDetails}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                pageSize={pageSize}
                setPageSize={setPageSize}
              />
            )}
          </div>
        </div>
      </main>
      <SurgeryReferral mutate={mutate} emergency />
    </Fragment>
  );
}

const SurgeryTableAction = ({ surgery, surgeryNotes }) => {
  return (
    <>
      <ActionButton>
        <Link
          data-toggle="modal"
          data-target={`#notes-${surgery.id}`}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-stethoscope-alt mr-2" />
          Referral Notes
        </Link>
        <Link
          title="Go For Pre-consultation"
          to={{
            pathname: `/AdminSurgicalOperationNotes/${surgery.id}`,
            state: surgery,
          }}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-stethoscope-alt mr-2" />
          Surgery Notes
        </Link>
      </ActionButton>
      <DisplayNotes
        id={surgery.id}
        details={{ title: "Referral Notes", body: surgeryNotes }}
      />
    </>
  );
};
