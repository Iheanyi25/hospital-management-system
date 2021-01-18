import React from "react";
import { observer } from "mobx-react";
import { PageLoader } from "../../../Components";
import { Link } from "react-router-dom";
import { AllDrugs } from "./Components/ViewDrugs";
import { Success } from "../../../Components/Alerts";
import tablet from "../../../assets/img/tablet.svg";
import liquid from "../../../assets/img/liquid.svg";
import inhalers from "../../../assets/img/inhalers.svg";
import powder from "../../../assets/img/powder.svg";
import { UserContext } from "../../../mobx/UserState";
import { fetchWrapper } from "../../../api/fetcher";
import { fetchConfig } from "../../../api/fetchConfig";
import { getAllDrugsUrl } from "../../../api/URLs";

let $ = window.$;
$.DataTables = require("datatables.net");

class ViewDrugs extends React.Component {
  static contextType = UserContext;
  state = {
    allDrugs: [],
    tabDrugs: [],
    liquidDrugs: [],
    inhalerDrugs: [],
    powderDrugs: [],

    loading: true,
    message: "",
  };
  componentDidMount() {
    this.fetchAllDrugs().then(() => this.sync());
  }
  9;
  fetchAllDrugs = async () => {
    await this.setState((state) => ({
      ...state,
      loading: true,
    }));
    try { 
      const getAllDrugs = getAllDrugsUrl();
      const getAllDrugsConfig = fetchConfig({ url: getAllDrugs, method: "get" });
      const { data } = await fetchWrapper(getAllDrugsConfig)
      //   this.setState({ drugs: JSON.parse(data).drugs });
      this.filterDrug(data.drugs);
    } catch (error) {
      console.log(error);
    }
  };
  filterDrug = (drugs) => [
    this.setState({
      allDrugs: drugs,
      tabDrugs: drugs.filter((drug) => drug.drugType === "tabs"),
      liquidDrugs: drugs.filter((drug) => drug.drugType === "liquid"),
      inhalerDrugs: drugs.filter((drug) => drug.drugType === "inhalers"),
      powderDrugs: drugs.filter((drug) => drug.drugType === "powder"),
      loading: false,
    }),
  ];

