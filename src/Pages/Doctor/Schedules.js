import React from "react";
import { Link } from "react-router-dom";
import Header from "../../Components/Doctor/Header";
import Sidebar from "../../Components/Doctor/Sidebar";
import Footer from "../../Components/Footer";
import TemplateSettings from "../../Components/TemplateSettings";
import PageLoader from "../../Components/PageLoader";

function getTime(date) {
  let _date = new Date(date);
  return _date.toTimeString().split("GMT")[0];
}

function getDate(date) {
  let _date = new Date(date);
  return _date.toDateString();
}

class Schedules extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      doctorId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
      availableSchedule: [],
      bookedSchedule: [],
      availableScheduleCount: 0,
      bookedScheduleCount: 0,
    };
  }

  async componentDidMount() {
    var availableSchedule = [];
    var bookedSchedule = [];
    var availableScheduleCount = 0;
    var bookedScheduleCount = 0;
    const { apiUrl, doctorId } = this.state;
    await this.setState({ doctorId: doctorId });
    const response = await fetch(
      `${apiUrl}/Doctor/ViewDoctorSchedule?DoctorId=${this.state.doctorId}`
    );
    const { schedule: _schedule } = await response.json();

    const schedule = _schedule.map((schedule) => {

      return {
        checkIn: getTime(schedule.doctorSchedules.checkIn),
        checkOut: getTime(schedule.doctorSchedules.checkOut),
        date: getDate(schedule.doctorSchedules.date),
        available: schedule.doctorSchedules.available,
      };
    });

    schedule.forEach((schedule) => {
      if (schedule.available === true) {
        availableSchedule.push(schedule);
      } else {
        bookedSchedule.push(schedule);
      }
    });

    availableScheduleCount = availableSchedule.length;
    bookedScheduleCount = bookedSchedule.length;
    this.setState({
      availableSchedule: availableSchedule,
      bookedSchedule: bookedSchedule,
      availableScheduleCount: availableScheduleCount,
      bookedScheduleCount: bookedScheduleCount,
    });
  }

  render() {
    const {
      availableSchedule,
      bookedSchedule,
      availableScheduleCount,
      bookedScheduleCount,
    } = this.state;
    return (
      <>
        <PageLoader />
        <div className="page-box">
          <div className="app-container">
            {/* Horizontal navbar---Header */}
            <Header></Header>

            {/* Vertical navbar */}
            <Sidebar></Sidebar>

            <main className="main-content">
              <div className="app-loader">
                <i className="icofont-spinner-alt-4 rotate" />
              </div>
              <div className="main-content-wrap">
                <div className="row">
                  <div className="col col-12 col-md-6 col-xl-6">
                    <div className="card animated fadeInUp delay-02s bg-light">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col col-5">
                            <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
                          </div>
                          <div className="col col-7">
                            <h6 className="mt-0 mb-1">Open Schedules</h6>
                            <div className="count text-primary fs-20">
                              {availableScheduleCount}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col col-12 col-md-6 col-xl-6">
                    <div className="card animated fadeInUp delay-03s bg-light">
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col col-5">
                            <div className="icon p-0 fs-48 text-primary opacity-50 icofont-blood" />
                          </div>
                          <div className="col col-7">
                            <h6 className="mt-0 mb-1">Booked Schedules</h6>
                            <div className="count text-primary fs-20">
                              {bookedScheduleCount}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <header className="page-header">
                  <h4 className="page-title">My Schedules</h4>
                </header>
                <div className="page-content">
                  <div className="card-body"></div>
                </div>
                <div className="page-content">
                  <div className="card mb-0">
                    <div className="card-body">
                      <div>
                        <ul
                          className="nav nav-pills nav-fill mb-3"
                          id="pills-tab"
                          role="tablist"
                        >
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              id="pills-active-tab"
                              data-toggle="pill"
                              href="#pills-active"
                              role="tab"
                              aria-controls="pills-active"
                              aria-selected="true"
                            >
                              Active Schedules
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              id="pills-accepted-tab"
                              data-toggle="pill"
                              href="#pills-accepted"
                              role="tab"
                              aria-controls="pills-accepted"
                              aria-selected="false"
                            >
                              Booked Schedules
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                          <div
                            className="tab-pane fade show active"
                            id="pills-active"
                            role="tabpanel"
                            aria-labelledby="pills-active-tab"
                          >
                            <div className="table-responsive">
                              <table
                                class="table data-table"
                                data-columns='[
                                                                    { "data": "photo" },
                                                                    { "data": "name" },
                                                                    { "data": "email" },
                                                                    { "data": "phone" },
                                                                    { "data": "date-of-birth" },
                                                                    { "data": "address" },
                                                                    { "data": "actions" }
                                                                ]'
                                data-paging="true"
                                data-info="true"
                              >
                                <thead>
                                  <tr className="bg-primary text-white">
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Date Of Birth</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {availableSchedule
                                    ? availableSchedule.map(
                                      (availableSchedule) => (
                                        <tr>
                                          <td>{availableSchedule.date}</td>
                                          <td>{availableSchedule.checkIn}</td>
                                          <td>
                                            {availableSchedule.checkOut}
                                          </td>
                                          <td>
                                            <div className="d-flex align-items-center nowrap text-primary">
                                              <span className="icofont-ui-email p-0 mr-2" />
                                                liam@gmail.com
                                              </div>
                                          </td>
                                          <td>
                                            <div className="text-muted text-nowrap">
                                              10 Feb 2018
                                              </div>
                                          </td>
                                          <td>
                                            <div className="text-muted text-nowrap">
                                              9:15 - 9:45
                                              </div>
                                          </td>

                                          <td>
                                            <div className="actions">
                                              <Link
                                                title="Pre-consultation"
                                                onClick={() =>
                                                  (window.location.href =
                                                    "/AdminPreConsultation")
                                                }
                                                to="/AdminPreConsultation"
                                                className="btn btn-secondary btn-sm btn-square rounded-pill"
                                              >
                                                <span className="btn-icon icofont-stethoscope-alt" />
                                              </Link>
                                              <button className="btn btn-info btn-sm btn-square rounded-pill">
                                                <span className="btn-icon icofont-ui-edit" />
                                              </button>
                                              <button className="btn btn-error btn-sm btn-square rounded-pill">
                                                <span className="btn-icon icofont-ui-delete" />
                                              </button>
                                            </div>
                                          </td>
                                        </tr>
                                      )
                                    )
                                    : null}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div
                            className="tab-pane fade"
                            id="pills-accepted"
                            role="tabpanel"
                            aria-labelledby="pills-accepted-tab"
                          >
                            <div className="table-responsive">
                              <table
                                class="table data-table"
                                data-columns='[
                                                                    { "data": "photo" },
                                                                    { "data": "name" },
                                                                    { "data": "email" },
                                                                    { "data": "phone" },
                                                                    { "data": "date-of-birth" },
                                                                    { "data": "address" },
                                                                    { "data": "actions" }
                                                                ]'
                                data-paging="true"
                                data-info="true"
                              >
                                <thead>
                                  <tr className="bg-primary text-white">
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Date Of Birth</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {bookedSchedule
                                    ? bookedSchedule.map((bookedSchedule) => (
                                      <tr>
                                        <td>{bookedSchedule.date}</td>
                                        <td>{bookedSchedule.checkIn}</td>
                                        <td>{bookedSchedule.checkOut}</td>
                                        <td>
                                          <div className="d-flex align-items-center nowrap text-primary">
                                            <span className="icofont-ui-email p-0 mr-2" />
                                              liam@gmail.com
                                            </div>
                                        </td>
                                        <td>
                                          <div className="text-muted text-nowrap">
                                            10 Feb 2018
                                            </div>
                                        </td>
                                        <td>
                                          <div className="text-muted text-nowrap">
                                            9:15 - 9:45
                                            </div>
                                        </td>

                                        <td>
                                          <div className="actions">
                                            <Link
                                              title="Pre-consultation"
                                              onClick={() =>
                                                (window.location.href =
                                                  "/AdminPreConsultation")
                                              }
                                              to="/AdminPreConsultation"
                                              className="btn btn-secondary btn-sm btn-square rounded-pill"
                                            >
                                              <span className="btn-icon icofont-stethoscope-alt" />
                                            </Link>
                                            <button className="btn btn-info btn-sm btn-square rounded-pill">
                                              <span className="btn-icon icofont-ui-edit" />
                                            </button>
                                            <button className="btn btn-error btn-sm btn-square rounded-pill">
                                              <span className="btn-icon icofont-ui-delete" />
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    ))
                                    : null}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="add-action-box">
                    <button
                      className="btn btn-primary btn-lg btn-square rounded-pill"
                      data-toggle="modal"
                      data-target="#add-appointment"
                    >
                      <span className="btn-icon icofont-stethoscope-alt" />
                    </button>
                  </div>
                </div>
              </div>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </div>

        <TemplateSettings />
      </>
    );
  }
}

export default Schedules;
