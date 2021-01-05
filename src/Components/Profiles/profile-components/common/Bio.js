import React, { useContext } from "react";
import { Link } from "react-router-dom";
import userImage from "../../../../assets/img/user.png";
import reset from "../../../../assets/img/reset.svg";
import phone from "../../../../assets/img/phone.svg";
import resetText from "../../../../assets/img/resetText.svg";
import emailImg from "../../../../assets/img/email.svg";
import { UserContext } from "../../../../mobx/UserState";
import { observer } from "mobx-react";

const Bio = ({ bioDetails }) => {
  const { user } = useContext(UserContext);
  const { firstName, lastName, phoneNumber, email, userType } = bioDetails;
  const title = {
    Pharmacy: "Pharm.",
    Lab: "Lab scientist.",
    Accountant: "Acc.",
  };
  return (
    <div>
      <header className="page-header ml-3">
        <h3 className="page-title">{`${title[userType]} ${firstName || ""} ${
          lastName || ""
        }`}</h3>
      </header>
      <div className="col col-md-12">
        <div className="card border-light p-4">
          <div className="card-body d-block d-md-flex justify-content-between">
            <div className="d-flex justify-content-between">
              <img
                src={userImage}
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
                {user.userType === userType ? (
                  <Link to="/">
                    <img src={reset} alt="reset" className="mr-2" />
                    <img src={resetText} alt="reset" className="mr-2" />
                  </Link>
                ) : null}
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

export default observer(Bio);
