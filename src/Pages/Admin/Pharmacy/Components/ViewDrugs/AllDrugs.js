import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { UpdateInventory } from "../../../../../Components/Modals";
import formatAmount from "../../../../../utils/formatAmount";
import remove from "../../../../../assets/img/remove.svg";
import view from "../../../../../assets/img/view.svg";
import inventory from "../../../../../assets/img/inventory.svg";
import { fetchWrapper, useRequest } from "../../../../../api/fetcher";
import { fetchConfig } from "../../../../../api/fetchConfig";
import { getAllDrugsUrl, deleteDrugUrl } from "../../../../../api/URLs";
import { notification } from "../../../../../utils/notification";
import { PageLoader, Table } from "../../../../../Components";
import ActionButton from "../../../../../Components/DataTable/ActionButton";

const AllDrugs = ({ userType, category }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [singleDrug, setSingleDrug] = useState({});
  const getAllDrugs = getAllDrugsUrl(pageNumber);
  const getAllDrugsConfig = fetchConfig({ url: getAllDrugs, method: "get" });
  const { data, error, mutate } = useRequest(getAllDrugsConfig, {
    revalidateOnFocus: false,
  });
  const deleteDrug = async (id) => {
    try {
      const deleteDrugs = deleteDrugUrl();
      const deleteDrugsConfig = fetchConfig({
        url: deleteDrugs,
        data: { id: id },
        method: "delete",
      });
      const res = await fetchWrapper(deleteDrugsConfig);
      notification.success({ message: res.data.message });
      mutate();
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data.message });
    }
  };
  let dataTable = [];
  if (data) {
    dataTable = data.drugs.map((drug, index) => {
      return {
        "#": ++index,
        "Drug Name": drug?.name ?? "N/A",
        "Generic Name": drug?.genericName ?? "N/A",
        Type: (
          <div
            className="text-muted text-nowrap"
            style={{ textTransform: "capitalize" }}
          >
            {drug?.drugType ?? "N/A"}
          </div>
        ),
        Manufacturer: drug?.manufacturer ?? "N/A",
        "Quantity in stock": formatAmount(drug?.quantityInStock) ?? "N/A",
        Actions: (
          <AllDrugsTableAction
            drug={drug}
            userType={userType}
            setSingleDrug={setSingleDrug}
            deleteDrug={deleteDrug}
          />
        ),
      };
    });
  }
  if (error) return <div>failed to load</div>;
  return (
    <Fragment>
      <PageLoader />
      {data && (
        <Table
          content={dataTable}
          tableID={category + data.drugs.length}
          key={category + data.drugs.length}
          paginationDetails={data.paginationDetails}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
        />
      )}
      <UpdateInventory drug={singleDrug} setSuccess={mutate} />
    </Fragment>
  );
};

const AllDrugsTableAction = ({ drug, userType, setSingleDrug, deleteDrug }) => {
  return (
    <ActionButton>
      <Link
        to={{
          pathname:
            userType === "Admin"
              ? `/AdminViewDrug/${drug.id}`
              : `/PharmacyViewDrug/${drug.id}`,
          state: drug?.drugType,
        }}
        className="btn btn-sm btn-block"
      >
        <img src={view} alt="view" className="mr-2" />
        View drug
      </Link>
      <Link
        to="#"
        data-toggle="modal"
        data-target="#update-inventory"
        className="btn btn-sm btn-block"
        onClick={() => setSingleDrug(drug)}
      >
        <img src={inventory} alt="inventory" className="mr-2" />
        Update inventory
      </Link>
      <Link
        to="#"
        className="btn btn-sm btn-block"
        onClick={() => deleteDrug(drug.id)}
      >
        <img src={remove} alt="delete" className="mr-2" />
        Delete
      </Link>
    </ActionButton>
  );
};

export { AllDrugs };
