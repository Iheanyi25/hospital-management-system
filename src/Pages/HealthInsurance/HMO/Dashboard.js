import React, { useContext } from "react";
import { observer } from "mobx-react";
import { UserContext } from "../../../mobx/UserState";
import { PageLoader } from "../../../Components";

const Dashboard = observer(() => {
  const {
    user: { firstName, lastName },
  } = useContext(UserContext);
  return (
    <>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <div className="page-content">
            <div className="row">
              <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-01s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-5">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-first-aid-alt"></div>
                      </div>
                      <div className="col col-7">
                        <h6 className="mt-0 mb-1">Appointments</h6>
                        <div className="count text-primary fs-20">20</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-02s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-5">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
                      </div>
                      <div className="col col-7">
                        <h6 className="mt-0 mb-1">Prescriptions</h6>
                        <div className="count text-primary fs-20">0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-03s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-5">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-blood" />
                      </div>
                      <div className="col col-7">
                        <h6 className="mt-0 mb-1">Notifications</h6>
                        <div className="count text-primary fs-20">0</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="card bg-light">
                  <div className="card-header">
                    Hello {`${firstName} ${lastName}`}
                  </div>
                  <div className="card-body">You have no new notifications</div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="card text-white bg-info">
                  <div className="card-header">Important Updates</div>
                  <div className="card-body">
                    Yellow fever vaccinations are currently on going from 8am -
                    2pm everyday at our hospital, Get vaccinated today!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
});

export default Dashboard;
