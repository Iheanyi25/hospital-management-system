import React from "react";
import { AddDrugModal, Footer, PageLoader, PharmacyHeader, PharmacySidebar, TemplateSettings } from "../../Components";
// import Header from "../../Components/Header/PharmacyHeader";
// import Sidebar from "../../Components/Sidebar/PharmacySidebar";
// import PageLoader from "../../Components/Loader/PageLoader";
// import AddDrug from "../../Components/Modals/AddDrug";
// import Footer from "../../Components/Footer";
// import TemplateSettings from "../../Components/TemplateSettings";

class CreateSubCategories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: process.env.REACT_APP_API_URL,
      drugSubCategoryName: "",
      drugSubCategoryDescription: "",
      selectedDrugCategory: null,
    };
  }

  async componentDidMount() {
    const { url } = this.state;
    const response = await fetch(`${url}/Pharmacy/GetAllDrugCategories`);
    const data = await response.json();
    this.setState({ drugCategories: data });
  }

  clearForm = async (e) => {
    e.preventDefault();
    this.setState({
      drugSubCategoryName: "",
      drugSubCategoryDescription: "",
      selectedDrugCategory: "select drug category",
    });
  };

  createDrugSubCategory = async (e) => {
    e.preventDefault();
    const { url } = this.state;
    const { drugSubCategoryName, selectedDrugCategory } = this.state;
    console.log(selectedDrugCategory);

    var drugCategoryId = selectedDrugCategory.id;
    var name = drugSubCategoryName;

    const request = await fetch(`${url}/Pharmacy/CreateDrugSubCategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        drugCategoryId,
      }),
    });
    if (!request.ok) {
      const error = await request.json();
      throw Error(error.message);
    }
  };

  handleChange = async (name, e) => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({ [name]: value });
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
                <header className="page-header mt-5">
                  <h4 className="page-title">Create Drug SubCategory</h4>
                </header>

                <div className="page-content ">
                  <div className="row justify-content-center">
                    <div className="col col-12 col-xl-8">
                      <form
                        className="mb-4 mt-4"
                        onSubmit={(e) => this.createDrugSubCategory(e)}
                      >
                        <div className="form-group">
                          <label>Category Name</label>
                          <input
                            id={"drugSubCategoryName"}
                            className="form-control"
                            type="text"
                            placeholder="Enter sub category name"
                            value={this.state.drugSubCategoryName}
                            onChange={(e) =>
                              this.handleChange("drugSubCategoryName", e)
                            }
                          />
                        </div>

                        <label>Attach to a Category</label>

                        <select
                          id={"drugCategory"}
                          className="form-control"
                          title="Status"
                          tabIndex="-98"
                          value={this.state.selectedDrugCategory}
                          onChange={(e) =>
                            this.handleChange("selectedDrugCategory", e)
                          }
                        >
                          <option>select drug category</option>
                          {drugCategories
                            ? drugCategories.map((drugCategory) => (
                              <option
                                key={drugCategory.id}
                                value={drugCategory.id}
                              >
                                {drugCategory.name}
                              </option>
                            ))
                            : null}

                          <option class="bs-title-option" value=""></option>
                        </select>

                        <div class="form-group">
                          <label>Description</label>
                          <textarea
                            id={"drugSubCategoryDescription"}
                            className="form-control"
                            rows="5"
                            placeholder=" Enter Sub Category Description"
                            value={this.state.drugSubCategoryDescription}
                            onChange={(e) =>
                              this.handleChange("drugSubCategoryDescription", e)
                            }
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

            {/* Add Drug Modal */}
            <AddDrugModal />
            {/* Footer */}
            <Footer />
          </div>
        </div>
        <TemplateSettings />
      </>
    );
  }
}

export default CreateSubCategories;
