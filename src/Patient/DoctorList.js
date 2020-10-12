import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../Partials/Patient/Header';
import Sidebar from '../Partials/Patient/Sidebar';
import Footer from '../Partials/Footer'
import TemplateSettings from "../Partials/TemplateSettings";
import DoctorSearch from "../Partials/Patient/SearchDoctors";
import PageLoader from '../Partials/PageLoader'

class DoctorList extends React.Component {

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
                        <main className="main-content">
                            <div className="app-loader"><i className="icofont-spinner-alt-4 rotate" /></div>
                            <div className="main-content-wrap">
                                <header className="page-header">
                                    <h4 className="page-title">Doctors</h4>
                                </header>
                                <div className="page-content">
                                    <div className="row">
                                        <div className="col-12 col-md-4">
                                            <div className="contact">
                                                <div className="img-box"><img src="./assets/content/doctor-400-1.jpg" width={400} height={400} alt /></div>
                                                <div className="info-box">
                                                    <h4 className="name">Dr. Sophie</h4>
                                                    <p className="role">Gynecologist</p>
                                                    <div className="custom-control custom-switch mb-3">
                                                        <input type="checkbox" className="custom-control-input" defaultChecked="checked" />
                                                        <label className="custom-control-label">Avalible for Consultation</label>
                                                    </div>
                                                    <p className="address">795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>
                                                    <div className="button-box">
                                                      
                                                        <Link onClick={() => window.location.href = '/PatientDoctorProfile'} className="btn btn-primary mr-2" to="/PatientDoctorProfile">
                                                            <span className="link-icon icofont-doctor" />
                                                            <span className="link-text">View profile</span>
                                                        </Link>
                                    
                                                        <Link onClick={() => window.location.href = '/PatientBookConsultation'} className="btn btn-info" to="/PatientBookConsultation">
                                                            <span className="link-icon icofont-doctor" />
                                                            <span className="link-text">Book Consultation</span>
                                                        </Link>
                                    
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="contact">
                                                <div className="img-box"><img src="./assets/content/doctor-400-2.jpg" width={400} height={400} alt /></div>
                                                <div className="info-box">
                                                    <h4 className="name">Dr. Liam</h4>
                                                    <p className="role">Dentist</p>
                                                    <div className="custom-control custom-switch mb-3">
                                                        <input type="checkbox" className="custom-control-input" defaultChecked="checked" />
                                                        <label className="custom-control-label">Avalible for Consultation</label>
                                                    </div>
                                                    <p className="address">795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>
                                                    <div className="button-box">
                                                        <a href="doctor.html" className="btn btn-primary mr-2">View profile</a> 
                                                        <a href="doctor.html" className="btn btn-info">Book Consultation</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="contact">
                                                <div className="img-box"><img src="./assets/content/doctor-400-3.jpg" width={400} height={400} alt /></div>
                                                <div className="info-box">
                                                    <h4 className="name">Dr. Noah</h4>
                                                    <p className="role">Nursing</p>
                                                    <div className="custom-control custom-switch mb-3">
                                                        <input type="checkbox" className="custom-control-input" defaultChecked="checked" />
                                                        <label className="custom-control-label">Avalible for Consultation</label>
                                                    </div>
                                                    <p className="address">795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>
                                                    <div className="button-box">
                                                        <a href="doctor.html" className="btn btn-primary mr-2">View profile</a> 
                                                        <a href="doctor.html" className="btn btn-info">Book Consultation</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="contact">
                                                <div className="img-box"><img src="./assets/content/doctor-400-4.jpg" width={400} height={400} alt /></div>
                                                <div className="info-box">
                                                    <h4 className="name">Dr. Emma</h4>
                                                    <p className="role">Audiology</p>
                                                    <div className="custom-control custom-switch mb-3">
                                                        <input type="checkbox" className="custom-control-input" defaultChecked="checked" />
                                                        <label className="custom-control-label">Avalible for Consultation</label>
                                                    </div>
                                                    <p className="address">795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>
                                                    <div className="button-box">
                                                        <a href="doctor.html" className="btn btn-primary mr-2">View profile</a> 
                                                        <a href="doctor.html" className="btn btn-info">Book Consultation</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="contact">
                                                <div className="img-box"><img src="./assets/content/doctor-400-5.jpg" width={400} height={400} alt /></div>
                                                <div className="info-box">
                                                    <h4 className="name">Dr. James</h4>
                                                    <p className="role">Physical Therapy</p>
                                                    <div className="custom-control custom-switch mb-3">
                                                        <input type="checkbox" className="custom-control-input" defaultChecked="checked" />
                                                        <label className="custom-control-label">Avalible for Consultation</label>
                                                    </div>
                                                    <p className="address">795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>
                                                    <div className="button-box">
                                                        <a href="doctor.html" className="btn btn-primary mr-2">View profile</a> 
                                                        <a href="doctor.html" className="btn btn-info">Book Consultation</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <div className="contact">
                                                <div className="img-box"><img src="./assets/content/doctor-400-6.jpg" width={400} height={400} alt /></div>
                                                <div className="info-box">
                                                    <h4 className="name">Dr. Olivia</h4>
                                                    <p className="role">Dentist</p>
                                                    <div className="custom-control custom-switch mb-3">
                                                        <input type="checkbox" className="custom-control-input" defaultChecked="checked" />
                                                        <label className="custom-control-label">Avalible for Consultation</label>
                                                    </div>
                                                    <p className="address">795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</p>
                                                    <div className="button-box">
                                                        <a href="doctor.html" className="btn btn-primary mr-2">View profile</a> 
                                                        <a href="doctor.html" className="btn btn-info">Book Consultation</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                     </div>
                                    <div className="add-action-box"><button className="btn btn-dark btn-lg btn-square rounded-pill" data-toggle="modal" data-target="#add-doctor"><span className="btn-icon icofont-contact-add" /></button></div>
                                </div>
                            </div>
                        </main>




                        

                        {/* Footer */}
                        <Footer />
                    </div>
                </div>
               
                <TemplateSettings />
                <DoctorSearch/>

            </>


        )
    }
}

export default DoctorList;