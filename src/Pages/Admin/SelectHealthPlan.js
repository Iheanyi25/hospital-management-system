import React, { Component } from 'react'
import { PageLoader } from '../../Components';

const $ = require("jquery");
$.Datatable = require("datatables.net");

export default class SelectHealthPlan extends Component {

    state = {
        selectedValue: ""
    }

    handleSubmit() {

    }

    componentDidMount() {
        this.sync();
    }

    selectFamily(val, e) {
        this.setState({ selectedValue: val })
        console.log(val);
    }

    sync() {
        this.$el = $(this.el);
        this.$el.DataTable();
    }

    render() {
        return (
            <>
                <PageLoader />
                <main className="main-content">
                    <div className="app-loader">
                        <i className="icofont-spinner-alt-4 rotate" />
                    </div>
                    <div className="main-content-wrap w-50">
                        <div className="page-content">
                            <div className="row justify-content-center">
                                <div className="col col-md-12">
                                    {/* <Success /> */}
                                    <div className="card border-light">
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <h5 className="text-center">Select a health plan for the patient</h5>


                                                <div className="row m-0">
                                                    <div className="col-12">
                                                        <div className="d-flex justify-content-between my-5">
                                                            <div className="form-group mb-0 w-75">
                                                                <label>Select a health plan</label>
                                                                <select className="selectpicker">
                                                                    <option className="d-none"></option>
                                                                    <option>Family</option>
                                                                    <option>HMO</option>
                                                                </select>
                                                            </div>
                                                            <div className="align-items-end d-flex">
                                                                <button type="submit" data-toggle="modal" data-target="#add-family" className="btn btn-primary">
                                                                    + Add New
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <table className="table table-hover data-table"
                                                    data-searching="true"
                                                    data-paging="true"
                                                    data-columns='[
                                                        { "data": "name" }
                                                    ]'
                                                    data-info="true"
                                                    data-sort="false"
                                                >
                                                    <thead></thead>
                                                    <tbody>
                                                        <tr className={this.state.selectedValue === "value" ? "text-white bg-primary" : ""} onClick={(e) => this.selectFamily("value", e)}>
                                                            <td>
                                                                Ositadinma
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Ositadinma
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Loddy
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Ositadinma
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Ositadinma
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <div className="row mt-5 m-0">
                                                    <div className="col-12 d-flex justify-content-between">
                                                        <button type="submit" className="btn btn-muted">
                                                            Back
                                                        </button>
                                                        <button type="submit" className="btn btn-primary">
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>


                                            {/* <form className="mb-4 p-5 needs-validation" onSubmit={this.handleSubmit} noValidate>
                                                <h5 className="text-center">Select a health plan for the patient</h5>
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control"
                                                            placeholder="Search Family" />
                                                        <div className="input-group-append">
                                                            <button className="btn btn-primary"
                                                                type="button">Submit</button>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-12">

                                                            <ul className="list-group mt-3">
                                                                <li className="list-group-item border-bottom list-group-item-action" onClick={() => this.selectFamily("nsf")}>Cras justo odio</li>
                                                                <li className="list-group-item border-bottom list-group-item-action" onClick={() => this.selectFamily("nsf")}>Dapibus ac facilisis in</li>
                                                                <li className="list-group-item border-bottom list-group-item-action" onClick={() => this.selectFamily("nsf")}>Morbi leo risus</li>
                                                                <li className="list-group-item border-bottom list-group-item-action" onClick={() => this.selectFamily("nsf")}>Porta ac consectetur ac</li>
                                                                <li className="list-group-item border-bottom list-group-item-action" onClick={() => this.selectFamily("nsf")}>Vestibulum at eros</li>
                                                                <li className="list-group-item border-bottom list-group-item-action" onClick={() => this.selectFamily("nsf")}>Vestibulum at eros</li>
                                                                <li className="list-group-item border-bottom list-group-item-action" onClick={() => this.selectFamily("nsf")}>Vestibulum at eros</li>
                                                                <li className="list-group-item border-bottom list-group-item-action" onClick={() => this.selectFamily("nsf")}>Vestibulum at eros</li>
                                                            </ul>
                                                        </div>
                                                    </div>

                                                    <div className="row mt-5">
                                                        <div className="col"></div>
                                                        <div className="col text-right">
                                                            <button type="submit" className="btn btn-primary">
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form> */}
                                        </div>
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