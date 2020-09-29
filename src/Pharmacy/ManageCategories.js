import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../Partials/Pharmacy/Header';
import Sidebar from '../Partials/Pharmacy/Sidebar';
import PageLoader from '../Partials/PageLoader'

class ManageCategories extends React.Component {

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
                                    <h2 className="page-title">Manage Drug Categories</h2>
                                </header>
                                <div className="page-content">
                                    <div className="card mb-0">
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Photo</th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Email</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Visit time</th>
                                                            <th scope="col">Number</th>
                                                            <th scope="col">Doctor</th>
                                                            <th scope="col">Injury / Condition</th>
                                                            <th scope="col">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><img src="./assets/content/user-40-1.jpg" alt width={40} height={40} className="rounded-500" /></td>
                                                            <td><strong>Liam</strong></td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-email p-0 mr-2" /> liam@gmail.com
                    </div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">10 Feb 2018</div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">9:15 - 9:45</div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-cell-phone p-0 mr-2" /> 0126595743
                    </div>
                                                            </td>
                                                            <td>Dr. Benjamin</td>
                                                            <td>mumps</td>
                                                            <td>
                                                                <div className="actions"><button className="btn btn-info btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-edit" /></button>
                                                                    <button className="btn btn-error btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-delete" /></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><img src="./assets/content/user-40-2.jpg" alt width={40} height={40} className="rounded-500" /></td>
                                                            <td><strong>Emma</strong></td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-email p-0 mr-2" /> emma@gmail.com
                    </div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">5 Dec 2018</div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">9:00 - 9:30</div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-cell-phone p-0 mr-2" /> 0126595743
                    </div>
                                                            </td>
                                                            <td>Dr. Liam</td>
                                                            <td>arthritis</td>
                                                            <td>
                                                                <div className="actions"><button className="btn btn-info btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-edit" /></button>
                                                                    <button className="btn btn-error btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-delete" /></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><img src="./assets/content/user-40-3.jpg" alt width={40} height={40} className="rounded-500" /></td>
                                                            <td><strong>Olivia</strong></td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-email p-0 mr-2" /> olivia@gmail.com
                    </div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">13 Oct 2018</div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">12:00 - 12:45</div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-cell-phone p-0 mr-2" /> 0126595743
                    </div>
                                                            </td>
                                                            <td>Dr. Noah</td>
                                                            <td>depression</td>
                                                            <td>
                                                                <div className="actions"><button className="btn btn-info btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-edit" /></button>
                                                                    <button className="btn btn-error btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-delete" /></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><img src="./assets/content/user-40-4.jpg" alt width={40} height={40} className="rounded-500" /></td>
                                                            <td><strong>Ava</strong></td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-email p-0 mr-2" /> ava@gmail.com
                    </div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">26 Dec 2018</div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">14:15 - 14:30</div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-cell-phone p-0 mr-2" /> 0126595743
                    </div>
                                                            </td>
                                                            <td>Dr. Emma</td>
                                                            <td>diarrhoea</td>
                                                            <td>
                                                                <div className="actions"><button className="btn btn-info btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-edit" /></button>
                                                                    <button className="btn btn-error btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-delete" /></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><img src="./assets/content/user-40-5.jpg" alt width={40} height={40} className="rounded-500" /></td>
                                                            <td><strong>Noah</strong></td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-email p-0 mr-2" /> noah@gmail.co
                    </div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">15 Jun 2018</div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">17:30 - 18:00</div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-cell-phone p-0 mr-2" /> 0126595743
                    </div>
                                                            </td>
                                                            <td>Dr. James</td>
                                                            <td>dyslexia</td>
                                                            <td>
                                                                <div className="actions"><button className="btn btn-info btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-edit" /></button>
                                                                    <button className="btn btn-error btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-delete" /></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><img src="./assets/content/user-40-6.jpg" alt width={40} height={40} className="rounded-500" /></td>
                                                            <td><strong>Isabella</strong></td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-email p-0 mr-2" /> isabella@gmail.com
                    </div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">2 Jul 2018</div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">10:00 - 10:15</div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-cell-phone p-0 mr-2" /> 0126595743
                    </div>
                                                            </td>
                                                            <td>Dr. Noah</td>
                                                            <td>flu</td>
                                                            <td>
                                                                <div className="actions"><button className="btn btn-info btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-edit" /></button>
                                                                    <button className="btn btn-error btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-delete" /></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><img src="./assets/content/user-40-7.jpg" alt width={40} height={40} className="rounded-500" /></td>
                                                            <td><strong>Sophia</strong></td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-email p-0 mr-2" /> sophia@gmail.com
                    </div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">9 Oct 2018</div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">8:30 - 8:45</div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-cell-phone p-0 mr-2" /> 0126595743
                    </div>
                                                            </td>
                                                            <td>Dr. Olivia</td>
                                                            <td>fracture</td>
                                                            <td>
                                                                <div className="actions"><button className="btn btn-info btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-edit" /></button>
                                                                    <button className="btn btn-error btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-delete" /></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><img src="./assets/content/user-40-8.jpg" alt width={40} height={40} className="rounded-500" /></td>
                                                            <td><strong>Mia</strong></td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-email p-0 mr-2" /> mia000@gmail.com
                    </div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">17 Mar 2018</div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">11:30 - 11:40</div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-cell-phone p-0 mr-2" /> 0126595743
                    </div>
                                                            </td>
                                                            <td>Dr. Emma</td>
                                                            <td>hypothermia</td>
                                                            <td>
                                                                <div className="actions"><button className="btn btn-info btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-edit" /></button>
                                                                    <button className="btn btn-error btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-delete" /></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><img src="./assets/content/user-40-9.jpg" alt width={40} height={40} className="rounded-500" /></td>
                                                            <td><strong>William</strong></td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-email p-0 mr-2" /> william@gmail.com
                    </div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">18 Apl 2018</div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">12:15 - 12:45</div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-cell-phone p-0 mr-2" /> 0126595743
                    </div>
                                                            </td>
                                                            <td>Dr. Olivia</td>
                                                            <td>sunburn</td>
                                                            <td>
                                                                <div className="actions"><button className="btn btn-info btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-edit" /></button>
                                                                    <button className="btn btn-error btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-delete" /></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td><img src="./assets/content/user-40-10.jpg" alt width={40} height={40} className="rounded-500" /></td>
                                                            <td><strong>James</strong></td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-email p-0 mr-2" /> james@gmail.com
                    </div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">6 Apl 2018</div>
                                                            </td>
                                                            <td>
                                                                <div className="text-muted text-nowrap">16:00 - 16:20</div>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary"><span className="icofont-ui-cell-phone p-0 mr-2" /> 0126595743
                    </div>
                                                            </td>
                                                            <td>Dr. Logan</td>
                                                            <td>mumps</td>
                                                            <td>
                                                                <div className="actions"><button className="btn btn-info btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-edit" /></button>
                                                                    <button className="btn btn-error btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-delete" /></button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <nav className="mt-4">
                                                <ul className="pagination">
                                                    <li className="page-item disabled"><a className="page-link" href="#" aria-label="Previous" tabIndex={-1} aria-disabled="true"><span className="icofont-simple-left" /></a></li>
                                                    <li className="page-item active" aria-current="page"><a className="page-link" href="#">1</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                    <li className="page-item"><a className="page-link" href="#" aria-label="Next"><span className="icofont-simple-right" /></a></li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="add-action-box"><button className="btn btn-primary btn-lg btn-square rounded-pill" data-toggle="modal" data-target="#add-appointment"><span className="btn-icon icofont-stethoscope-alt" /></button></div>
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

export default ManageCategories;