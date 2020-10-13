import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "../Partials/Patient/Header";
import Sidebar from "../Partials/Patient/Sidebar";
import Footer from "../Partials/Footer";
import TemplateSettings from "../Partials/TemplateSettings";
import PageLoader from "../Partials/PageLoader";

class BookAppointment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            apiUrl: process.env.REACT_APP_API_URL,
            patientId: "",

            bloodGroup: "",
            genoType: "",
            diabetic: false,
            allergies: "",
            disabilities: "",
        };
    }

    async componentDidMount() {
        const { apiUrl } = this.state;
        const { params } = this.props.match;
        await this.setState({ patientId: params.id });
        const response = await fetch(
            `${apiUrl}/Admin/GetPatient?id=${this.state.patientId}`
        );
        const data = await response.json();



    }

    handleChange(name, e) {
        const value = e.target.value;
        this.setState({
            [name]: value,
        });
    }



    render() {
      
        return (
            <>
                <PageLoader />
                <div className="page-box">
                    <div className="app-container">
                        {/* Horizontal navbar---Header */}
                        <Header></Header>

                        {/* Vertical navbar */}
                        <Sidebar></Sidebar>

                       
                            <main className="main-content">
                                <div className="app-loader">
                                    <i className="icofont-spinner-alt-4 rotate" />
                                </div>
                                <div className="main-content-wrap">
                                    <header className="page-header">
                                        <h3 className="page-title">Book Appointment With Dr. Okom</h3>
                                    </header>
                                    <div className="page-content">
                                        <div className="row justify-content-center">
                                            <div className="col col-md-12">
                                                <div class="card border-light">
                                                    <div class="card-body">
                                                        <form className="mb-4">
                                                            <h4>Appointment Form</h4>
                                                            <div className="row">
                                                                <div className="col-12 col-sm-6">
                                                                    <div className="form-group">
                                                                        <label>Appointment Date</label>

                                                                        <input
                                                                            className="form-control"
                                                                            title="diabetic"
                                                                            tabIndex={-98}
                                                                            
                                                                        
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-sm-6">
                                                                    <div className="form-group">
                                                                        <label>Appointment Time</label>

                                                                        <input
                                                                            className="form-control"
                                                                            title="diabetic"
                                                                            tabIndex={-98}
                                                                            
                                                                        
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Title of Appointment</label>

                                                                <input
                                                                    className="form-control"
                                                                    title="diabetic"
                                                                    tabIndex={-98}
                                                                    
                                                                   
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Reason for Appointment</label>{" "}
                                                                <textarea
                                                                    className="form-control"
                                                                    placeholder="Address"
                                                                    rows={3}
                                                                    placeholder={"Enter Patient Allergies"}
                                                                    
                                                                    
                                                                />
                                                            </div>
                                                            <div className="row">
                                                                <div className="col">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-success"
                                                                        
                                                                    >
                                                                        Book Appointment
                                                                     </button>
                                                                </div>
                                                                <div className="col text-right">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-outline-danger"
                                                                    >
                                                                        <span className="d-none d-sm-block">
                                                                            Cancel
                                                                         </span>{" "}
                                                                        <span className="d-sm-none">Cancel</span>
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
                        
                        {/* Footer */}
                        <Footer />
                    </div>
                </div>
                <TemplateSettings />
            </>
        );
    }
}

export default BookAppointment;
