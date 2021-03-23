import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getHMODrugPricesByHealthPlanUrl } from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";
import formatAmount from "../../../utils/formatAmount";

const ManageDrugs = () => {
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
  const getHMODrugPricesByHealthPlan = getHMODrugPricesByHealthPlanUrl(
    id,
    pageNumber,
    pageSize
  );
  const getHMODrugPricesByHealthPlanConfig = fetchConfig({
    url: getHMODrugPricesByHealthPlan,
    method: "get",
  });
  const { data, error, mutate } = useRequest(
    getHMODrugPricesByHealthPlanConfig,
    {
      revalidateOnFocus: false,
    }
  );
  let dataTable = [];
  if (data) {
    dataTable = data.drugPrices.map(
      (
        {
          drug: { name, genericName, drugType, manufacturer, quantityInStock },
        },
        index
      ) => {
        return {
          "#": ++index,
          "Drug Name": name ?? "N/A",
          "Generic Name": genericName ?? "N/A",
          Type: (
            <div
              className="text-muted text-nowrap"
              style={{ textTransform: "capitalize" }}
            >
              {drugType ?? "N/A"}
            </div>
          ),
          Manufacturer: manufacturer ?? "N/A",
          "Quantity in stock": formatAmount(quantityInStock) ?? "N/A",
          Actions: <NHISDrugActionTable />,
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
            <h4 className="page-title mb-0">{`Manage Drugs in ${planName}`}</h4>
            <Link
              className="btn btn-primary"
              to={{ pathname: `/AddDrugToPlan/${id}`, state: planName }}
            >
              Add drug
            </Link>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.drugPrices.length : 0}
              heading="Total No of Drugs"
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
const NHISDrugActionTable = () => {
  return (
    <ActionButton>
      <Link
        // to={`/LabManageAdmissionServiceRequest/${admissionId}`}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Update drug
      </Link>
      <Link
        // to={`/LabManageAdmissionServiceRequest/${admissionId}`}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Delete
      </Link>
    </ActionButton>
  );
};

export default ManageDrugs;
