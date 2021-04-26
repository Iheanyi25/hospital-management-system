import React, { useState } from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../../../../api/fetchConfig";
import { useRequest, fetchWrapper } from "../../../../../api/fetcher";
import { getDrugPricesByDrugUrl, deleteDrugPricesUrl } from "../../../../../api/URLs";
import edit from "../../../../../assets/img/edit.svg";
import remove from "../../../../../assets/img/remove.svg";
import { PageLoader } from "../../../../../Components";
import EmptyState from "../../../../../Components/EmptyState/EmptyUploadState";
import { CreateHealthPlanPrice } from "../../../../../Components/Modals/CreateHealthPlanPrice";
import { EditHealthPlanPrice } from "../../../../../Components/Modals/EditHealthPlanPrice";
import formatAmount from "../../../../../utils/formatAmount";
import { notification } from "../../../../../utils/notification";

const HealthPlanPrice = ({ drugId, drugType }) => {
  const [healthPlanPrice, setHealthPlanPrice] = useState({});
  const drugPricesUrl = getDrugPricesByDrugUrl(drugId);
  const getDrugPricesConfig = fetchConfig({
    url: drugPricesUrl,
    method: "get",
  });
  const { data, mutate } = useRequest(getDrugPricesConfig, {
    revalidateOnFocus: false,
  });
  const prices = data?.drugPrices;

  const deleteHealthPlanPrice = async (id) => {
    console.log(id);
    const deleteUrl = deleteDrugPricesUrl();
    const deleteDrugPricesConfig = fetchConfig({
      url: deleteUrl,
      method: "delete",
      data: { id: id },
    });
    try {
      let res = await fetchWrapper(deleteDrugPricesConfig);
      if (res.status) {
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
      ) : prices.length === 0 ? (
        <div style={{ marginTop: "200px" }}>
          <EmptyState
            message="Set prices for different health plans here"
            target="#create-healthplan-price"
            targetDescription="Create new price"
          />
        </div>
      ) : (
        <>
          <div className="text-right">
            <Link
              to="#"
              data-toggle="modal"
              data-target="#create-healthplan-price"
              className="btn btn-primary"
            >
              Create health plan price
            </Link>
          </div>
          <div className="row p-5">
            {prices?.map((price, index) => (
              <div className="col-12 col-md-6" key={index}>
                <div className="card border-light p-4">
                  <div className="card-body">
                    <div className="d-flex justify-content-between border-bottom">
                      <h6 className="font-weight-bold">
                        {price.healthPlan.name}
                      </h6>
                      <div className="mt-4">
                        <img
                          src={edit}
                          data-toggle="modal"
                          data-target="#edit-healthplan-price"
                          alt="edit"
                          className="mr-2"
                          onClick={() => {
                            setHealthPlanPrice(price);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                        <img
                          src={remove}
                          alt="remove"
                          className="mt-1"
                          onClick={() => {
                            deleteHealthPlanPrice(price.id);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div>
                          <h6 className="mb-2">{`Price per ${
                            drugType === "tabs"
                              ? "tablet"
                              : drugType === "liquid"
                              ? "bottle"
                              : drugType === "powder"
                              ? "can"
                              : "cannister"
                          } (NGN)`}</h6>
                          <p>{formatAmount(price?.pricePerUnit) ?? ""}</p>
                        </div>
                        <div>
                          <h6 className="mb-2">Price per pack (NGN)</h6>
                          <p>{formatAmount(price?.pricePerContainer) ?? ""}</p>
                        </div>
                        <div>
                          <h6 className="mb-2">Price per carton (NGN)</h6>
                          <p>{formatAmount(price?.pricePerCarton) ?? ""}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <CreateHealthPlanPrice drugId={drugId} mutate={mutate} />
      <EditHealthPlanPrice healthPlanPrice={healthPlanPrice} mutate={mutate} />
    </>
  );
};

export { HealthPlanPrice };
