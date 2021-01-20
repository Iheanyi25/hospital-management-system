import React from "react";
import PatientAndAdminImage from "../../assets/img/PatientAndAdminIcon.svg";
import logoMakeshift from "../../assets/img/logo-makeshift.svg";

const ThirdPartyFundAccount = () => {
  return (
    <>
      <div className="row h-100">
        <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
          <div className="card border-light" style={{ width: "29rem" }}>
            <div className="card-body">
              <form className="mb-4 p-5">
                <h4 className="text-center">Fund patient’s account</h4>
                <div className="text-center mb-4 mt-4">
                  <img
                    src={PatientAndAdminImage}
                    style={{
                      height: "48px",
                      width: "48px",
                      borderRadius: "50%",
                    }}
                    alt="user"
                  />
                </div>
                <div className="form-group">
                  <label>Patient name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="passwword"
                    value="Thor Odinson"
                    disabled
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Patient’s phone number</label>
                  <input
                    className="form-control"
                    type="text"
                    name="passwword"
                    value="08033456123"
                    disabled
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Amount(NGN) to fund</label>
                  <input
                    className="form-control"
                    type="number"
                    name="passwword"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Comment</label>
                  <textarea className="form-control" type="text" required />
                </div>
                <button
                  type="submit"
                  className="btn btn-block btn-primary"
                  type="submit"
                >
                  Fund account
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-8 auth-background">
        <img src={logoMakeshift} alt="logo" />
        <h1 className="text-white">Hospital Management Solution</h1>
        </div>
      </div>
    </>
  );
};
export default ThirdPartyFundAccount;
