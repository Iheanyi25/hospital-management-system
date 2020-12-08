import React from "react";
import { DrugDescription, DrugType } from "./Components/RegisterDrug";
import { Success } from "../../../Components/Alerts";

const apiUrl = process.env.REACT_APP_API_URL;

class RegisterDrug extends React.Component {
  state = {
    user: JSON.parse(localStorage.getItem("authenticatedUser")),

    step: 1,
    firstStepDone: false,

    sku:"",
    name: "",
    title: "",
    genericName: "",
    manufacturer: "",
    drugType: "",
    quantityPerContainer: "",
    containersPerCarton: "",
    costPricePerContainer:"",
    expiryDate:"",

    success: false,
    message: "",
  };

  nextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  prevStep = () => {
    this.setState({ step: this.state.step - 1 });
  };

  setPayload = (key, value) => {
    const { sku, name, genericName, manufacturer, expiryDate } = this.state;
    this.setState({
      ...this.state,
      [key]: value,
    });
    if (sku && name && genericName && manufacturer && expiryDate !== "") {
      this.setState({ firstStepDone: true });
    }
    console.log(this.state);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      sku,
      name,
      genericName,
      manufacturer,
      drugType,
      quantityPerContainer,
      containersPerCarton,
      costPricePerContainer,
      expiryDate
    } = this.state;
    const payload = {
      sku,
      name,
      genericName,
      manufacturer,
      drugType,
      quantityPerContainer,
      containersPerCarton,
      costPricePerContainer,
      expiryDate
    };
    try {
      let res = await fetch(`${apiUrl}/Pharmacy/RegisterDrug`, {
        headers: { "Content-Type": "application/json-patch+json" },
        method: "POST",
        body: JSON.stringify(payload),
        redirect: "follow",
      });
      if (res.status === 200) {
        console.log(res);
        this.setState({ success: true, message: res.message });
      }
    } catch (error) {
      console.log(error);
    }
    console.log(payload);
  };

  render() {
    const {
      sku,
      step,
      firstStepDone,
      name,
      genericName,
      manufacturer,
      expiryDate,
      success,
      user,
    } = this.state;
    return (
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        {success ? (
          <Success
            history={this.props.history}
            message="Well done, you successfully created a category"
            nextRoute={
              user.userType === "Admin"
                ? "/AdminViewDrugs"
                : "/PharmacyViewDrugs"
            }
          />
        ) : null}
        <div className="main-content-wrap w-50">
          <div className="page-content">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    {step === 1 ? (
                      <DrugDescription
                        nextStep={this.nextStep}
                        setPayload={this.setPayload}
                        firstStepDone={firstStepDone}
                        data={{ sku, name, genericName, manufacturer, expiryDate}}
                      />
                    ) : (
                      <DrugType
                        prevStep={this.prevStep}
                        setPayload={this.setPayload}
                        handleSubmit={this.handleSubmit}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default RegisterDrug;
