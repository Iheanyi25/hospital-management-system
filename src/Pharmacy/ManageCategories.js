import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "../Partials/Pharmacy/Header";
import Sidebar from "../Partials/Pharmacy/Sidebar";
import PageLoader from "../Partials/PageLoader";
import Footer from "../Partials/Footer";
import AddDrug from "../Partials/Pharmacy/AddDrug";
import TemplateSettings from "../Partials/TemplateSettings";

class ManageCategories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drugCategories: null,
      url: process.env.REACT_APP_API_URL,
    };
  }

  async componentDidMount() {
    const { url } = this.state;
    const response = await fetch(`${url}/Pharmacy/GetAllDrugCategories`);
    const data = await response.json();
    this.setState({ drugCategories: data });
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

      const data = await request.json();
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
            <Header></Header>

            {/* Vertical navbar */}
            <Sidebar></Sidebar>

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
                          class="table data-table"
                          data-columns='[
                        { "data": "name" },
                        { "data": "description" },
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
                            {drugCategories
                              ? drugCategories.map((drugCategory) => (
                                  <tr>
                                    <td>{drugCategory.name}</td>
                                    <td>hello</td>
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
            <AddDrug />
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
