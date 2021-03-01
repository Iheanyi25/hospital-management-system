import React, { useState, useContext, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getPrescriptionsForAdmissionUrl } from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import formatDate from "../../../utils/formatDate";
import formatAmount from "../../../utils/formatAmount";
import { observer } from "mobx-react";
import { UserContext } from "../../../mobx/UserState";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";

const ManagePrescriptions = observer(() => {
  const { id } = useParams();
  const {
    user: { userType },
  } = useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const getPrescriptionsUrl = getPrescriptionsForAdmissionUrl(
    id,
    pageNumber,
    pageSize
  );
  const getAllPrescriptionsConfig = fetchConfig({
    url: getPrescriptionsUrl,
    method: "get",
  });
  const { data, error } = useRequest(getAllPrescriptionsConfig, {
    revalidateOnFocus: false,
  });

  let dataTable = [];
  if (data) {
    dataTable = data.prescriptions.map((prescription, index) => {
      return {
        "#": ++index,
        "Doctor Name": `${prescription?.doctor?.firstName ?? ""} ${
          prescription?.doctor?.lastName ?? ""
        }`,
        "Date of Prescription": formatDate(prescription?.dateGenerated),
        Actions: (
          <PrescriptionActionTable
            prescription={prescription}
            userType={userType}
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
            <h4
              className="page-title"
              style={{ textTransform: "capitalize" }}
            >{`${data?.prescriptions[0]?.admission?.patient?.firstName ?? ""} ${
              data?.prescriptions[0]?.admission?.patient?.lastName ?? ""
            }'s Prescriptions`}</h4>
          </header>
          <div className="page-content">
            <TableSize
              size={data ? formatAmount(data.prescriptions.length) : 0}
              heading="No of Prescriptions"
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
});

const PrescriptionActionTable = ({ prescription, userType }) => {
  return (
    <ActionButton>
      <Link
        to={
          userType === "Admin"
            ? `/AdmissionPrescribeDrug/${prescription?.id}`
            : `/PharmacyDrugPrescription/${prescription?.id}`
        }
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        Dispense
      </Link>
    </ActionButton>
  );
};

export default ManagePrescriptions;
