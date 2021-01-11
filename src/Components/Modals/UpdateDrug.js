import React, { useState } from "react";
import { formatInputDate } from "../../utils/formatInputDate";

const apiUrl = process.env.REACT_APP_API_URL;

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
      let res = await fetch(`${apiUrl}/Pharmacy/UpdateDrug`, {
        headers: { "Content-Type": "application/json-patch+json" },
        method: "POST",
        body: JSON.stringify(payload),
        redirect: "follow",
      });
      console.log(res);
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
    type,
    genericName,
    manufacturer,
    measurment,
    costPricePerContainer,
    containersPerCarton,
    quantityPerContainer,
    expiryDate,
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
                    {type === "tabs" ? (
                      <label>Number of tablets</label>
                    ) : type === "liquid" ? (
                      <label>Number of bottles</label>
                    ) : type === "powder" ? (
                      <label>Number of cans</label>
                    ) : (
                      <label>Number of cannisters</label>
                    )}
                    <input
                      name="url"
                      className="form-control"
                      type="number"
                      name="quantityPerContainer"
                      value={quantityPerContainer}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    {type === "tabs" ? (
                      <label>Number of packets in a carton</label>
                    ) : type === "liquid" ? (
                      <label>Number of bottles/tubes in a carton</label>
                    ) : type === "powder" ? (
                      <label>Number of cannisters in a carton</label>
                    ) : (
                      <label>Number of cans in a carton</label>
                    )}
                    <input
                      name="url"
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
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      className="form-control"
                      type="date"
                      min={formatInputDate()}
                      tabIndex={-98}
                      name="expiryDate"
                      value={expiryDate}
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
