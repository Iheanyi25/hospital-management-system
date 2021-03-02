import { observer } from "mobx-react";
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchConfig } from "../../../../api/fetchConfig";
import { fetchWrapper } from "../../../../api/fetcher";
import { postServiceRequestUrl } from "../../../../api/URLs";
import { UserContext } from "../../../../mobx/UserState";
import { isNotEmptyString } from "../../../../utils/validationUtils";

const UploadLabResultForm = observer(({ serviceRequest, setNotification }) => {
  const {
    user: { userType },
  } = useContext(UserContext);
  const formRef = React.useRef();
  const history = useHistory();
  const [state, setState] = useState({
    result: "",
    images: [],
    additionalComments: "",
  });
  const [loading, setLoading] = useState(false);
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

  const { result, additionalComments, images } = state;
  const uploadServiceRequestResult = async (e) => {
    e.preventDefault();
    //append others
    if (formRef.current.reportValidity()) {
      setLoading(true);
      const requestResultData = new FormData();
      requestResultData.append("serviceRequestId", serviceRequest.id);
      requestResultData.append("result", result);
      requestResultData.append("additionalComments", additionalComments);

      images.forEach((image) => requestResultData.append("images", image));

      const serviceRequesyUrl = postServiceRequestUrl();
      const postServiceRequest = fetchConfig({
        url: serviceRequesyUrl,
        method: "post",
        data: requestResultData,
      });
      try {
        const resServiceRequestUpdate = await fetchWrapper(postServiceRequest);
        if (resServiceRequestUpdate.status === 200) {
          setNotification({
            show: true,
            message: resServiceRequestUpdate.data.message,
            isError: false,
          });
          history.push({
            pathname:
              userType === "Admin"
                ? `/AdminViewLabResults/${serviceRequest.id}`
                : `/LabViewLabResults/${serviceRequest.id}`,
            state: resServiceRequestUpdate.data.serviceRequestResult.id,
          });
        } else {
          setNotification({
            show: true,
            message: resServiceRequestUpdate.data.message,
            isError: true,
          });
        }
      } catch (error) {
        console.log(error);
        setNotification({
          show: true,
          message: "a fatal error occured",
          isError: true,
        });
      }
      setLoading(false);
    }
  };

  return (
    <form className="mb-4" onSubmit={uploadServiceRequestResult} ref={formRef}>
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
});

export default UploadLabResultForm;
