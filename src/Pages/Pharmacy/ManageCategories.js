import React from "react";
import { AddDrugModal, Footer, PageLoader, PharmacyHeader, PharmacySidebar, TemplateSettings } from "../../Components";
// import Header from "../../Components/Header/PharmacyHeader";
// import Sidebar from "../../Components/Sidebar/PharmacySidebar";
// import PageLoader from "../../Components/Loader/PageLoader";
// import Footer from "../../Components/Footer";
// import AddDrug from "../../Components/Modals/AddDrug";
// import TemplateSettings from "../../Components/TemplateSettings";

const $ = require("jquery");
$.Datatable = require("datatables.net");

class ManageCategories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drugCategories: [],
      apiUrl: process.env.REACT_APP_API_URL,
    };
  }

  async componentDidMount() {
    this.getAllDrugCategories().then(() => this.sync());
  }

  async getAllDrugCategories() {
    const { apiUrl } = this.state;
    const response = await fetch(`${apiUrl}/Pharmacy/GetAllDrugCategories`);
    const data = await response.json();
    this.setState({ drugCategories: data });
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  deleteDrugCategory = async (id) => {
    //e.preventDefault();
    const { url } = this.state;
    try {
      var Id = id;

      const request = await fetch(
        `${url}/Pharmacy/DeleteDrugCategory?Id=${Id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!request.ok) {
        const error = await request.json();
        throw Error(error.message);
      }

      //Drug successfully deleted
      const response = await fetch(`${url}/Pharmacy/GetAllDrugCategories`);
      const data1 = await response.json();
      setTimeout(
        () =>
          this.setState({
            drugCategories: data1,
          }),
        300
      );
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { drugCategories } = this.state;
    return (
      <>
        <PageLoader />
        <div className="page-box">
          <div className="app-container">
            {/* Horizontal navbar---Header */}
            <PharmacyHeader />

            {/* Vertical navbar */}
            <PharmacySidebar />

            <main className="main-content">
              <div className="app-loader">
                <i className="icofont-spinner-alt-4 rotate" />
              </div>
              <div className="main-content-wrap">
                <header className="page-header">
                  <h4 className="page-title">Manage Categories</h4>
                </header>
                <div className="page-content">
                  <div className="card-body"></div>
                </div>
                <div className="page-content">
                  <div className="card mb-0">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table
                          ref={(el) => (this.el = el)}
                          className="table"
                          data-columns='[
                        { "data": "name" },
                        { "data": "description" },
                        { "data": "actions" }
                      ]'
                          data-paging="true"
                          data-info="true"
                        >
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Description</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {drugCategories
                              ? drugCategories.map((drugCategory) => (
                                <tr>
                                  <td>{drugCategory.name}</td>
                                  <td>not available</td>
                                  <td>
                                    <div className="actions">
                                      <button className="btn btn-info btn-sm btn-square rounded-pill">
                                        <span className="btn-icon icofont-ui-edit" />
                                      </button>
                                      <button
                                        onClick={() =>
                                          this.deleteDrugCategory(
                                            drugCategory.id
                                          )
                                        }
                                        className="btn btn-error btn-sm btn-square rounded-pill"
                                      >
                                        <span className="btn-icon icofont-ui-delete" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                              : null}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="add-action-box">
                    <button
                      className="btn btn-primary btn-lg btn-square rounded-pill"
                      data-toggle="modal"
                      data-target="#add-appointment"
                    >
                      <span className="btn-icon icofont-stethoscope-alt" />
                    </button>
                  </div>
                </div>
              </div>
            </main>

            {/* Add Drug Modal */}
            <AddDrugModal />
            {/* footer here */}
            <Footer />
          </div>
        </div>
        {/* template setting */}
        <TemplateSettings />
      </>
    );
  }
}

export default ManageCategories;
