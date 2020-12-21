import React from 'react'
import { PageLoader } from '../../Components';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };

    }

    render() {

        return (

            <>

                <PageLoader />

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
                                                    <div className="icon p-0 fs-48 text-primary opacity-50 icofont-first-aid-alt">
                                                    </div>
                                                </div>
                                                <div className="col col-7">
                                                    <h6 className="mt-0 mb-1">Appointments</h6>
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
                                                    <h6 className="mt-0 mb-1">My Patients</h6>
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
                                                    <div className="icon p-0 fs-48 text-primary opacity-50 icofont-blood" />
                                                </div>
                                                <div className="col col-7">
                                                    <h6 className="mt-0 mb-1">My Prescriptions</h6>
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
                                                    <div className="icon p-0 fs-48 text-primary opacity-50 icofont-list">
                                                    </div>
                                                </div>
                                                <div className="col col-7">
                                                    <h6 className="mt-0 mb-1 text-nowrap">Schedules</h6>
                                                    <div className="count text-primary fs-20">5238</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <div className="card bg-light">
                                        <div className="card-header">Welcome Michae</div>
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                            elit. Distinctio dolore enim
                                            </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="card text-white bg-primary">
                                        <div className="card-header">Important Updates</div>
                                        <div className="card-body">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                            elit. Distinctio dolore enim
                                            </div>
                                    </div>
                                </div>
                            </div>


                            <div className="card mb-0">
                                <div className="card-header">Recent Requests</div>
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
                                                    <td><img src="../assets/content/user-40-1.jpg" width={40} height={40} className="rounded-500" /></td>
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
                                                    <td><img src="../assets/content/user-40-2.jpg" width={40} height={40} className="rounded-500" /></td>
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
                                                    <td><img src="../assets/content/user-40-7.jpg" width={40} height={40} className="rounded-500" /></td>
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
                </main>

            </>
        )
    }
}

export default Dashboard;