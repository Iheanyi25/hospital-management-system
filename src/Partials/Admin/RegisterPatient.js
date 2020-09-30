import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class RegisterPatient extends React.Component {

    constructor(props) {
		super(props);

		this.state = {
            apiUrl: process.env.REACT_APP_API_URL,

            email: "",
			firstName: "",
            lastName: "",
            password: "Patient101@",
            roleName: "",
            healthPlan:"",
                      
			showErrorMessage: false,
			showSuccessMessage: false
		};

		this.registerPatient = this.registerPatient.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

    handleChange(name, e) {
        const value = e.target.value;
        console.log(value)
		this.setState({
			[name]: value
		});
	}

	async registerPatient(e) {

        e.preventDefault();
        
		const { email,firstName,lastName,password, roleName } = this.state;
		const url = this.state.apiUrl;

		try {
			const request = await fetch(`${url}/Admin/Register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
                    email,
                    firstName,
                    lastName,
                    password,
                    roleName
				})
			});

			if (!request.ok) {
				const error = await request.json();
				throw Error(error.message);
			}

            const data = await request.json();
            console.log(data)
            this.setState({ showSuccessMessage: true, successMessage: data.message });
			localStorage.setItem("registeredPatient", JSON.stringify(data.authenticatedUser));

		} catch (err) {
			console.log(err.message)
			this.setState({ showErrorMessage: true, errorMessage: err.message });
		}
	}

    render() {

        const { email,firstName,lastName,password, roleName } = this.state;
        var displayError
        var displaySuccess

		if (this.state.showErrorMessage) {
			displayError =
				<div className="alert alert-danger with-after-icon" role="alert">
					<div className="alert-content">{this.state.errorMessage}</div>
					<div className="alert-icon"><i className="icofont-alarm" /></div>
				</div>;
        }
       

		if (this.state.showSuccessMessage) {
			displaySuccess =
				<div className="alert alert-info with-after-icon" role="alert">
					<div className="alert-content text-center">
                        {this.state.successMessage}.
                        <p class="mb-0 ">Would you like to update his profile?
                          <Link class="btn btn-outline-light"><span class="btn-icon icon icofont-ui-edit mr-2"></span>Update Profile</Link>
                        </p>
                    </div>
					<div className="alert-icon"><i className="icon icofont-ui-check" /></div>
				</div>
        }
        
        return (

            <>
              {/* Add patients modals */}
              <div className="modal fade" id="add-patient" tabIndex={-1} role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Register a new patient</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    
                                    <div className="form-group">
                                        <input className="form-control" value={this.state.firstName} onChange={(e) => this.handleChange("firstName", e)} type="text" placeholder="First Name" />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" value={this.state.lastName} onChange={(e) => this.handleChange("lastName", e)}  type="text" placeholder="Last Name" />
                                        
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" value={this.state.email} onChange={(e) => this.handleChange("email", e)} type="email" placeholder="Email" />
                                    </div>
                                   
                                    <div className="row">
                                       
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>User Type</label>
                                                <select className="selectpicker" title="Gender" value={this.state.roleName} onChange={(e) => this.handleChange("roleName", e)}>
                                                    <option value=" " selected="true" disabled  >Register As</option>
                                                    <option value="patient"  >Patient</option>
                                                
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group">
                                                <label>Health Plan</label>
                                                <select className="selectpicker" title="Health Plan" value={this.state.healthPlan} onChange={(e) => this.handleChange("healthPlan", e)} >
                                                    
                                                    <option value="" selected="true" disabled >Health Plan</option>
                                                    <option value="basic"  >Basic</option>
                                                    <option value="family"  >Family</option>
                                                    <option value="hmo"  >HMO</option>
                                                
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {displayError}
                                    {displaySuccess}
                                   
                                </form>
                            </div>
                           
                            <div className="modal-footer d-block">
                                <div className="actions justify-content-between">
                                    <button type="button" className="btn btn-error" data-dismiss="modal">Cancel</button> 
                                    <button type="button" className="btn btn-info"

                                    onClick={(e) => this.registerPatient(e)}
                                    disabled={
                                        email === "" || firstName === "" || lastName === "" || roleName === ""
                                            ? true
                                            : false
                                    }
                                    >Register Patient</button></div>
                            </div>
                        </div>
                    </div>
              </div>
             {/* end Add patients modals */}
               
               
            </>

        )
    }

}

export default RegisterPatient