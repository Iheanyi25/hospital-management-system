import React from "react";
import { PageLoader } from "../../../Components";
import { LabResults } from "../../../Components/Clarking";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { getServiceRequestResultUrl } from "../../../api/URLs";

let $ = window.$;
$.DataTables = require("datatables.net");

class ViewLabResults extends React.Component {
  state = {
    serviceRequestResults: [],
  };

  componentDidMount() {
    this.fetchServiceCategories();
  }

  fetchServiceCategories = async () => {
    const { id } = this.props.match.params;
    try {
      const getServiceRequestResult = getServiceRequestResultUrl(id)
      const getServiceRequestResultConfig = fetchConfig({ url: getServiceRequestResult, method : 'GET'})
      const {data} = await fetchWrapper(getServiceRequestResultConfig)
      this.setState({
        serviceRequestResults: data.serviceRequestResults,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { id } = this.props.match.params;
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            {/* <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title">Results for (lab) services</h4>
            </header> */}
            <div className="row">
              <div className="col col-12 col-md-6 col-xl-4">
                <div className="card animated fadeInUp delay-02s bg-light">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col col-5">
                        <div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair"></div>
                      </div>
                      <div className="col col-7">
                        <h6 className="mt-0 mb-1">
                          No. of Results for Lab Services
                        </h6>
                        <div className="count text-primary fs-20">
                          {this.state.serviceRequestResults.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="page-content">
              <div className="card border-light w-75 m-auto">
                <LabResults serviceRequestId={id} showId={this.props.location.state} />
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default ViewLabResults;
