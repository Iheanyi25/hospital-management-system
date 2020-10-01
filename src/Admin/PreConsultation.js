import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../Partials/Admin/Header';
import Sidebar from '../Partials/Admin/Sidebar';
import Footer from '../Partials/Footer'
import TemplateSettings from '../Partials/TemplateSettings'
import RegisterPatient from '../Partials/Admin/RegisterPatient'
import PageLoader from '../Partials/PageLoader'

class PreConsultation extends React.Component {

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
                                    <h3 className="page-title">Patient Preconsultation</h3>
                                </header>
                                <div className="page-content">
                                    <div className="row justify-content-center">


                                        <div class="col-md-6">
                                            <div class="card border-light">

                                                <div class="card-body">
                                                    
                                                    <form className="mb-4">
                                                        <h4>Patient Vitals</h4>
                                                        <div className="row">
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group"><label>Blood Pressure</label> <input className="form-control" type="text"  /></div>

                                                            </div>
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group"><label>Respiration</label> <input className="form-control" type="text"  /></div>

                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group"><label>Pulse</label> <input className="form-control" type="text"  /></div>

                                                            </div>
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group"><label>SPO2</label> <input className="form-control" type="text"  /></div>

                                                            </div>
                                                        </div>

                                        
                                                        
                                                        <div className="row">
                                                            <div className="col"><button type="button" className="btn btn-success">Save Patient Vitals</button></div>
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
                                        <div className="col col-md-6">
                                            <div class="card border-light">

                                                <div class="card-body">
                                                    <form className="mb-4">

                                                        <h4>Patient BMI</h4>
                                                        <div className="row">
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group"><label>Blood Pressure</label> <input className="form-control" type="text"  /></div>

                                                            </div>
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group"><label>Respiration</label> <input className="form-control" type="text"  /></div>

                                                            </div>
                                                        </div>

                                                        <div className="form-group"><label>Calculated BMI</label> <input className="form-control" type="text" /></div>
                                                       
                                                        <div className="row">
                                                            <div className="col"><button type="button" className="btn btn-success">Save Patient BMI</button></div>
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
                        </main>



                        {/* Footer */}
                        <Footer />
                    </div>
                </div>
                <RegisterPatient />
                <TemplateSettings />

            </>


        )
    }
}

export default PreConsultation;