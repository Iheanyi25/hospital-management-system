import React from "react";
import { NavLink } from "react-router-dom";
import { PageLoader } from "../../Components";
import DoctorImage from "../../assets/img/DoctorIcon.svg";
import { getMyDoctors } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";



const $ = require("jquery");
$.Datatable = require("datatables.net");

class MyDoctors extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            doctors: [],
            apiUrl: process.env.REACT_APP_API_URL,
        };
    }

    async getAllMyDoctors() {

        const myDoctors = getMyDoctors(this.state.patientId);
        const getMyDoctorsConfig = fetchConfig({ url: myDoctors, method: "get" });
        const { data } = await fetchWrapper(getMyDoctorsConfig);

        console.log(data.doctors);
        this.setState({ doctors: data.doctors });
    }

    componentDidMount() {
        this.getAllMyDoctors().then(() => this.sync());
    }

    sync() {
        this.$el = $(this.el);
        this.$el.DataTable();
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
                        <div className="row">
                            <div className="col col-12 col-md-6 col-xl-3">
                                <div className="card animated fadeInUp delay-01s bg-light">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col col-5">
                                                <div className="icon p-0 fs-48 text-primary opacity-50 icofont-users"></div>
                                            </div>
                                            <div className="col col-7">
                                                <h6 className="mt-0 mb-1">Doctors</h6>
                                                <div className="count text-primary fs-20">{doctors.length ?? 0}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                        {doctors.map((doctor) => (
                                            <tr>
                                                <td>
                                                    <img
                                                        src={DoctorImage}
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
