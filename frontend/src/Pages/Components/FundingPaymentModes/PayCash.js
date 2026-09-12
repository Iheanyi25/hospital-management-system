import React, { useEffect, useState } from "react";
import { isNotEmptyString } from "../../../utils/validationUtils";

const PayCash = ({ paidSuccessfully, setPaymentParams, amount }) => {
  console.log(amount);
  const [emptyField, setEmptyField] = useState(true);
  useEffect(() => {
    if (isNotEmptyString(amount)) setEmptyField(false);
  }, [amount]);
  const handleChange = (e) => {
    setPaymentParams(e.target.name, e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    paidSuccessfully("", "cash");
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
                        onChange={handleChange}
                        required
                      />
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">
                        Oops! should be numbers only.
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Comment</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        placeholder="Comment"
                        name="paymentDescription"
                        onChange={handleChange}
                        // ref={descriptionReference}
                      />
                      <div className="valid-feedback">Looks good!</div>
                      <div className="invalid-feedback">
                        Enter a valid comment
                      </div>
                    </div>
                    <div className="row">
                      <div className="col"></div>
                      <div className="col text-right">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={emptyField ? true : false}
                        >
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

export { PayCash };
