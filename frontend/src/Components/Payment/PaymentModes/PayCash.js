import { observer } from "mobx-react";
import React, { useState, useContext } from "react";
import { UserContext } from "../../../mobx/UserState";

const PayCash = observer(({ details, paidSuccessfully }) => {
  const {
    user: { id },
  } = useContext(UserContext);
  const [description, setDescription] = useState("");
  const { amount } = details;
  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    paidSuccessfully("", "cash", description.description, id);
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
                        name="name"
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
                      <label>Comment</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        name="description"
                        onChange={(e) => {
                          setDescription({
                            ...description,
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

export { PayCash };
