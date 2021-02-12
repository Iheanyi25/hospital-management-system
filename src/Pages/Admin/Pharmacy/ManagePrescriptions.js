import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getAllPrescriptionsUrl } from "../../../api/URLs";
import { PageLoader, Table } from "../../../Components";
import formatDate from "../../../utils/formatDate";
import formatAmount from "../../../utils/formatAmount";
import { observer } from "mobx-react";
import { UserContext } from "../../../mobx/UserState";
import ActionButton from "../../../Components/DataTable/ActionButton";
import TableSize from "../../../Components/DataTable/TableSize";

const ManagePrescriptions = observer(() => {
  const {
    user: { userType },
  } = useContext(UserContext);
  const getPrescriptionsUrl = getAllPrescriptionsUrl();
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
        "Patient Name": `${prescription?.patient?.firstName ?? ""} ${
          prescription?.patient?.lastName ?? ""
        }`,
        "Doctor Name": `${prescription?.doctor?.firstName ?? ""} ${
          prescription?.doctor?.lastName ?? ""
        }`,
        "Date of Prescription": formatDate(prescription?.datePrescribed),
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
            <h4 className="page-title">Prescriptions</h4>
          </header>
          <div className="page-content">
            <TableSize
              size={data ? formatAmount(data.prescriptions.length) : 0}
              heading="No of Prescriptions"
            />
          </div>
          <div className="page-content">
            {data && <Table content={dataTable} />}
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
            ? `/AdminDrugPrescription/${prescription?.id}`
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