  setSuccess = (message) => {
    this.setState({ success: true, message: message });
    this.fetchAllDrugs();
  };

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
    console.log($(this.el));
  }

  render() {
    const content = this.context;
    const { user } = content;
    const {
      allDrugs,
      tabDrugs,
      liquidDrugs,
      inhalerDrugs,
      powderDrugs,
      loading,
      success,
      message,
    } = this.state;
    console.log(tabDrugs);
    return (
      <>
        {loading ? (
          <PageLoader />
        ) : (
          <main className="main-content">
            <div className="app-loader">
              <i className="icofont-spinner-alt-4 rotate" />
            </div>
            {success ? <Success message={message} /> : null}
            <div className="main-content-wrap">
              <header className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="page-title">Drug catalog</h4>
                <Link
                  to={
                    user.userType === "Admin"
                      ? "/AdminRegisterDrug"
                      : "/PharmacyRegisterDrug"
                  }
                  className="btn btn-primary"
                >
                  Register Drug
                </Link>
              </header>
              <div className="row">
                <div className="col col-12 col-md-6 col-xl-4">
                  <div className="card animated fadeInUp delay-02s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-4">
                          <img src={tablet} alt="tablet" />
                        </div>
                        <div className="col col-8">
                          <h6 className="mt-0 mb-1">Tablets (In packets)</h6>
                          <div className="count text-primary fs-20">
                            {tabDrugs.length === 0 ? "N/A" : tabDrugs.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col col-12 col-md-6 col-xl-4">
                  <div className="card animated fadeInUp delay-03s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-4">
                          <img src={liquid} alt="tablet" />
                        </div>
                        <div className="col col-8">
                          <h6 className="mt-0 mb-1">Liqud (In bottles)</h6>
                          <div className="count text-primary fs-20">
                            {liquidDrugs.length === 0
                              ? "N/A"
                              : liquidDrugs.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col col-12 col-md-12 col-xl-4">
                  <div className="card animated fadeInUp delay-04s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-4">
                          <img src={inhalers} alt="tablet" />
                        </div>
                        <div className="col col-8">
                          <h6 className="mt-0 mb-1 text-nowrap">
                            Inhalers (In canisters)
                          </h6>
                          <div className="count text-primary fs-20">
                            {inhalerDrugs.length === 0
                              ? "N/A"
                              : inhalerDrugs.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col col-12 col-md-12 col-xl-4">
                  <div className="card animated fadeInUp delay-04s bg-light">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col col-4">
                          <img src={powder} alt="tablet" />
                        </div>
                        <div className="col col-8">
                          <h6 className="mt-0 mb-1 text-nowrap">
                            Powder (In cans)
                          </h6>
                          <div className="count text-primary fs-20">
                            {powderDrugs.length === 0
                              ? "N/A"
                              : powderDrugs.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="page-content">
                <div className="card mb-0">
                  <div className="card-body">
                    <div>
                      <ul
                        className="nav nav-tabs mb-3"
                        id="pills-tab"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <a
                            className="nav-link active show"
                            id="pills-all-tab"
                            data-toggle="pill"
                            href="#pills-all"
                            role="tab"
                            aria-controls="pills-all"
                            aria-selected="false"
                          >
                            All
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-tabs-tab"
                            data-toggle="pill"
                            href="#pills-tabs"
                            role="tab"
                            aria-controls="pills-tabs"
                            aria-selected="false"
                          >
                            Tablets/Capsules
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-liquid-tab"
                            data-toggle="pill"
                            href="#pills-liquid"
                            role="tab"
                            aria-controls="pills-liquid"
                            aria-selected="false"
                          >
                            Liquid/Syrup
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-inhaler-tab"
                            data-toggle="pill"
                            href="#pills-inhaler"
                            role="tab"
                            aria-controls="pills-inhaler"
                            aria-selected="false"
                          >
                            Inhaler
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            id="pills-powder-tab"
                            data-toggle="pill"
                            href="#pills-powder"
                            role="tab"
                            aria-controls="pills-powder"
                            aria-selected="false"
                          >
                            Powder
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content" id="pills-tabContent">
                        <div
                          className="tab-pane show fade active"
                          id="pills-all"
                          role="tabpanel"
                          aria-labelledby="pills-all-tab"
                        >
                          <AllDrugs
                            allDrugs={allDrugs}
                            setSuccess={this.setSuccess}
                          />
                        </div>
                        <div
                          className="tab-pane fade"
                          id="pills-tabs"
                          role="tabpanel"
                          aria-labelledby="pills-tabs-tab"
                        >
                          <AllDrugs
                            allDrugs={tabDrugs}
                            setSuccess={this.setSuccess}
                          />
                        </div>
                        <div
                          className="tab-pane fade"
                          id="pills-liquid"
                          role="tabpanel"
                          aria-labelledby="pills-liquid-tab"
                        >
                          <AllDrugs
                            allDrugs={liquidDrugs}
                            setSuccess={this.setSuccess}
                          />
                        </div>
                        <div
                          className="tab-pane fade"
                          id="pills-inhaler"
                          role="tabpanel"
                          aria-labelledby="pills-inhaler-tab"
                        >
                          <AllDrugs
                            allDrugs={inhalerDrugs}
                            setSuccess={this.setSuccess}
                          />
                        </div>
                        <div
                          className="tab-pane fade"
                          id="pills-powder"
                          role="tabpanel"
                          aria-labelledby="pills-powder-tab"
                        >
                          <AllDrugs
                            allDrugs={powderDrugs}
                            setSuccess={this.setSuccess}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}
      </>
    );
  }
}

export default observer(ViewDrugs);
