import React from "react";
import Header from "../Partials/Doctor/Header";
import Sidebar from "../Partials/Doctor/Sidebar";
import Footer from "../Partials/Footer";
import TemplateSettings from "../Partials/TemplateSettings";
import PageLoader from "../Partials/PageLoader";

class CreateSchedules extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      doctorId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
      checkInTime: "",
      checkOutTime: "",
      date: new Date(),
      schedule: null,
      showErrorMessage: false,
      showSuccessMessage: false,
    };
  }

  createSchedule = async (e) => {
    e.preventDefault();
    const { apiUrl, date, checkInTime, checkOutTime, doctorId } = this.state;

    try {
      var checkIn = checkInTime;
      var checkOut = checkOutTime;
      var available = true;

      const request = await fetch(`${apiUrl}/Doctor/CreateSchedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          checkIn,
          checkOut,
          date,
          available,
          doctorId,
        }),
      });
      if (!request.ok) {
        const error = await request.json();
        throw Error(error.message);
      }
      const data = await request.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  clearForm = async (e) => {
    e.preventDefault();
    this.setState({
      checkInTime: "",
      checkOutTime: "",
      date: new Date(),
    });
  };

  handleChange = async (name, e) => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  render() {
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
                <header className="page-header mt-4">
                  <h4 className="page-title">Create Consultation Schedule</h4>
                </header>
                <div className="page-content">
                  <div className="row justify-content-center">
                    <div className="col col-12 col-xl-8">
                      <form
                        className="mb-4"
                        onSubmit={(e) => this.createSchedule(e)}
                      >
                        <div className="form-group">
                          <label>Pick a Date</label>
                          <input
                            id="date"
                            name="date"
                            className="form-control"
                            type="date"
                            placeholder="Date"
                            value={this.state.date}
                            onChange={(e) => this.handleChange("date", e)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Session Starts At</label>
                          <input
                            id="checkInTime"
                            name="checkInTime"
                            className="form-control"
                            type="time"
                            placeholder="Check In"
                            value={this.state.checkInTime}
                            onChange={(e) =>
                              this.handleChange("checkInTime", e)
                            }
                          />
                        </div>

                        <div className="form-group">
                          <label>Session Ends At</label>
                          <input
                            id="checkOutTime"
                            name="checkOutTime"
                            className="form-control"
                            type="time"
                            placeholder="Check Out"
                            value={this.state.checkOutTime}
                            onChange={(e) =>
                              this.handleChange("checkOutTime", e)
                            }
                          />
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col">
                            <button type="submit" className="btn btn-success">
                              Save Schedule
                            </button>
                          </div>
                          <div className="col text-right">
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={(e) => this.clearForm(e)}
                            >
                              <span className="d-none d-sm-block">Clear</span>{" "}
                              <span className="d-sm-none">Clear</span>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
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

export default CreateSchedules;
