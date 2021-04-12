import React, { useContext } from "react";
import {
    getDoctorAvailabilityUrl,
    updateDoctorAvailabilityUrl,
  } from "../../../api/URLs";
  import { fetchConfig } from "../../../api/fetchConfig";
  import { fetchWrapper, useRequest } from "../../../api/fetcher";
  import { UserContext } from "../../../mobx/UserState";
import { observer } from "mobx-react";
import { notification } from "../../../utils/notification";

export default function Availability() {
  return (
    <div>
      <AvailabilitySection />
      <MarkAvailability/>
    </div>
  );
}

const AvailabilitySection = () => {
    return (
      <li className="cursor pt-2 nav-item">
        <div
          className="cursor menu-item nav-link panel-heading collapsed"
          data-toggle="collapse"
          data-target="#subMenuAvailability"
          aria-expanded="false"
          aria-controls="collapseAvailability"
        >
          <span className="group-title">Availability</span>
        </div>
      </li>
    );
  };

const MarkAvailability = observer(() => {
    const { user : { id }} = useContext(UserContext);
    const getDoctorAvailability = getDoctorAvailabilityUrl(id);
    const getDoctorAvailabilityConfig = fetchConfig({
      url: getDoctorAvailability,
      method: "get",
    });
    const { data, mutate } =  useRequest(getDoctorAvailabilityConfig, {
        revalidateOnFocus: false,
      });
      console.log(data,666)
      const setAvailability = async (e) => {
        e.preventDefault();
        
        try {
          const updateDoctorAvailability = updateDoctorAvailabilityUrl(id);
          const updateDoctorAvailabilityConfig = fetchConfig({
            url: updateDoctorAvailability,
            method: "post",
          });
          const res = await fetchWrapper(updateDoctorAvailabilityConfig);
          await mutate()
          notification.success({ message: res.data.message, duration: 1000 });
        } catch (error) {
            console.log(error);
            notification.error({ message: error?.response?.data.message });
        }
      }

  return (
    <div className="collapse" id="subMenuAvailability">
      <li className="menu-item">
        <div className="form-group text-center">
          <div className="custom-control custom-switch mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              id="control2"
              checked={data?.isAvailable}
              onClick={setAvailability}
            />{" "}
            <label className="custom-control-label" for="control2">
              {data?.isAvailable ? "Available" : "Not Available"}
            </label>
          </div>
        </div>
      </li>
    </div>
  );
})

