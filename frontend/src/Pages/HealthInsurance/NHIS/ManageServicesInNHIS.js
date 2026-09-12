import React, { useState } from "react";
import { Fragment } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import {
  getHealthPlanServicesByHealthPlanUrl,
  deleteHealthPlanServiceUrl,
} from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";
import formatAmount from "../../../utils/formatAmount";
import { notification } from "../../../utils/notification";

const ManageServices = () => {
  const {
    location: { state: healthPlanName },
  } = useHistory();
  const { id } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getHealthPlanServicesByHealthPlan = getHealthPlanServicesByHealthPlanUrl(
    id,
    pageNumber,
    pageSize
  );
  const getHealthPlanServicesByHealthPlanConfig = fetchConfig({
    url: getHealthPlanServicesByHealthPlan,
    method: "get",
  });
  const { data, error, mutate } = useRequest(
    getHealthPlanServicesByHealthPlanConfig,
    {
      revalidateOnFocus: false,
    }
  );
  const deleteService = async (id) => {
    console.log(id);
    try {
      const deleteNHISHealthPlanDrug = deleteHealthPlanServiceUrl();
      const deleteNHISHealthPlanDrugConfig = fetchConfig({
        url: deleteNHISHealthPlanDrug,
        data: { id },
        method: "delete",
      });
      const res = await fetchWrapper(deleteNHISHealthPlanDrugConfig);
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
    dataTable = data.servicePrices.map(
      ({ service: { name, cost }, id }, index) => {
        return {
          "#": ++index,
          "Service Name": name,
          Cost: formatAmount(cost),
          Actions: (
            <NHISServicesActionTable deleteService={deleteService} id={id} />
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
            <h4 className="page-title mb-0">
              {`Manage Services in ${healthPlanName || ""}`}
            </h4>
            <Link
              className="btn btn-primary"
              to={{
                pathname: `/AdminAddServiceToNHIS/${id}`,
                state: healthPlanName,
              }}
            >
              Add service
            </Link>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.servicePrices.length : 0}
              heading="Total No of Services"
            />
          </div>
          <div className="page-content">
            {data && (
              <Table
                content={dataTable}
                paginationDetails={data.paginationDetails}
                tableID={"services" + data?.servicePrices.length}
                key={"services" + data?.servicePrices.length}
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
const NHISServicesActionTable = ({ deleteService, id }) => {
  return (
    <ActionButton>
      <button onClick={() => deleteService(id)} className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Delete
      </button>
    </ActionButton>
  );
};

export default ManageServices;
