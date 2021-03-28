import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { PageLoader, Table } from "../../Components";
import LabTechnicianImage from "../../assets/img/DoctorIcon.svg";
import { getAllLabTechniciansUrl } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import ActionButton from "../../Components/DataTable/ActionButton";
import TableSize from "../../Components/DataTable/TableSize";

function AllLabTechnicians() {
  const fetchLabTechniciansUrl = getAllLabTechniciansUrl();
  const fetchLabTechniciansConfig = fetchConfig({
    url: fetchLabTechniciansUrl,
    method: "get",
  });
  const { data, error } = useRequest(fetchLabTechniciansConfig, {
    revalidateOnFocus: false,
  });

  let tableData = [];
  if (data) {
    tableData = data.labAttendant.map((lab, index) => {
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
        Name: `${lab.firstName} ${lab.lastName}`,
        Email: <a href={"mailto:" + lab.email}>{lab.email}</a>,
        Phone: lab.phoneNumber || "Not available",
        Actions: <LabTableAction lab={lab} />,
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
            <h4 className="page-title">Our Lab Technicians</h4>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.labAttendant.length : 0}
              heading="No Of Lab Technicians"
            />
          </div>
          <div className="page-content">
            {data && <Table content={tableData} />}
          </div>
        </div>
      </main>
    </Fragment>
  );
}

const LabTableAction = ({ lab }) => {
  const tableFunctions = [
    {
      text: "View Profile",
      path: `/AdminViewLabProfile/${lab.labAttendantId}`,
      iconClass: "btn-icon icofont-ui-edit  mr-2",
    },
  ];
  return (
    <ActionButton>
      {tableFunctions.map(({ path, text, iconClass }) => (
        <NavLink
          to={{
            pathname: path,
            state: lab,
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

export default AllLabTechnicians;
