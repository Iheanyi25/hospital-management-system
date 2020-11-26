import React from "react";
import { Link } from "react-router-dom";
import { Success } from "../Alerts";
import { SelectableDropDown } from "../Select/SelectableDropDown";
const $ = window.$;
let selectId = Math.random();
selectId = selectId.toString().replace(".", "_");
const apiUrl = process.env.REACT_APP_API_URL;

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
        let res = await fetch(apiUrl + "/Doctor/GetDoctors");
        const data = await res.json();
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

        const request = await fetch(apiUrl + "/Admin/" + this.props[key[1]], {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const response = await request.json();
        this.setState({ success: true, message: response.message }, () =>
            this.closeModal()
        )
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
