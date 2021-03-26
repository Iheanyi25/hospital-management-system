import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { mutate } from "swr";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import {
  postAdministerDrugMedicationUrl,
  getDrugMedicationsUrl
} from "../../api/URLs";
import { UserContext } from "../../mobx/UserState";
import { notification } from "../../utils/notification";

const $ = window.$;
const AdministerDrugMedications = observer(() => {
  const {
    user: { id },
  } = useContext(UserContext);
  console.log(id, 10100101);
  const getDrugMedications = getDrugMedicationsUrl();
  const getDrugMedicationsConfig = fetchConfig({
    url: getDrugMedications,
    method: "get",
  });

  const [payload, setpayload] = useState({
    timeAdministered: "",
    noOfCartons: "",
    noOfContainers: "",
    noOfUnits:"",
    
  })
  const handleChange = (e) => {
    setpayload({
      ...payload,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    console.log("omo", 1010);
    e.preventDefault();
    const postAdministerDrugMedication = postAdministerDrugMedicationUrl();
    const postAdministerDrugMedicationConfig = fetchConfig({
      url: postAdministerDrugMedication,
      method: "post",
      // data: ,
    });
    try {
      let res = await fetchWrapper(postAdministerDrugMedicationConfig);
      console.log(res, 2021);
      if (res.status === 200) {
        mutate(JSON.stringify(getDrugMedicationsConfig));
        $("#admininster-drugMedication").modal("hide");
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
        id="admininster-drugMedication"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h5 className="text-center">Observation Chart</h5>
              <form className="p-5" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Number of Cartons</label>
                    <input className="form-control" 
                    type="number"
                    name= "noOfCartons"
                    onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Number of Containers</label>
                    <input className="form-control" 
                        type="number"
                        name= "noOfContainers"
                        onChange={handleChange}
                     />
                  </div>
                <div className="form-group">
                    <label>Number of Units</label>
                    <input className="form-control" 
                      type="number"
                      name= "noOfUnits"
                      onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Time Administered</label>
                    <input className="form-control" 
                      type="text"
                      name= "timeAdministered"
                      onChange={handleChange} />
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

export { AdministerDrugMedications };
