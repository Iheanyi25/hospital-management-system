import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { updateHMODrugPriceDrugUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { notification } from "../../../utils/notification";
import { isNotEmptyString } from "../../../utils/validationUtils";

export default function EditDrugInPlan() {
  const [emptyField, setEmptyField] = useState(true);

  const {
    push,
    location: { state },
  } = useHistory();

  const [payload, setPayload] = useState({
    pricePerUnit: state?.pricePerUnit || "",
    pricePerContainer: state?.pricePerContainer || "",
    pricePerCarton: state?.pricePerCarton || "",
  });

  useEffect(() => {
    const { pricePerUnit, pricePerCarton, pricePerContainer } = payload;
    if (
      isNotEmptyString(pricePerUnit) &&
      isNotEmptyString(pricePerCarton) &&
      isNotEmptyString(pricePerContainer)
    ) {
      setEmptyField(false);
    }
  }, [payload]);

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...payload,
      drugId: state?.drugId || "",
      hmoHealthPlanId: state?.healthPlanId,
      id: state?.id,
    };
    try {
      const updateHMODrugPriceDrug = updateHMODrugPriceDrugUrl();
      const updateHMODrugPriceDrugConfig = fetchConfig({
        url: updateHMODrugPriceDrug,
        data: data,
        method: "post",
      });
      const res = await fetchWrapper(updateHMODrugPriceDrugConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        push({
          pathname: `/ManageHealthPlanDrugs/${state?.healthPlanId}`,
          state: state?.planName,
        });
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
    console.log(payload);
  };
  return (
    <>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title mb-0">{`Update Pricing for ${
              state?.name || ""
            }`}</h4>
          </header>
          <div className="page-content w-50 m-auto">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form className="mb-4 p-5" onSubmit={handleSubmit}>
                      <h4 className="text-center">Update Price</h4>
                      <div className="form-group">
                        <label>Drug Name</label>
                        <input
                          className="form-control"
                          type="text"
                          tabIndex={-98}
                          value={state?.name}
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label>Price per unit</label>
                        <input
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          name="pricePerUnit"
                          value={payload.pricePerUnit}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Price per container</label>
                        <input
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          name="pricePerContainer"
                          value={payload.pricePerContainer}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Price per Carton</label>
                        <input
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          name="pricePerCarton"
                          value={payload.pricePerCarton}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="row">
                        <div className="col"></div>
                        <div className="col text-right">
                          <button
                            type="submit"
                            disabled={emptyField ? true : false}
                            className="btn btn-primary"
                          >
                            Add drug
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
      </main>
    </>
  );
}
