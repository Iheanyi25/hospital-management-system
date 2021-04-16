import React, { useContext } from "react";
import formatAmount from "../../../utils/formatAmount";
import { NavLink } from "react-router-dom";
import { toJS } from "mobx";
import notpaid from "../../../assets/img/notpaid.svg";
import paid from "../../../assets/img/paid.svg";
import incomplete from "../../../assets/img/incomplete.svg";
import { Table } from "../../../Components";
import { observer } from "mobx-react";
import { UserContext } from "../../../mobx/UserState";
import ActionButton from "../../../Components/DataTable/ActionButton";

export default function LabDashboardRequests({ serviceRequestInvoices }) {
  let tableData = [];
  if (serviceRequestInvoices) {
    tableData = serviceRequestInvoices.map((category, index) => {
      return {
        "#": ++index,
        "Patient's Name": category?.fullname,
        "No. of Services": category?.noofServices,
        "Invoice No.": category?.invoiceNumber,
        "Date Generated": category?.dateGenerated ?? "N/A",
        "Total Cost": formatAmount(category?.cost) ?? "",
        Status: (
          <div className="text-muted text-nowrap">
            {category?.paymentStatus === "NOT PAID" ? (
              <>
                <img src={notpaid} alt="not paid" /> Not paid
              </>
            ) : category?.paymentStatus === "PAID" ? (
              <>
                <img src={paid} alt="paid" /> Paid
              </>
            ) : (
              <>
                <img src={incomplete} alt="paid" /> Incomplete
              </>
            )}
          </div>
        ),
        Actions: <LabDashboardRequestsTableAction category={category} />,
      };
    });
  }
  return (
    <div className="card mb-0">
      <div className="card-header">Recent Requests</div>
      <div className="page-content">
        <div className="card mb-0">
          <div className="card-body">
            <div>
              <Table content={tableData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const LabDashboardRequestsTableAction = observer(({ category }) => {
  const { user } = useContext(UserContext);
  console.log(user, 1111);
  return (
    <ActionButton>
      {user?.userType === "LabAttendant" ? null : category?.paymentStatus ===
          "NOT PAID" || category?.paymentStatus === "INCOMPLETE" ? (
        <NavLink
          to={{
            pathname:
              user?.userType === "Admin"
                ? `/AdminPaymentForService/${category.id}`
                : `/AccountPaymentForService/${category.id}`,
            state: {
              invoiceId: category.id,
              patientId: category.patientId,
              invoiceNumber: category.invoiceNumber,
              user: toJS(user),
            },
          }}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-stethoscope-alt mr-2" />
          Pay for Services
        </NavLink>
      ) : null}
      <NavLink
        to={{
          pathname:
            user?.userType === "Admin"
              ? `/AdminViewServiceRequestContents/${category.id}`
              : user?.userType === "LabAttendant"
              ? `/LabServiceRequestContents/${category.id}`
              : `/AccountServiceRequestContents/${category.id}`,
          state: {
            invoiceId: category.id,
            patientId: category.patientId,
            invoiceNumber: category.invoiceNumber,
            paymentStatus: category.paymentStatus,
            user: toJS(user),
          },
        }}
        className="btn btn-sm btn-block"
      >
        <span className="btn-icon icofont-server mr-2" />
        View Contents
      </NavLink>
    </ActionButton>
  );
});
