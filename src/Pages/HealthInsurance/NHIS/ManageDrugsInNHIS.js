import React, { useState } from "react";
import { Fragment } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import {
  getHealthPlanDrugsByHealthPlanUrl,
  deleteNHISHealthPlanDrugUrl,
} from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";
import { notification } from "../../../utils/notification";

const ManageDrugs = () => {
  const {
    location: { state: healthPlanName },
  } = useHistory();
  const { id } = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getNHISHealthPlans = getHealthPlanDrugsByHealthPlanUrl(
    id,
    pageNumber,
    pageSize
  );
  const getNHISHealthPlansConfig = fetchConfig({
    url: getNHISHealthPlans,
    method: "get",
  });
  const { data, error, mutate } = useRequest(getNHISHealthPlansConfig, {
    revalidateOnFocus: false,
  });

  const deleteDrug = async (id) => {
    console.log(id);
    try {
      const deleteNHISHealthPlanDrug = deleteNHISHealthPlanDrugUrl();
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
    dataTable = data.healthPlanDrugs.map(
      ({ drug: { name, genericName, manufacturer, drugType }, id }, index) => {
        return {
          "#": ++index,
          "Drug Name": name,
          "Generic Name": genericName,
          Type: drugType,
          Manufacturer: manufacturer,
          Actions: <NHISDrugActionTable deleteDrug={deleteDrug} id={id} />,
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
              {`Manage Drugs in ${healthPlanName}`}
            </h4>
            <Link
              className="btn btn-primary"
              to={{
                pathname: `/AdminAddDrugToNHIS/${id}`,
                state: healthPlanName,
              }}
            >
              Add drug
            </Link>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.healthPlanDrugs.length : 0}
              heading="Total No of Drugs"
            />
          </div>
          <div className="page-content">
            {data && (
              <Table
                content={dataTable}
                paginationDetails={data.paginationDetails}
                tableID={"drugs" + data?.healthPlanDrugs.length}
                key={"drugs" + data?.healthPlanDrugs.length}
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
const NHISDrugActionTable = ({ deleteDrug, id }) => {
  return (
    <ActionButton>
      <button onClick={() => deleteDrug(id)} className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Delete
      </button>
    </ActionButton>
  );
};

export default ManageDrugs;
