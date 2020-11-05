import React from "react";

const Others = () => {
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
                >
                  <div className="form-group">
                    <label>Amount(NGN)</label>
                    <input
                      className="form-control"
                      type="number"
                      tabIndex={-98}
                      name="name"
                      defaultValue="5000"
                      required
                    />
                    <div className="valid-feedback">
                      Looks good!
                    </div>
                    <div className="invalid-feedback">
                      Oops! should be numbers only.
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Comment</label>
                    <select
                      className="form-control"
                      name="serviceCategoryId"
                    >
                      <option>POS</option>
                      <option>Cash</option>
                    </select>
                    <div className="valid-feedback">
                      Looks good!
                    </div>
                    <div className="invalid-feedback">
                      Enter a valid comment
                    </div>
                  </div>
                  <div className="form-group">
                    <label>
                      Tranfer Reference Number
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      tabIndex={-98}
                      name="name"
                      required
                    />
                    <div className="valid-feedback">
                      Looks good!
                    </div>
                    <div className="invalid-feedback">
                      Enter a valid ref!
                    </div>
                  </div>
                  <div className="row">
                    <div className="col"></div>
                    <div className="col text-right">
                      <button
                        type="submit"
                        className="btn btn-primary"
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

export { Others };
