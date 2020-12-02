import React from "react";

const UpdateDrug = ({ drug }) => {
  // console.log(drug);
  const { name, type, containersPerCarton, quantityPerContainer } = drug;
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
            <h5 className="text-center">{`Update ${name}`}</h5>
            <form className="p-5">
              <div className="form-group">
                <label>Name</label>
                <input
                  className="form-control"
                  type="text"
                  tabIndex={-98}
                  name="name"
                />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input
                  className="form-control"
                  type="text"
                  tabIndex={-98}
                  placeholder="Name of Ward"
                  name="name"
                />
              </div>
              <div className="form-group">
                <label>Generic Name</label>
                <input
                  className="form-control"
                  type="text"
                  tabIndex={-98}
                  placeholder="Name of Ward"
                  name="name"
                />
              </div>
              <div className="form-group">
                <label>Manufacturer</label>
                <input
                  className="form-control"
                  type="text"
                  tabIndex={-98}
                  placeholder="Name of Ward"
                  name="name"
                />
              </div>
              <div className="form-group">
                <label>Drug Type</label>
                <input
                  className="form-control"
                  type="text"
                  tabIndex={-98}
                  placeholder="Name of Ward"
                  name="name"
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
                  value={quantityPerContainer}
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
                  value={containersPerCarton}
                />
              </div>
              <div className="form-group">
                {type === "tabs" ? (
                  <label>Price per parcket/container (NGN)</label>
                ) : type === "liquid" ? (
                  <label>Number of bottles</label>
                ) : type === "powder" ? (
                  <label>Price per can (NGN)</label>
                ) : (
                  <label>Price per cannister (NGN)</label>
                )}
                <input
                  name="url"
                  className="form-control"
                  type="number"
                  disabled
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
