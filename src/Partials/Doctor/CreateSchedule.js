import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function getTime(date) {
  let _date = new Date(date);
  return _date.toTimeString().split("GMT")[0];
}

function getDate(date) {
  let _date = new Date(date);
  return _date.toDateString();
}

class CreateSchedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      doctorId: JSON.parse(localStorage.getItem("account")).id,
      checkInTime: "10:00",
      checkOutTime: "10:00",
      date: new Date(),
      schedule: null,
      showErrorMessage: false,
      showSuccessMessage: false,
    };
  }

  createSchedule = async (e) => {
    e.preventDefault();
    const { apiUrl } = this.state;
    const { date, checkInTime, checkOutTime, doctorId } = this.state;

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
      checkInTime: "10:00",
      checkOutTime: "10:00",
      date: new Date(),
    });
  };

  handleChange = async (name, e) => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  render() {
    const { email, firstName, lastName, password, roleName } = this.state;
    var displayError;
    var displaySuccess;

    if (this.state.showErrorMessage) {
      displayError = (
        <div className="alert alert-danger with-after-icon" role="alert">
          <div className="alert-content">{this.state.errorMessage}</div>
          <div className="alert-icon">
            <i className="icofont-alarm" />
          </div>
        </div>
      );
    }

    if (this.state.showSuccessMessage) {
      displaySuccess = (
        <div className="alert alert-info with-after-icon" role="alert">
          <div className="alert-content text-center">
            {this.state.successMessage}.
            <p class="mb-0 ">
              Would you like to update his profile?
              <Link class="btn btn-outline-light">
                <span class="btn-icon icon icofont-ui-edit mr-2"></span>Update
                Profile
              </Link>
            </p>
          </div>
          <div className="alert-icon">
            <i className="icon icofont-ui-check" />
          </div>
        </div>
      );
    }

    return (
      <>
        <div
          className="modal fade"
          id="add-patient"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Schedule</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => this.createSchedule(e)}>
                  <div className="form-group">
                    <input
                      id="date"
                      name="date"
                      className="form-control"
                      type="date"
                      placeholder="Date"
                      onChange={(e) => this.handleChange("date", e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      id="checkInTime"
                      name="checkInTime"
                      className="form-control"
                      type="time"
                      placeholder="Check In"
                      onChange={(e) => this.handleChange("checkInTime", e)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      id="checkOutTime"
                      name="checkOutTime"
                      className="form-control"
                      type="time"
                      placeholder="Check Out"
                      onChange={(e) => this.handleChange("checkOutTime", e)}
                    />
                  </div>

                  <div className="modal-footer d-block">
                    <div className="actions justify-content-between">
                      <button
                        type="button"
                        className="btn btn-error"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>{" "}
                      <button type="submit" className="btn btn-info">
                        Create Schedule
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* end Add Drug modal */}
      </>
    );
  }
}

export default CreateSchedule;
