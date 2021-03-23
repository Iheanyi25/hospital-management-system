import { observer } from "mobx-react";
import React, { useContext } from "react";
import { mutate } from "swr";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import {
  getObservationChartUrl,
  postObservationChartUrl,
} from "../../api/URLs";
import { UserContext } from "../../mobx/UserState";
import { notification } from "../../utils/notification";

const $ = window.$;
const UpdateObservationChart = observer(() => {
  const {
    user: { id },
  } = useContext(UserContext);
  console.log(id, 10100101);
  const getObservationChart = getObservationChartUrl();
  const getObservationChartConfig = fetchConfig({
    url: getObservationChart,
    method: "get",
  });

  // const [state, setstate] = useState({
  //   bloodPressure: "",
    
  // })

  const handleSubmit = async (e) => {
    console.log("omo", 1010);
    e.preventDefault();
    const postObservationChart = postObservationChartUrl();
    const postObservationChartConfig = fetchConfig({
      url: postObservationChart,
      method: "post",
      // data: ,
    });
    try {
      let res = await fetchWrapper(postObservationChartConfig);
      console.log(res, 2021);
      if (res.status === 200) {
        mutate(JSON.stringify(getObservationChartConfig));
        $("#update-observation").modal("hide");
        notification.success({ message: res?.data?.message });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="update-observation"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h5 className="text-center">Observation Chart</h5>
              <form className="p-5" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label>Blood Pressure</label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Temperature</label>
                    <input className="form-control" type="text" />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label>Pulse</label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Respiration</label>
                    <input className="form-control" type="text" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Medications</label>{" "}
                  <textarea
                    className="form-control"
                    placeholder="Enter Result"
                    rows={3}
                  />
                </div>
                <div className="form-group">
                  <label>Remarks</label>{" "}
                  <textarea
                    className="form-control"
                    placeholder="Enter Result"
                    rows={3}
                  />
                </div>

                <div className="row mt-4">
                  <div className="col text-left">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col text-right">
                    <button type="submit" className="btn btn-primary">
                      {" "}
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export { UpdateObservationChart };
