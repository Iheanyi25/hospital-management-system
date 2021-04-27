import React, { useState, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import { getAllHealthPlansUrl, disableHealthPlanUrl, enableHealthPlanUrl } from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import paid from "../../../assets/img/paid.svg";
import notpaid from "../../../assets/img/notpaid.svg";
import formatDate from "../../../utils/formatDate";
import TableSize from "../../../Components/DataTable/TableSize";
import { notification } from "../../../utils/notification";
import ActionButton from "../../../Components/DataTable/ActionButton";

const ManageHealthPlans = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getAllHealthPlans = getAllHealthPlansUrl(pageNumber, pageSize);
  const getAllHealthPlansConfig = fetchConfig({
    url: getAllHealthPlans,
    method: "get",
  });
  const { data, error, mutate } = useRequest(getAllHealthPlansConfig, {
    revalidateOnFocus: false,
  });
  console.log(data);
  const disableHealthPlan = async (id) => {
    try {
      const disableHealthPlan = disableHealthPlanUrl();
      const disableHealthPlansConfig = fetchConfig({
        url: disableHealthPlan,
        method: "post",
        data: { id },
      });
      const res = await fetchWrapper(disableHealthPlansConfig);
      console.log(21212, res);
      if (res.status === 200) {
        mutate();
        notification.success({ message: res.data.message });
      }
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data.message });
    }
  };

  const enableHealthPlan = async (id) => {
    try {
      const enableHealthPlan = enableHealthPlanUrl();
      const enableHealthPlansConfig = fetchConfig({
        url: enableHealthPlan,
        method: "post",
        data: { id },
      });
      const res = await fetchWrapper(enableHealthPlansConfig);
      if (res.status === 200) {
        mutate();
        notification.success({ message: res.data.message });
      }
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data.message });
    }
  };
  let dataTable = [];
  if (data) {
    dataTable = data.healthPlans.map((healthPlan, index) => {
      return {
        "#": ++index,
        Name: healthPlan.name,
        Cost: healthPlan.cost,
        "Renewal Cost": healthPlan.renewal,
        "Patients Per Folder": healthPlan.noOfPatients,
        "Accounts Per Plan": healthPlan.noOfAccounts,
        Date: formatDate(healthPlan.dateCreated),
        "Instant billing": (
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input"
              id="control2"
              checked={healthPlan.instantBilling ? true : false}
            />
            <label className="custom-control-label" for="control1"></label>
          </div>
        ),
        Status: (
          <>
            {healthPlan?.status ? (
              <>
                <img src={paid} alt="not paid" /> Enabled
              </>
            ) : (
              <>
                <img src={notpaid} alt="not paid" /> Disabled
              </>
            )}
          </>
        ),
        Actions: (
          <HealthPlanTableAction
            healthPlan={healthPlan}
            status={healthPlan?.status}
            enableHealthPlan={enableHealthPlan}
            disableHealthPlan={disableHealthPlan}
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
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title mb-0">Manage Health Plans</h4>
            <NavLink className="btn btn-primary" to="/AdminCreateHealthPlan">
              Create Health Plan
            </NavLink>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.healthPlans.length : 0}
              heading="No of Services"
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
const HealthPlanTableAction = ({ healthPlan, disableHealthPlan, enableHealthPlan, status }) => {
  return (
    <ActionButton>
      {status ? (
        <Link
          title="Disable healthplan"
          to="#"
          className="btn btn-sm btn-block text-danger"
          onClick={() => disableHealthPlan(healthPlan.id)}
        >
          <span className="btn-icon icofont-delete-alt mr-2" />
          Disable
        </Link>
      ) : (
        <Link
          title="Enable healthplan"
          to="#"
          className="btn btn-sm btn-block text-success"
          onClick={() => enableHealthPlan(healthPlan.id)}
        >
          <span className="btn-icon icofont-delete-alt mr-2" />
          Enable
        </Link>
      )}

      <Link
        title="Edit healthplan"
        to={{
          pathname: "/AdminEditHealthPlan/" + healthPlan.id,
          state: healthPlan,
        }}
        className="btn btn-sm btn-block text-primary"
      >
        <span className="btn-icon icofont-edit-alt mr-2" />
        Edit
      </Link>
    </ActionButton>
  );
};

export default ManageHealthPlans;
