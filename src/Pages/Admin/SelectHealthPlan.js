import React, { Component } from 'react';
import { AddFamily } from '../../Components/Modals';

const $ = require('jquery');
$.Datatable = require('datatables.net');

export default class SelectHealthPlan extends Component {

    state = {
        accounts: [],
        selectedValue: '',
        payload: {}
    };

    componentDidMount() {
        const { payload, accounts } = this.props;
        this.setState({ accounts, payload });

        console.log(this.props)
    }

    selectFamily(val, e) {
        this.setState({ selectedValue: val });
    }

    goBack = () => {
        this.props.stageSetter(this.props.currentStage - 1)
    }

    handleSubmit = async () => {
        let { payload, submitFunction } = this.props;
        let data = payload;

        if (this.state.selectedValue) {
            data.accountId = this.state.selectedValue;
            submitFunction(data)
        }
    }

    render() {
        return (
            <>
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
                                            <button
                                                type="submit"
                                                data-toggle="modal"
                                                data-target="#add-family"
                                                className="btn btn-primary"
                                            >
                                                + Add New
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <table
                                className="table table-hover data-table"
                                data-searching="true"
                                data-paging="true"
                                data-columns='[
                                    { "data": "name" }
                                ]'
                                data-info="true"
                                data-sort="false"
                                data-ajax={this.state.accounts}
                            >
                                <thead></thead>
                                <tbody>
                                    {this.state.accounts.length > 0 &&
                                        this.state.accounts.map((account, index) => (
                                            <tr
                                                key={index}
                                                className={
                                                    this.state.selectedValue === account.id
                                                        ? 'text-white bg-primary'
                                                        : ''
                                                }
                                                value={account.id}
                                                onClick={(e) =>
                                                    this.selectFamily(account.id, e)
                                                }
                                            >
                                                <td>{account.name}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>

                            <div className="row mt-5 m-0">
                                <div className="col-12 d-flex justify-content-between">
                                    <button onClick={this.goBack} className="btn btn-muted">
                                        Back
                                    </button>
                                    <button onClick={this.handleSubmit} className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AddFamily healthPlanId={this.props.healthPlanId} />
            </>
        );
    }
}
