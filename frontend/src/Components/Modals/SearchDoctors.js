import React from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { getDoctorsUrl } from "../../api/URLs";
import Select from "react-select";
import { SearchDoctorsBySpecializationModal } from "./searchDoctorBySpecialization";
const $ = window.$;

let selectId = Math.random();
selectId = selectId.toString().replace(".", "_");

class SearchDoctorsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctors: [],
      doctorId: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDoctorSelect = this.handleDoctorSelect.bind(this);
  }

  async componentDidMount() {
    this.fetchDoctors().then(() => {
      this.sync(selectId);
      this.sync(selectId + 1);
    });
  }

  fetchDoctors = async () => {
    const getDoctors = getDoctorsUrl();
    const getDoctorsConfig = fetchConfig({ url: getDoctors, method: "get" });
    const { data } = await fetchWrapper(getDoctorsConfig);
    this.setState({ doctors: data?.doctors || [] },  () => {
      this.renderDoctorPicker();
    });
    // const doctorArray = [];

    // data.doctors.forEach((element) => {
    //   doctorArray.push(element.doctor);
    // });

    // this.setState({ doctors: doctorArray }, () => {
    //   this.renderDoctorPicker();
    // });
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

  handleDoctorSelect(data) {
    this.setState({
      doctorId: data.value,
    });
  }

  routeToDoctor = () => {
    $("#search-doctor").modal("hide");
  };

  searchBySpecialization = () => {
    this.routeToDoctor();
    setTimeout(() => {
      $("#search-doctor-specialization").modal("show");
    }, 200);
  }

  render() {
    const { doctorId } = this.state;
    const allDoctors = [];

    console.log(this.state.doctors,7777)
    if (this.state.doctors?.length > 0) {
      this.state.doctors.forEach(({ doctorId, firstName, lastName }) => {
        allDoctors.push({ value: doctorId, label: `${firstName} ${lastName}` });
      });
    }

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
                     <Select
                      options={allDoctors}
                      onChange={this.handleDoctorSelect}
                    />
                    <Link to="#" onClick={this.searchBySpecialization} className="text-right mt-2">Search by Specialization</Link>
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
                    to={doctorId ? `/ViewDoctorProfile/${doctorId}` : ""}
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SearchDoctorsBySpecializationModal />
        {/* end Add patients modals */}
      </>
    );
  }
}




export { SearchDoctorsModal };