import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { PageLoader } from '../../../Components';

let $ = window.$;
$.DataTable = require("datatables.net");
export default class ManageHealthPlans extends Component {

    state = {
        healthPlans: []
    }

    async componentDidMount() {
        const request = await fetch(`${process.env.REACT_APP_API_URL}/Admin/GetAllHealthPlans`);
        let data = await request.json();
        console.log(data.plans);
        this.setState({ healthPlans: data.plans }, () => this.sync());
    }

    sync() {
        this.$el = $(this.el);
        this.$el.DataTable();
    }

    render() {
        return (
            <>
                <PageLoader />

                <main className="main-content">
                    <div className="app-loader">
                        <i className="icofont-spinner-alt-4 rotate" />
                    </div>
                    <div className="main-content-wrap">
                        <header className="page-header justify-content-between d-flex align-items-center mb-2">
                            <h4 className="page-title mb-0"> Manage Health Plans</h4>
                            <NavLink className="btn btn-primary" to="/AdminCreateHealthPlan">Create Health Plan</NavLink>
                        </header>
                        <div className="page-content mt-5">
                            <div className="row justify-content-center">
                                <div className="col col-md-12">
                                    <div className="card border-light">
                                        <div className="card-body">

                                            <div className="table-responsive">
                                                <table
                                                    ref={(el) => (this.el = el)}
                                                    className="table table-striped"
                                                    data-paging="true"
                                                    data-info="true"
                                                // data-ajax={""}
                                                >
                                                    <thead>
                                                        <tr className="">
                                                            <th>#</th>
                                                            <th>Name</th>
                                                            <th>Cost</th>
                                                            <th>Renewal Cost</th>
                                                            <th>Patients Per Folder</th>
                                                            <th>Accounts Per Health Plan</th>
                                                            <th>Instant billing</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {
                                                            this.state.healthPlans.map((item, index) =>
                                                                <tr key={index}>
                                                                    <td>
                                                                        <strong>{index + 1}</strong>
                                                                    </td>
                                                                    <td>
                                                                        <strong>
                                                                            <div className="d-flex align-items-center nowrap">
                                                                                {item.name}
                                                                            </div>
                                                                        </strong>
                                                                    </td>
                                                                    <td>
                                                                        {item.cost}
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-flex align-items-center nowrap">
                                                                            {item.renewal}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-flex align-items-center nowrap">
                                                                            {item.noOfPatients}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="d-flex align-items-center nowrap">
                                                                            {item.noOfAccounts}
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="custom-control custom-switch">
                                                                            <input type="checkbox" className="custom-control-input" id="control2" checked={item.instantBilling ? true : false} />
                                                                            <label className="custom-control-label" for="control1"></label>
                                                                        </div>
                                                                    </td>
                                                                    <td>

                                                                        {/* <div className="btn-group">
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
                                                                                <Link
                                                                                    title="Pre-consultation"
                                                                                    to={{
                                                                                        pathname: "/AdminEditHealthPlan/" + item.id,
                                                                                        state: item,
                                                                                    }}
                                                                                    className="btn btn-sm btn-block text-primary"
                                                                                >
                                                                                    <span className="btn-icon icofont-edit-alt mr-2" />
                                                                                Edit
                                                                                </Link>
                                                                                <Link
                                                                                    title="Pre-consultation"
                                                                                    to="#"
                                                                                    className="btn btn-sm btn-block text-danger"
                                                                                >
                                                                                    <span className="btn-icon icofont-delete-alt mr-2" />
                                                                                    Delete
                                                                                </Link>
                                                                            </div>
                                                                        </div> */}

                                                                    </td>
                                                                </tr>
                                                            )
                                                        }

                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>


            </>
        )
    }
}
