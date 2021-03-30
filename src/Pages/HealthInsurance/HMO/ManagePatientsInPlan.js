import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import {
  getHealthPlanPatientsInHMOByHealthPlanUrl,
  deletePatientFromHMOHealthPlanUrl,
} from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";
import { notification } from "../../../utils/notification";

const ManagePatients = () => {
  const {
    location: { state: healthPlanName },
  } = useHistory();
  const { id } = useParams();
  const [planName, setPlanName] = useState("");
  useEffect(() => {
    setPlanName(healthPlanName);
  }, [healthPlanName]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getHealthPlanPatientsInHMOByHealthPlan = getHealthPlanPatientsInHMOByHealthPlanUrl(
    id,
    pageNumber,
    pageSize
  );
  const getHealthPlanPatientsInHMOByHealthPlanConfig = fetchConfig({
    url: getHealthPlanPatientsInHMOByHealthPlan,
    method: "get",
  });
  const { data, error, mutate } = useRequest(
    getHealthPlanPatientsInHMOByHealthPlanConfig,
    {
      revalidateOnFocus: false,
    }
  );
  const deletePatient = async (id) => {
    console.log(id);
    try {
      const deletePatientFromHMOHealthPlan = deletePatientFromHMOHealthPlanUrl();
      const deletePatientFromHMOHealthPlanConfig = fetchConfig({
        url: deletePatientFromHMOHealthPlan,
        data: { id },
        method: "delete",
      });
      const res = await fetchWrapper(deletePatientFromHMOHealthPlanConfig);
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
      ({ firstName, lastName, email, phoneNumber, id }, index) => {
        return {
          "#": ++index,
          Name: `${firstName} ${lastName}`,
          Email: <a href={"mailto:" + email}>{email}</a>,
          Phone: phoneNumber || "Not available",
          Actions: <ActionTable deletePatient={deletePatient} id={id} />,
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
            <h4 className="page-title mb-0">{`Manage Patients in ${planName || ""}`}</h4>
            <Link
              className="btn btn-primary"
              to={{ pathname: `/AddUserToPlan/${id}`, state: planName }}
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
const ActionTable = ({ deletePatient, id }) => {
  return (
    <ActionButton>
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
