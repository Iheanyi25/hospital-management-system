import React from "react";
import { PageLoader } from "../../../Components";
import { AllDrugs } from "./Components/ViewDrugs";
import tablet from "../../../assets/img/tablet.svg";
import liquid from "../../../assets/img/liquid.svg";
import inhalers from "../../../assets/img/inhalers.svg";
import powder from "../../../assets/img/powder.svg";

class ViewDrugs extends React.Component {
  render() {
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="d-flex justify-content-between align-items-center mb-5">
              <h4 className="page-title">Drug catalog</h4>
              <button className="btn btn-primary">Register Drug</button>
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
                        <div className="count text-primary fs-20">500</div>
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
                        <div className="count text-primary fs-20">478</div>
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
                        <div className="count text-primary fs-20">3,427</div>
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
                          Powder (In bottles)
                        </h6>
                        <div className="count text-primary fs-20">35</div>
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
                      className="nav nav-pills nav-fill mb-3"
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
                          Liquid/Syrups
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
                        <AllDrugs />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-tabs"
                        role="tabpanel"
                        aria-labelledby="pills-tabs-tab"
                      >
                        <h1>edjhkdkje</h1>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-liquid"
                        role="tabpanel"
                        aria-labelledby="pills-liquid-tab"
                      >
                        <h1>firfoiprf</h1>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-inhaler"
                        role="tabpanel"
                        aria-labelledby="pills-inhaler-tab"
                      >
                        <h1>inhaler</h1>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-powder"
                        role="tabpanel"
                        aria-labelledby="pills-powder-tab"
                      >
                        <h1>firfoiprf</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default ViewDrugs;
