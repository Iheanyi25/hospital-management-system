import React from "react";
import { Link } from "react-router-dom";
const $ = window.$;
let selectId = Math.random();
selectId = selectId.toString().replace(".", "_");
const apiUrl = process.env.REACT_APP_API_URL;

class SearchDoctorsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctors: [],
      doctorId: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    this.fetchDoctors().then(() => {
      this.sync(selectId);
      this.sync(selectId + 1);
    });
  }

  fetchDoctors = async () => {
    let res = await fetch(apiUrl + "/Doctor/GetDoctors");
    const data = await res.json();
    const doctorArray = [];

    data.doctors.forEach((element) => {
      doctorArray.push(element.doctor);
    });

    this.setState({ doctors: doctorArray }, () => {
      this.renderDoctorPicker();
    });
  };

  // const { params } = this.props.match;
  renderDoctorPicker() {
    var select = $(".custom-doctor-picker");

    if (select.length) {
      select.each(function () {
        $(this).selectpicker({
          style: "",
          styleBase: "form-control",
          tickIcon: "icofont-check-alt",
        });
      });
    }
  }

  sync = (selectId) => {
    var select = $(`#custom_select_${selectId}`);

    if (select.length) {
      select.each(function () {
        $(this).selectpicker({
          style: "",
          styleBase: "form-control",
          tickIcon: "icofont-check-alt",
        });
      });
    }
  };

  handleChange(name, e) {
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  routeToDoctor = () => {
    $("#search-doctor").modal("hide");
  };

  render() {
    const { email, firstName, lastName, roleName, doctorId } = this.state;
    // var displayError;
    // var displaySuccess;

    // if (this.state.showErrorMessage) {
    // 	displayError = (
    // 		<div className="alert alert-danger with-after-icon" role="alert">
    // 			<div className="alert-content">{this.state.errorMessage}</div>
    // 			<div className="alert-icon">
    // 				<i className="icofont-alarm" />
    // 			</div>
    // 		</div>
    // 	);
    // }

    // if (this.state.showSuccessMessage) {
    // 	displaySuccess = (
    // 		<div className="alert alert-info with-after-icon" role="alert">
    // 			<div className="alert-content text-center">
    // 				{this.state.successMessage}.
    // 				<p className="mb-0 ">
    // 					Would you like to update his profile?
    // 					<Link className="btn btn-outline-light">
    // 						<span className="btn-icon icon icofont-ui-edit mr-2"></span>Update Profile
    // 					</Link>
    // 				</p>
    // 			</div>
    // 			<div className="alert-icon">
    // 				<i className="icon icofont-ui-check" />
    // 			</div>
    // 		</div>
    // 	);
    // }

    return (
      <>
        {/* Search Doctors modals */}
        <div
          className="modal fade"
          id="search-doctor"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Search For A Doctor</h5>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <select
                      className="form-control"
                      value={doctorId}
                      id={`custom_select_${selectId + 1}`}
                      data-live-search="true"
                      onChange={(e) => this.handleChange("doctorId", e)}
                    >
                      <option selected value="">
                        Select a Doctor
                      </option>
                      {this.state.doctors.map((item, index) => {
                        return (
                          <option
                            key={index}
                            value={item.id}
                          >{`${item.firstName} ${item.lastName}`}</option>
                        );
                      })}
                    </select>
                  </div>
                </form>
              </div>

              <div className="modal-footer d-block">
                <div className="actions justify-content-between">
                  <button
                    type="button"
                    className="btn btn-error"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <Link
                    // data-dismiss="modal"
                    onClick={this.routeToDoctor}
                    style={{ fontSize: "0.9em" }}
                    className="btn btn-primary mb-3"
                    to={`/ViewDoctorProfile/${doctorId}`}
                  >
                    <h4 className="my-0">View Profile</h4>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end Add patients modals */}
      </>
    );
  }
}

export { SearchDoctorsModal };
