import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper } from "../../../api/fetcher";
import { updateHMOServicePriceUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { notification } from "../../../utils/notification";
import { isNotEmptyString } from "../../../utils/validationUtils";

 const EditServicePlan = observer(() => {
  const [emptyField, setEmptyField] = useState(true);

  const {
    push,
    location: { state },
  } = useHistory();

  const [payload, setPayload] = useState({
    categoryName: state?.categoryName || "",
    name: state?.name || "",
    price: state?.price || "",
  });

  useEffect(() => {
    const { categoryName, name, price } = payload;
    if (
      isNotEmptyString(categoryName) &&
      isNotEmptyString(name) &&
      isNotEmptyString(price)
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
        serviceId: state?.serviceId,
        hmoHealthPlanId: state?.hmoHealthPlanId,
        id: state?.id,
    };
    console.log(data, 23322);
    try {
      const updateHMOServicePrice = updateHMOServicePriceUrl();
      const updateHMOServicePriceConfig = fetchConfig({
        url: updateHMOServicePrice,
        data: data,
        method: "post",
      });
      const res = await fetchWrapper(updateHMOServicePriceConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        push({
          pathname: `/ManageHealthPlanServices/${state?.hmoHealthPlanId}`,
          state: state?.name,
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
                        <label>Service Category</label>
                        <input
                          className="form-control"
                          type="text"
                          tabIndex={-98}
                          value={state?.categoryName}
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label>Service Name</label>
                        <input
                          className="form-control"
                          type="text"
                          tabIndex={-98}
                          value={payload.name}
                          disabled
                        />
                      </div>                      
                      <div className="form-group">
                        <label>Price</label>
                        <input
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          name="price"
                          value={payload.price}
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
                            Update Service
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
});
export default EditServicePlan