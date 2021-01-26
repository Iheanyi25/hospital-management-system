import { observer } from "mobx-react";
import React, { useContext } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getPatientAccountUrl } from "../../../api/URLs";
import { UserContext } from "../../../mobx/UserState";
import formatAmount from "../../../utils/formatAmount";
import EmptyUploadState from "../../EmptyState/EmptyUploadState";

const PayFromAccount = observer(({ details, paidSuccessfully, patientId }) => {
  const {
    user: { id },
  } = useContext(UserContext);
  const getPatientAccount = getPatientAccountUrl(patientId);
  const getPatientAccountConfig = fetchConfig({
    url: getPatientAccount,
    method: "get",
  });
  console.log(getPatientAccountConfig);
  const { data } = useRequest(getPatientAccountConfig, {
    revalidateOnFocus: false,
  });
  console.log(data);
  const account = data?.account;
  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    paidSuccessfully("", "Account", "Paid with account", id);
  };

  return (
    <div className="table-responsive">
      <div className="main-content-wrap">
        <div className="page-content">
          <div className="row justify-content-center">
            <div className="col col-md-12">
              <div className="card border-light">
                <div className="card-body">
                  {account?.accountBalance < details.amount ? (
                    <EmptyUploadState
                      message={`Sorry, you currently have NGN ${formatAmount(
                        account?.accountBalance
                      )} in your account and can't complete this transaction`}
                    />
                  ) : (
                    <form
                      className="mb-4 p-5 needs-validation"
                      onSubmit={handleSubmit}
                      noValidate
                    >
                      <h5 className="text-center">
                        Account balance:{" "}
                        <span className="text-info">
                          {formatAmount(account?.accountBalance)}
                        </span>
                      </h5>
                      <div className="form-group">
                        <label>Amount(NGN)</label>
                        <input
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          name="name"
                          value={details.amount}
                          disabled
                          required
                        />
                        <div className="valid-feedback">Looks good!</div>
                        <div className="invalid-feedback">
                          Oops! should be numbers only.
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export { PayFromAccount };
