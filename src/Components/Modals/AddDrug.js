import React from "react";

class AddDrugModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      drugName: "",
      drugDescription: "",
      drugPrice: "",

      showErrorMessage: false,
      showSuccessMessage: false,
    };
  }

  createDrug = async (e) => {
    e.preventDefault();
    const { apiUrl } = this.state;
    this.setState({ submittingDrug: true });
    const { drugName, drugDescription, drugPrice } = this.state;
    try {
      var name = drugName;
      var price = drugPrice;
      var description = drugDescription;

      const request = await fetch(`${apiUrl}/Pharmacy/CreateDrug`, {
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
      this.setState({ submittingDrug: false, success: true });
      const response = await fetch(`${apiUrl}/Pharmacy/GetAllDrugs`);
      const data1 = await response.json();
      setTimeout(
        () =>
          this.setState({
            drugs: data1,
            displaying: "all drugs",
            showModal: false,
          }),
        300
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

  clearForm = async (e) => {
    e.preventDefault();
    this.setState({ drugName: "", drugDescription: "", drugPrice: "" });
  };

  handleChange = async (name, e) => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  render() {
    // const { email, firstName, lastName, password, roleName } = this.state;
    // var displayError;
    // var displaySuccess;

    // if (this.state.showErrorMessage) {
    //   displayError = (
    //     <div className="alert alert-danger with-after-icon" role="alert">
    //       <div className="alert-content">{this.state.errorMessage}</div>
    //       <div className="alert-icon">
    //         <i className="icofont-alarm" />
    //       </div>
    //     </div>
    //   );
    // }

    // if (this.state.showSuccessMessage) {
    //   displaySuccess = (
    //     <div className="alert alert-info with-after-icon" role="alert">
    //       <div className="alert-content text-center">
    //         {this.state.successMessage}.
    //         <p className="mb-0 ">
    //           Would you like to update his profile?
    //           <Link className="btn btn-outline-light">
    //             <span className="btn-icon icon icofont-ui-edit mr-2"></span>Update
    //             Profile
    //           </Link>
    //         </p>
    //       </div>
    //       <div className="alert-icon">
    //         <i className="icon icofont-ui-check" />
    //       </div>
    //     </div>
    //   );
    // }

    return (
      <>
        {/* Add drug modals */}
        <div
          className="modal fade"
          id="add-drug"
          tabIndex={-1}
          role="dialog"
          aria-hidden="true"
        >
          <form onSubmit={(e) => this.createDrug(e)}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Drug</h5>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <input
                      id="drugName"
                      name="drugName"
                      value={this.state.drugName}
                      onChange={(e) => this.handleChange("drugName", e)}
                      className="form-control"
                      type="text"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      id="drugDescription"
                      name="drugDescription"
                      value={this.state.drugDescription}
                      onChange={(e) => this.handleChange("drugDescription", e)}
                      className="form-control"
                      type="text"
                      placeholder="Description"
                    />
                  </div>

                  <div className="form-group">
                    <input
                      id="drugPrice"
                      name="drugPrice"
                      value={this.state.drugPrice}
                      onChange={(e) => this.handleChange("drugPrice", e)}
                      className="form-control"
                      type="number"
                      placeholder="Price"
                    />
                  </div>
                </div>
                <div className="modal-footer d-block">
                  <div className="actions justify-content-between">
                    <button
                      type="button"
                      className="btn btn-error"
                      data-dismiss="modal"
                      onClick={(e) => this.clearForm(e)}
                    >
                      Cancel
                    </button>{" "}
                    <button type="submit" className="btn btn-info">
                      Add Drug
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* end Add Drug modal */}
      </>
    );
  }
}

export { AddDrugModal };