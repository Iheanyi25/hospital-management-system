import { observer } from "mobx-react";
import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import {
  getPatientAccountBalanceUrl,
  getPatientAccountTransactionsUrl,
  getPatientAccountUrl,
} from "../../api/URLs";
import { PageLoader, Table } from "../../Components";
import ActionButton from "../../Components/DataTable/ActionButton";
import TableSize from "../../Components/DataTable/TableSize";
import ReceiptModal from "../../Components/Modals/ReceiptModal";
import { UserContext } from "../../mobx/UserState";
import formatDate from "../../utils/formatDate";

const local = "http://localhost:3000";
function PatientAccount() {
  const { user } = useContext(UserContext);

  const getPatientAccountBalance = getPatientAccountBalanceUrl(user.id);
  const getPatientAccountBalanceConfig = fetchConfig({ url: getPatientAccountBalance,method: "get"});
  const { data: accountBalanceDet } = useRequest(getPatientAccountBalanceConfig,{ revalidateOnFocus: false });

  const getPatientAccountTransactions = getPatientAccountTransactionsUrl(user.id);
  const getPatientAccountTransactionsConfig = fetchConfig({url: getPatientAccountTransactions,method: "get",});
  const { data: accountTransactionDet,error,} = useRequest(getPatientAccountTransactionsConfig, {revalidateOnFocus: false,});

  const getPatientAccount = getPatientAccountUrl(user.id);
  const getPatientAccountConfig = fetchConfig({ url: getPatientAccount, method: "get"});
  const { data: accountDet } = useRequest(getPatientAccountConfig, { revalidateOnFocus: false });

  const copyToClipboard = () => {
    const thirdPartyFundingLink = `${local}/common/ThirdPartyFundAccount/${accountDet.account.accountNumber}`;
    navigator.clipboard.writeText(`${thirdPartyFundingLink}`);
  };

  let dataTable = [];
  if (accountTransactionDet) {
    dataTable = accountTransactionDet.accountTransactions.map(
      (transaction, index) => {
        return {
          "#": ++index,
          Amount: transaction.amount,
          "Transaction Type": transaction.transactionType,
          "Paid By": transaction.paidBy,
          "Medium Of Payment": transaction.description,
          Date: formatDate(transaction.trasactionDate),
          "Account Balance": transaction.amount,
          Action: <PatientAccountTableAction />,
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
            <h4 className="page-title">Account History</h4>
            <div>
              <Link
                type="button"
                className="btn btn-outline-primary mr-2 mb-2"
                data-toggle="tooltip"
                data-placement="top"
                title="Tooltip on top"
                to="#"
                onClick={copyToClipboard}
              >
                Generate Link
              </Link>
              <Link
                className="btn btn-primary mr-2 mb-2"
                to="/PatientFundAccount"
              >
                Fund my account
              </Link>
            </div>
          </header>
          <div className="page-content">
            <div className="row">
              <TableSize
                size={accountBalanceDet?.accountBalance || 0}
                heading="Account Total (NGN)"
                icon="icofont-money"
              />
              <TableSize
                size={accountTransactionDet?.accountTransactions?.amount || 0}
                heading="Account spent (NGN)"
                icon="icofont-money"
              />
            </div>
          </div>
          <div className="page-content">
            {accountTransactionDet && <Table content={dataTable} />}
          </div>
        </div>
      </main>
      <ReceiptModal modalId="view-reciept">
        {/* put your modal content component here */}
      </ReceiptModal>
    </Fragment>
  );
}

const PatientAccountTableAction = ({}) => {

  return (
    <ActionButton>
      <Link
        to="#"
        className="btn btn-sm btn-block"
        data-toggle="modal"
        data-target="#view-reciept"
      >
        <span className="btn-icon icofont-server mr-2" />
        View Reciept
      </Link>
    </ActionButton>
  );
};

export default observer(PatientAccount);
