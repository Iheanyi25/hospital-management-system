import React from 'react'

export default function Powder({handleChange, drugTypeDetails}) {
    return (
        <>
        <div className="form-group">
          <label>Volume (grams) per can</label>
          <input
            className="form-control"
            type="number"
            tabIndex={-98}
            placeholder="eg. 100"
            name="quantityPerContainer"
            onChange={handleChange}
            value={drugTypeDetails.quantityPerContainer}
            required
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Please provide a valid name.</div>
        </div>
        <div className="form-group">
          <label>Number of cans in a carton</label>
          <input
            className="form-control"
            type="number"
            tabIndex={-98}
            placeholder="eg. 100"
            name="containersPerCarton"
            onChange={handleChange}
            value={drugTypeDetails.containersPerCarton}
            required
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Please provide a valid name.</div>
        </div>
        <div className="form-group">
          <label>Measurement</label>
          <input
            className="form-control"
            type="text"
            tabIndex={-98}
            placeholder="eg. 100mg"
            name="measurment"
            onChange={handleChange}
            value={drugTypeDetails.measurment}
            required
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Please provide a valid name.</div>
        </div>
        <div className="form-group">
          <label>Cost Price per can (NGN)</label>
          <input
            className="form-control"
            type="number"
            tabIndex={-98}
            placeholder="eg. 100"
            name="costPricePerContainer"
            onChange={handleChange}
            value={drugTypeDetails.costPricePerContainer}
            required
          />
          <div className="valid-feedback">Looks good!</div>
          <div className="invalid-feedback">Please provide a valid name.</div>
        </div>
      </>
    )
}
