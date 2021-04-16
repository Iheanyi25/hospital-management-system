import React, { useContext } from "react";
import { Link } from "react-router-dom";
import reset from "../../../../assets/img/reset.svg";
import phone from "../../../../assets/img/phone.svg";
import resetText from "../../../../assets/img/resetText.svg";
import emailImg from "../../../../assets/img/email.svg";
import { UserContext } from "../../../../mobx/UserState";

const Bio = ({ bioDetails, image }) => {
  const {
    user: { userType: loggedInUser },
  } = useContext(UserContext);
  const { firstName, lastName, phoneNumber, email, userType } = bioDetails;
  const title = {
    pharmacist: "Pharm.",
    labattendant: "Lab scientist.",
    accountant: "Acc.",
    admin: "Admin",
    nurse: "Nurse",
    hmoadmin: "",
    wardpersonnel: "",
  };
  return (
    <div>
      <header className="page-header ml-3">
        <h3 className="page-title">{`${title[userType.toLowerCase()]} ${
          firstName || ""
        } ${lastName || ""}`}</h3>
      </header>
      <div className="col col-md-12">
        <div className="card border-light p-4">
          <div className="card-body d-block d-md-flex justify-content-between">
            <div className="d-flex justify-content-between">
              <img
                src={image}
                style={{ height: "100px", width: "100px" }}
                className="mr-3"
                alt="user"
              />
              <div>
                <h5 className="mb-2 mt-2 font-weight-bold">
                  {firstName || lastName
                    ? `${firstName || ""} ${lastName || ""}`
                    : "N/A"}
                </h5>
                <p className="mb-2">{userType}</p>
                {loggedInUser !== userType ? null : (
                  <Link to="/ChangePassword">
                    <img src={reset} alt="reset" className="mr-2" />
                    <img src={resetText} alt="reset" className="mr-2" />
                  </Link>
                )}
              </div>
            </div>
            <div className="mt-2">
              <div className="d-flex mb-3 mt-2">
                <img src={emailImg} alt="reset" className="mr-2 mb-2" />
                <p>{email.toLowerCase() || "N/A"}</p>
              </div>
              <div className="d-flex pl-1">
                <img src={phone} alt="reset" className="mr-3 mb-2" />
                <p>{phoneNumber || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bio;
