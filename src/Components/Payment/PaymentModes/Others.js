import { observer } from "mobx-react";
import React, { useState, useContext } from "react";
import { UserContext } from "../../../mobx/UserState";

const Others = observer(({ details, paidSuccessfully }) => {
  const {
    user: { id },
  } = useContext(UserContext);
  const [paymentDetails, setPaymentDetails] = useState({
    description: "",
    modeOfPayment: "",
    reference: "",
  });
  const { amount } = details;
  const handleSubmit = (e) => {
    const { description, modeOfPayment, reference } = paymentDetails;
    e.preventDefault();
    paidSuccessfully(reference, modeOfPayment, description, id);
  };

  return (
    <div className="table-responsive">
      <div className="main-content-wrap">
        <div className="page-content">
          <div className="row justify-content-center">
            <div className="col col-md-12">
              <div className="card border-light">
                <div className="card-body">
                  <form
                    className="mb-4 p-5 needs-validation"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="form-group">
                      <label>Amount(NGN)</label>
                      <input
                        className="form-control"
                        type="number"
                        tabIndex={-98}
                        value={amount}
                        disabled
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">
                        Oops! should be numbers only.
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Mode of Payment</label>
                      <select
                        className="form-control"
                        name="modeOfPayment"
                        onChange={(e) => {
                          setPaymentDetails({
                            ...paymentDetails,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      >
                        <option value="" selected disabled>
                          Select a payment option
                        </option>
                        <option value="pos">POS</option>
                        <option value="cheque">Cheque</option>
                        <option value="transfer">Bank transfer</option>
                      </select>
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">
                        Enter a valid comment
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Tranfer Reference Number</label>
                      <input
                        className="form-control"
                        type="text"
                        tabIndex={-98}
                        name="reference"
                        required
                        onChange={(e) => {
                          setPaymentDetails({
                            ...paymentDetails,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      />
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">Enter a valid ref!</div>
                    </div>
                    <div className="form-group">
                      <label>Comment</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        name="description"
                        onChange={(e) => {
                          setPaymentDetails({
                            ...paymentDetails,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">
                        Enter a valid comment
                      </div>
                    </div>
                    <div className="row">
                      <div className="col"></div>
                      <div className="col text-right">
                        <button type="submit" className="btn btn-primary">
                          Pay now
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export { Others };
