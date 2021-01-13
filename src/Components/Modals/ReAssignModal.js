import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { getDoctorsUrl, postReAssignmentUrl } from "../../api/URLs";
import { Success } from "../Alerts";
import { SelectableDropDown } from "../Select/SelectableDropDown";
const $ = window.$;
let selectId = Math.random();
selectId = selectId.toString().replace(".", "_");

class ReAssign extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            doctors: [],
            doctorId: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        this.fetchDoctors();
    }

    fetchDoctors = async () => {
        const getDoctors = getDoctorsUrl()
        const getDoctorsConfig = fetchConfig({ url: getDoctors, method: 'get' })
        const { data } = await fetchWrapper(getDoctorsConfig)

        const doctorArray = [];

        data.doctors.forEach((element) => {
            doctorArray.push(element.doctor);
        });

        this.setState({ doctors: doctorArray }, () => {
        });
    };

    handleChange(name, e) {
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        let key = Object.keys(this.props);

        const data = {
            [key[0]]: this.props[key[0]],
            doctorId: this.state.doctorId
        };

        const postReAssignment = postReAssignmentUrl(this.props[key[1]])
        const postReAssignmentConfig = fetchConfig({ url: postReAssignment, data, method: 'post' })
        const res = await fetchWrapper(postReAssignmentConfig)

        this.setState({ success: true, message: res.message }, () => {
            this.closeModal();
            this.props["reRun"]();
        })
    }

    closeModal = () => {
        let $ = window.$;
        $("#reassign-patient").modal('hide');
    }

    render() {

        return (
            <>

                {
                    this.state.success ?
                        <Success
                            message={this.state.message}
                            history={this.props.history}
                        />
                        :
                        null
                }
                {/* Search Doctors modals */}

                <div
                    className="modal fade"
                    id="reassign-patient"
                    tabIndex={-1}
                    role="dialog"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header p-5">
                                <h5 className="modal-title">Reassign to a doctor</h5>
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
                                    <button
                                        // data-dismiss="modal"
                                        onClick={this.routeToDoctor}
                                        disabled={!this.state.doctorId}
                                        style={{ fontSize: "0.9em" }}
                                        className="btn btn-primary mb-3"
                                        onClick={this.handleSubmit}
                                    >
                                        Re assign
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
