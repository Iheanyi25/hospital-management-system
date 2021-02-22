import React from "react";
import { observer } from "mobx-react";
import { PageLoader } from "../../../Components";
import { Link } from "react-router-dom";
import { UserContext } from "../../../mobx/UserState";
import { fetchWrapper } from "../../../api/fetcher";
import { fetchConfig } from "../../../api/fetchConfig";
import { getAllDrugsUrl } from "../../../api/URLs";
import {
  DrugSummary,
  DrugTabContent,
  DrugTabHeader,
} from "./Components/viewdrugs-components/page-components";
class ViewDrugs extends React.Component {
  static contextType = UserContext;
  state = {
    allDrugs: [],
    tabDrugs: [],
    liquidDrugs: [],
    inhalerDrugs: [],
    powderDrugs: [],

    loading: true,
  };
  componentDidMount() {
    this.fetchAllDrugs();
  }
  9;
  fetchAllDrugs = async () => {
    await this.setState((state) => ({
      ...state,
      loading: true,
    }));
    try {
      const getAllDrugs = getAllDrugsUrl(1, 50);
      const getAllDrugsConfig = fetchConfig({
        url: getAllDrugs,
        method: "get",
      });
      const { data } = await fetchWrapper(getAllDrugsConfig);
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

  render() {
    const content = this.context;
    const {
      user: { userType },
    } = content;
    const {
      tabDrugs,
      liquidDrugs,
      inhalerDrugs,
      powderDrugs,
      loading,
    } = this.state;
    return (
      <>
        {loading ? (
          <PageLoader />
        ) : (
          <main className="main-content">
            <div className="app-loader">
              <i className="icofont-spinner-alt-4 rotate" />
            </div>
            <div className="main-content-wrap">
              <header className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="page-title">Drug catalog</h4>
                <Link
                  to={
                    userType === "Admin"
                      ? "/AdminRegisterDrug"
                      : "/PharmacyRegisterDrug"
                  }
                  className="btn btn-primary"
                >
                  Register Drug
                </Link>
              </header>
              <DrugSummary
                tabCount={tabDrugs.length}
                powderCount={powderDrugs.length}
                liquidCount={liquidDrugs.length}
                inhalerCount={inhalerDrugs.length}
              />
              <div className="page-content">
                <div className="card mb-0">
                  <div className="card-body">
                    <div>
                      <DrugTabHeader />
                      <DrugTabContent userType={userType} />
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
