import React from "react";
import { NavLink } from "react-router-dom";
import { PageLoader } from "../../Components";

class MyDoctors extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            doctors: [],
            apiUrl: process.env.REACT_APP_API_URL,
        };
    }

    async getAllDoctors() {
        const data = await (
            await fetch(`${this.state.apiUrl}/Doctor/GetDoctorsByPatient?PatientId=${JSON.parse(localStorage.getItem("authenticatedUser")).id}`)
        ).json();
        console.log(data.doctors);
        this.setState({ doctors: data.doctors });
    }

    componentDidMount() {
        this.getAllDoctors();
    }

    render() {
        const { doctors } = this.state;
        return (
            <>
                <PageLoader />

                <main className="main-content">
                    <div className="app-loader">
                        <i className="icofont-spinner-alt-4 rotate" />
                    </div>
                    <div className="main-content-wrap">
                        <header className="page-header">
                            <h4 className="page-title">My Doctors</h4>
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
                                        <tr >
                                            <th>Photo</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.doctors.map((doctor) => (
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
                                                    {doctor?.doctor?.firstName} {doctor?.doctor?.lastName}
                                                </td>
                                                <td>
                                                    <strong>
                                                        {" "}
                                                        <div className="d-flex align-items-center nowrap">
                                                            {doctor?.doctor?.email}
                                                        </div>
                                                    </strong>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center nowrap">
                                                        {doctor?.doctor?.phoneNumber ?? "not available yet"}
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
                                                        <div className="dropdown-menu">
                                                            <NavLink
                                                                to={`/ViewDoctorProfile/${doctor?.doctor?.id}`}
                                                                className="btn btn-sm btn-block"
                                                            >
                                                                <span className="btn-icon icofont-ui-edit  mr-2" />{" "}
                                                                View Profile
                                                            </NavLink>
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

export default MyDoctors;
