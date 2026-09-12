import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { PageLoader, Table } from "../../Components";
import DoctorImage from "../../assets/img/DoctorIcon.svg";
import { getMyDoctors } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";

const MyDoctors = () => {
const { user : { id }} = useContext(UserContext)
  const myDoctors = getMyDoctors(id);
  const getMyDoctorsConfig = fetchConfig({ url: myDoctors, method: "get" });
  const { data } = useRequest(getMyDoctorsConfig, {
    revalidateOnFocus: false,
  });
  
  let dataTable = [];

  if (data) {
    dataTable = data.doctors.map((doctor, index) => {
      console.log(doctor);
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
        Name: `${doctor?.doctor?.firstName} ${doctor?.doctor?.lastName}`,
        Email: doctor?.doctor?.email,
        Phone: doctor?.doctor?.phoneNumber ?? "not available yet",
        Actions: <MyDoctorsActionButton doctor={doctor} />,
      };
    });
  }

  return (
    <>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <MyDoctorsHeader doctorsCount={data?.doctors?.length || 0}/>
          <header className="page-header">
            <h4 className="page-title">My Doctors</h4>
          </header>

          <div className="page-content">
            <div className="table-responsive">
               {data && <Table content={dataTable}/>} 
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default observer(MyDoctors);

const MyDoctorsHeader = ({ doctorsCount }) => {
  return (
    <div className="row">
      <div className="col col-12 col-md-6 col-xl-3">
        <div className="card animated fadeInUp delay-01s bg-light">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col col-5">
                <div className="icon p-0 fs-48 text-primary opacity-50 icofont-users"></div>
              </div>
              <div className="col col-7">
                <h6 className="mt-0 mb-1">Doctors</h6>
                <div className="count text-primary fs-20">{doctorsCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyDoctorsActionButton = ({ doctor }) => {
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-primary btn-sm btn-block dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Action
      </button>
      <div className="dropdown-menu">
        <NavLink
          to={`/ViewDoctorProfile/${doctor?.doctor?.id}`}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-ui-edit  mr-2" /> View Profile
        </NavLink>
        <NavLink
          to={`/DoctorChat`}
          className="btn btn-sm btn-block"
        >
          <span className="btn-icon icofont-ui-edit  mr-2" /> Chat
        </NavLink>
        
      </div>
      
    </div>
  );
};
