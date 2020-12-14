import React from "react";
import { DrugDescription, DrugType } from "./Components/RegisterDrug";
import { Success } from "../../../Components/Alerts";
import { postDrugUrl } from "../../../api/URLs";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";

class RegisterDrug extends React.Component {
  state = {
    user: JSON.parse(localStorage.getItem("authenticatedUser")),

    step: 1,
    firstStepDone: false,

    sku: "",
    name: "",
    title: "",
    genericName: "",
    manufacturer: "",
    drugType: "",
    quantityPerContainer: "",
    containersPerCarton: "",
    costPricePerContainer: "",
    measurment:"",
    expiryDate: "",

    success: false,
    message: "",
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  componentDidUpdate() {
    const {
      sku,
      name,
      genericName,
      manufacturer,
      expiryDate,
      firstStepDone,
    } = this.state;
    if (
      sku &&
      name &&
      genericName &&
      manufacturer &&
      expiryDate !== "" &&
      !firstStepDone
    ) {
      this.setState((state) => ({ ...state, firstStepDone: true }));
    }
  }

  nextStep = () => {
    this.setState((state) => ({ ...state, step: state.step + 1 }));
  };

  prevStep = () => {
    this.setState((state) => ({ ...state, step: state.step - 1 }));
  };

  setPayload = (key, value) => {
    console.log(key, value);
    this.setState((state) => ({ ...state, [key]: value }));
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
      measurment,
      expiryDate,
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
      measurment,
      expiryDate,
    };
    const drugUrl = postDrugUrl();
    const postdrugConfig = fetchConfig({
      url: drugUrl,
      method: "post",
      data: payload,
    });
    try {
      let res = await fetchWrapper(postdrugConfig);
      console.log(res);
      if (res.status === 200) {
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
                        data={{
                          sku,
                          name,
                          genericName,
                          manufacturer,
                          expiryDate,
                        }}
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
