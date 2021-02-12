import React, { useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { UpdateInventory } from "../../../../../Components/Modals";
import formatAmount from "../../../../../utils/formatAmount";
import remove from "../../../../../assets/img/remove.svg";
import view from "../../../../../assets/img/view.svg";
import inventory from "../../../../../assets/img/inventory.svg";
import { fetchWrapper } from "../../../../../api/fetcher";
import { fetchConfig } from "../../../../../api/fetchConfig";
import { deleteDrugUrl } from "../../../../../api/URLs";
import { UserContext } from "../../../../../mobx/UserState";
import { notification } from "../../../../../utils/notification";
import { observer } from "mobx-react";
import { PageLoader, Table } from "../../../../../Components";
import ActionButton from "../../../../../Components/DataTable/ActionButton";

const AllDrugs = observer(({ allDrugs, fetchAllDrugs }) => {
  const {
    user: { userType },
  } = useContext(UserContext);
  const [singleDrug, setSingleDrug] = useState({});
  let data = allDrugs;
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
      fetchAllDrugs();
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data.message });
    }
  };
  let dataTable = [];
  if (data) {
    dataTable = data.map((drug, index) => {
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
  // if (error) return <div>failed to load</div>;
  return (
    <Fragment>
      <PageLoader />
      <div className="main-content-wrap">
        <div className="page-content">
          {data && <Table content={dataTable} />}
        </div>
      </div>
      <UpdateInventory drug={singleDrug} setSuccess={fetchAllDrugs} />
    </Fragment>
  );
});

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
