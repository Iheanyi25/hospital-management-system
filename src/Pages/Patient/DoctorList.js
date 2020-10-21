import React from 'react'
import { Link } from "react-router-dom";
import { Footer, PageLoader, PatientHeader, PatientSidebar, SearchDoctorsModal, TemplateSettings } from '../../Components';
// import Header from '../../Components/Header/PatientHeader';
// import Sidebar from '../../Components/Sidebar/PatientSidebar';
// import Footer from '../../Components/Footer'
// import TemplateSettings from "../../Components/TemplateSettings";
// import DoctorSearch from "../../Components/Modals/SearchDoctors";
// import PageLoader from '../../Components/Loader/PageLoader'

class DoctorList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            doctors: [],
            apiUrl: process.env.REACT_APP_API_URL,
        };
    }


    async getAllDoctors() {
        const data = await (await fetch(`${this.state.apiUrl}/Patient/GetDoctors`)).json()
        this.setState({ doctors: data.doctors });
    }

    componentDidMount() {
        this.getAllDoctors();
    }


    render() {

        return (

            <>

                <PageLoader />
                <div className="page-box">
                    <div className="app-container">
                        {/* Horizontal navbar---Header */}
                        <PatientHeader />

                        {/* Vertical navbar */}
                        <PatientSidebar />
                        <main className="main-content">
                            <div className="app-loader"><i className="icofont-spinner-alt-4 rotate" /></div>
                            <div className="main-content-wrap">
                                <header className="page-header">
                                    <h4 className="page-title">Doctors</h4>
                                </header>
                                <div className="page-content">
                                    <div className="row">
                                        {this.state.doctors.map((doctor) => (
                                            <div className="col-12 col-md-4">
                                                <div className="contact">
                                                    <div className="img-box"><img src="./assets/content/doctor-400-1.jpg" width={400} height={400} alt="Hello" /></div>
                                                    <div className="info-box">
                                                        <h4 className="name">Dr. {doctor.applicationUser.firstName} {doctor.applicationUser.lastName}</h4>
                                                        <p className="role">{doctor.doctorProfile.specialization}</p>
                                                        <div className="custom-control custom-switch mb-3">
                                                            <input type="checkbox" className="custom-control-input" defaultChecked={doctor.doctorProfile.isAvaliable ? 'checked' : ' '} />
                                                            <label className="custom-control-label">Avalible for Consultation</label>
                                                        </div>
                                                        <p className="address">{doctor.doctorProfile.about}</p>
                                                        <div className="button-box">

                                                            <Link onClick={() => window.location.href = `/PatientDoctorProfile/${doctor.applicationUser.id}`} className="btn btn-primary mr-2" to={`/PatientDoctorProfile/${doctor.applicationUser.id}`}>
                                                                <span className="link-icon icofont-doctor" />
                                                                <span className="link-text">View profile</span>
                                                            </Link>

                                                            <Link onClick={() => window.location.href = `/PatientBookConsultation/${doctor.applicationUser.id}`} className="btn btn-info" to={`/PatientBookConsultation/${doctor.applicationUser.id}`}>
                                                                <span className="link-icon icofont-doctor" />
                                                                <span className="link-text">Book Consultation</span>
                                                            </Link>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                        ))}

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
                <SearchDoctorsModal />

            </>


        )
    }
}

export default DoctorList;