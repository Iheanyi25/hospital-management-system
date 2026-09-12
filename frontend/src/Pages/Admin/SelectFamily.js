import React, { useState, useEffect } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import { getAllAccountsUrl } from "../../api/URLs";
import { SelectableTable } from "../../Components";
import { AddFamily } from "../../Components/Modals";

const SelectFamily = ({
  payload,
  stageSetter,
  currentStage,
  submitFunction,
  healthPlanId,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [totalIds, setTotalIds] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const getAllAccounts = getAllAccountsUrl(pageNumber, pageSize);
  const getAllAccountsConfig = fetchConfig({
    url: getAllAccounts,
    method: "get",
  });
  const { data, error, mutate } = useRequest(getAllAccountsConfig, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    console.log(data);
    if (data && data?.accounts && data.accounts.length > 0) {
      setTotalIds(
        data.accounts.reduce(
          (accumulator, account) => [...accumulator, account.id],
          []
        )
      );
    }
  }, [data]);

  const goBack = () => {
    stageSetter(currentStage - 1);
  };

  const handleSubmit = async () => {
    let data = payload;

    if (selectedValue) {
      data.accountId = selectedValue;
      submitFunction(data);
    }
  };

  let dataTable = [];
  if (data) {
    dataTable = data.accounts.map((account, index) => {
      return {
        "#": ++index,
        Name: account?.name,
        "Phone Number": account?.phoneNumber ?? "Not set",
      };
    });
  }
  if (error) return <div>failed to load</div>;
  return (
    <>
      <div className="card border-light">
        <div className="card-body">
          <div className="table-responsive">
            <h5 className="text-center">
              Add this Patient to a Family Account
            </h5>

            <div className="row m-0">
              <div className="col-12">
                <div className="d-flex justify-content-between my-5">
                  <div className="align-items-end d-flex">
                    <button
                      type="submit"
                      data-toggle="modal"
                      data-target="#add-family"
                      className="btn btn-primary"
                    >
                      + Create a New Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {data && (
              <SelectableTable
                content={dataTable}
                paginationDetails={data.paginationDetails}
                totalIds={totalIds}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                pageSize={pageSize}
                setPageSize={setPageSize}
              />
            )}
            <div className="row m-0">
              <div className="col-12 d-flex justify-content-between">
                <button onClick={goBack} className="btn btn-muted">
                  Back
                </button>
                <button onClick={handleSubmit} className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddFamily healthPlanId={healthPlanId} callbackFromProps={mutate} />
    </>
  );
};

export default SelectFamily;
