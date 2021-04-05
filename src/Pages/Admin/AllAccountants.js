import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { PageLoader, Table } from "../../Components";
import { getAllAccountantsUrl } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import AccountantImg from "../../assets/img/AccountantIcon.svg";
import { useRequest } from "../../api/fetcher";
import TableSize from "../../Components/DataTable/TableSize";
import ActionButton from "../../Components/DataTable/ActionButton";

function AllAccountants() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const fetchAccountantsUrl = getAllAccountantsUrl(pageNumber, pageSize);
  const fetchAccountantsConfig = fetchConfig({
    url: fetchAccountantsUrl,
    method: "get",
  });
  const { data, error } = useRequest(fetchAccountantsConfig, {
    revalidateOnFocus: false,
  });

  let tableData = [];
  if (data) {
    tableData = data.accountants.map((accountant, index) => {
      return {
        "#": ++index,
        Photo: (
          <img
            src={AccountantImg}
            alt=""
            width={40}
            height={40}
            className="rounded-500"
          />
        ),
        Name: `${accountant.firstName} ${accountant.lastName}`,
        Email: <a href={"mailto:" + accountant.email}>{accountant.email}</a>,
        Phone: accountant.phoneNumber || "Not available",
        Actions: <AccountantTableAction accountant={accountant} />,
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
          <header className="page-header">
            <h4 className="page-title">Our Accountants</h4>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.accountants.length : 0}
              heading="No Of Accountants"
            />
          </div>
          <div className="page-content">
            {data && (
              <Table
                content={tableData}
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
}

export default AllAccountants;

const AccountantTableAction = ({ accountant }) => {
  const tableFunctions = [
    {
      text: "View Profile",
      path: `/AdminViewAccountantProfile/${accountant.accountantId}`,
      iconClass: "btn-icon icofont-ui-edit  mr-2",
    },
  ];
  return (
    <ActionButton>
      {tableFunctions.map(({ path, text, iconClass }) => (
        <NavLink
          to={{
            pathname: path,
            state: accountant,
          }}
          key={path}
          className="btn btn-sm btn-block"
        >
          <span className={iconClass} />
          {text}
        </NavLink>
      ))}
    </ActionButton>
  );
};
