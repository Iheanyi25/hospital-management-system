import React from "react";
import Select from "react-select";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { getDoctorsUrl, postReAssignmentUrl } from "../../api/URLs";
import { notification } from "../../utils/notification";
const $ = window.$;
// let selectId = Math.random();
// selectId = selectId.toString().replace(".", "_");

class ReAssign extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctors: [],
      doctorId: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDoctorSelect = this.handleDoctorSelect.bind(this);
  }

  async componentDidMount() {
    this.fetchDoctors();
  }

  fetchDoctors = async () => {
    const getDoctors = getDoctorsUrl();
    const getDoctorsConfig = fetchConfig({ url: getDoctors, method: "get" });
    const { data } = await fetchWrapper(getDoctorsConfig);
    this.setState({ doctors: data?.doctors || [] });
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

  async handleSubmit(e) {
    e.preventDefault();
    try {
      const data = {
        [this.props.idType]: this.props.id,
        doctorId: this.state.doctorId,
      };
      const reAssignEndpoint = {
        consultationId: "ReassignPatientToAnotherDoctor",
        appointmentId: "ReassignAppointment",
      };
      const postReAssignment = postReAssignmentUrl(
        reAssignEndpoint[this.props.idType]
      );
      const postReAssignmentConfig = fetchConfig({
        url: postReAssignment,
        data,
        method: "post",
      });
      const res = await fetchWrapper(postReAssignmentConfig);
      this.closeModal();
      await this.props["reRun"]();
      notification.success({ message: res.data.message });
    } catch (error) {
      notification.error({ message: error?.response?.data?.message });
    }
  }

  closeModal = () => {
    $(`#reassign-patient-${this.props.id}`).modal("hide");
  };

  render() {
    // console.log(this.props.id,99999)
    const allDoctors = [];

    if (this.state.doctors?.length > 0) {
      this.state.doctors.forEach(({ doctorId, firstName, lastName }) => {
        allDoctors.push({ value: doctorId, label: `${firstName} ${lastName}` });
      });
    }
    
    return (
      <>
        <div
          className="modal fade"
          id={`reassign-patient-${this.props.id}`}
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header p-5">
                <h5 className="modal-title">Assign to a doctor</h5>
              </div>
              <div className="modal-body p-5">
                <form>
                  <div className="form-group">
                    <Select
                      options={allDoctors}
                      onChange={this.handleDoctorSelect}
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
                  <button
                    disabled={!this.state.doctorId}
                    style={{ fontSize: "0.9em" }}
                    className="btn btn-primary mb-3"
                    onClick={this.handleSubmit}
                  >
                    Assign
                  </button>
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

export { ReAssign };
