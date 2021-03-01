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
      if (userType === "Admin") {
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
          Actions: <AdminActionTable admissionId={admission.id} />,
        };
      } else if (userType === "Pharmacy") {
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
          Actions: <PharmacyActionTable />,
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
          Actions: <DoctorActionTable />,
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
const AdminActionTable = ({ admissionId }) => {
  return (
    <ActionButton>
      <Link to={`/AdminManageAdmissionPrescriptions/${admissionId}`} className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Prescriptions
      </Link>
    </ActionButton>
  );
};
const PharmacyActionTable = () => {
  return (
    <ActionButton>
      <Link to="#" className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Hello, Pharmcist
      </Link>
    </ActionButton>
  );
};
const DoctorActionTable = () => {
  return (
    <ActionButton>
      <Link to="#" className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Hello, Doctor
      </Link>
    </ActionButton>
  );
};

export default ManageAdmissions;
