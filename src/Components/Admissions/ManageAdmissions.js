import { observer } from "mobx-react";
import React, { useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import { getAdmissionsUrl, getAllWardsUrl } from "../../api/URLs";
import incomplete from "../../assets/img/incomplete.svg";
import paid from "../../assets/img/paid.svg";
import { UserContext } from "../../mobx/UserState";
import { Table } from "../DataTable";
import ActionButton from "../DataTable/ActionButton";
import TableSize from "../DataTable/TableSize";
import { PageLoader } from "../Loader";

const ManageAdmissions = observer(() => {
  const {
    user: { userType },
  } = useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [wardId, setWardId] = useState("all");

  //Fetching admissions
  const getAdmissions = getAdmissionsUrl(wardId, pageNumber, pageSize);
  const getAdmissionsConfig = fetchConfig({
    url: getAdmissions,
    method: "get",
  });
  const { data, error } = useRequest(getAdmissionsConfig, {
    revalidateOnFocus: false,
  });

  // Fetching all wards
  const getAllWards = getAllWardsUrl(pageNumber, pageSize);
  const getAllWardsConfig = fetchConfig({ url: getAllWards, method: "get" });
  const { data: wards } = useRequest(getAllWardsConfig, {
    revalidateOnFocus: false,
  });
  let dataTable = [];
  if (data) {
    dataTable = data.admissions.map((admission, index) => {
      if (userType === "Nurse") {
        return {
          "#": ++index,
          "Patient Name": `${admission?.patient?.firstName} ${admission?.patient?.lastName}`,
          "Doctor Name": `${admission?.doctor?.firstName} ${admission?.doctor?.lastName}`,
          Ward: admission?.bed?.ward?.name,
          Room: admission?.bed?.name,
          Status:
            admission?.bed === null ? (
              <>
                <img src={incomplete} alt="not paid" /> Pending
              </>
            ) : (
              <>
                <img src={paid} alt="paid" /> Admitted
              </>
            ),
          Actions: (
            <NurseActionTable
              admissionId={admission.id}
              patientId={admission.patient.id}
            />
          ),
        };
      } else if (userType === "Accountant") {
        return {
          "#": ++index,
          "Patient Name": `${admission?.patient?.firstName} ${admission?.patient?.lastName}`,
          "Doctor Name": `${admission?.doctor?.firstName} ${admission?.doctor?.lastName}`,
          Ward: admission?.bed?.ward?.name,
          Room: admission?.bed?.name,
          Status:
            admission?.bed === null ? (
              <>
                <img src={incomplete} alt="not paid" /> Pending
              </>
            ) : (
              <>
                <img src={paid} alt="paid" /> Admitted
              </>
            ),
          Actions: (
            <AccountantTable
              admissionId={admission.id}
              patientId={admission.patient.id}
            />
          ),
        };
      } else if (userType === "Lab") {
        return {
          "#": ++index,
          "Patient Name": `${admission?.patient?.firstName} ${admission?.patient?.lastName}`,
          "Doctor Name": `${admission?.doctor?.firstName} ${admission?.doctor?.lastName}`,
          Ward: admission?.bed?.ward?.name,
          Room: admission?.bed?.name,
          Status:
            admission?.bed === null ? (
              <>
                <img src={incomplete} alt="not paid" /> Pending
              </>
            ) : (
              <>
                <img src={paid} alt="paid" /> Admitted
              </>
            ),
          Actions: <LabActionTable admissionId={admission.id} />,
        };
      } else {
        return {
          "#": ++index,
          "Patient Name": `${admission?.patient?.firstName} ${admission?.patient?.lastName}`,
          "Doctor Name": `${admission?.doctor?.firstName} ${admission?.doctor?.lastName}`,
          Ward: admission?.bed?.ward?.name,
          Room: admission?.bed?.name,
          Status:
            admission?.bed === null ? (
              <>
                <img src={incomplete} alt="not paid" /> Pending
              </>
            ) : (
              <>
                <img src={paid} alt="paid" /> Admitted
              </>
            ),
          Actions: (
            <AdminActionTable
              admissionId={admission.id}
              patientId={admission.patient.id}
            />
          ),
        };
      }
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
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title">Admissions</h4>
          </header>
          <div className="page-content">
            <TableSize
              size={data?.admissions.length}
              heading="No of Patients admitted"
              icon=""
            />
          </div>
          <div className="page-content">
            <div className="row mx-0 mb-3">
              <div className="col-12 col-md-4 col-lg-3 px-0">
                <select
                  className="form-control"
                  name="degree"
                  onChange={(e) => {
                    setWardId(e.target.value);
                  }}
                >
                  <option value="all">All</option>
                  {wards?.wards?.map((ward, index) => (
                    <option value={ward.id} key={index}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {data && (
              <Table
                content={dataTable}
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
    </Fragment>
  );
});

// Everything goes in here at first
const AdminActionTable = ({ admissionId, patientId }) => {
  return (
    <ActionButton>
      <Link
        to={`/AdminManageAdmissionPrescriptions/${admissionId}`}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Prescriptions
      </Link>
      <Link
        to={`/AdminCreateAdmissionServiceRequest/${admissionId}`}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Request a service
      </Link>
      <Link
        to={`/AdminManageAdmissionServiceRequest/${admissionId}`}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Lab Services
      </Link>
      <Link
        to={{
          pathname: `/AdminManageAdmissionInvoices/${admissionId}`,
          state: patientId,
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Manage Invoices
      </Link>
    </ActionButton>
  );
};
const AccountantTable = ({ admissionId, patientId }) => {
  return (
    <ActionButton>
      <Link
        to={{
          pathname: `/AccountantManageAdmissionInvoices/${admissionId}`,
          state: patientId,
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Manage Invoices
      </Link>
    </ActionButton>
  );
};
const NurseActionTable = () => {
  return (
    <ActionButton>
      <Link to="#" className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Hello, Nurse
      </Link>
    </ActionButton>
  );
};
const LabActionTable = ({ admissionId }) => {
  return (
    <ActionButton>
      <Link
        to={`/LabManageAdmissionServiceRequest/${admissionId}`}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Lab Services
      </Link>
    </ActionButton>
  );
};

export default ManageAdmissions;
