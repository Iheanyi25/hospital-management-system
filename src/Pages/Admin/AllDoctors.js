import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import { getDoctorsUrl } from "../../api/URLs";
import { PageLoader, Table } from "../../Components";
import TableSize from "../../Components/DataTable/TableSize";
import DoctorImage from "../../assets/img/DoctorIcon.svg";
import ActionButton from "../../Components/DataTable/ActionButton";

function AllDoctors() {
  const getDoctors = getDoctorsUrl();
  const getDoctorsConfig = fetchConfig({ url: getDoctors, method: "get" });
  const { data, error } = useRequest(getDoctorsConfig, {
    revalidateOnFocus: false,
  });

  let tableData = [];
  if (data) {
    tableData = data.doctors.map((doctor, index) => {
      return {
        "#": ++index,
        Photo: (
          <img
            src={DoctorImage}
            alt=""
            width={40}
            height={40}
            className="rounded-500"
          />
        ),
        Name: `${doctor.firstName} ${doctor.lastName}`,
        Email: <a href={"mailto:" + doctor.email}>{doctor.email}</a>,
        Phone: doctor.phoneNumber || "Not available",
        Actions: <DoctorTableAction doctor={doctor} />,
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
            <h4 className="page-title">Our Doctors</h4>
          </header>

          <div className="page-content">
            <TableSize
              size={data ? data.doctors.length : 0}
              heading="No Of Doctors"
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

export default AllDoctors;

const DoctorTableAction = ({ doctor }) => {
  const tableFunctions = [
    {
      text: "View Consultation List",
      path: `/AdminDoctorConsultations/${doctor.doctorId}`,
      iconClass: "btn-icon icofont-stethoscope-alt mr-2",
    },
    {
      text: "View Appointment List",
      path: `/AdminDoctorAppointments/${doctor.doctorId}`,
      iconClass: "btn-icon icofont-stethoscope-alt mr-2",
    },
    {
      text: "View Profile",
      path: `/DoctorProfile/${doctor.doctorId}`,
      iconClass: "btn-icon icofont-ui-edit  mr-2",
    },
  ];
  return (
    <ActionButton>
      {tableFunctions.map(({ path, text, iconClass }) => (
        <NavLink
          to={{
            pathname: path,
            state: doctor,
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
