import React, { Component } from 'react';
import { AddFamily } from '../../Components/Modals';

const $ = window.$;
$.Datatable = require("datatables.net");
const apiUrl = process.env.REACT_APP_API_URL;


export default class SelectFamily extends Component {

    state = {
        accounts: [],
        selectedValue: '',
        payload: {}
    };

    async componentDidMount() {
        const { payload } = this.props;
        this.setState({ payload }, () => {
            this.fetchAccounts().then(() =>
                this.sync()
            )
        });

        console.log(this.props)
    }

    fetchAccounts = async () => {
        try {
            let res = await fetch(`${apiUrl}/Admin/Account/GetAllAccounts`, {
                headers: { "Content-Type": "application/json-patch+json" },
                method: "GET",
                redirect: "follow",
            });
            const data = await res.text();
            this.setState({ accounts: JSON.parse(data).accounts });
        } catch (error) { }
    };

    fetchNewAccounts = () => {
        this.$el = $(this.el);
        this.$el.DataTable().destroy();

        this.setState({ newData: Math.random() }, () => {
            this.fetchAccounts();
            setTimeout(() => {
                this.sync()
            }, 1000);
        })
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

    sync() {
        this.$el = $(this.el);
        this.$el.DataTable();
    }

    render() {
        return (
            <>
                <div className="card border-light">
                    <div className="card-body">
                        <div className="table-responsive">
                            <h5 className="text-center">Add this Patient to a Family Account</h5>

                            <div className="row m-0">
                                <div className="col-12">
                                    <div className="d-flex justify-content-between my-5">

                                        <div className="align-items-end d-flex">
                                            <button
                                                type="submit"
                                                data-toggle="modal"
                                                data-target="#add-family"
                                                className="btn btn-primary"
                                            >
                                                + Create a New Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <table
                                ref={(el) => (this.el = el)}
                                className="table table-hover"
                            // data-searching="true"
                            // data-paging="true"
                            // data-columns='[
                            //     { "data": "name" },
                            //     { "data": "phone" }
                            // ]'
                            >
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone Number</th>
                                    </tr>
                                </thead>
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
                                                <td>{account?.phoneNumber ?? "none set"}</td>
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
                <AddFamily healthPlanId={this.props.healthPlanId} callbackFromProps={this.fetchNewAccounts} />
            </>
        );
    }
}
