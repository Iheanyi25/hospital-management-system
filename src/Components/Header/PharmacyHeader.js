import React from 'react'
import { Link } from "react-router-dom";
import { logOut } from '../../utils/logout';

class PharmacyHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            endpoint: process.env.REACT_APP_API_URL,
        };
    }


    render() {

        return (

            <>
                {/* Horizontal navbar */}
                <div id="navbar1" className="app-navbar horizontal">
                    <div className="navbar-wrap"><button className="no-style navbar-toggle navbar-open d-lg-none"><span /><span /><span /></button>
                        <form className="app-search d-none d-md-block">
                            <div className="form-group typeahead__container with-suffix-icon mb-0">
                                <div className="typeahead__field">
                                    <div className="typeahead__query"><input className="form-control autocomplete-control topbar-search" type="search" placeholder="Type page's title" autoComplete="off" data-source="./assets/data/search-menu.json" />
                                        <div className="suffix-icon icofont-search" />
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="app-actions">
                            <div className="dropdown item"><button className="no-style dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="0, 12"><span className="icon icofont-notification" /> <span className="badge badge-danger badge-sm">5</span></button>
                                <div className="dropdown-menu dropdown-menu-right dropdown-menu-w-280">
                                    <div className="menu-PharmacyHeaderƒ">
                                        <h4 className="h5 menu-title mt-0 mb-0">Notifications</h4><Link to="#" className="text-danger">Clear All</Link>
                                    </div>
                                    <ul className="list">
                                        <li><Link to="#"><span className="icon icofont-heart" />
                                            <div className="content"><span className="desc">Sara Crouch liked your photo</span>
                                                <span className="date">17 minutes ago</span></div>
                                        </Link></li>
                                        <li><Link to="#"><span className="icon icofont-users-alt-6" />
                                            <div className="content"><span className="desc">New user registered</span> <span className="date">23 minutes ago</span></div>
                                        </Link></li>
                                        <li><Link to="#"><span className="icon icofont-share" />
                                            <div className="content"><span className="desc">Amanda Lie shared your post</span>
                                                <span className="date">25 minutes ago</span></div>
                                        </Link></li>
                                        <li><Link to="#"><span className="icon icofont-users-alt-6" />
                                            <div className="content"><span className="desc">New user registered</span> <span className="date">32 minutes ago</span></div>
                                        </Link></li>
                                        <li><Link to="#"><span className="icon icofont-ui-message" />
                                            <div className="content"><span className="desc">You have a new message</span> <span className="date">58 minutes ago</span></div>
                                        </Link></li>
                                    </ul>
                                    <div className="menu-footer"><button className="btn btn-primary btn-block">View all
              notifications <span className="btn-icon ml-2 icofont-tasks-alt" /></button>
                                    </div>
                                </div>
                            </div>
                            <div className="dropdown item"><button className="no-style dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="0, 10"><span className="d-flex align-items-center"><img src="./assets/content/user-400-1.jpg" alt="hello" width={40} height={40} className="rounded-500 mr-1" /> <i className="icofont-simple-down" /></span></button>
                                <div className="dropdown-menu dropdown-menu-right dropdown-menu-w-180">
                                    <ul className="list">
                                        <li><Link to="#" className="align-items-center"><span className="icon icofont-ui-home" /> Edit account</Link></li>
                                        <li><Link to="#" className="align-items-center"><span className="icon icofont-ui-user" /> User profile</Link></li>
                                        <li><Link to="#" className="align-items-center"><span className="icon icofont-ui-calendar" /> Calendar</Link></li>
                                        <li><Link to="#" className="align-items-center"><span className="icon icofont-ui-settings" /> Settings</Link></li>
                                        <li><Link to="#" className="align-items-center" onClick={logOut}><span className="icon icofont-logout" />
                Log Out</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="navbar-skeleton horizontal">
                            <div className="left-part d-flex align-items-center"><span className="navbar-button bg animated-bg d-lg-none" /> <span className="sk-logo bg animated-bg d-none d-lg-block" /> <span className="search d-none d-md-block bg animated-bg" /></div>
                            <div className="right-part d-flex align-items-center">
                                <div className="icon-box"><span className="icon bg animated-bg" /> <span className="badge" />
                                </div><span className="avatar bg animated-bg" />
                            </div>
                        </div>
                    </div>
                </div>{/* end Horizontal navbar */}

            </>

        )
    }

}

export { PharmacyHeader }