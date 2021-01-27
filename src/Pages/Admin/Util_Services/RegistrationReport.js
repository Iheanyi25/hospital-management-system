import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { formatInputDate } from "../../../utils/formatInputDate";
export default function RegistrationReport() {

    const [registrationDates, setRegistrationDates] = useState({
        startDate: "",
        endDate: "",
        paymentType: ""
    })

    const { startDate, endDate, paymentType } = registrationDates;

    const tabs = [
        {
            tab: "First Category",
            id: "pills-first-category",
            others: "pills-first"
        },
        {
            tab: "Second Category",
            id: "pills-second-category",
            others: "pills-second"
        },
        {
            tab: "Third Category",
            id: "pills-third-category",
            others: "pills-third"
        }
    ]

    // const handleStartDate = (startDate, e) => {
    //     const value = e.target.value
    //     setRegistrationDates({...registrationDates, [startDate]: value})
    //     console.log(startDate)
    // }
    return (
        <div>
            <main className="main-content">
                <div className="app-loader">
                    <i className="icofont-spinner-alt-4 rotate" />
                </div>
                <div className="main-content-wrap">
                    <div className="page-content">

                        <header className="page-header ml-3">
                            <h3 className="page-title">Registration report</h3>
                        </header>
                        <p className="ml-3">Select the date range to see the data from that timeline</p>
                        <div className="col col-md-12">
                            <div className="card border-light p-4">
                                <form className="mb-4">
                                    <div className="row">
                                        <div className="col-12 col-sm-3">
                                            <div className="form-group">
                                                <label>Start Date<small className="text-danger">*</small></label>

                                                <input
                                                    type="date"
                                                    min={formatInputDate()}
                                                    className="form-control"
                                                    tabIndex={-98}
                                                    placeholder="Start Date"
                                                // value={startDate}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-3">
                                            <div className="form-group">
                                                <label>End Date<small className="text-danger">*</small></label>

                                                <input
                                                    type="date"
                                                    min={formatInputDate()}
                                                    className="form-control"
                                                    tabIndex={-98}
                                                    placeholder="End Date"
                                                // value={startDate}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12 col-sm-3">
                                            <div className="form-group">
                                                <label>Type of payment<small className="text-danger">*</small></label>
                                                <select
                                                    className=" custom-patient-picker rounded form-control"
                                                    data-live-search="true">
                                                    <option selected value="">
                                                        Select a Patient
                                                        </option>
                                                    <option>
                                                        Another one
                                                    </option>
                                                    <option>
                                                        Another one
                                                    </option>
                                                    <option>
                                                        Another one
                                                    </option>
                                                    <option>
                                                        Another one
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-2">
                                            <div className="form-group mt-4">
                                                <button type="button" className="btn btn-primary">Generate</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div>
                                {/* Place for the data table */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
