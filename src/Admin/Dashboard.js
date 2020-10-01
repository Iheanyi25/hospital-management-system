import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../Partials/Admin/Header';
import Sidebar from '../Partials/Admin/Sidebar';
import RegisterPatient from '../Partials/Admin/RegisterPatient'
import TemplateSettings from '../Partials/TemplateSettings'
import PageLoader from '../Partials/PageLoader'

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };

    }

    render() {

        return (

            <>
                
                <PageLoader/>
                <div className="page-box">
                    <div className="app-container">
                        {/* Horizontal navbar---Header */}
                        <Header></Header>
                       
                        {/* Vertical navbar */}
                        <Sidebar></Sidebar>
                       
                        <main className="main-content">
                            <div className="app-loader"><i className="icofont-spinner-alt-4 rotate" /></div>
                            <div className="main-content-wrap">
                                <div className="page-content">
                                    <div className="row">
                                        <div className="col col-12 col-md-6 col-xl-3">
                                            <div className="card animated fadeInUp delay-01s bg-light">
                                                <div className="card-body">
                                                    <div className="row align-items-center">
                                                        <div className="col col-5">
                                                            <div className="icon p-0 fs-48 text-primary opacity-50 icofont-doctor">
                                                            </div>
                                                        </div>
                                                        <div className="col col-7">
                                                            <h6 className="mt-0 mb-1">My Doctors</h6>
                                                            <div className="count text-primary fs-20">213</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col col-12 col-md-6 col-xl-3">
                                            <div className="card animated fadeInUp delay-02s bg-light">
                                                <div className="card-body">
                                                    <div className="row align-items-center">
                                                        <div className="col col-5">
                                                            <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair">
                                                            </div>
                                                        </div>
                                                        <div className="col col-7">
                                                            <h6 className="mt-0 mb-1">My patients</h6>
                                                            <div className="count text-primary fs-20">104</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col col-12 col-md-6 col-xl-3">
                                            <div className="card animated fadeInUp delay-03s bg-light">
                                                <div className="card-body">
                                                    <div className="row align-items-center">
                                                        <div className="col col-5">
                                                            <div className="icon p-0 fs-48 text-primary opacity-50 icofont-clip-board" />
                                                        </div>
                                                        <div className="col col-7">
                                                            <h6 className="mt-0 mb-1">Appointments</h6>
                                                            <div className="count text-primary fs-20">24</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col col-12 col-md-6 col-xl-3">
                                            <div className="card animated fadeInUp delay-04s bg-light">
                                                <div className="card-body">
                                                    <div className="row align-items-center">
                                                        <div className="col col-5">
                                                            <div className="icon p-0 fs-48 text-primary opacity-50 icofont-users">
                                                            </div>
                                                        </div>
                                                        <div className="col col-7">
                                                            <h6 className="mt-0 mb-1 text-nowrap">All Users</h6>
                                                            <div className="count text-primary fs-20">5238</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col col-12 col-md-6 col-xl-6">
                                            <div className="card animated fadeInUp delay-04s bg-light">
                                                <div className="card-body">
                                                    <div className="row align-items-center">
                                                        <div className="col col-5">
                                                            <div className="icon p-0 fs-48 text-primary opacity-50 icofont-search-user">
                                                            </div>
                                                        </div>
                                                        <div className="col col-7">
                                                            <h6 className="mt-0 mb-1 text-nowrap">Total Lab Tests</h6>
                                                            <div className="count text-primary fs-20">5238</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col col-12 col-md-6 col-xl-6">
                                            <div className="card animated fadeInUp delay-04s bg-light">
                                                <div className="card-body">
                                                    <div className="row align-items-center">
                                                        <div className="col col-5">
                                                            <div className="icon p-0 fs-48 text-primary opacity-50 icofont-pills">
                                                            </div>
                                                        </div>
                                                        <div className="col col-7">
                                                            <h6 className="mt-0 mb-1 text-nowrap">Total Drugs</h6>
                                                            <div className="count text-primary fs-20">5238</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col col-md-6">
                                              
                                             <div className="card mb-0">
                                        <div className="card-header">My Appointments</div>
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
                                                            <td><img src="./assets/content/user-40-1.jpg" width={40} height={40} className="rounded-500" /></td>
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
                                                            <td><img src="./assets/content/user-40-2.jpg" width={40} height={40} className="rounded-500" /></td>
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
                                                            <td><img src="./assets/content/user-40-3.jpg" width={40} height={40} className="rounded-500" /></td>
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
                                                            <td><img src="./assets/content/user-40-4.jpg" width={40} height={40} className="rounded-500" /></td>
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
                                                            <td><img src="./assets/content/user-40-5.jpg" width={40} height={40} className="rounded-500" /></td>
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
                                                            <td><img src="./assets/content/user-40-6.jpg" width={40} height={40} className="rounded-500" /></td>
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
                                                            <td><img src="./assets/content/user-40-7.jpg" width={40} height={40} className="rounded-500" /></td>
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
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                        </div>

                                        <div className="col col-md-6">
                                              
                                             <div className="card mb-0">
                                        <div className="card-header">My Doctors Appointments</div>
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
                                                            <td><img src="./assets/content/user-40-1.jpg" width={40} height={40} className="rounded-500" /></td>
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
                                                            <td><img src="./assets/content/user-40-2.jpg" width={40} height={40} className="rounded-500" /></td>
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
                                                            <td><img src="./assets/content/user-40-3.jpg" width={40} height={40} className="rounded-500" /></td>
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
                                                            <td><img src="./assets/content/user-40-4.jpg" width={40} height={40} className="rounded-500" /></td>
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
                                                            <td><img src="./assets/content/user-40-5.jpg" width={40} height={40} className="rounded-500" /></td>
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
                                                            <td><img src="./assets/content/user-40-6.jpg" width={40} height={40} className="rounded-500" /></td>
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
                                                            <td><img src="./assets/content/user-40-7.jpg" width={40} height={40} className="rounded-500" /></td>
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
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

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
                </div>

                {/* Register Patient Component */}
                <RegisterPatient/>
                              
                {/* App Settings modals */}
                <TemplateSettings />

            </>

        
        )
    }
}

export default Dashboard;