import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PageLoader } from '../../../Components';

export default class ManageHealthPlans extends Component {

    state = {
        healthPlans: []
    }

    async componentDidMount() {
        const request = await fetch(`${process.env.REACT_APP_API_URL}/Admin/GetAllHealthPlans`);
        let data = await request.json();
        this.setState({ healthPlans: data.plans });
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
                        <div className="page-content">
                            <div className="row justify-content-center">
                                <div className="col col-md-12">
                                    <div class="card border-light">
                                        <div class="card-body">

                                            <div className="table-responsive">
                                                <table
                                                    ref={(el) => (this.el = el)}
                                                    className="table table-striped"
                                                    data-columns='[
                                                        { "data": "#" },
                                                        { "data": "name" },
                                                        { "data": "cost" },
                                                        { "data": "renewal-cost" },
                                                        { "data": "patients-per-folder" },
                                                        { "data": "accounts-per-healthplan" },
                                                        { "data": "instant-billing" },
                                                        { "data": "actions" }
                                                    ]'
                                                    data-paging="true"
                                                    data-info="true"
                                                    data-ajax={this.state.healthPlans}
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
                                                                        <div class="custom-control custom-switch">
                                                                            <input type="checkbox" class="custom-control-input" id="control1" checked={item.instantBilling ? "checked" : "false"} disabled />
                                                                            <label class="custom-control-label" for="control1"></label>
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
                                                                        </div>

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
