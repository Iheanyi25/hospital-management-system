import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { PageLoader } from '../../Components';


const $ = window.$;

export default class AddPatient extends Component {

    componentDidMount() {
        console.log($)
    }

    state = {
        apiUrl: process.env.REACT_APP_API_URL,

        email: "",
        firstName: "",
        lastName: "",
        password: "Patient101@",
        healthPlan: "",
        patientId: "",
        showErrorMessage: false,
        showSuccessMessage: false,
    };

    handleChange(name, e) {
        const value = e.target.value;

        if (name === "healthPlan" && value !== "basic") {
            this.selectHealthPlan(value);
        }

        this.setState({
            [name]: value,
        });
    }

    async registerPatient(e) {
        e.preventDefault();

        const { email, firstName, lastName, password } = this.state;
        try {
            const request = await fetch(`${this.state.apiUrl}/Admin/Register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    firstName,
                    lastName,
                    password,
                }),
            });

            if (!request.ok) {
                const error = await request.json();
                throw Error(error.message);
            }

            const data = await request.json();

            this.setState({
                showSuccessMessage: true,
                successMessage: data.message,
                patientId: data.newApplicationUser.id,
            });
            localStorage.setItem(
                "registeredPatient",
                JSON.stringify(data.authenticatedUser)
            );
        } catch (err) {
            console.log(err.message);
            this.setState({ showErrorMessage: true, errorMessage: err.message });
        }
    }

    displayError() {
        if (this.state.showErrorMessage) {
            return (
                <div className="alert alert-danger with-after-icon" role="alert">
                    <div className="alert-content">{this.state.errorMessage}</div>
                    <div className="alert-icon">
                        <i className="icofont-alarm" />
                    </div>
                </div>
            );
        }
    }

    displaySuccess() {
        if (this.state.showSuccessMessage) {
            return (
                <div className="alert alert-info with-after-icon" role="alert">
                    <div className="alert-content text-center">
                        {this.state.successMessage}.
                        <p className="mb-0 ">
                            Would you like to update his profile?
                            <Link
                                to={`/adminupdatepatientprofile/${this.state.patientId}`}
                                className="btn btn-outline-light"
                            >
                                <span className="btn-icon icon icofont-ui-edit mr-2"></span>Update
                                Profile
                            </Link>
                        </p>
                    </div>
                    <div className="alert-icon">
                        <i className="icon icofont-ui-check" />
                    </div>
                </div>
            )
        };
    }

    handleSubmit(e) {
        e.preventDefault();

    }

    selectHealthPlan(val) {
        console.log(val)
        this.props.history.push("/AdminSelectHealthPlan/" + val);
    }

    render() {
        const {
            email,
            firstName,
            lastName,
            healthPlan
        } = this.state;

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
                                    {/* <Success /> */}
                                    <div className="card border-light">
                                        <div className="card-body">
                                            <form onSubmit={this.handleSubmit}>
                                                <h4 className="text-center">Register new patient</h4>
                                                <div className="form-group">
                                                    <label>First Name</label>
                                                    <input
                                                        className="form-control"
                                                        value={firstName}
                                                        onChange={(e) => this.handleChange("firstName", e)}
                                                        type="text"
                                                        placeholder="First Name"
                                                        required
                                                    />
                                                    <div className="valid-feedback">Looks good!</div>
                                                    <div className="invalid-feedback">Please provide a valid name.</div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Last Name</label>
                                                    <input
                                                        className="form-control"
                                                        value={lastName}
                                                        onChange={(e) => this.handleChange("lastName", e)}
                                                        type="text"
                                                        required
                                                        placeholder="Last Name"
                                                    />
                                                    <div className="valid-feedback">Looks good!</div>
                                                    <div className="invalid-feedback">Please provide a valid name.</div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Email Address</label>
                                                    <input
                                                        className="form-control"
                                                        value={email}
                                                        onChange={(e) => this.handleChange("email", e)}
                                                        type="email"
                                                        required
                                                        placeholder="Email"
                                                    />
                                                    <div className="valid-feedback">Looks good!</div>
                                                    <div className="invalid-feedback">Please provide a valid name.</div>
                                                </div>

                                                <div className="form-group mb-5">

                                                    <label>Health Plan</label>
                                                    <select
                                                        className="selectpicker"
                                                        title="Health Plan"
                                                        value={healthPlan}
                                                        required
                                                        onChange={(e) => this.handleChange("healthPlan", e)}
                                                    >
                                                        <option value="" selected="true" disabled>
                                                            Health Plan
                                                                </option>
                                                        <option value="basic">Basic</option>
                                                        <option value="family" >Family</option>
                                                        <option value="hmo" >HMO</option>
                                                    </select>
                                                    <div className="valid-feedback">Looks good!</div>
                                                    <div className="invalid-feedback">Please provide a valid name.</div>
                                                </div>

                                                <div className="actions justify-content-between d-flex">
                                                    <button
                                                        type="button"
                                                        className="btn btn-error"
                                                        data-dismiss="modal"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        onClick={(e) => this.registerPatient(e)}
                                                        disabled={
                                                            false
                                                            // email === "" ||
                                                            //     firstName === "" ||
                                                            //     lastName === ""
                                                            //     ? true
                                                            //     : false
                                                        }
                                                    >
                                                        Register Patient
                                                    </button>
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
        );
    }
}
