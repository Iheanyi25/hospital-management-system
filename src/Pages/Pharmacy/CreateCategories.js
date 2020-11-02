import React from "react";
import { AddDrugModal, Footer, PageLoader, PharmacyHeader, PharmacySidebar, TemplateSettings } from "../../Components";
// import Header from "../../Components/Header/PharmacyHeader";
// import Sidebar from "../../Components/Sidebar/PharmacySidebar";
// import PageLoader from "../../Components/Loader/PageLoader";
// import Footer from "../../Components/Footer";
// import AddDrug from "../../Components/Modals/AddDrug";
// import TemplateSettings from "../../Components/TemplateSettings";

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
    const { drugCategoryName } = this.state;
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

    this.setState({ submittingDrugCategory: false, success: true });
    const response = await fetch(`${url}/Pharmacy/GetAllDrugCategories`);
    const data = await response.json();
    setTimeout(
      () =>
        this.setState({
          drugCategories: data,
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
            <PharmacyHeader />

            {/* Vertical navbar */}
            <PharmacySidebar />

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

                        <div className="form-group">
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
        <AddDrugModal />
        <TemplateSettings />
      </>
    );
  }
}

export default CreateCategories;
