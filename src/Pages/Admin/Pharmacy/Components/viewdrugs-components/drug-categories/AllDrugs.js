import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import remove from "../../../../../../assets/img/remove.svg";
import view from "../../../../../../assets/img/view.svg";
import { fetchWrapper, useRequest } from "../../../../../../api/fetcher";
import { fetchConfig } from "../../../../../../api/fetchConfig";
import { getAllDrugsUrl, deleteDrugUrl } from "../../../../../../api/URLs";
import { notification } from "../../../../../../utils/notification";
import { PageLoader, Table } from "../../../../../../Components";
import ActionButton from "../../../../../../Components/DataTable/ActionButton";

const AllDrugs = ({ userType }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getAllDrugs = getAllDrugsUrl(pageNumber, pageSize);
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
        Type: drug?.isTablet
          ? "Tablet"
          : drug?.isLiquid
          ? "Liquid"
          : drug?.isInhaler
          ? "Inhaler"
          : drug?.isPowder
          ? "Powder"
          : "N/A",
        Manufacturer: drug?.manufacturer ?? "N/A",
        Actions: (
          <AllDrugsTableAction
            drug={drug}
            userType={userType}
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
          tableID={"allDrugs" + data.drugs.length}
          key={"allDrugs" + data.drugs.length}
          paginationDetails={data.paginationDetails}
          setPageNumber={setPageNumber}
          pageNumber={pageNumber}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      )}
    </Fragment>
  );
};

const AllDrugsTableAction = ({ drug, userType, deleteDrug }) => {
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
