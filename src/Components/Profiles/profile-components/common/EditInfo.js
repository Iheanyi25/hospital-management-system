import React, { useState } from "react";
import { fetchConfig } from "../../../../api/fetchConfig";
import { fetchWrapper } from "../../../../api/fetcher";
import {
  updateLabTechnicianBasicInfoUrl,
  updateLabTechnicianContactDetailsUrl,
  updatePharmacistBasicInfoUrl,
  updatePharmacistContactDetailsUrl,
  updateAccountantBasicInfoUrl,
  updateAccountantContactDetailsUrl,
  updateAdminBasicInfoUrl,
  updateAdminContactDetailsUrl,
  updateNurseBasicInfoUrl,
  updateNurseContactDetailsUrl,
  updateBasicInfoHMOAdminUrl,
  updateContactDetailsHMOAdminUrl,
  updateBasicInfoWardPersonnelUrl,
  updateContactDetailsWardPersonnelUrl,
} from "../../../../api/URLs";
import { notification } from "../../../../utils/notification";
import ProfileInfoForm from "../common/ProfileInfoForm";
const $ = window.$;

export default function EditInfo({
  otherDetails,
  userId: userProfileId,
  primaryDetails,
  mutate,
}) {
  const [details, setDetails] = useState({
    userId: userProfileId,
    phoneNumber: primaryDetails.phoneNumber || "",
    email: primaryDetails.email || "",
    dateOfBirth: otherDetails.dateOfBirth || "",
    gender: otherDetails.gender || "",
    address: otherDetails.address || "",
    zipCode: otherDetails.zipCode || "",
    city: otherDetails.city || "",
    state: otherDetails.state || "",
    country: otherDetails.country || "",
  });
  console.log(primaryDetails, 33333);

  const handleChange = (e) => {
    e.persist();
    setDetails((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const { userId, dateOfBirth, gender, ...contactInfo } = details;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, otherNames, userType } = primaryDetails;
    const { id, basic, contact } = getUrls[userType.toLowerCase()];
    const basicInfoUrl = basic;
    const postBasicInfoUrl = fetchConfig({
      url: basicInfoUrl,
      method: "post",
      data: {
        [id]: userId,
        gender,
        dateOfBirth,
        firstName,
        lastName,
        otherNames,
        age: otherDetails.age,
      },
    });

    const contactDetailsUrl = contact;
    const postContactDetails = fetchConfig({
      url: contactDetailsUrl,
      method: "post",
      data: { [id]: userId, ...contactInfo },
    });

    try {
      const resBasicInfoUpdate = await fetchWrapper(postBasicInfoUrl);
      const resContactDetailsUpdate = await fetchWrapper(postContactDetails);
      console.log(resBasicInfoUpdate, resContactDetailsUpdate, 7777);
      if (
        resBasicInfoUpdate.status === 200 &&
        resContactDetailsUpdate.status === 200
      ) {
        mutate();
        $("#edit-info").modal("hide");
        notification.success({ message: "Updated Profile Info" });
      }
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data?.message });
    }
  };
  return (
    <div
      className="modal fade"
      id="edit-info"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Edit Contact information</h5>
            <ProfileInfoForm
              details={details}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const getUrls = {
  pharmacy: {
    id: "pharmacistId",
    basic: updatePharmacistBasicInfoUrl(),
    contact: updatePharmacistContactDetailsUrl(),
  },
  lab: {
    id: "labId",
    basic: updateLabTechnicianBasicInfoUrl(),
    contact: updateLabTechnicianContactDetailsUrl(),
  },
  accountant: {
    id: "accountantId",
    basic: updateAccountantBasicInfoUrl(),
    contact: updateAccountantContactDetailsUrl(),
  },
  admin: {
    id: "adminId",
    basic: updateAdminBasicInfoUrl(),
    contact: updateAdminContactDetailsUrl(),
  },
  nurse: {
    id: "nurseId",
    basic: updateNurseBasicInfoUrl(),
    contact: updateNurseContactDetailsUrl(),
  },
  hmoadmin: {
    id: "hmoAdminId",
    basic: updateBasicInfoHMOAdminUrl(),
    contact: updateContactDetailsHMOAdminUrl(),
  },
  wardpersonnel: {
    id: "wardPersonnelId",
    basic: updateBasicInfoWardPersonnelUrl(),
    contact: updateContactDetailsWardPersonnelUrl(),
  },
};
