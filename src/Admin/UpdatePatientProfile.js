import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../Partials/Admin/Header';
import Sidebar from '../Partials/Admin/Sidebar';
import Footer from '../Partials/Footer'
import TemplateSettings from '../Partials/TemplateSettings'
import RegisterPatient from '../Partials/Admin/RegisterPatient'
import PageLoader from '../Partials/PageLoader'

class UpdatePatientProfile extends React.Component {

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
                                    <h3 className="page-title">Update Patient Profile</h3>
                                </header>
                                <div className="page-content">
                                    <div className="row justify-content-center">


                                        <div class="col-md-6">
                                            <div class="card border-light">

                                                <div class="card-body">
                                                    <label>Photo</label>
                                                    <div className="form-group avatar-box d-flex align-items-center">
                                                        <img src="../assets/content/user-400-1.jpg" width={100} height={100} alt className="rounded-500 mr-4" />
                                                        <button className="btn btn-outline-primary" type="button">Change Photo<span className="btn-icon icofont-ui-user ml-2" /></button>
                                                    </div>
                                                    <form>
                                                        <h4>Core Details</h4>
                                                        <div className="row">
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group"><label>First name</label> <input className="form-control" type="text" placeholder="First name" defaultValue="Liam" /></div>

                                                            </div>
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group"><label>Last name</label> <input className="form-control" type="text" placeholder="First name" defaultValue="Liam" /></div>

                                                            </div>
                                                        </div>

                                                        <div className="form-group"><label>Email address</label> <input className="form-control" type="text" placeholder="Last name" defaultValue="Jouns" /></div>

                                                        <div className="row">
                                                            <div className="col"><button type="button" className="btn btn-success">Save Core Details</button></div>
                                                            <div className="col text-right">
                                                                <button type="button" className="btn btn-outline-danger">
                                                                    <span className="d-none d-sm-block">Delete account</span> <span className="d-sm-none">Cancel</span>
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

                                                        <h4>Core Details</h4>
                                                        <div className="row">
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group"><label>First name</label> <input className="form-control" type="text" placeholder="First name" defaultValue="Liam" /></div>

                                                            </div>
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group"><label>Last name</label> <input className="form-control" type="text" placeholder="First name" defaultValue="Liam" /></div>

                                                            </div>
                                                        </div>

                                                        <div className="form-group"><label>Email address</label> <input className="form-control" type="text" placeholder="Last name" defaultValue="Jouns" /></div>

                                                        <div className="row">
                                                            <div className="col"><button type="button" className="btn btn-success">Save Core Details</button></div>
                                                            <div className="col text-right">
                                                                <button type="button" className="btn btn-outline-danger">
                                                                    <span className="d-none d-sm-block">Delete account</span> <span className="d-sm-none">Cancel</span>
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
                                                        <h4>Basic Details</h4>
                                                        <div className="form-group"><label>First name</label> <input className="form-control" type="text" placeholder="First name" defaultValue="Liam" /></div>
                                                        <div className="form-group"><label>Last name</label> <input className="form-control" type="text" placeholder="Last name" defaultValue="Jouns" /></div>
                                                        <div className="row">
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group"><label>Age</label> <input className="form-control" type="number" placeholder="Age" defaultValue={25} /></div>
                                                            </div>
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group"><label>Gender</label>
                                                                    <div className="dropdown bootstrap-select"><select className="selectpicker" title="Gender" tabIndex={-98}>
                                                                        <option className="bs-title-option" value />
                                                                        <option selected="selected">Male</option>
                                                                        <option>Female</option>
                                                                    </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group"><label>Phone number</label> <input className="form-control" type="number" placeholder="Age" defaultValue={"0126596578"} /></div>
                                                        <div className="form-group"><label>Address</label> <textarea className="form-control" placeholder="Address" rows={3} defaultValue={"71 Pilgrim Avenue Chevy Chase, MD 20815"} /></div>
                                                        <div className="form-group"><label>Last visit</label> <input className="form-control" type="text" placeholder="Last visit" defaultValue="18 Dec 2019" readOnly="readonly" /></div>


                                                        <div className="row">
                                                            <div className="col"><button type="button" className="btn btn-success">Save changes</button></div>
                                                            <div className="col text-right"><button type="button" className="btn btn-outline-danger"><span className="d-none d-sm-block">Delete account</span> <span className="d-sm-none">Delete</span></button></div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col col-md-6">
                                            <div class="card border-light">

                                                <div class="card-body border-info">

