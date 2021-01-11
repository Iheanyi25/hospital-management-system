import React, { useState } from "react";

const Others = ({
  paidSuccessfully,
  setPaymentParams,
}) => {
  const [userDetails, setUserDetails] = useState({
    modeOfPayment: "",
    transactionRefrence: "",
  });

  const handleChange = (e) => {
    setPaymentParams(e.target.name, e.target.value);
  };
  const handleSubmit = async (e) => {
    const { modeOfPayment, transactionRefrence } = userDetails;
    e.preventDefault();
    console.log(userDetails);
    paidSuccessfully(transactionRefrence, modeOfPayment, true);
  };

  return (
    <div className="table-responsive">
      <div className="main-content-wrap w-50">
        <div className="page-content">
          <div className="row justify-content-center">
            <div className="col col-md-12">
              <div className="card border-light">
                <div className="card-body">
                  <form
                    className="mb-4 p-5 needs-validation"
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <div className="form-group">
                      <label>Amount(NGN)</label>
                      <input
                        className="form-control"
                        type="number"
                        tabIndex={-98}
                        placeholder="Amount"
                        name="amount"
                        required
                        onChange={handleChange}
                      />
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">
                        Oops! should be numbers only.
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Payment Options</label>
                      <select
                        className="form-control"
                        name="modeOfPayment"
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            [e.target.name]: e.target.value,
                          });
                        }}
                      >
                        <option value="" selected disabled>
                          Select a payment option
                        </option>
                        <option value="offline-POS">POS</option>
                        <option value="offline-cheque">Cheque</option>
                        <option value="offline-transfer">Bank transfer</option>
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
                        name="transactionRefrence"
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">Enter a valid ref!</div>
                    </div>
                    <div className="form-group">
                      <label>Comment</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        placeholder="Comment"
                        name="paymentDescription"
                        onChange={handleChange}
                      />
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
};

export { Others };
