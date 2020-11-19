import React from 'react'
import { Link } from "react-router-dom";
import { PageLoader } from '../../Components';


class DoctorList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            doctors: [],
            apiUrl: process.env.REACT_APP_API_URL,
        };
    }


    async getAllDoctors() {
        const data = await (await fetch(`${this.state.apiUrl}/Doctor/GetDoctors`)).json()
        this.setState({ doctors: data.doctors });

    }

    componentDidMount() {
        this.getAllDoctors();
    }


    render() {

        return (

            <>

                <PageLoader />

                <main className="main-content">
                    <div className="app-loader"><i className="icofont-spinner-alt-4 rotate" /></div>
                    <div className="main-content-wrap">
                        <header className="page-header">
                            <h4 className="page-title">Doctors</h4>
                        </header>
                        <div className="page-content">
                            <div className="row">
                                {this.state.doctors.map((doctor, index) => (
                                    <div className="col-12 col-md-4" key={index}>
                                        <div className="contact">
                                            <div className="img-box"><img src="../assets/content/doctor-400-1.jpg" width={400} height={400} alt="Hello" /></div>
                                            <div className="info-box">
                                                <Link className="name text-primary nameLink" to={`/PatientDoctorProfile/${doctor.doctorId}`}>Dr. {doctor.doctor.lastName} {doctor.doctor.firstName}</Link>
                                                <p className="role">{doctor?.specialization || ""}</p>
                                                <div className="custom-control custom-switch mb-3">
                                                    <input type="checkbox" className="custom-control-input" defaultChecked={doctor?.isAvaliable ? 'checked' : ' '} />
                                                    <label className="custom-control-label">Avalible for Consultation</label>
                                                </div>
                                                <p className="address">{doctor?.bio || ""}</p>
                                                <div className="button-box row">
                                                    <Link style={{ fontSize: "0.9em" }} className="btn btn-outline-primary mr-2" to={`/PatientBookAppointment/${doctor.doctorId}`}>
                                                        <span className="link-icon icofont-doctor" />
                                                        <span className="link-text">Book Appointment</span>
                                                    </Link>

                                                    <Link style={{ fontSize: "0.8em" }} className="btn btn-primary" to={`/PatientBookConsultation/${doctor.doctorId}`}>
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

            </>

        )
    }
}

export default DoctorList;