import React from "react";
import Header from "../../Components/Pharmacy/Header";
import Sidebar from "../../Components/Pharmacy/Sidebar";
import PageLoader from "../../Components/PageLoader";
import Footer from "../../Components/Footer";
import AddDrug from "../../Components/Pharmacy/AddDrug";
import TemplateSettings from "../../Components/TemplateSettings";

const $ = require("jquery");
$.Datatable = require("datatables.net");

class ManageSubCategories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drugSubCategories: null,
      apiUrl: process.env.REACT_APP_API_URL,
    };
  }

  async componentDidMount() {
    this.getAllDrugSubCategories().then(() => this.sync());
  }

  async getAllDrugSubCategories() {
    const { apiUrl } = this.state;
    const response = await fetch(`${apiUrl}/Pharmacy/GetDrugAllSubCategories`);
    const data = await response.json();
    this.setState({ drugSubCategories: data });
  }

  async deleteDrugSubCategory(id) {
    const { url } = this.state;
    try {
      var Id = id;
      const request = await fetch(
        `${url}/Pharmacy/DeleteDrugSubCategory?Id=${Id}`,
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

      //Drug Sub Category successfully deleted
      const response = await fetch(`${url}/Pharmacy/GetDrugAllSubCategories`);
      const data1 = await response.json();
      setTimeout(
        () =>
          this.setState({
            drugSubCategories: data1,
          }),
        300
      );
    } catch (error) {
      console.log(error);
    }
  }

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
  }

  render() {
    const { drugSubCategories } = this.state;
    return (
      <>
        <PageLoader />
        <div className="page-box">
          <div className="app-container">
            {/* Horizontal navbar---Header */}
            <Header></Header>

            {/* Vertical navbar */}
            <Sidebar></Sidebar>

            <main className="main-content">
              <div className="app-loader">
                <i className="icofont-spinner-alt-4 rotate" />
              </div>
              <div className="main-content-wrap">
                <header className="page-header">
                  <h4 className="page-title">Manage Sub Categories</h4>
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
                          class="table"
                          data-columns='[
                        { "data": "name" },
                        { "data": "position" },
                        { "data": "office" },
                        { "data": "age" },
                        { "data": "start-date" },
                        { "data": "salary" }
                      ]'
                          data-paging="true"
                          data-info="true"
                        >
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Position</th>
                              <th>Office</th>
                              <th>Age</th>
                              <th>Date</th>
                              <th>Salary</th>
                            </tr>
                          </thead>
                          <tbody>
                            {drugSubCategories
                              ? drugSubCategories.map((drugSubCategory) => (
                                <tr>
                                  <td>{drugSubCategory.name}</td>
                                  <td>Position</td>
                                  <td>Office</td>
                                  <td>Age</td>
                                  <td>Date</td>
                                  <td>
                                    <div className="actions">
                                      <button className="btn btn-info btn-sm btn-square rounded-pill">
                                        <span className="btn-icon icofont-ui-edit" />
                                      </button>
                                      <button
                                        onClick={() =>
                                          this.deleteDrugSubCategory(
                                            drugSubCategory.id
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
            <AddDrug />
            {/* footer here */}
            <Footer />
          </div>
        </div>
        {/* template setting */}
        <TemplateSettings />{" "}
      </>
    );
  }
}

export default ManageSubCategories;
