import React from "react";
import { observer } from "mobx-react";
import { DrugDescription, DrugType } from "./Components/RegisterDrug";
import { postDrugUrl } from "../../../api/URLs";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { isNotEmptyString } from "../../../utils/validationUtils";
import { UserContext } from "../../../mobx/UserState";
import { notification } from "../../../utils/notification";

class RegisterDrug extends React.Component {
  static contextType = UserContext;
  state = {
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
    measurment: "",
    message: "",
    isSubmitting: false,
  };

  componentDidUpdate() {
    const { firstStepDone } = this.state;
    if (this.verifyValidity() && !firstStepDone) {
      this.setState((state) => ({ ...state, firstStepDone: true }));
    } else if (!this.verifyValidity() && firstStepDone) {
      this.setState((state) => ({ ...state, firstStepDone: false }));
    }
  }
  verifyValidity = () => {
    const { sku, name, genericName, manufacturer } = this.state;
    return (
      isNotEmptyString(sku) &&
      isNotEmptyString(name) &&
      isNotEmptyString(genericName) &&
      isNotEmptyString(manufacturer)
    );
  };
  nextStep = () => {
    this.setState((state) => ({ ...state, step: state.step + 1 }));
  };

  prevStep = () => {
    this.setState((state) => ({ ...state, step: state.step - 1 }));
  };

  setPayload = (key, value) => {
    this.setState((state) => ({ ...state, [key]: value }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState((state) => ({ ...state, isSubmitting: true }));
    const {
      user: { userType },
    } = this.context;
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
      const nextRoute =
        userType === "Admin" ? "/AdminViewDrugs" : "/PharmacyViewDrugs";
      notification.success({ message: res.data.message });
      this.props.history.push(nextRoute);
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data.message });
    }
    this.setState((state) => ({ ...state, isSubmitting: false }));
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
      ...otherDrugDetails
    } = this.state;
    return (
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
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
                        drugTypeDetails={otherDrugDetails}
                        submitting={this.state.isSubmitting}
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

export default observer(RegisterDrug);
