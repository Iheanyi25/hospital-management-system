import React from "react";
import { PageLoader } from "../../Components";

function getTime(date) {
  let _date = new Date(date);
  return _date.toTimeString().split("GMT")[0];
}

function getDate(date) {
  let _date = new Date(date);
  return _date.toDateString();
}

class ManageSchedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctorId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
      schedule: null,
      url: process.env.REACT_APP_API_URL,
    };
  }

  async componentDidMount() {
    const { url } = this.state;
    const response = await fetch(
      `${url}/Doctor/ViewDoctorSchedule?DoctorId=${this.state.doctorId}`
    );
    const { schedule: _schedule } = await response.json();

    const schedule = _schedule.map((schedule) => {
      const date = schedule.doctorSchedules.date;

      const checkIn = schedule.doctorSchedules.checkIn;
      const checkOut = schedule.doctorSchedules.checkOut;

      return {
        checkIn: getTime(schedule.doctorSchedules.checkIn),
        checkOut: getTime(schedule.doctorSchedules.checkOut),
        date: getDate(schedule.doctorSchedules.date),
        available: schedule.doctorSchedules.available,
      };
    });

    this.setState({ schedule });
  }

  render() {
    const { schedule } = this.state;
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header">
              <h4 className="page-title">Manage Schedule</h4>
            </header>
            <div className="page-content">
              <div className="card-body"></div>
            </div>
            <div className="page-content">
              <div className="card mb-0">
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      class="table data-table"
                      data-columns='[
                        { "data": "name" },
                        { "data": "description" },
                        { "data": "office" },
                        { "data": "age" },
                        { "data": "start-date" },
                        { "data": "salary" }
                      ]'
                      data-paging="true"
                      data-info="true"
                    >
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Position</th>
                          <th>Office</th>
                          <th>Age</th>
                          <th>Date</th>
                          <th>Salary</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedule
                          ? schedule.map((schedule) => (
                            <tr>
                              <td>{schedule.date}</td>
                              <td>{schedule.checkIn}</td>
                              <td>{schedule.checkOut}</td>
                              <td>Age</td>
                              <td>Date</td>
                              <td>
                                <div className="actions">
                                  <button className="btn btn-info btn-sm btn-square rounded-pill">
                                    <span className="btn-icon icofont-ui-edit" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      this.deleteSchedule(schedule.id)
                                    }
                                    className="btn btn-error btn-sm btn-square rounded-pill"
                                  >
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
      </>
    );
  }
}

export default ManageSchedule;
