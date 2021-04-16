import React, { useState } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { updateDrugUrl } from "../../api/URLs";

const $ = window.$;

const UpdateDrug = ({ drug, id, update }) => {
  const [payload, setPayload] = useState({
    id: id,
    name: drug.name,
    type: drug.type,
    manufacturer: drug.manufacturer,
    genericName: drug.genericName,
    drugType: drug.drugType,
    measurment: drug.measurment,
    costPricePerContainer: drug.costPricePerContainer,
    containersPerCarton: drug.containersPerCarton,
    quantityPerContainer: drug.quantityPerContainer,
    expiryDate: drug.expiryDate,
  });

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(payload);
    e.preventDefault();
    try {
      const updateDrug = updateDrugUrl();
      const updateDrugConfig = fetchConfig({
        url: updateDrug,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(updateDrugConfig);

      if (res.status === 200) {
        console.log(res);
        update();
        $("#update-drug").modal("hide");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {
    name,
    drugType,
    genericName,
    manufacturer,
    measurment,
    costPricePerContainer,
    containersPerCarton,
    quantityPerContainer,
  } = payload;
  return (
    <div
      className="modal fade"
      id="update-drug"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">{`Update ${drug.name}`}</h5>
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 col-md-6">
                  {" "}
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      className="form-control"
                      type="text"
                      tabIndex={-98}
                      name="name"
                      value={name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Generic Name</label>
                    <input
                      className="form-control"
                      type="text"
                      tabIndex={-98}
                      name="genericName"
                      value={genericName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Manufacturer</label>
                    <input
                      className="form-control"
                      type="text"
                      tabIndex={-98}
                      name="manufacturer"
                      value={manufacturer}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Measurement</label>
                    <input
                      className="form-control"
                      type="text"
                      tabIndex={-98}
                      name="measurment"
                      value={measurment}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  {" "}
                  <div className="form-group">
                    {drugType === "tabs" ? (
                      <label>Number of tablets</label>
                    ) : drugType === "liquid" ? (
                      <label>Number of bottles</label>
                    ) : drugType === "powder" ? (
                      <label>Number of cans</label>
                    ) : (
                      <label>Number of cannisters</label>
                    )}
                    <input
                      className="form-control"
                      type="number"
                      name="quantityPerContainer"
                      value={quantityPerContainer}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    {drugType === "tabs" ? (
                      <label>Number of packets in a carton</label>
                    ) : drugType === "liquid" ? (
                      <label>Number of bottles/tubes in a carton</label>
                    ) : drugType === "powder" ? (
                      <label>Number of cannisters in a carton</label>
                    ) : (
                      <label>Number of cans in a carton</label>
                    )}
                    <input
                      className="form-control"
                      type="number"
                      name="containersPerCarton"
                      value={containersPerCarton}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Cost Price</label>
                    <input
                      className="form-control"
                      type="number"
                      tabIndex={-98}
                      name="costPricePerContainer"
                      value={costPricePerContainer}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col"></div>
              <div className="col text-right">
                <button type="submit" className="btn btn-primary">
                  Update Drug
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { UpdateDrug };
