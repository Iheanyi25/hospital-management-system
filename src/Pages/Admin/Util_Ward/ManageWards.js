import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { PageLoader } from '../../../Components'

export default class ManageWards extends Component {

    state = {
        wards: []
    }

    async componentDidMount() {
        const request = await fetch(`${process.env.REACT_APP_API_URL}/Admin/Ward/GetAllWards`);
        let data = await request.json();
        this.setState({ wards: data.wards });
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
                                                        { "data": "capacity" },
                                                        { "data": "actions" }
                                                    ]'
                                                    data-paging="true"
                                                    data-info="true"
                                                    data-ajax={this.state.wards}
                                                >
                                                    <thead>
                                                        <tr className="">
                                                            <th>#</th>
                                                            <th>Name</th>
                                                            <th>Capacity</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {
                                                            this.state.wards.map((item, index) =>
                                                                <tr>
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
                                                                        {item.capacity}
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
                                                                                        pathname: "/AdminEditWard/" + item.id,
                                                                                        state: item
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
