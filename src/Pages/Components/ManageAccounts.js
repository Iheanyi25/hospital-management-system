import React, { useState, useContext, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { getAllAccountsUrl } from "../../api/URLs";
import { PageLoader, Table } from "../../Components";
import formatAmount from "../../utils/formatAmount";
import PatientAndAdminImage from "../../assets/img/PatientAndAdminIcon.svg";
import { UserContext } from "../../mobx/UserState";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import TableSize from "../../Components/DataTable/TableSize";
import ActionButton from "../../Components/DataTable/ActionButton";
import { useRequest } from "../../api/fetcher";

const ManageAccounts = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const getAllAccounts = getAllAccountsUrl(pageNumber);
  const getAllAccountsConfig = fetchConfig({
    url: getAllAccounts,
    method: "get",
  });
  const { data, error } = useRequest(getAllAccountsConfig, {
    revalidateOnFocus: false,
  });

  let dataTable = [];
  if (data) {
    console.log(data, 88888);
    dataTable = data.accounts.map((account, index) => {
      return {
        "#": ++index,
        Photo: (
          <img
            src={PatientAndAdminImage}
            alt=""
            width={40}
            height={40}
            className="rounded-500"
          />
        ),
        Account: <strong>{account?.name}</strong>,
        Phone: account?.phoneNumber || "Not available",
        "Health Plan": account?.healthPlan?.name,
        Balance: formatAmount(account?.accountBalance) || 0,
        Actions: <AccountTableAction account={account} />,
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
            <h4 className="page-title"> Manage Accounts</h4>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.accounts.length : 0}
              heading="No Of Account"
            />
          </div>
          <div className="page-content">
            {data && <Table content={dataTable} paginationDetails={data.paginationDetails} setPageNumber={setPageNumber} pageNumber={pageNumber}/>}
          </div>
        </div>
      </main>
    </Fragment>
  );
};
export default ManageAccounts;

const AccountTableAction = observer(({ account }) => {
  const { user } = useContext(UserContext);
  // console.log(user,account,7777)
  const tableFunctions = [
    {
      text: "Fund Account",
      path: `${
        user.userType === "Admin"
          ? `/AdminFundAccount/${account.id}`
          : `/AccountFundAccount/${account.id}`
      }`,
      iconClass: "btn-icon icon sli-link mr-2",
      routeState: {
        id: account.id,
        user: toJS(user),
        name: account?.name,
      },
    },
  ];
  return (
    <ActionButton>
      {tableFunctions.map(({ path, text, iconClass, routeState }, index) => (
        <NavLink
          to={{
            pathname: path,
            state: routeState,
          }}
          className="btn btn-sm btn-block"
          key={path + index}
        >
          <span className={iconClass} />
          {text}
        </NavLink>
      ))}
    </ActionButton>
  );
});
