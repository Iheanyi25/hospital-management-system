import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "../Partials/Pharmacy/Header";
import Sidebar from "../Partials/Pharmacy/Sidebar";
import PageLoader from "../Partials/PageLoader";
import Footer from "../Partials/Footer";
import AddDrug from "../Partials/Pharmacy/AddDrug";
import TemplateSettings from "../Partials/TemplateSettings";

class CreateCategories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: process.env.REACT_APP_API_URL,
      drugCategoryName: "",
      drugCategoryDescription: "",
    };
  }

  clearForm = async (e) => {
    e.preventDefault();
    this.setState({ drugCategoryName: "", drugCategoryDescription: "" });
  };
  createDrugCategory = async (e) => {
    e.preventDefault();
    const { url } = this.state;
    const { drugCategoryName, drugCategoryDescription } = this.state;
    var name = drugCategoryName;
    const request = await fetch(`${url}/Pharmacy/CreateDrugCategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    if (!request.ok) {
      const error = await request.json();
      throw Error(error.message);
    }

    //DrugCategory successfully added
    const data = await request.json();

    this.setState({ submittingDrugCategory: false, success: true });
    const response = await fetch(`${url}/Pharmacy/GetAllDrugCategories`);
    const data1 = await response.json();
    setTimeout(
      () =>
        this.setState({
          drugCategories: data1,
          displaying: "drug categories",
          showModal: false,
        }),
      300
    );
  };

  handleChange = async (name, e) => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  render() {
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
                <header className="page-header mt-5">
                  <h4 className="page-title">Create Drug Category</h4>
                </header>

                <div className="page-content ">
                  <div className="row justify-content-center">
                    <div className="col col-12 col-xl-8">
                      <form
                        className="mb-4 mt-4"
                        onSubmit={(e) => this.createDrugCategory(e)}
                      >
                        <div className="form-group">
                          <label>Category Name</label>{" "}
                          <input
                            id="drugCategoryName"
                            name="drugCategoryName"
                            type="text"
                            value={this.state.drugCategoryName}
                            onChange={(e) =>
                              this.handleChange("drugCategoryName", e)
                            }
                            placeholder="Enter drug category"
                            className="form-control"
                          />
                        </div>

                        <div class="form-group">
                          <label>Description</label>
                          <textarea
                            id="drugCategoryDescription"
                            name="drugCategoryDescription"
                            type="text"
                            value={this.state.drugCategoryDescription}
                            onChange={(e) =>
                              this.handleChange("drugCategoryDescription", e)
                            }
                            className="form-control"
                            rows="5"
                            placeholder="Enter Category Description"
                          ></textarea>
                        </div>

                        <div className="row">
                          <div className="col">
                            <button type="submit" className="btn btn-success">
                              Save Category
                            </button>
                          </div>
                          <div className="col text-right">
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={(e) => this.clearForm(e)}
                            >
                              <span className="d-none d-sm-block">Clear</span>{" "}
                              <span className="d-sm-none">Delete</span>
                            </button>
                          </div>
                        </div>
                      </form>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </div>

        {/* Add Drug Modal */}
        <AddDrug />
        <TemplateSettings />
      </>
    );
  }
}

export default CreateCategories;
