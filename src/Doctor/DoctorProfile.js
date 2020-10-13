import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from '../Partials/Doctor/Header';
import Sidebar from '../Partials/Doctor/Sidebar';
import Footer from '../Partials/Footer'
import TemplateSettings from "../Partials/TemplateSettings";
import PageLoader from '../Partials/PageLoader'

class DoctorProfile extends React.Component {

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
                                    <h3 className="page-title">Dr. Emene's profile</h3>
                                </header>
                                <div className="page-content">
                                    <div className="row">
                                        <div className="col col-12 col-md-6 mb-md-0">
                                            <div className="card bg-light personal-info-card"><img src="../assets/content/user-profile.jpg" className="card-img-top" alt />
                                                <div className="card-body">
                                                    <div className="d-flex align-items-center justify-content-between mb-3 user-actions">
                                                        <img src="../assets/content/user-400-1.jpg" width={100} height={100} alt className="rounded-500 mr-4" />
                                                         
                                                         <Link onClick={() => window.location.href = '/PatientBookAppointment'} className="btn btn-primary rounded-500" to="/PatientBookAppointment">
                                                            <span className="link-icon icofont-doctor" />
                                                            <span className="link-text">Update Profile</span>
                                                        </Link>
                            
                                                        
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h5 className="mb-0 mt-0 mr-1">Liam Jouns</h5><select className="rating" data-readonly="true">
                                                            <option value={1}>1</option>
                                                            <option value={2}>2</option>
                                                            <option value={3}>3</option>
                                                            <option value={4} selected="selected">4</option>
                                                            <option value={5}>5</option>
                                                        </select>
                                                    </div>
                                                    <p className="text-muted">UI/UX Designer</p>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio dolore
                                                    enim, nemo nihil non omnis temporibus? Blanditiis culpa labore velit.Lorem
                                                    ipsum dolor sit amet, consectetur adipisicing elit. Dicta, provident?</p>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header">Websites &amp; social channel</div>
                                                <div className="card-body">
                                                    <div className="row align-items-center mb-3">
                                                        <div className="col col-auto">
                                                            <div className="icon icofont-github fs-30 github-color" />
                                                        </div>
                                                        <div className="col">
                                                            <div>Github</div><a href="#">github.com/liam-jouns</a>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center mb-3">
                                                        <div className="col col-auto">
                                                            <div className="icon icofont-twitter fs-30 twitter-color" />
                                                        </div>
                                                        <div className="col">
                                                            <div>Twitter</div><a href="#">twitter.com/liam-jouns</a>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center mb-3">
                                                        <div className="col col-auto">
                                                            <div className="icon icofont-linkedin fs-30 linkedin-color" />
                                                        </div>
                                                        <div className="col">
                                                            <div>Linkedin</div><a href="#">linkedin.com/liam-jouns</a>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col col-auto">
                                                            <div className="icon icofont-youtube fs-30 youtube-color" />
                                                        </div>
                                                        <div className="col">
                                                            <div>YouTube</div><a href="#">youtube.com/liam-jouns</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card mb-md-0">
                                                <div className="card-header">Contact information</div>
                                                <div className="card-body">
                                                    <div className="row align-items-center mb-3">
                                                        <div className="col col-auto">
                                                            <div className="icon icofont-ui-touch-phone fs-30 text-muted" />
                                                        </div>
                                                        <div className="col">
                                                            <div>Mobile</div>0126596578
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center mb-3">
                                                        <div className="col col-auto">
                                                            <div className="icon icofont-slack fs-30 text-muted" />
                                                        </div>
                                                        <div className="col">
                                                            <div>Slack</div>@liam.jouns
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center mb-3">
                                                        <div className="col col-auto">
                                                            <div className="icon icofont-skype fs-30 text-muted" />
                                                        </div>
                                                        <div className="col">
                                                            <div>Skype</div>liam0jouns
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col col-auto">
                                                            <div className="icon icofont-location-pin fs-30 text-muted" />
                                                        </div>
                                                        <div className="col">
                                                            <div>Current Address</div>71 Pilgrim Avenue Chevy Chase, MD 20815
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col col-12 col-md-6">
                                        <div className="card">
                                                <div className="card-header">Office Time</div>
                                                <div className="card-body">
                                                    <div className="v-timeline dots">
                                                        <div className="line" />
                                                        <div className="timeline-box">
                                                            <div className="box-items">
                                                                <div className="item">
                                                                    <div className="icon-block">
                                                                        <div className="item-icon bg-success" />
                                                                    </div>
                                                                    <div className="content-block">
                                                                        <div className="item-header">
                                                                            <div className="item-date"><span>2017 - 2018</span></div>
                                                                        </div>
                                                                        <div className="item-desc"><strong>UI/UX Designer</strong> -
                                                                            IronSketch</div>
                                                                    </div>
                                                                </div>
                                                                
                                                                
                                                               
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header">Experience</div>
                                                <div className="card-body">
                                                    <div className="v-timeline dots">
                                                        <div className="line" />
                                                        <div className="timeline-box">
                                                            <div className="box-items">
                                                                <div className="item">
                                                                    <div className="icon-block">
                                                                        <div className="item-icon bg-success" />
                                                                    </div>
                                                                    <div className="content-block">
                                                                        <div className="item-header">
                                                                            <div className="item-date"><span>2017 - 2018</span></div>
                                                                        </div>
                                                                        <div className="item-desc"><strong>UI/UX Designer</strong> -
                                                                            IronSketch</div>
                                                                    </div>
                                                                </div>
                                                                <div className="item">
                                                                    <div className="icon-block">
                                                                        <div className="item-icon bg-warning" />
                                                                    </div>
                                                                    <div className="content-block">
                                                                        <div className="item-header">
                                                                            <div className="item-date"><span>2015 - 2017</span></div>
                                                                        </div>
                                                                        <div className="item-desc"><strong>Art &amp; Multimedia
                            From</strong> - Oxford University</div>
                                                                    </div>
                                                                </div>
                                                                <div className="item">
                                                                    <div className="icon-block">
                                                                        <div className="item-icon bg-info" />
                                                                    </div>
                                                                    <div className="content-block">
                                                                        <div className="item-header">
                                                                            <div className="item-date"><span>2013 - 2015</span></div>
                                                                        </div>
                                                                        <div className="item-desc"><strong>Web Designer</strong> -
                          WebDev Company</div>
                                                                    </div>
                                                                </div>
                                                                <div className="item">
                                                                    <div className="icon-block">
                                                                        <div className="item-icon bg-danger" />
                                                                    </div>
                                                                    <div className="content-block">
                                                                        <div className="item-header">
                                                                            <div className="item-date"><span>2009 - 2013</span></div>
                                                                        </div>
                                                                        <div className="item-desc"><strong>UI/UX Designer</strong> -
                          Design ArtData</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header">Education</div>
                                                <div className="card-body">
                                                    <div className="v-timeline dots">
                                                        <div className="line" />
                                                        <div className="timeline-box">
                                                            <div className="box-items">
                                                                <div className="item">
                                                                    <div className="icon-block">
                                                                        <div className="item-icon bg-danger" />
                                                                    </div>
                                                                    <div className="content-block">
                                                                        <div className="item-header">
                                                                            <div className="item-date"><span>2008 - 2009</span></div>
                                                                        </div>
                                                                        <div className="item-desc"><strong>Special schools</strong> -
                          Edison Schools</div>
                                                                    </div>
                                                                </div>
                                                                <div className="item">
                                                                    <div className="icon-block">
                                                                        <div className="item-icon bg-info" />
                                                                    </div>
                                                                    <div className="content-block">
                                                                        <div className="item-header">
                                                                            <div className="item-date"><span>2007 - 2008</span></div>
                                                                        </div>
                                                                        <div className="item-desc"><strong>Technical schools</strong> -
                          Jules E. Mastbaum Technical High School</div>
                                                                    </div>
                                                                </div>
                                                                <div className="item">
                                                                    <div className="icon-block">
                                                                        <div className="item-icon bg-warning" />
                                                                    </div>
                                                                    <div className="content-block">
                                                                        <div className="item-header">
                                                                            <div className="item-date"><span>2005 - 2007</span></div>
                                                                        </div>
                                                                        <div className="item-desc"><strong>High schools</strong> -
                          Benjamin Franklin High School</div>
                                                                    </div>
                                                                </div>
                                                                <div className="item">
                                                                    <div className="icon-block">
                                                                        <div className="item-icon bg-primary" />
                                                                    </div>
                                                                    <div className="content-block">
                                                                        <div className="item-header">
                                                                            <div className="item-date"><span>1996 - 2004</span></div>
                                                                        </div>
                                                                        <div className="item-desc"><strong>Middle schools</strong> -
                          Bethune, Mary Mcleod School</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card mb-0">
                                                <div className="card-header">Skills</div>
                                                <div className="card-body">
                                                    <div className="elements-list"><span className="badge badge-primary badge-pill">html</span> <span className="badge badge-primary badge-pill">php</span> <span className="badge badge-primary badge-pill">css</span> <span className="badge badge-primary badge-pill">scss</span> <span className="badge badge-primary badge-pill">js</span> <span className="badge badge-primary badge-pill">Angular</span> <span className="badge badge-primary badge-pill">React</span> <span className="badge badge-primary badge-pill">Vue.js</span> <span className="badge badge-primary badge-pill">Javascript</span> <span className="badge badge-primary badge-pill">Typescript</span></div>
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

                <TemplateSettings />

            </>


        )
    }
}

export default DoctorProfile;