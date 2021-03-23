import React, { useContext, useState } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getHMOHealthPlansUrl } from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";
import { UserContext } from "../../../mobx/UserState";

const ManageHealthPlans = () => {
  const { hmoId } = useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getNHISHealthPlans = getHMOHealthPlansUrl(hmoId, pageNumber, pageSize);
  const getNHISHealthPlansConfig = fetchConfig({
    url: getNHISHealthPlans,
    method: "get",
  });
  const { data, error } = useRequest(getNHISHealthPlansConfig, {
    revalidateOnFocus: false,
  });
  let dataTable = [];
  if (data) {
    dataTable = data.hmoHealthPlans.map(({ name, description, id }, index) => {
      return {
        "#": ++index,
        "Health Plan": name,
        Description: description,
        Actions: (
          <HealthPlansActionTable healthPlanName={name} healthPlanId={id} />
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
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title mb-0">Health Plans</h4>
            <Link className="btn btn-primary" to="/CreateHealthPlan">
              Create Health Plan
            </Link>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.hmoHealthPlans.length : 0}
              heading="Number of Health Plans"
            />
          </div>
          <div className="page-content">
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
};
const HealthPlansActionTable = ({ healthPlanName, healthPlanId }) => {
  return (
    <ActionButton>
      <Link
        to={{
          pathname: `/ManageHealthPlanPatients/${healthPlanId}`,
          state: healthPlanName,
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Manage patients
      </Link>
      <Link
        to={{
          pathname: `/ManageHealthPlanDrugs/${healthPlanId}`,
          state: healthPlanName,
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Manage drugs
      </Link>
      <Link to={`/ManageHealthPlanServices`} className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Manage services
      </Link>
      <Link to={`/EditHealthPlan`} className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Edit
      </Link>
    </ActionButton>
  );
};

export default ManageHealthPlans;
