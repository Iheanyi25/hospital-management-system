import React, { Component } from 'react'
import { PageLoader } from '../../../Components'

export default class EditServiceCategory extends Component {

    state = {
        name: "",
        description: ""
    }

    async componentDidMount() {
        if (this.props.history.location.state) {
            let stateData = this.props.history.location.state;
            this.setState({ name: stateData.name, description: stateData.description })
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
                                    <div class="card border-light">
                                        <div class="card-body">
                                            <form className="mb-4 p-5">
                                                <h4 className="text-center">Edit Service Category</h4>
                                                <div className="form-group">
                                                    <label>Name</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        tabIndex={-98}
                                                        placeholder="Name"
                                                        defaultValue={this.state.name}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Description</label>
                                                    <textarea
                                                        className="form-control"
                                                        placeholder="Description"
                                                        rows={3}
                                                        defaultValue={this.state.description}
                                                    />
                                                </div>
                                                <div className="row">
                                                    <div className="col"></div>
                                                    <div className="col text-right">
                                                        <button type="button" className="btn btn-primary">
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
