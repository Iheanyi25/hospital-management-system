import React from 'react';
import { Link } from "react-router-dom";
import ActionButton from '../../../../../Components/DataTable/ActionButton';

export const AdminActionTable = ({
    drugInvoice,
    fetchDrugsInAnInvoice,
    markInvoiceAsDispensed,
  }) => {
    return (
      <ActionButton>
        {drugInvoice?.paymentStatus === "NOT PAID" ? (
          <Link
            to={{
              pathname: `/AdminPaymentForPrescription/${drugInvoice.id}`,
              state: drugInvoice,
            }}
            className="btn btn-sm btn-block"
          >
            <span className="btn-icon icofont-server mr-2" />
            Pay now
          </Link>
        ) : (
          <Link
            to="#"
            className="btn btn-sm btn-block"
            data-toggle="modal"
            data-target="#view-reciept"
            onClick={() => fetchDrugsInAnInvoice(drugInvoice.invoiceNumber)}
          >
            <span className="btn-icon icofont-server mr-2" />
            View Reciept
          </Link>
        )}
        {drugInvoice?.isDispensed === false &&
        drugInvoice?.paymentStatus !== "NOT PAID" ? (
          <Link
            to="#"
            className="btn btn-sm btn-block"
            onClick={() => markInvoiceAsDispensed(drugInvoice.id)}
          >
            <span className="btn-icon icofont-server mr-2" />
            Dispense
          </Link>
        ) : null}
      </ActionButton>
    );
  };

  export const PharmacistActionTable = ({
    drugInvoice,
    fetchDrugsInAnInvoice,
    markInvoiceAsDispensed,
  }) => {
    return (
      <ActionButton>
        {drugInvoice?.paymentStatus === "NOT PAID " ? null : (
          <Link
            to="#"
            className="btn btn-sm btn-block"
            data-toggle="modal"
            data-target="#view-reciept"
            onClick={() => fetchDrugsInAnInvoice(drugInvoice.invoiceNumber)}
          >
            <span className="btn-icon icofont-server mr-2" />
            View Reciept
          </Link>
        )}
        {drugInvoice?.isDispensed === false ? (
          <Link
            to="#"
            className="btn btn-sm btn-block"
            onClick={() => markInvoiceAsDispensed(drugInvoice.id)}
          >
            <span className="btn-icon icofont-server mr-2" />
            Dispense
          </Link>
        ) : null}
      </ActionButton>
    );
  };

export  const AccountantActionTable = ({ drugInvoice, fetchDrugsInAnInvoice }) => {
    console.log("heloooooooooooooooooooooooooooooooooooo", fetchDrugsInAnInvoice)
    return (
      <ActionButton>
        {drugInvoice?.paymentStatus === "NOT PAID" ? (
          <Link
            to={{
              pathname: `/AccountPaymentForPrescription/${drugInvoice.id}`,
              state: drugInvoice,
            }}
            className="btn btn-sm btn-block"
          >
            <span className="btn-icon icofont-server mr-2" />
            Pay now
          </Link>
        ) : (
          <Link
            to="#"
            className="btn btn-sm btn-block"
            data-toggle="modal"
            data-target="#view-reciept"
            onClick={() => fetchDrugsInAnInvoice(drugInvoice.invoiceNumber)}
          >
            <span className="btn-icon icofont-server mr-2" />
            View Reciept
          </Link>
        )}
      </ActionButton>
    );
  };
