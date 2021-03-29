import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
// import { mutate } from "swr";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { postDischargePatientUrl } from "../../api/URLs";
import { UserContext } from "../../mobx/UserState";
import { notification } from "../../utils/notification";

const $ = window.$;
const DischargePatients = observer(() => {
  const {
    user: { id },
  } = useContext(UserContext);
  

  const [payload, setpayload] = useState({
    dischargeNotes: "",
    
  });
  const handleChange =(e)=>{
      setpayload({
          ...payload,
          [e.target.name]: e.target.value,
      });
  }

  const handleSubmit = async (e) => {
    console.log("omo", 1010);
    e.preventDefault();
    const postDischargePatient = postDischargePatientUrl();
    const postDischargePatientConfig = fetchConfig({
      url: postDischargePatient,
      method: "post",
    //   data: data,
    });
    try {
      let res = await fetchWrapper(postDischargePatientConfig);
      console.log(res, 2021);
      if (res.status === 200) {
        // mutate(JSON.stringify(getObservationChartConfig));
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
        id="discharge-patient"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h5 className="text-center">Discharge Patient</h5>
              <form className="p-5" onSubmit={handleSubmit}>
                <div className="form-group"> 
                  <label>Discharge Notes</label>{" "}
                  <textarea
                    className="form-control"
                    placeholder="Enter discharge note"
                    name="dischargeNotes"
                    rows={3}
                    required
                    onChange={handleChange}
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

export { DischargePatients };
