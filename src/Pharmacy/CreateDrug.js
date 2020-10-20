import React from "react";
import Header from "../Partials/Pharmacy/Header";
import Sidebar from "../Partials/Pharmacy/Sidebar";
import PageLoader from "../Partials/PageLoader";
import Footer from "../Partials/Footer";
import AddDrug from "../Partials/Pharmacy/AddDrug";
import TemplateSettings from "../Partials/TemplateSettings";

// const data = [{ id: 1, title: "Conan the Barbarian", year: "1982" }];
// const columns = [
//   {
//     name: "Title",
//     selector: "title",
//     sortable: true,
//   },
//   {
//     name: "Year",
//     selector: "year",
//     sortable: true,
//     right: true,
//   },
// ];

class CreateDrug extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: process.env.REACT_APP_API_URL,
      drugName: "",
      drugDescription: "",
      drugPrice: "",
      displayNotification: false,
    };
  }

  clearForm = async (e) => {
    e.preventDefault();
    this.setState({ drugName: "", drugDescription: "", drugPrice: "" });
  };

  createDrug = async (e) => {
    e.preventDefault();
    const { url } = this.state;
    this.setState({ submittingDrug: true });
    const { drugName, drugDescription, drugPrice } = this.state;
    try {
      var name = drugName;
      var price = drugPrice;
      var description = drugDescription;

      const request = await fetch(`${url}/Pharmacy/CreateDrug`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price,
          description,
        }),
      });
      if (!request.ok) {
        const error = await request.json();
        throw Error(error.message);
      }

      //Drug successfully added

      const data = await request.json();
      console.log(data);
      this.setState({ submittingDrug: false, success: true });
      // const response = await fetch(`${url}/Pharmacy/GetAllDrugs`);
      // const data1 = await response.json();
      this.setState({
        displayNotification: true,
      });
      setTimeout(
        () =>
          this.setState({
            displayNotification: false,
          }),
        1500
      );
    } catch (error) {
      console.log(error);

      this.setState((state) => ({
        submittingDrug: false,
        error: { ...state.error, error: true, message: error.message },
      }));

      //set state to initial values after 3 seconds.
    }
  };

  handleChange = async (name, e) => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  render() {
    const { displayNotification } = this.state;
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
                {displayNotification === true ? (
                  <div class="col-12 col-md-6">
                    <div class="card">
                      <div class="card-header">Removable</div>
                      <div class="card-body">
                        <div
                          class="alert alert-primary alert-dismissible fade show mb-0"
                          role="alert"
                        >
                          Drug successfully Added{" "}
                          <button
                            type="button"
                            class="close"
                            data-dismiss="alert"
                            aria-label="Close"
                          >
                            <span class="icofont-close-line"></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                <header className="page-header mt-5">
                  <h4 className="page-title">Create Drug</h4>
                </header>

                <div className="page-content ">
                  <div className="row justify-content-center">
                    <div className="col col-12 col-xl-8">
                      <form
                        className="mb-4 mt-4"
                        onSubmit={(e) => this.createDrug(e)}
                      >
                        <div className="form-group">
                          <label>Drug Name</label>{" "}
                          <input
                            id="drugName"
                            name="drugName"
                            type="text"
                            value={this.state.drugName}
                            onChange={(e) => this.handleChange("drugName", e)}
                            placeholder="Enter drug name"
                            className="form-control"
                          />
                        </div>

                        <div className="form-group">
                          <label>Drug Description</label>{" "}
                          <input
                            id="drugDescription"
                            name="drugDescription"
                            type="text"
                            value={this.state.drugDescription}
                            onChange={(e) =>
                              this.handleChange("drugDescription", e)
                            }
                            placeholder="Enter drug description"
                            className="form-control"
                          />
                        </div>
                        <div className="form-group">
                          <label>Drug Price</label>{" "}
                          <input
                            id="drugPrice"
                            name="drugPrice"
                            type="number"
                            value={this.state.drugPrice}
                            onChange={(e) => this.handleChange("drugPrice", e)}
                            placeholder="Enter drug price"
                            className="form-control"
                          />
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
            <AddDrug />
            {/* Footer */}
            <Footer />
          </div>
        </div>
        <TemplateSettings />
      </>
    );
  }
}

export default CreateDrug;
