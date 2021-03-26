import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { PageLoader, Table } from "../../Components";
import PharmacistImage from "../../assets/img/DoctorIcon.svg";
import { getAllPharmacistUrl } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import ActionButton from "../../Components/DataTable/ActionButton";
import TableSize from "../../Components/DataTable/TableSize";

function AllPharmacists() {
  const fetchPharmacistsUrl = getAllPharmacistUrl();
  const fetchPharmacistConfig = fetchConfig({
    url: fetchPharmacistsUrl,
    method: "get",
  });
  const { data, error } = useRequest(fetchPharmacistConfig, {
    revalidateOnFocus: false,
  });

  let tableData = [];
  if (data) {
    tableData = data.pharmacists.map((pharmacy, index) => {
      return {
        "#": ++index,
        Photo: (
          <img
            src={PharmacistImage}
            alt=""
            width={40}
            height={40}
            className="rounded-500"
          />
        ),
        Name: `${pharmacy.firstName} ${pharmacy.lastName}`,
        Email: <a href={"mailto:" + pharmacy.email}>{pharmacy.email}</a>,
        Phone: pharmacy.phoneNumber || "Not available",
        Actions: <PharmacistTableAction pharmacist={pharmacy} />,
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
            <h4 className="page-title">Our Pharmacists</h4>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.pharmacists.length : 0}
              heading="No Of Pharmacists"
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

const PharmacistTableAction = ({ pharmacist }) => {
  const tableFunctions = [
    {
      text: "View Profile",
      path: `/AdminViewPharmacistProfile/${pharmacist.pharmacistId}`,
      iconClass: "btn-icon icofont-ui-edit  mr-2",
    },
  ];
  return (
    <ActionButton>
      {tableFunctions.map(({ path, text, iconClass }) => (
        <NavLink
          to={{
            pathname: path,
            state: pharmacist,
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

export default AllPharmacists;
