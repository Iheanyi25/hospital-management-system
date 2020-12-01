import React from "react";
import { DrugDescription, DrugType } from "./Components/RegisterDrug";
import { Success } from "../../../Components/Alerts";

const apiUrl = process.env.REACT_APP_API_URL;

class RegisterDrug extends React.Component {
  state = {
    step: 1,
    firstStepDone: false,

    name: "",
    title: "",
    genericName: "",
    manufacturer: "",
    drugType: "",
    // quantityInStock: "",
    quantityPerContainer: "",
    containersPerCarton: "",

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
    const { name, title, genericName, manufacturer } = this.state;
    this.setState({
      ...this.state,
      [key]: value,
    });
    if (name && title && genericName && manufacturer !== "") {
      this.setState({ firstStepDone: true });
    }
    console.log(this.state);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      title,
      genericName,
      manufacturer,
      drugType,
      quantityPerContainer,
      containersPerCarton,
    } = this.state;
    const payload = {
      name,
      title,
      genericName,
      manufacturer,
      drugType,
      quantityPerContainer,
      containersPerCarton,
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
      step,
      firstStepDone,
      name,
      title,
      genericName,
      manufacturer,
      success,
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
            nextRoute="/AdminViewDrugs"
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
                        data={{ name, title, genericName, manufacturer }}
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
