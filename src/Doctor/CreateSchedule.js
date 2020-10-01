import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../Partials/Doctor/Header';
import Sidebar from '../Partials/Doctor/Sidebar';
import Footer from '../Partials/Footer'
import TemplateSettings from '../Partials/TemplateSettings'
import PageLoader from '../Partials/PageLoader'

class CreateSchedules extends React.Component {

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
                                    <h4 className="page-title">Create Consultation Schedule</h4>
                                </header>
                                <div className="page-content">
                                    <div className="row justify-content-center">
                                        <div className="col col-12 col-xl-8">
                                            <form className="mb-4">
                                                <div className="form-group"><label>First name</label> <input className="form-control" type="text" placeholder="First name" defaultValue="Liam" /></div>
                                                <div className="form-group"><label>Last name</label> <input className="form-control" type="text" placeholder="Last name" defaultValue="Jouns" /></div>
                                                <div className="row">
                                                    <div className="col-12 col-sm-6">
                                                        <div className="form-group"><label>Age</label> <input className="form-control" type="number" placeholder="Age" defaultValue={25} /></div>
                                                    </div>
                                                    <div className="col-12 col-sm-6">
                                                        <div className="form-group"><label>Gender</label> <select className="selectpicker" title="Gender">
                                                            <option selected="selected">Male</option>
                                                            <option>Female</option>
                                                        </select></div>
                                                    </div>
                                                </div>
                                                <div className="form-group"><label>Phone number</label> <input className="form-control" type="number" placeholder="Age" defaultValue={"0126596578"} /></div>
                                                <div className="form-group"><label>Address</label> <textarea className="form-control" placeholder="Address" rows={3} defaultValue={"71 Pilgrim Avenue Chevy Chase, MD 20815"} /></div>
                                                <div className="form-group"><label>Last visit</label> <input className="form-control" type="text" placeholder="Last visit" defaultValue="18 Dec 2019" readOnly="readonly" /></div>
                                                <div className="form-group"><label>Status</label> <select className="selectpicker" title="Status">
                                                    <option selected="selected">Approved</option>
                                                    <option>Pending</option>
                                                </select></div>
                                                <div className="row">
                                                    <div className="col"><button type="button" className="btn btn-success">Save
                                                         Schedule</button></div>
                                                    <div className="col text-right"><button type="button" className="btn btn-outline-danger"><span className="d-none d-sm-block">Clear
                                                    </span> <span className="d-sm-none">Clear</span></button></div>
                                                </div>
                                            </form>
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

export default CreateSchedules;