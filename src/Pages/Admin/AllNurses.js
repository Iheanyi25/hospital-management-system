import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { PageLoader, Table } from "../../Components";
import LabTechnicianImage from "../../assets/img/DoctorIcon.svg";
import { getNursesUrl } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import ActionButton from "../../Components/DataTable/ActionButton";
import TableSize from "../../Components/DataTable/TableSize";

function AllNurses() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const fetchNursesUrl = getNursesUrl(pageNumber, pageSize);
  const fetchNursesConfig = fetchConfig({
    url: fetchNursesUrl,
    method: "get",
  });
  const { data, error } = useRequest(fetchNursesConfig, {
    revalidateOnFocus: false,
  });

  let tableData = [];
  if (data) {
    tableData = data.nurses.map((nurse, index) => {
      return {
        "#": ++index,
        Photo: (
          <img
            src={LabTechnicianImage}
            alt=""
            width={40}
            height={40}
            className="rounded-500"
          />
        ),
        Name: `${nurse.firstName} ${nurse.lastName}`,
        Email: <a href={"mailto:" + nurse.email}>{nurse.email}</a>,
        Phone: nurse.phoneNumber || "Not avainursele",
        Actions: <NurseTableAction nurse={nurse} />,
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
            <h4 className="page-title">Our Nurses</h4>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.nurses.length : 0}
              heading="No Of Nurses"
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

const NurseTableAction = ({ nurse }) => {
  const tableFunctions = [
    {
      text: "View Profile",
      path: `/AdminViewLabProfile/${nurse.id}`,
      iconClass: "btn-icon icofont-ui-edit  mr-2",
    },
  ];
  return (
    <ActionButton>
      {tableFunctions.map(({ path, text, iconClass }) => (
        <NavLink
          to={{
            pathname: path,
            state: nurse,
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

export default AllNurses;
