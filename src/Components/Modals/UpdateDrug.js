import React, { useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

const $ = window.$;

const UpdateDrug = ({ drug, id, fetchDrug }) => {
  const [payload, setPayload] = useState({
    id: id,
    name: drug.name,
    title: drug.title,
    type: drug.type,
    manufacturer: drug.manufacturer,
    genericName: drug.genericName,
    genericName: drug.genericName,
    drugType: drug.drugType,
    containersPerCarton: drug.containersPerCarton,
    quantityPerContainer: drug.quantityPerContainer,
  });

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
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
        fetchDrug();
        $("#update-drug").modal("hide");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const {
    name,
    title,
    type,
    genericName,
    manufacturer,
    drugType,
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
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">{`Update ${drug.name}`}</h5>
            <form className="p-5" onSubmit={handleSubmit}>
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
                <label>Title</label>
                <input
                  className="form-control"
                  type="text"
                  tabIndex={-98}
                  name="title"
                  value={title}
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
                <label>Drug Type</label>
                <input
                  className="form-control"
                  type="text"
                  tabIndex={-98}
                  name="drugType"
                  value={drugType}
                  onChange={handleChange}
                />
              </div>
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
