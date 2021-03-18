import React, { useState, useContext } from "react";
import { fetchWrapper } from "../../api/fetcher";
import { fetchConfig } from "../../api/fetchConfig";
import { createAdmissionsNoteUrl } from "../../api/URLs";
import { notification } from "../../utils/notification";
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";

const $ = window.$;

const UpdateDoctorsNotes = observer(({ admissionId, mutate }) => {
  const {
    user: { id: doctorId },
  } = useContext(UserContext);
  const [payload, setpayload] = useState({
    note: "",
    admissionId,
    doctorId,
  });
  const handleChange = (e) => {
    setpayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(payload);
    try {
      const createAdmissionsNote = createAdmissionsNoteUrl();
      const createAdmissionsNoteConfig = fetchConfig({
        url: createAdmissionsNote,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(createAdmissionsNoteConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        mutate();
        $("#doctors-note").modal("hide");
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
  };

  return (
    <div
      className="modal fade"
      id="doctors-note"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5>Please enter a note</h5>
            <form className="" onSubmit={handleSubmit}>
              <div className="form-group">
                <textarea
                  className="form-control"
                  type="text"
                  tabIndex={-98}
                  placeholder="Enter doctor's note"
                  name="note"
                  onChange={handleChange}
                  required
                />
                <div className="row mt-4 mx-0 p-0">
                  <div className="col"></div>
                  <div className="col text-right">
                    <button
                      type="submit"
                      onSubmit={handleSubmit}
                      className="btn btn-primary"
                    >
                      Update note
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});
export default UpdateDoctorsNotes;
