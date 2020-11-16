import React, { useState, useEffect } from "react";
import formatAmount from "../../../../utils/formatAmount";

const PayCash = ({ id, cost }) => {
  const [userDetails, setUserDetails] = useState({
    accountId: "",
    amount: "",
    paymentDescription: "",
  });

  useEffect(() => {
    setUserDetails({ ...userDetails, accountId: id, amount: cost });
  }, [id, cost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userDetails);
    // if (userDetails.amount !== "") {
    //   try {
    //     let res = await fetch(
    //       `https://hms-tenece.azurewebsites.net/api/Admin/Account/FundAccount`,
    //       {
    //         headers: { "Content-Type": "application/json-patch+json" },
    //         method: "POST",
    //         body: JSON.stringify(userDetails),
    //         redirect: "follow",
    //       }
    //     );
    //     if (res.status === 200) {
    //       handleSuccess(true);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };

  return (
    <div className="table-responsive">
      <div className="main-content-wrap w-50">
        <div className="page-content">
          <div className="row justify-content-center">
            <div className="col col-md-12">
              <div className="card border-light">
                <div className="card-body">
                  <form className="mb-4 p-5 needs-validation" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                      <label>Amount(NGN)</label>
                      <input
                        className="form-control"
                        type="number"
                        tabIndex={-98}
                        name="amount"
                        defaultValue={cost}
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        disabled
                      />
                    </div>
                    <div className="form-group">
                      <label>Comment</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        name="paymentDescription"
                        onChange={(e) => {
                          setUserDetails({
                            ...userDetails,
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
};

export { PayCash };
