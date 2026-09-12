import React, { Fragment } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import { getWardPersonnelProfileUrl } from "../../api/URLs";
import Bio from "./profile-components/common/Bio";
import ContactDetail from "./profile-components/common/ContactDetail";
import LabImage from "../../assets/img/PharmacistIcon.svg";
import SpinnerLoader from "../Loader/SpinnerLoader";

function WardPersonnelProfile({ wardPersonnelId }) {
  const getWardPersonnelProfile = getWardPersonnelProfileUrl(wardPersonnelId);
  const getWardPersonnelProfileConfig = fetchConfig({
    url: getWardPersonnelProfile,
    method: "get",
  });
  const { data, error, mutate } = useRequest(getWardPersonnelProfileConfig, {
    revalidateOnFocus: false,
  });
  if (error) return <div>failed to load</div>;
  return (
    <Fragment>
      {!data ? (
        <SpinnerLoader />
      ) : (
        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <div className="page-content">
              <Bio
                bioDetails={data.wardPersonnel}
                user="wardPersonnel"
                image={LabImage}
              />
              <ContactDetail
                otherDetails={data.wardPersonnel}
                primaryDetails={data.wardPersonnel}
                userId={data.wardPersonnel.wardPersonnelId}
                mutate={mutate}
              />
            </div>
          </div>
        </main>
      )}
    </Fragment>
  );
}

export { WardPersonnelProfile };
