import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../Partials/Pharmacy/Header';
import Sidebar from '../Partials/Pharmacy/Sidebar';
import PageLoader from '../Partials/PageLoader'

class CreateSubCategories extends React.Component {

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
                                <header className="page-header mt-5">
                                    <h2 className="page-title">Create Drug SubCategory</h2>
                                </header>

                                <div className="page-content ">
                                    <div className="row justify-content-center">
                                        <div className="col col-12 col-xl-8">
                                            <form className="mb-4 mt-4">

                                                <div className="form-group">
                                                    <label>Category Name</label>
                                                    <input className="form-control" type="text" placeholder="First name" defaultValue="Liam" />
                                                </div>

                                                <div class="form-group"><label>Attach to a Category</label>
                                                    <div class="dropdown bootstrap-select">
                                                        <select class="selectpicker" title="Status" tabindex="-98">
                                                            <option class="bs-title-option" value=""></option>
                                                            <option selected="selected">Approved</option>
                                                            <option>Pending</option>
                                                        </select>

                                                     
                                                    </div>
                                                </div>


                                                <div class="form-group">
                                                    <label>Description</label>
                                                    <textarea class="form-control" rows="5" placeholder="Placeholder">Enter Category Description</textarea>
                                                </div>


                                                <div className="row">
                                                    <div className="col"><button type="button" className="btn btn-success">Save Category</button></div>
                                                    <div className="col text-right"><button type="button" className="btn btn-outline-danger"><span className="d-none d-sm-block">Clear</span> <span className="d-sm-none">Delete</span></button></div>
                                                </div>
                                            </form>
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </main>
                        <div className="app-footer">
                            <div className="footer-wrap">
                                <div className="row h-100 align-items-center">
                                    <div className="col-12 col-md-6 d-none d-md-block">
                                        <ul className="page-breadcrumbs">
                                            <li className="item"><a href="#" className="link">Dashboards</a> <i className="separator icofont-thin-right" /></li>
                                            <li className="item"><a href="#" className="link">Default</a> <i className="separator icofont-thin-right" /></li>
                                        </ul>
                                    </div>
                                    <div className="col-12 col-md-6 text-right">
                                        <div className="d-flex align-items-center justify-content-center justify-content-md-end">
                                            <span>Version 1.0.0</span> <button className="no-style ml-2 settings-btn" data-toggle="modal" data-target="#settings"><span className="icon icofont-ui-settings text-primary" /></button></div>
                                    </div>
                                </div>
                                <div className="footer-skeleton">
                                    <div className="row align-items-center">
                                        <div className="col-12 col-md-6 d-none d-md-block">
                                            <ul className="page-breadcrumbs">
                                                <li className="item bg-1 animated-bg" />
                                                <li className="item bg animated-bg" />
                                            </ul>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="info justify-content-center justify-content-md-end">
                                                <div className="version bg animated-bg" />
                                                <div className="settings animated-bg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content-overlay" />
                    </div>
                </div>{/* Add patients modals */}
                <div className="modal fade" id="add-patient" tabIndex={-1} role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add new patient</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group avatar-box d-flex"><img src="./assets/content/anonymous-400.jpg" width={40} height={40} className="rounded-500 mr-4" /> <button className="btn btn-outline-primary" type="button">Select image<span className="btn-icon icofont-ui-user ml-2" /></button></div>
                                    <div className="form-group"><input className="form-control" type="text" placeholder="Name" /></div>
                                    <div className="form-group"><input className="form-control" type="number" placeholder="Number" /></div>
                                    <div className="row">
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group"><input className="form-control" type="number" placeholder="Age" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="form-group"><select className="selectpicker" title="Gender">
                                                <option className="d-none">Gender</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                            </select></div>
                                        </div>
                                    </div>
                                    <div className="form-group mb-0"><textarea className="form-control" placeholder="Address" rows={3} defaultValue={""} /></div>
                                </form>
                            </div>
                            <div className="modal-footer d-block">
                                <div className="actions justify-content-between"><button type="button" className="btn btn-error" data-dismiss="modal">Cancel</button> <button type="button" className="btn btn-info">Add
              patient</button></div>
                            </div>
                        </div>
                    </div>
                </div>{/* end Add patients modals */}
                {/* Add patients modals */}
                <div className="modal fade" id="settings" tabIndex={-1} role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Application's settings</h5>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group"><label>Layout</label> <select className="selectpicker" title="Layout" id="layout">
                                        <option value="horizontal-layout">Horizontal</option>
                                        <option value="vertical-layout">Vertical</option>
                                    </select></div>
                                    <div className="form-group"><label>Light/dark topbar</label>
                                        <div className="custom-control custom-switch"><input type="checkbox" className="custom-control-input" id="topbar" /> <label className="custom-control-label" htmlFor="topbar" /></div>
                                    </div>
                                    <div className="form-group"><label>Light/dark sidebar</label>
                                        <div className="custom-control custom-switch"><input type="checkbox" className="custom-control-input" id="sidebar" /> <label className="custom-control-label" htmlFor="sidebar" /></div>
                                    </div>
                                    <div className="form-group mb-0"><label>Boxed/fullwidth mode</label>
                                        <div className="custom-control custom-switch"><input type="checkbox" className="custom-control-input" id="boxed" defaultChecked="checked" /> <label className="custom-control-label" htmlFor="boxed" /></div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer d-block">
                                <div className="actions justify-content-between"><button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button> <button id="reset-to-default" type="button" className="btn btn-error">Reset to default</button></div>
                            </div>
                        </div>
                    </div>
                </div>{/* end Add patients modals */}
            </>


        )
    }
}

export default CreateSubCategories;