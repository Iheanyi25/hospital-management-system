import React from "react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../Components";

const apiUrl = process.env.REACT_APP_API_URL;
class MyPatients extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            patients: [],
        };
    }

    async getMyPatients() {
        console.log(JSON.parse(localStorage.getItem("authenticatedUser")).id)
        const data = await (
            await fetch(`${apiUrl}/Patient/GetPatientsByDoctor?DoctorId=${JSON.parse(localStorage.getItem("authenticatedUser")).id}`)
        ).json();
        console.log(data.patients);
        this.setState({ patients: data.patients });
    }

    componentDidMount() {
        this.getMyPatients();
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
                        <header className="page-header">
                            <h4 className="page-title">My Patients</h4>
                        </header>
                        <div className="page-content">
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
                                                            src="../assets/content/user-40-1.jpg"
                                                            alt=""
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
                                                            {patient.patient.phoneNumber}
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
                            <div className="add-action-box">
                                <button
                                    className="btn btn-dark btn-lg btn-square rounded-pill"
                                    data-toggle="modal"
                                    data-target="#add-doctor"
                                >
                                    <span className="btn-icon icofont-contact-add" />
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}

export default MyPatients;
