import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../Partials/Doctor/Header';
import Sidebar from '../Partials/Doctor/Sidebar';
import Footer from '../Partials/Footer'
import TemplateSettings from '../Partials/TemplateSettings'
import PageLoader from '../Partials/PageLoader'

class Consultation extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };

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

                        <main className="main-content mt-5">
                            <div className="app-loader"><i className="icofont-spinner-alt-4 rotate" /></div>
                            <div className="main-content-wrap">
                                <header className="page-header">
                                    <h3 className="page-title">Doctor Clarking</h3>
                                </header>
                                <div className="page-content">
                                    <div id="accordion">
                                        <div className="card">
                                            <div className="card-header " id="headingOne">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-primary btn-block" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        Capture Patient Health History
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                                <div className="card-body">
                                                    <div className="row justify-content-center mt-5">

                                                        <div className="col-md-6">
                                                            <div class="card border-light">

                                                                <div class="card-body">

                                                                    <form className="mb-4">
                                                                        <h4>Social History</h4>

                                                                        <div className="form-group">
                                                                            <label>Additons like smoking, drinking etc</label>
                                                                            <textarea className="form-control" placeholder="Enter Social History Here" rows={3} />
                                                                        </div>



                                                                        <div className="row">
                                                                            <div className="col"><button type="button" className="btn btn-success">Record Social History</button></div>
                                                                            <div className="col text-right">
                                                                                <button type="button" className="btn btn-outline-danger">
                                                                                    <span className="d-none d-sm-block">Cancel</span> <span className="d-sm-none">Cancel</span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div class="card border-light">

                                                                <div class="card-body">
                                                                    <form className="mb-4">

                                                                        <h4>Family History</h4>

                                                                        <div className="form-group">
                                                                            <label>Heriditory sickness like mental health, blood pressure etc</label>
                                                                            <textarea className="form-control" placeholder="Enter Family History Here" rows={3} />
                                                                        </div>



                                                                        <div className="row">
                                                                            <div className="col"><button type="button" className="btn btn-success">Save Family History</button></div>
                                                                            <div className="col text-right">
                                                                                <button type="button" className="btn btn-outline-danger">
                                                                                    <span className="d-none d-sm-block">Cancel</span> <span className="d-sm-none">Cancel</span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </form>

                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div className="col-md-6">
                                                            <div class="card border-light">

                                                                <div class="card-body">
                                                                    <form className="mb-4">

                                                                        <h4>Medical History</h4>

                                                                        <div className="form-group">
                                                                            <label>Common sickness like Hepitities etc</label>
                                                                            <textarea className="form-control" placeholder="Enter Medical History Here" rows={3} />
                                                                        </div>



                                                                        <div className="row">
                                                                            <div className="col"><button type="button" className="btn btn-success">Save Medical History</button></div>
                                                                            <div className="col text-right">
                                                                                <button type="button" className="btn btn-outline-danger">
                                                                                    <span className="d-none d-sm-block">Cancel</span> <span className="d-sm-none">Cancel</span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </form>

                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div className="col-md-6">
                                                            <div class="card border-light">

                                                                <div class="card-body">
                                                                    <form className="mb-4">

                                                                        <h4>Travel History</h4>
                                                                        <div className="form-group">
                                                                            <label>Last Country Visitedr</label>
                                                                            <input className="form-control" type="text" placeholder="Phone Number" />
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label>Date Visited</label>
                                                                            <input className="form-control" type="text" placeholder="Email Address" />
                                                                        </div>

                                                                        <div className="row">
                                                                            <div className="col"><button type="button" className="btn btn-success">Save Travel History</button></div>
                                                                            <div className="col text-right">
                                                                                <button type="button" className="btn btn-outline-danger">
                                                                                    <span className="d-none d-sm-block">Cancel</span> <span className="d-sm-none">Cancel</span>
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
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingTwo">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-primary btn-block collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                        Capture Patient Personnal Vitals
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                                <div className="card-body">
                                                    <div className="row justify-content-center mt-5">

                                                        <div className="col-md-12">
                                                            <div class="card border-light">

                                                                <div class="card-body">

                                                                    <form className="mb-4">
                                                                        <h4>Patient Vitals</h4>
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label>Presenting Complains</label>
                                                                                    <textarea className="form-control" placeholder="Enter Social History Here" rows={3} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label>History of Presenting Complains</label>
                                                                                    <textarea className="form-control" placeholder="Enter Social History Here" rows={3} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label>Review of System</label>
                                                                                    <textarea className="form-control" placeholder="Enter Social History Here" rows={3} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label>Physical Examination</label>
                                                                                    <textarea className="form-control" placeholder="Enter Social History Here" rows={3} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label>Diagnosis</label>
                                                                                    <textarea className="form-control" placeholder="Enter Social History Here" rows={3} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label>Treatment Plan</label>
                                                                                    <textarea className="form-control" placeholder="Enter Social History Here" rows={3} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label>Obstetrics(For Female Patients Only) </label>
                                                                                    <textarea className="form-control" placeholder="Enter Social History Here" rows={2} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label>Gynecology(For Female Patients Only)</label>
                                                                                    <textarea className="form-control" placeholder="Enter Social History Here" rows={2} />
                                                                                </div>
                                                                            </div>
                                                                        </div>





                                                                        <div className="row">
                                                                            <div className="col"><button type="button" className="btn btn-success">Record Social History</button></div>
                                                                            <div className="col text-right">
                                                                                <button type="button" className="btn btn-outline-danger">
                                                                                    <span className="d-none d-sm-block">Cancel</span> <span className="d-sm-none">Cancel</span>
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
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingThree">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-primary btn-block collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                        Drug Prescriptions
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                            <div className="card-body">
                                                    <div className="row justify-content-center mt-5">

                                                        <div className="col-md-12">
                                                            <div class="card border-light">

                                                                <div class="card-body">

                                                                    <form className="mb-4">
                                                                        <h4>Patient Prescriptions</h4>
                                                                        <div className="row border-primary">
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label>Drug</label> 
                                                                                    <input className="form-control" type="text"  />
                                                                                </div>

                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label>Quantity</label> 
                                                                                    <input className="form-control" type="text"  />
                                                                                </div>

                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label>Dosage</label> 
                                                                                    <input className="form-control" type="text"  />
                                                                                </div>

                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label>Frequency</label> 
                                                                                    <input className="form-control" type="text"  />
                                                                                </div>

                                                                            </div>
                                                                            <div className="col-md-12">
                                                                                <div className="form-group">
                                                                                    <label>Doctor Note</label>
                                                                                    <textarea className="form-control" placeholder="Enter Comments Here" rows={3} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-12 text-right mb-5">
                                                                                <button type="button" className="btn btn-outline-primary ">
                                                                                        <span className="d-none d-sm-block">+</span> <span className="d-sm-none">+</span>
                                                                                </button>
                                                                            </div>
                                                                            
                                                                            
                                                                        
                                                                    
                                                                        </div>





                                                                        <div className="row">
                                                                            <div className="col"><button type="button" className="btn btn-success">Prrescribe Drugs</button></div>
                                                                            <div className="col text-right">
                                                                                <button type="button" className="btn btn-outline-danger">
                                                                                    <span className="d-none d-sm-block">Cancel</span> <span className="d-sm-none">Cancel</span>
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


        )
    }
}

export default Consultation;