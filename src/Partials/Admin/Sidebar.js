import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            endpoint: process.env.REACT_APP_API_URL,
        };

        this.logOut = this.logOut.bind(this);
    }

    logOut(props) {
        this.props.history.push('/');
        localStorage.clear();
    }

    render() {

        return (

            <>
                {/* Vertical navbar */}
                <div id="navbar2" className="app-navbar vertical">
                    <div className="navbar-wrap"><button className="no-style navbar-toggle navbar-close icofont-close-line d-lg-none" />
                        <div className="app-logo">
                            <div className="logo-wrap"><img src="./assets/img/logo.svg" width={147} height={33} className="logo-img" /></div>
                        </div>
                        <div className="main-menu">
                            <nav className="main-menu-wrap">
                                <ul className="menu-ul">
                                    <li className="menu-item"><span className="group-title">Medicine</span></li>
                                    <li className="menu-item"><a className="item-link" href="index.html"><span className="link-icon icofont-thermometer-alt" /> <span className="link-text">Dashboard</span></a></li>
                                    <li className="menu-item"><a className="item-link" href="appointments.html"><span className="link-icon icofont-stethoscope-alt" /> <span className="link-text">Appointments</span></a></li>
                                    <li className="menu-item"><a className="item-link" href="doctors.html"><span className="link-icon icofont-doctor" /> <span className="link-text">Doctors</span></a></li>
                                    <li className="menu-item"><a className="item-link" href="departments.html"><span className="link-icon icofont-nurse" /> <span className="link-text">Departments</span></a></li>
                                    <li className="menu-item"><a className="item-link" href="patients.html"><span className="link-icon icofont-paralysis-disability" /> <span className="link-text">Patients</span></a></li>
                                    <li className="menu-item"><a className="item-link" href="payments.html"><span className="link-icon icofont-pay" /> <span className="link-text">Payments</span></a></li>
                                    <li className="menu-item"><span className="group-title">UI Kit</span></li>
                                    <li className="menu-item has-sub"><a className="item-link" href="#"><span className="link-text">Components</span> <span className="link-caret icofont-thin-right" /></a>
                                        <ul className="sub">
                                            <li className="menu-item"><a className="item-link" href="alerts.html"><span className="link-text">Alerts</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="autocompletes.html"><span className="link-text">Autocompletes</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="badges.html"><span className="link-text">Badges</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="buttons.html"><span className="link-text">Buttons</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="cards.html"><span className="link-text">Cards</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="checkboxes.html"><span className="link-text">Checkboxes</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="contacts.html"><span className="link-text">Contacts</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="inputs.html"><span className="link-text">Inputs</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="modal-windows.html"><span className="link-text">Modal windows</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="radio-buttons.html"><span className="link-text">Radio buttons</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="ratings.html"><span className="link-text">Ratings</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="selects.html"><span className="link-text">Selects</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="switchers.html"><span className="link-text">Switchers</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="textareas.html"><span className="link-text">Textareas</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="v-timelines.html"><span className="link-text">Vertical timeline</span></a></li>
                                        </ul>
                                    </li>
                                    <li className="menu-item has-sub"><a className="item-link" href="#"><span className="link-text">Icons</span> <span className="link-caret icofont-thin-right" /></a>
                                        <ul className="sub">
                                            <li className="menu-item"><a className="item-link" href="icons-sli.html"><span className="link-text">Simple line icons</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="icons-if.html"><span className="link-text">Icofont icons</span></a></li>
                                        </ul>
                                    </li>
                                    <li className="menu-item"><a className="item-link" href="typography.html"><span className="link-text">Typography</span></a></li>
                                    <li className="menu-item has-sub"><a className="item-link" href="#"><span className="link-text">Tables</span> <span className="link-caret icofont-thin-right" /></a>
                                        <ul className="sub">
                                            <li className="menu-item"><a className="item-link" href="bootstrap-tables.html"><span className="link-text">Bootstrap tables</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="data-tables.html"><span className="link-text">Data tables</span></a></li>
                                        </ul>
                                    </li>
                                    <li className="menu-item has-sub"><a className="item-link" href="#"><span className="link-text">Forms</span> <span className="link-caret icofont-thin-right" /></a>
                                        <ul className="sub">
                                            <li className="menu-item"><a className="item-link" href="form-elements.html"><span className="link-text">Elements</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="form-layout.html"><span className="link-text">Layout</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="form-validation.html"><span className="link-text">Validation</span></a></li>
                                        </ul>
                                    </li>
                                    <li className="menu-item has-sub"><a className="item-link" href="#"><span className="link-text">Charts</span> <span className="link-caret icofont-thin-right" /></a>
                                        <ul className="sub">
                                            <li className="menu-item"><a className="item-link" href="charts-chart-js.html"><span className="link-text">Chart.js</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="charts-morris-js.html"><span className="link-text">Morris.js</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="charts-echarts.html"><span className="link-text">Echarts</span></a></li>
                                        </ul>
                                    </li>
                                    <li className="menu-item has-sub"><a className="item-link" href="#"><span className="link-text">Maps</span> <span className="link-caret icofont-thin-right" /></a>
                                        <ul className="sub">
                                            <li className="menu-item"><a className="item-link" href="google-map.html"><span className="link-text">Google map</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="leaflet-map.html"><span className="link-text">Leaflet map</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="echarts-map.html"><span className="link-text">Echarts map</span></a></li>
                                        </ul>
                                    </li>
                                    <li className="menu-item"><span className="group-title">Apps</span></li>
                                    <li className="menu-item has-sub"><a className="item-link" href="#"><span className="link-text">Service pages</span> <span className="link-caret icofont-thin-right" /></a>
                                        <ul className="sub">
                                            <li className="menu-item"><a className="item-link" href="invoices.html"><span className="link-text">Invoices</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="pricing.html"><span className="link-text">Pricing</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="edit-account.html"><span className="link-text">Edit account</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="user-profile.html"><span className="link-text">User profile</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="events-timeline.html"><span className="link-text">Events timeline</span></a></li>
                                        </ul>
                                    </li>
                                    <li className="menu-item has-sub"><a className="item-link" href="#"><span className="link-text">Sessions</span> <span className="link-caret icofont-thin-right" /></a>
                                        <ul className="sub">
                                            <li className="menu-item"><a className="item-link" href="sign-in.html"><span className="link-text">Sign in</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="sign-up.html"><span className="link-text">Sign up</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="page-404.html"><span className="link-text">404</span></a></li>
                                            <li className="menu-item"><a className="item-link" href="page-500.html"><span className="link-text">500</span></a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="add-patient"><button className="btn btn-primary" data-toggle="modal" data-target="#add-patient"><span className="btn-icon icofont-plus mr-2" /> Add
        Patient</button></div>
                        <div className="assistant-menu"><a className="link" href="#"><span className="link-icon icofont-ui-settings" />Settings </a><a className="link" href="#"><span className="link-icon icofont-question-square" />FAQ &amp; Support</a></div>
                        <div className="navbar-skeleton vertical">
                            <div className="top-part">
                                <div className="sk-logo bg animated-bg" />
                                <div className="sk-menu"><span className="sk-menu-item menu-header bg-1 animated-bg" /> <span className="sk-menu-item bg animated-bg w-75" /> <span className="sk-menu-item bg animated-bg w-80" /> <span className="sk-menu-item bg animated-bg w-50" /> <span className="sk-menu-item bg animated-bg w-75" /> <span className="sk-menu-item bg animated-bg w-50" /> <span className="sk-menu-item bg animated-bg w-60" /></div>
                                <div className="sk-menu"><span className="sk-menu-item menu-header bg-1 animated-bg" /> <span className="sk-menu-item bg animated-bg w-60" /> <span className="sk-menu-item bg animated-bg w-40" /> <span className="sk-menu-item bg animated-bg w-60" /> <span className="sk-menu-item bg animated-bg w-40" /> <span className="sk-menu-item bg animated-bg w-40" /> <span className="sk-menu-item bg animated-bg w-40" /> <span className="sk-menu-item bg animated-bg w-40" /></div>
                                <div className="sk-menu"><span className="sk-menu-item menu-header bg-1 animated-bg" /> <span className="sk-menu-item bg animated-bg w-60" /> <span className="sk-menu-item bg animated-bg w-50" /></div>
                                <div className="sk-button animated-bg w-90" />
                            </div>
                            <div className="bottom-part">
                                <div className="sk-menu"><span className="sk-menu-item bg-1 animated-bg w-60" /> <span className="sk-menu-item bg-1 animated-bg w-80" /></div>
                            </div>
                            <div className="horizontal-menu"><span className="sk-menu-item bg animated-bg" /> <span className="sk-menu-item bg animated-bg" /> <span className="sk-menu-item bg animated-bg" /> <span className="sk-menu-item bg animated-bg" /> <span className="sk-menu-item bg animated-bg" /> <span className="sk-menu-item bg animated-bg" /></div>
                        </div>
                    </div>
                </div>{/* end Vertical navbar */}

            </>

        )
    }

}

export default Sidebar