import React from "react";
import { Link } from "react-router-dom";
import { SelectableDropDown } from "../Select/SelectableDropDown";
const $ = window.$;
let selectId = Math.random();
selectId = selectId.toString().replace(".", "_");
const apiUrl = process.env.REACT_APP_API_URL;

class SearchDoctorsBySpecializationModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            doctors: [],
            doctorId: null,
            searching: false,
            searchString: ""
        };

    }

    async componentDidMount() {
    }

    startSearching = async (e) => {
        this.setState({ searching: true, searchString: e.target.value });

        const request = await fetch(apiUrl + "/Doctor/GetDoctorsBySpecialization?specialiazation=" + e.target.value);
        const response = await request.json();

        console.log({ response })

        this.setState({ searching: false, doctors: response.doctors });
    }

    routeToDoctor = () => {
        $("#search-doctor-specialization").modal("hide");
    };

    searchDoctor = () => {
        this.routeToDoctor();
        setTimeout(() => {
            $("#search-doctor").modal("show");
        }, 200);
    }

    render() {
        const { doctorId } = this.state;

        return (
            <>
                {/* Search Doctors modals */}
                <div
                    className="modal fade"
                    id="search-doctor-specialization"
                    tabIndex={-1}
                    role="dialog"
                    aria-hidden="true"
                >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header p-5">
                                <h5 className="modal-title">Search By Specialization</h5>
                            </div>
                            <div className="modal-body p-5">
                                <form>
                                    <div className="form-group">

                                        <label>Search</label>
                                        <input
                                            className="form-control mb-3"
                                            placeholder="Enter keyword"
                                            onChange={(e) => this.startSearching(e)}
                                            value={this.state.searchString}
                                            type="search"
                                        />

                                        {
                                            (this.state.searchString.length > 0 && this.state.doctors.length > 0) ?
                                                <ul className="card w-100" style={{ maxHeight: 120, zIndex: "999", listStyle: "none" }}>
                                                    {
                                                        this.state.doctors.map((item, index) =>
                                                            <li
                                                                className={`cursor-pointer searchStringValue ${doctorId === item.doctorProfile?.doctorId ? "active" : ""}`}
                                                                key={index}
                                                                onClick={() => this.setState({ doctorId: item.doctorProfile?.doctorId })}
                                                            >
                                                                {item.doctorProfile?.doctor.lastName} {item.doctorProfile?.doctor.firstName}
                                                            </li>
                                                        )
                                                    }
                                                </ul> :
                                                <p>
                                                    Nothing here yet
                                                </p>
                                        }
                                        <Link to="#" onClick={this.searchDoctor} className="text-right mt-2">Search Doctor</Link>
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

                {/* trigger */}
                {/* <button data-toggle="modal" data-target="#search-doctor-specialization" className="d-none" /> */}

                {/* end Add patients modals */}
            </>
        );
    }
}




export { SearchDoctorsBySpecializationModal };