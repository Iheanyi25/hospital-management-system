import React from "react";
import { Link } from "react-router-dom";
import empty from "../../../../../assets/img/empty.svg";
import edit from "../../../../../assets/img/edit.svg";
import { UpdateBasePrice } from "../../../../../Components/Modals/UpdateBasePrice";
import formatAmount from '../../../../../utils/formatAmount'

const BasePrice = ({ basePrice, drugId, mutate }) => {
  return (
    <>
      {Object.values(basePrice).every((value) => value === 0) ? (
        <div className="text-center" style={{ marginTop: "200px" }}>
          <img src={empty} alt="empty" />
          <p className="text-secondary mb-0 mt-3">
            Set prices for different health plans here
          </p>
          <Link to="#" data-toggle="modal" data-target="#update-base-price">
            Create new price
          </Link>
        </div>
      ) : (
        <div className="card border-light p-4 w-50 m-auto">
          <div className="card-body">
            <div className="d-flex justify-content-between border-bottom">
              <h6 className="font-weight-bold">Base Price</h6>
              <img
                src={edit}
                data-toggle="modal"
                data-target="#update-base-price"
                alt="reset"
                className="ml-3"
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="row">
              <div className="col-12 col-md-6">
                <div>
                  <h6 className="mb-2">Price Per Pack (NGN)</h6>
                  <p>{formatAmount(basePrice?.defaultPricePerUnit)}</p>
                </div>
                <div>
                  <h6 className="mb-2">DPrice Per Pill (NGN)</h6>
                  <p>{formatAmount(basePrice?.defaultPricePerContainer)}</p>
                </div>
                <div>
                  <h6 className="mb-2">Price Per Carton (NGN)</h6>
                  <p>{formatAmount(basePrice?.defaultPricePerCarton)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <UpdateBasePrice basePrice={basePrice} drugId={drugId} mutate={mutate} />
    </>
  );
};

export { BasePrice };
