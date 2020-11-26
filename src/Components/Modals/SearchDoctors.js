import React from "react";
import { Link } from "react-router-dom";
import { SelectableDropDown } from "../Select/SelectableDropDown";
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
              <div className="modal-header p-5">
                <h5 className="modal-title">Search For A Doctor</h5>
              </div>
              <div className="modal-body p-5">
                <form>
                  <div className="form-group">

                    <SelectableDropDown
                      data={this.state.doctors}
                      itemKey={["id"]}
                      valueKeys={["firstName", "lastName"]}
                      label={"Doctors"}
                      onChange={this.handleChange}
                      stateKey={"doctorId"}
                      search={true}
                    />

                  </div>
                </form>
              </div>

              <div className="modal-footer d-block">
                <div className="actions justify-content-between">
                  <button
                    type="button"
                    className="btn btn-error mb-3"
                    data-dismiss="modal"
                    style={{ fontSize: "0.9em" }}
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
                    View Profile
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
