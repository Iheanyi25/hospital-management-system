import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import {
  getHMODrugPricesByHealthPlanUrl,
  deleteHMODrugPriceFromHMOHealthPlanUrl,
} from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";
import formatAmount from "../../../utils/formatAmount";
import { notification } from "../../../utils/notification";

const ManageDrugs = () => {
  const {
    location: { state: healthPlanName },
  } = useHistory();
  const { id: healthPlanId } = useParams();
  const [planName, setPlanName] = useState("");
  useEffect(() => {
    setPlanName(healthPlanName);
  }, [healthPlanName]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getHMODrugPricesByHealthPlan = getHMODrugPricesByHealthPlanUrl(
    healthPlanId,
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
  const deleteDrug = async (id) => {
    try {
      const deleteHMODrugPriceFromHMOHealthPlan = deleteHMODrugPriceFromHMOHealthPlanUrl();
      const deleteHMODrugPriceFromHMOHealthPlanConfig = fetchConfig({
        url: deleteHMODrugPriceFromHMOHealthPlan,
        data: { id },
        method: "delete",
      });
      const res = await fetchWrapper(deleteHMODrugPriceFromHMOHealthPlanConfig);
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
    dataTable = data.drugPrices.map(
      (
        { drug: { name }, drugId, pricePerUnit, pricePerContainer, pricePerCarton, id },
        index
      ) => {
        return {
          "#": ++index,
          "Drug Name": name ?? "N/A",
          "Price per unit": formatAmount(pricePerUnit) ?? "N/A",
          "Price per container": formatAmount(pricePerContainer) ?? "N/A",
          "Price per carton": formatAmount(pricePerCarton) ?? "N/A",
          Actions: (
            <ActionTable
              deleteDrug={deleteDrug}
              id={id}
              drugDetails={{
                name,
                drugId,
                pricePerUnit,
                pricePerContainer,
                pricePerCarton,
                healthPlanId,
                planName
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
            <h4 className="page-title mb-0">{`Manage Drugs in ${planName}`}</h4>
            <Link
              className="btn btn-primary"
              to={{
                pathname: `/AddDrugToPlan/${healthPlanId}`,
                state: planName,
              }}
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
                tableID={"drugs" + data?.drugPrices.length}
                key={"drugs" + data?.drugPrices.length}
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
const ActionTable = ({ deleteDrug, id, drugDetails }) => {
  return (
    <ActionButton>
      <Link
        to={{
          pathname: `/EditDrugInPlan/${id}`,
          state: { ...drugDetails, id },
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Update price
      </Link>
      <button onClick={() => deleteDrug(id)} className="btn btn-sm btn-block">
        <span className="btn-icon icofont-server mr-2" />
        Delete
      </button>
    </ActionButton>
  );
};

export default ManageDrugs;
