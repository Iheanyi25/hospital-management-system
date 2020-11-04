import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PageLoader } from "../../../Components";

let $ = window.$;
$.DataTables = require("datatables.net");
const apiUrl = process.env.REACT_APP_API_URL;

class ManageServiceRequest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            acceptedAppointments: [],
            activeAppointments: [],
            pendingAppointments: [],
            completedAppointments: [],
        };
    }

    async componentDidMount() {
        this.fetchCategory().then(() => this.sync());
    }

    async fetchCategory() {
        const res = await fetch(apiUrl + "/Admin/GetAllServiceCategories");
        const response = await res.json();
        this.setState({ categories: response })
    }

    sync() {
        this.$el = $(this.el);
        this.$el.DataTable();
    }

    render() {
        const {
            pendingAppointments,
            categories
        } = this.state;

        return (
            <>
                <PageLoader />

                <main className="main-content">
                    <div className="app-loader">
                        <i className="icofont-spinner-alt-4 rotate" />
                    </div>
                    <div className="main-content-wrap">
                        <header className="page-header justify-content-between d-flex align-items-center mb-2">
                            <h4 className="page-title"> Manage services requested</h4>
                            <NavLink className="btn btn-primary" to="/AdminServiceRequests">Request Service</NavLink>
                        </header>
                        <div className="row">
                            <div className="col col-12 col-md-6 col-xl-4">
                                <div className="card animated fadeInUp delay-02s bg-light">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col col-5">
                                                <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
                                            </div>
                                            <div className="col col-7">
                                                <h6 className="mt-0 mb-1">No of Services request</h6>
                                                <div className="count text-primary fs-20">
                                                    {categories.length}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="page-content">
                            <div className="card-body"></div>
                        </div>
                        <div className="page-content">
                            <div className="card mb-0">
                                <div className="card-body">
                                    <div>
                                        <ul
                                            className="nav nav-pills nav-fill mb-3"
                                            id="pills-tab"
                                            role="tablist"
                                        >
                                            {
                                                categories.length > 0 ?
                                                    categories.map((item, index) => (
                                                        <li className="nav-item" key={index}>
                                                            <a
                                                                className={`nav-link ${index === 0 ? "active" : ""}`}
                                                                id={`pills-${item.name.split(" ").join("").toLowerCase()}-tab`}
                                                                data-toggle="pill"
                                                                href={`#pills-${item.name.split(" ").join("").toLowerCase()}`}
                                                                role="tab"
                                                                aria-controls={`pills-${item.name.split(" ").join("").toLowerCase()}`}
                                                                aria-selected="true"
                                                            >
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))
                                                    : null
                                            }
                                        </ul>
                                        <div className="tab-content" id="pills-tabContent">
                                            {
                                                categories.length > 0 ?
                                                    categories.map((item, index) => (
                                                        <div
                                                            key={Math.random() + index}
                                                            className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
                                                            id={`pills-${item.name.split(" ").join("").toLowerCase()}`}
                                                            role="tabpanel"
                                                            aria-labelledby={`pills-${item.name.split(" ").join("").toLowerCase()}-tab`}
                                                        >
                                                            <div className="table-responsive">
                                                                <table
                                                                    ref={(el) => (this.el = el)}
                                                                    className="table data-table"
                                                                    data-columns='[
                                                                            { "data": "#" },
                                                                            { "data": "name" },
                                                                            { "data": "invoicenumber" },
                                                                            { "data": "date-generated" },
                                                                            { "data": "cost" },
                                                                            { "data": "actions" }
                                                                        ]'
                                                                    data-paging="true"
                                                                    data-info="true"
                                                                >
                                                                    <thead>
                                                                        <tr className="bg-primary text-white">
                                                                            <th>#</th>
                                                                            <th>Patient's Name</th>
                                                                            <th>Invoice ID</th>
                                                                            <th>Date Generated</th>
                                                                            <th>Amount</th>
                                                                            <th>Actions</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {pendingAppointments
                                                                            ? pendingAppointments.map((invoice, index) => (
                                                                                <tr>
                                                                                    <td>
                                                                                        {index + 1}
                                                                                    </td>
                                                                                    <td>
                                                                                        <strong>{invoice.id}</strong>
                                                                                    </td>
                                                                                    <td>
                                                                                        <div className="text-muted text-nowrap">
                                                                                            {invoice.cost}
                                                                                        </div>
                                                                                    </td>

                                                                                    <td>
                                                                                        <div className="actions">
                                                                                            <Link
                                                                                                to="/AdminPreConsultation"
                                                                                                className="btn btn-secondary btn-sm btn-square rounded-pill"
                                                                                            >
                                                                                                <span className="btn-icon icofont-stethoscope-alt" />
                                                                                            </Link>
                                                                                            <button className="btn btn-info btn-sm btn-square rounded-pill">
                                                                                                <span className="btn-icon icofont-ui-edit" />
                                                                                                View Invoice
                                                                                            </button>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            ))
                                                                            : null}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    ))
                                                    : null
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="add-action-box">
                                <button
                                    className="btn btn-primary btn-lg btn-square rounded-pill"
                                    data-toggle="modal"
                                    data-target="#add-appointment"
                                >
                                    <span className="btn-icon icofont-stethoscope-alt" />
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

            </>
        );
    }
}

export default ManageServiceRequest;