import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PageLoader } from "../../../Components";

let $ = window.$;
$.DataTables = require("datatables.net");
const apiUrl = process.env.REACT_APP_API_URL;

class UploadServiceRequestResult extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],

        };
    }

    async componentDidMount() {
        this.fetchCategory().then(() => this.sync());
    }

    async fetchCategory() {
        const res = await fetch(apiUrl + "/Admin/GetAllServiceCategories");
        const response = await res.json();
        this.setState({ categories: response })
    }

    sync() {
        this.$el = $(this.el);
        this.$el.DataTable();
    }

    render() {
        const {
            categories
        } = this.state;

        return (
            <>
                <PageLoader />

                <main className="main-content">
                    <div className="app-loader">
                        <i className="icofont-spinner-alt-4 rotate" />
                    </div>
                    <div className="main-content-wrap">
                        <header className="page-header justify-content-between d-flex align-items-center mb-2">
                            <h4 className="page-title">Upload Results for (Lab) Services</h4>

                        </header>


                        <div className="page-content">
                            <div className="card-body"></div>
                        </div>

                        <div className="page-content">
                            <div className="row justify-content-center">
                                <div className="col col-12 col-xl-8">
                                    <form className="mb-4">
                                        
                                        <div className="form-group"><label>Service Category</label> <input className="form-control" type="text" placeholder="" /></div>
                                        <div className="form-group"><label>Service Name</label> <input className="form-control" type="text" placeholder=""  /></div>
                                       
                                       
                                        <div className="form-group"><label>Result</label> <textarea className="form-control" placeholder="Address" rows={3}  /></div>
                                        <div className="form-group"><label>Images(If Any)</label> <input className="form-control" type="file" placeholder=""  /></div>
                                       
                                        <div className="form-group"><label>Additonal Comments</label> <textarea className="form-control" placeholder="Address" rows={3}  /></div>
                                       <div className="row">
                                            <div className="col"><button type="button" className="btn btn-success">Save Result </button></div>
                                           
                                        </div>
                                    </form>
                                    <hr />
                                </div>
                            </div>
                        </div>

                    </div>
                </main>

            </>
        );
    }
}

export default UploadServiceRequestResult;