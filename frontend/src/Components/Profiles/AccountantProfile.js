import React, { Fragment } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { useRequest } from "../../api/fetcher";
import { getAccountantProfileUrl } from "../../api/URLs";
import Bio from "./profile-components/common/Bio";
import ContactDetail from "./profile-components/common/ContactDetail";
import AccountantImage from "../../assets/img/AccountantIcon.svg";
import SpinnerLoader from "../Loader/SpinnerLoader";

function AccountantProfile({ AccountantId }) {
  const accountantProfileUrl = getAccountantProfileUrl(AccountantId);
  const getAccountantProfileConfig = fetchConfig({
    url: accountantProfileUrl,
    method: "get",
  });
  const { data, error, mutate } = useRequest(getAccountantProfileConfig, {
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
                bioDetails={data.accountant}
                user="accountant"
                image={AccountantImage}
              />
              <ContactDetail
                otherDetails={data.accountant}
                primaryDetails={data.accountant}
                userId={data.accountant.accountantId}
                mutate={mutate}
              />{" "}
              *
            </div>
          </div>
        </main>
      )}
    </Fragment>
  );
}

export { AccountantProfile };
