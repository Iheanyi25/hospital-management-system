import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../Partials/Admin/Header';
import Sidebar from '../Partials/Admin/Sidebar';
import Footer from '../Partials/Footer'
import TemplateSettings from '../Partials/TemplateSettings'
import RegisterPatient from '../Partials/Admin/RegisterPatient'
import PageLoader from '../Partials/PageLoader'

class AllPatients extends React.Component {

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
                                    <h4 className="page-title">My patients</h4>
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

                        
            <main className="main-content">
              <div className="app-loader">
                <i className="icofont-spinner-alt-4 rotate" />
              </div>
              <div className="main-content-wrap">
                <header className="page-header">
                  <h4 className="page-title">Manage Drugs</h4>
                </header>
                <div className="page-content">
                  <div className="card-body"></div>
                </div>
                <div className="page-content">
                  <div className="card mb-0">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table class="table data-table" data-columns='[
                        { "data": "name" },
                        { "data": "position" },
                        { "data": "office" },
                        { "data": "age" },
                        { "data": "start-date" },
                        { "data": "salary" }
                      ]' data-paging="true" data-info="true">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Position</th>
                              <th>Office</th>
                              <th>Age</th>
                              <th>Date</th>
                              <th>Salary</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Ogbona</td>
                              <td>Position</td>
                              <td>Office</td>
                              <td>Age</td>
                              <td>Date</td>
                              <td>COminh</td>
                            </tr>
                            <tr>
                              <td>Ogbona</td>
                              <td>Position</td>
                              <td>Office</td>
                              <td>Age</td>
                              <td>Date</td>
                              <td>COminh</td>
                            </tr>
                            <tr>
                              <td>Ogbona</td>
                              <td>Position</td>
                              <td>Office</td>
                              <td>Age</td>
                              <td>Date</td>
                              <td>COminh</td>
                            </tr>
                            <tr>
                              <td>
                                <img
                                  src="./assets/content/user-40-1.jpg"
                                  alt
                                  width={40}
                                  height={40}
                                  className="rounded-500"
                                />
                              </td>
                              <td>
                                <strong>Liam</strong>
                              </td>
                              <td>
                                <div className="d-flex align-items-center nowrap text-primary">
                                  <span className="icofont-ui-email p-0 mr-2" />{" "}
                                  liam@gmail.com
                                </div>
                              </td>
                              <td>
                                <div className="text-muted text-nowrap">
                                  10 Feb 2018
                                </div>
                              </td>
                              <td>
                                <div className="text-muted text-nowrap">
                                  9:15 - 9:45
                                </div>
                              </td>


                              <td>
                                <div className="actions">
                                  <button className="btn btn-info btn-sm btn-square rounded-pill">
                                    <span className="btn-icon icofont-ui-edit" />
                                  </button>
                                  <button className="btn btn-error btn-sm btn-square rounded-pill">
                                    <span className="btn-icon icofont-ui-delete" />
                                  </button>
                                </div>
                              </td>
                            </tr>


                          </tbody>
                        </table>


                      </div>

                    </div>
                  </div>
                  <div className="add-action-box">
                    <button
                      className="btn btn-primary btn-lg btn-square rounded-pill"
                      data-toggle="modal"
                      data-target="#add-appointment"
                    >
                      <span className="btn-icon icofont-stethoscope-alt" />
                    </button>
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

export default AllPatients;