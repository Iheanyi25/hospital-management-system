import { observer } from "mobx-react";
import React, { useContext, useState } from "react";
import { mutate } from "swr";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import {
  getDrugsInAnAdmissionInvoiceUrl,
  postAdministerDrugMedicationUrl,
} from "../../api/URLs";
import { UserContext } from "../../mobx/UserState";
import { notification } from "../../utils/notification";

const $ = window.$;
const AdministerDrugMedications = observer(({ admissionId, admissionInvoiceId, drugId }) => {
  const {
    user: { id: initiatorId },
  } = useContext(UserContext);

  const [payload, setpayload] = useState({
    numberOfCartons: "",
    numberOfContainers: "",
    numberOfUnits: "",
  });
  const handleChange = (e) => {
    setpayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    const data = { ...payload, admissionId: admissionId, drugId, initiatorId };
    console.log(payload, "omo", 1010);
    e.preventDefault();
    console.log(data);
    const postAdministerDrugMedication = postAdministerDrugMedicationUrl();
    const postAdministerDrugMedicationConfig = fetchConfig({
      url: postAdministerDrugMedication,
      method: "post",
      data: data,
    });
    try {
      let res = await fetchWrapper(postAdministerDrugMedicationConfig);
      if (res.status === 200) {
        const invoicesUrl = getDrugsInAnAdmissionInvoiceUrl(admissionInvoiceId, 1, 50);
        const getAdmissionInvoiceConfig = fetchConfig({
          url: invoicesUrl,
          method: "get",
        });
        console.log(getAdmissionInvoiceConfig,23434)
        await mutate(JSON.stringify(getAdmissionInvoiceConfig));
        notification.success({ message: res?.data?.message });
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
    $("#admininster-drugMedication").modal("hide");
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
              <h5 className="text-center">Administer Drug</h5>
              <form className="p-5" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Number of Cartons</label>
                  <input
                    className="form-control"
                    type="number"
                    name="numberOfCartons"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Number of Containers</label>
                  <input
                    className="form-control"
                    type="number"
                    name="numberOfContainers"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Number of Units</label>
                  <input
                    className="form-control"
                    type="number"
                    name="numberOfUnits"
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

export { AdministerDrugMedications };
