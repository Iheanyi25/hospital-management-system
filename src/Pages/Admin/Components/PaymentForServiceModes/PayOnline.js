import React from "react";
import { PageLoader } from "../../../../Components";
import { PayWithPaystack, PayWithFlutter } from "../../../../Components/Payment";

class PayOnline extends React.Component {
  state = {
    patientId: "",
    amount: "",
    email: "",
  };

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("authenticatedUser"));
    this.setState({ patientId: user.id, email: user.email });
  }

  render() {
    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <div className="page-content">
              <div className="row justify-content-center">
                <div className="col col-md-12">
                  <div className="card border-light">
                    <div className="card-body">
                      <form
                        className="mb-4 p-5 needs-validation"
                        noValidate
                      >
                        <h5 className="text-center">Select your prefered payment method</h5>
                        <div className="m-auto mt-2">
                          <div className="row">
                            <PayWithPaystack paymentDetails={this.state} />
                            <PayWithFlutter paymentDetails={this.state}/>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export { PayOnline };
