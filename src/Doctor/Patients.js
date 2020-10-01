import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../Partials/Doctor/Header';
import Sidebar from '../Partials/Doctor/Sidebar';
import Footer from '../Partials/Footer'
import TemplateSettings from '../Partials/TemplateSettings'
import PageLoader from '../Partials/PageLoader'

class Patients extends React.Component {

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
                            <div className="app-loader">
                                <i className="icofont-spinner-alt-4 rotate" />
                            </div>
                            <div className="main-content-wrap">
                                <header className="page-header">
                                    <h4 className="page-title">Patients Listing</h4>
                                </header>
                                <div className="page-content">
                                    <div className="card-body"></div>
                                </div>
                                <div className="page-content">
                                    <div className="card mb-0">
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table class="table data-table" data-columns='[
                                                        { "data": "photo" },
                                                        { "data": "name" },
                                                        { "data": "email" },
                                                        { "data": "phone" },
                                                        { "data": "date-of-birth" },
                                                        { "data": "address" },
                                                        { "data": "actions" }
                                                    ]' data-paging="true" data-info="true">
                                                    <thead>
                                                        <tr className="bg-primary text-white">
                                                            <th>Photo</th>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Phone</th>
                                                            <th>Date Of Birth</th>
                                                            <th>Address</th>
                                                            <th>Actions</th>
                                                        </tr>

                                                    </thead>
                                                    <tbody>
                                                        
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
                                                            <td>Ogbona</td>
                                                            <td>
                                                                <strong>Liam</strong>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary">
                                                                    <span className="icofont-ui-email p-0 mr-2" />liam@gmail.com
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
                                                                    <Link title="Pre-consultation" onClick={() => window.location.href = '/AdminPreConsultation'} to="/AdminPreConsultation" className="btn btn-secondary btn-sm btn-square rounded-pill">
                                                                        <span className="btn-icon icofont-stethoscope-alt" />
                                                                    </Link>
                                                                    <button className="btn btn-info btn-sm btn-square rounded-pill">
                                                                        <span className="btn-icon icofont-ui-edit" />
                                                                    </button>
                                                                    <button className="btn btn-error btn-sm btn-square rounded-pill">
                                                                        <span className="btn-icon icofont-ui-delete" />
                                                                    </button>
                                                                </div>
                                                            </td>
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
                                                            <td>Ogbona</td>
                                                            <td>
                                                                <strong>Liam</strong>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary">
                                                                    <span className="icofont-ui-email p-0 mr-2" />liam@gmail.com
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
                                                                    <Link title="Pre-consultation" onClick={() => window.location.href = '/AdminPreConsultation'} to="/AdminPreConsultation" className="btn btn-secondary btn-sm btn-square rounded-pill">
                                                                        <span className="btn-icon icofont-stethoscope-alt" />
                                                                    </Link> 
                                                                    <button className="btn btn-info btn-sm btn-square rounded-pill">
                                                                        <span className="btn-icon icofont-ui-edit" />
                                                                    </button>
                                                                    <button className="btn btn-error btn-sm btn-square rounded-pill">
                                                                        <span className="btn-icon icofont-ui-delete" />
                                                                    </button>
                                                                </div>
                                                            </td>
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
                                                            <td>Ogbona</td>
                                                            <td>
                                                                <strong>Liam</strong>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary">
                                                                    <span className="icofont-ui-email p-0 mr-2" />liam@gmail.com
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
                                                                    <Link title="Pre-consultation" onClick={() => window.location.href = '/AdminPreConsultation'} to="/AdminPreConsultation" className="btn btn-secondary btn-sm btn-square rounded-pill">
                                                                        <span className="btn-icon icofont-stethoscope-alt" />
                                                                    </Link>
                                                                    <button className="btn btn-info btn-sm btn-square rounded-pill">
                                                                        <span className="btn-icon icofont-ui-edit" />
                                                                    </button>
                                                                    <button className="btn btn-error btn-sm btn-square rounded-pill">
                                                                        <span className="btn-icon icofont-ui-delete" />
                                                                    </button>
                                                                </div>
                                                            </td>
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
                                                            <td>Ogbona</td>
                                                            <td>
                                                                <strong>Liam</strong>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary">
                                                                    <span className="icofont-ui-email p-0 mr-2" />liam@gmail.com
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
                                                                    <Link title="Pre-consultation" onClick={() => window.location.href = '/AdminPreConsultation'} to="/AdminPreConsultation" className="btn btn-secondary btn-sm btn-square rounded-pill">
                                                                        <span className="btn-icon icofont-stethoscope-alt" />
                                                                    </Link>
                                                                    <button className="btn btn-info btn-sm btn-square rounded-pill">
                                                                        <span className="btn-icon icofont-ui-edit" />
                                                                    </button>
                                                                    <button className="btn btn-error btn-sm btn-square rounded-pill">
                                                                        <span className="btn-icon icofont-ui-delete" />
                                                                    </button>
                                                                </div>
                                                            </td>
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
                                                            <td>Ogbona</td>
                                                            <td>
                                                                <strong>Liam</strong>
                                                            </td>
                                                            <td>
                                                                <div className="d-flex align-items-center nowrap text-primary">
                                                                    <span className="icofont-ui-email p-0 mr-2" />liam@gmail.com
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
                                                                
                                                                    <Link title="Pre-consultation" onClick={() => window.location.href = '/AdminPreConsultation'} to="/AdminPreConsultation" className="btn btn-secondary btn-sm btn-square rounded-pill">
                                                                        <span className="btn-icon icofont-stethoscope-alt" />
                                                                    </Link>
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
              
                <TemplateSettings />

            </>


        )
    }
}

export default Patients;