                                                    <form className="mb-4">
                                                        <h4>Basic Details</h4>
                                                        <div className="form-group"><label>First name</label> <input className="form-control" type="text" placeholder="First name" defaultValue="Liam" /></div>
                                                        <div className="form-group"><label>Last name</label> <input className="form-control" type="text" placeholder="Last name" defaultValue="Jouns" /></div>
                                                        <div className="row">
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group"><label>Age</label> <input className="form-control" type="number" placeholder="Age" defaultValue={25} /></div>
                                                            </div>
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group"><label>Gender</label>
                                                                    <div className="dropdown bootstrap-select"><select className="selectpicker" title="Gender" tabIndex={-98}>
                                                                        <option className="bs-title-option" value />
                                                                        <option selected="selected">Male</option>
                                                                        <option>Female</option>
                                                                    </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group"><label>Phone number</label> <input className="form-control" type="number" placeholder="Age" defaultValue={"0126596578"} /></div>
                                                        <div className="form-group"><label>Address</label> <textarea className="form-control" placeholder="Address" rows={3} defaultValue={"71 Pilgrim Avenue Chevy Chase, MD 20815"} /></div>
                                                        <div className="form-group"><label>Last visit</label> <input className="form-control" type="text" placeholder="Last visit" defaultValue="18 Dec 2019" readOnly="readonly" /></div>


                                                        <div className="row">
                                                            <div className="col"><button type="button" className="btn btn-success">Save changes</button></div>
                                                            <div className="col text-right"><button type="button" className="btn btn-outline-danger"><span className="d-none d-sm-block">Delete account</span> <span className="d-sm-none">Delete</span></button></div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col col-md-6">
                                            <div class="card border-light">

                                                <div class="card-body">

                                                    <form className="mb-4">
                                                        <h4>Basic Details</h4>
                                                        <div className="form-group"><label>First name</label> <input className="form-control" type="text" placeholder="First name" defaultValue="Liam" /></div>
                                                        <div className="form-group"><label>Last name</label> <input className="form-control" type="text" placeholder="Last name" defaultValue="Jouns" /></div>
                                                        <div className="row">
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group"><label>Age</label> <input className="form-control" type="number" placeholder="Age" defaultValue={25} /></div>
                                                            </div>
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group"><label>Gender</label>
                                                                    <div className="dropdown bootstrap-select"><select className="selectpicker" title="Gender" tabIndex={-98}>
                                                                        <option className="bs-title-option" value />
                                                                        <option selected="selected">Male</option>
                                                                        <option>Female</option>
                                                                    </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group"><label>Phone number</label> <input className="form-control" type="number" placeholder="Age" defaultValue={"0126596578"} /></div>
                                                        <div className="form-group"><label>Address</label> <textarea className="form-control" placeholder="Address" rows={3} defaultValue={"71 Pilgrim Avenue Chevy Chase, MD 20815"} /></div>
                                                        <div className="form-group"><label>Last visit</label> <input className="form-control" type="text" placeholder="Last visit" defaultValue="18 Dec 2019" readOnly="readonly" /></div>


                                                        <div className="row">
                                                            <div className="col"><button type="button" className="btn btn-success">Save changes</button></div>
                                                            <div className="col text-right"><button type="button" className="btn btn-outline-danger"><span className="d-none d-sm-block">Delete account</span> <span className="d-sm-none">Delete</span></button></div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col col-md-6">
                                            <div class="card border-light">

                                                <div class="card-body">

                                                    <form className="mb-4">
                                                        <h4>Basic Details</h4>
                                                        <div className="form-group"><label>First name</label> <input className="form-control" type="text" placeholder="First name" defaultValue="Liam" /></div>
                                                        <div className="form-group"><label>Last name</label> <input className="form-control" type="text" placeholder="Last name" defaultValue="Jouns" /></div>
                                                        <div className="row">
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group"><label>Age</label> <input className="form-control" type="number" placeholder="Age" defaultValue={25} /></div>
                                                            </div>
                                                            <div className="col-12 col-sm-6">
                                                                <div className="form-group"><label>Gender</label>
                                                                    <div className="dropdown bootstrap-select"><select className="selectpicker" title="Gender" tabIndex={-98}>
                                                                        <option className="bs-title-option" value />
                                                                        <option selected="selected">Male</option>
                                                                        <option>Female</option>
                                                                    </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form-group"><label>Phone number</label> <input className="form-control" type="number" placeholder="Age" defaultValue={"0126596578"} /></div>
                                                        <div className="form-group"><label>Address</label> <textarea className="form-control" placeholder="Address" rows={3} defaultValue={"71 Pilgrim Avenue Chevy Chase, MD 20815"} /></div>
                                                        <div className="form-group"><label>Last visit</label> <input className="form-control" type="text" placeholder="Last visit" defaultValue="18 Dec 2019" readOnly="readonly" /></div>


                                                        <div className="row">
                                                            <div className="col"><button type="button" className="btn btn-success">Save changes</button></div>
                                                            <div className="col text-right"><button type="button" className="btn btn-outline-danger"><span className="d-none d-sm-block">Delete account</span> <span className="d-sm-none">Delete</span></button></div>
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

export default UpdatePatientProfile;