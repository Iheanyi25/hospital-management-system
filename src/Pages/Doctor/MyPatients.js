import React from "react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../Components";
import PatientAndAdminImage from "../../assets/img/PatientAndAdminIcon.svg";
import { getMyPatients } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";

const $ = window.$;
$.Datatable = require("datatables.net");
const apiUrl = process.env.REACT_APP_API_URL;
class MyPatients extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            patientId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
            patients: [],
        };
    }

    async getMyPatients() {

        const myPatients = getMyPatients(this.state.patientId);
        const getPatientAllAppointmentsConfig = fetchConfig({ url: myPatients, method: "get" });
        const { data } = await fetchWrapper(getPatientAllAppointmentsConfig);

        this.setState({ patients: data.patients });
    }

    componentDidMount() {
        this.getMyPatients().then(() => this.sync());
    }

    sync() {
        this.$el = $(this.el);
        this.$el.DataTable();
    }

    render() {
        const { patients } = this.state;
        return (
            <>
                <PageLoader />

                <main className="main-content">
                    <div className="app-loader">
                        <i className="icofont-spinner-alt-4 rotate" />
                    </div>
                    <div className="main-content-wrap">
                        <div className="page-content">
                            <div className="row">
                                <div className="col col-12 col-md-6 col-xl-3">
                                    <div className="card animated fadeInUp delay-01s bg-light">
                                        <div className="card-body">
                                            <div className="row align-items-center">
                                                <div className="col col-5">
                                                    <div className="icon p-0 fs-48 text-primary opacity-50 icofont-users"></div>
                                                </div>
                                                <div className="col col-7">
                                                    <h6 className="mt-0 mb-1">Patients</h6>
                                                    <div className="count text-primary fs-20">{patients.length ?? 0}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <header className="page-header">
                                <h4 className="page-title">My Patients</h4>
                            </header>
                            <div className="table-responsive">
                                <table
                                    ref={(el) => (this.el = el)}
                                    className="table table-striped"
                                    data-paging="true"
                                    data-info="true"
                                >
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Patient Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            patients.map((patient) => (
                                                <tr>
                                                    <td>
                                                        <img
                                                            src={PatientAndAdminImage}
                                                            alt="Patient Image"
                                                            width={40}
                                                            height={40}
                                                            className="rounded-500"
                                                        />
                                                    </td>
                                                    <td>
                                                        {patient.patient.firstName}{" "}
                                                        {patient.patient.lastName}
                                                    </td>
                                                    <td>
                                                        <strong>
                                                            {" "}
                                                            <div className="d-flex align-items-center nowrap">
                                                                {patient.patient.email}
                                                            </div>
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        <div className="d-flex align-items-center nowrap">
                                                            {patient.patient?.phoneNumber ?? "Not available"}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="btn-group">
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary btn-sm btn-block dropdown-toggle"
                                                                data-toggle="dropdown"
                                                                aria-haspopup="true"
                                                                aria-expanded="false"
                                                            >
                                                                Action
                                      </button>
                                                            <div className="dropdown-menu text-left">
                                                                <Link
                                                                    title="Patient Profile"
                                                                    to={{
                                                                        pathname: `/DoctorPatientProfile/${patient.id}`,
                                                                        state: patient.patient,
                                                                    }}
                                                                    className="btn btn-sm btn-block"
                                                                >
                                                                    <span className="btn-icon icofont-ui-edit  mr-2" />{" "}
                                                                Patient Profile
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* <div className="add-action-box">
                                <button
                                    className="btn btn-dark btn-lg btn-square rounded-pill"
                                    data-toggle="modal"
                                    data-target="#add-doctor"
                                >
                                    <span className="btn-icon icofont-contact-add" />
                                </button>
                            </div> */}
                        </div>
                    </div>
                </main>
            </>
        );
    }
}

export default MyPatients;
