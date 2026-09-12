import React, { useState } from "react";
import { fetchConfig } from "../../../../../api/fetchConfig";
import { useRequest, fetchWrapper } from "../../../../../api/fetcher";
import {
  deleteDrugBatchUrl,
  getDrugBatchByDrugUrl,
} from "../../../../../api/URLs";
import edit from "../../../../../assets/img/edit.svg";
import remove from "../../../../../assets/img/remove.svg";
import {
  CreateDrugBatch,
  EditDrugBatch,
  PageLoader,
} from "../../../../../Components";
import EmptyState from "../../../../../Components/EmptyState/EmptyUploadState";
import formatAmount from "../../../../../utils/formatAmount";
import formatDate from "../../../../../utils/formatDate";
import { notification } from "../../../../../utils/notification";

const DrugBatch = ({ drugId }) => {
  const [batch, setBatch] = useState({});
  const getDrugBatchByDrug = getDrugBatchByDrugUrl(drugId);
  const getDrugBatchByDrugConfig = fetchConfig({
    url: getDrugBatchByDrug,
    method: "get",
  });
  const { data, mutate } = useRequest(getDrugBatchByDrugConfig, {
    revalidateOnFocus: false,
  });

  const deleteBatch = async (id) => {
    console.log(id);
    const deleteUrl = deleteDrugBatchUrl();
    const deleteDrugPricesConfig = fetchConfig({
      url: deleteUrl,
      method: "post",
      data: { id },
    });
    try {
      let res = await fetchWrapper(deleteDrugPricesConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        mutate();
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
    console.log(data);
  };

  return (
    <>
      {!data ? (
        <PageLoader />
      ) : data.drugBatch.length === 0 ? (
        <div style={{ marginTop: "200px" }}>
          <EmptyState
            message="No drug in inventory"
            target="#create-batch"
            targetDescription="Add new batch"
          />
        </div>
      ) : (
        <>
          <div className="text-right">
            <button
              data-toggle="modal"
              data-target="#create-batch"
              className="btn btn-primary"
            >
              Enter new batch
            </button>
          </div>
          <div className="row p-5">
            {data?.drugBatch.map(
              ({ quantityInStock, expiryDate, id }, index) => (
                <div className="col-12 col-md-6" key={index}>
                  <div className="card border-light p-4">
                    <div className="card-body">
                      <div className="d-flex justify-content-between border-bottom">
                        <h6 className="font-weight-bold">
                          {/* {price.healthPlan.name} */}
                        </h6>
                        <div className="mt-4">
                          <img
                            src={edit}
                            data-toggle="modal"
                            data-target="#edit-batch"
                            alt="edit"
                            className="mr-2"
                            onClick={() => {
                              setBatch({ quantityInStock, expiryDate, id });
                            }}
                            style={{ cursor: "pointer" }}
                          />
                          <img
                            src={remove}
                            alt="remove"
                            className="mt-1"
                            onClick={() => {
                              deleteBatch(id);
                            }}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div>
                            <h6 className="mb-2">Quantity in stock</h6>
                            <p>{formatAmount(quantityInStock) ?? "N/A"}</p>
                          </div>
                          <div>
                            <h6 className="mb-2">Expiry date</h6>
                            <p>{formatDate(expiryDate) ?? "N/A"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </>
      )}
      <CreateDrugBatch drugId={drugId} mutate={mutate} />
      <EditDrugBatch drugId={drugId} mutate={mutate} batch={batch} />
    </>
  );
};

export { DrugBatch };
