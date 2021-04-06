import React, { Fragment, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import {
  getNHISHealthPlanPatientsByHealthPlanUrl,
  deletePatientFromNHISHealthPlanUrl,
} from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";
import { notification } from "../../../utils/notification";

const ManagePatients = () => {
  const {
    location: { state: healthPlanName },
  } = useHistory();
  const { id: healthPlanId } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getHealthPlanPatientsByHealthPlan = getNHISHealthPlanPatientsByHealthPlanUrl(
    healthPlanId,
    pageNumber,
    pageSize
  );
  const getHealthPlanPatientsByHealthPlanConfig = fetchConfig({
    url: getHealthPlanPatientsByHealthPlan,
    method: "get",
  });
  const { data, error, mutate } = useRequest(
    getHealthPlanPatientsByHealthPlanConfig,
    {
      revalidateOnFocus: false,
    }
  );
  console.log(data, 212);
  const deletePatient = async (id) => {
    try {
      const deletePatientFromNHISHealthPlan = deletePatientFromNHISHealthPlanUrl();
      const deletePatientFromNHISHealthPlanConfig = fetchConfig({
        url: deletePatientFromNHISHealthPlan,
        data: { id },
        method: "delete",
      });
      const res = await fetchWrapper(deletePatientFromNHISHealthPlanConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        mutate();
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
  };
  let dataTable = [];
  if (data) {
    dataTable = data.healthPlanPatients.map(
      ({ firstName, lastName, email, phoneNumber, id, patientId }, index) => {
        return {
          "#": ++index,
          Name: `${firstName} ${lastName}`,
          Email: <a href={"mailto:" + email}>{email}</a>,
          Phone: phoneNumber || "Not available",
          Actions: (
            <NHISPatientActionTable
              deletePatient={deletePatient}
              id={id}
              healthPlanDetails={{
                patientName: `${firstName} ${lastName}`,
                healthPlanId,
                healthPlanName,
                patientId,
              }}
            />
          ),
        };
      }
    );
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
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title mb-0">{`Manage Patients in ${healthPlanName || ""}`}</h4>
            <Link
              className="btn btn-primary"
              to={{
                pathname: `/AdminAddUserToNHIS/${healthPlanId}`,
                state: healthPlanName,
              }}
            >
              Add patient
            </Link>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.healthPlanPatients.length : 0}
              heading="Total Patients"
            />
          </div>
          <div className="page-content">
            {data && (
              <Table
                content={dataTable}
                paginationDetails={data.paginationDetails}
                tableID={"drugs" + data?.healthPlanPatients.length}
                key={"drugs" + data?.healthPlanPatients.length}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                pageSize={pageSize}
                setPageSize={setPageSize}
              />
            )}
          </div>
        </div>
      </main>
    </Fragment>
  );
};
const NHISPatientActionTable = ({ deletePatient, healthPlanDetails, id }) => {
  return (
    <ActionButton>
      <Link
        to={{
          pathname: `/AdminReassignPatientToNHIS/${id}`,
          state: { ...healthPlanDetails, id },
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Reassign to healthplan
      </Link>
      <button
        onClick={() => deletePatient(id)}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Delete
      </button>
    </ActionButton>
  );
};

export default ManagePatients;
