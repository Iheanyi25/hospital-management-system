import { observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import { isNotEmptyString } from "../../../../utils/validationUtils";

const UploadLabResultForm = observer(
  ({ serviceRequest, uploadServiceRequestResult, loading }) => {
    const [state, setState] = useState({
      result: "",
      images: [],
      additionalComments: "",
    });
    const [emptyField, setEmptyField] = useState(true);
    useEffect(() => {
      const { result, additionalComments } = state;
      if (isNotEmptyString(result) && isNotEmptyString(additionalComments)) {
        setEmptyField(false);
      }
    }, [state]);
    const handleChange = (name, e) => {
      e.persist();
      setState((state) => ({ ...state, [name]: e.target.value }));
    };

    const fileSelectedHandler = (e) => {
      setState({ images: [...state.images, ...e.target.files] });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      uploadServiceRequestResult(state);
    };
    const { result, additionalComments } = state;

    return (
      <form className="mb-4" onSubmit={handleSubmit}>
        <h4 className="text-center">Upload Results for (Lab) Services</h4>
        <div className="form-group">
          <label>Service Category</label>{" "}
          <input
            className="form-control"
            type="text"
            placeholder=""
            value={serviceRequest?.service.serviceCategory.name}
            disabled
          />
        </div>
        <div className="form-group">
          <label>Service Name</label>{" "}
          <input
            className="form-control"
            type="text"
            placeholder=""
            value={serviceRequest?.service.name}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Result</label>{" "}
          <textarea
            className="form-control"
            placeholder="Enter Result"
            rows={3}
            onChange={(e) => handleChange("result", e)}
            value={result}
            required
          />
        </div>
        <div className="form-group">
          <label>Images(If Any)</label>{" "}
          <input
            className="form-control"
            type="file"
            multiple
            placeholder=""
            onChange={(e) => fileSelectedHandler(e)}
            name="image"
          />
        </div>

        <div className="form-group">
          <label>Additonal Comments</label>{" "}
          <textarea
            className="form-control"
            placeholder="Additional Comments"
            rows={3}
            onChange={(e) => handleChange("additionalComments", e)}
            value={additionalComments}
          />
        </div>
        <div className="row ">
          <div className="col">
            <button
              type="submit"
              className="btn btn-primary d-flex ml-auto"
              disabled={emptyField || loading ? true : false}
            >
              {loading ? "Saving..." : "Save Result"}
            </button>
          </div>
        </div>
      </form>
    );
  }
);

export default UploadLabResultForm;
