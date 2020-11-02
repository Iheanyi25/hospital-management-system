import React, { Component } from 'react'
import { PageLoader } from '../../../Components'

export default class EditService extends Component {

    state = {
        name: "",
        cost: ""
    }

    async componentDidMount() {
        if (this.props.history.location.state) {
            let stateData = this.props.history.location.state;
            this.setState({ name: stateData.name, cost: stateData.cost })
        } else {
            return this.props.history.push("/AdminDashboard");
        }
    }

    render() {
        return (
            <>
                <PageLoader />

                <main className="main-content">
                    <div className="app-loader">
                        <i className="icofont-spinner-alt-4 rotate" />
                    </div>
                    <div className="main-content-wrap w-50">
                        <div className="page-content">
                            <div className="row justify-content-center">
                                <div className="col col-md-12">
                                    <div className="card border-light">
                                        <div className="card-body">
                                            <form className="mb-4 p-5 needs-validation" noValidate>
                                                <h4 className="text-center">Edit service</h4>
                                                <div className="form-group">
                                                    <label>Title</label>

                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        tabIndex={-98}
                                                        placeholder="Name of service"
                                                        defaultValue={this.state.name}

                                                    />
                                                    <div className="valid-feedback">Looks good!</div>
													<div className="invalid-feedback">Please provide a valid name.</div>
                                                </div>

                                                <div className="form-group">
                                                    <label>Category</label>

                                                    <select className="form-control">
                                                        <option>Select a category</option>
                                                        <option>One</option>
                                                        <option>Two</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label>Cost</label>{' '}
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        tabIndex={-98}
                                                        defaultValue={this.state.cost}
                                                        placeholder="Price of Service"
                                                    />
                                                    <div className="valid-feedback">Looks good!</div>
													<div className="invalid-feedback">
														Oops! should be numbers only.
													</div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                    </div>
                                                    <div className="col text-right">
                                                        <button type="submit" className="btn btn-primary">
                                                            Submit
														</button>
                                                    </div>
                                                </div>
                                            </form>
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