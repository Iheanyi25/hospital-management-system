import React, { useState, useEffect, useContext } from "react";
import { PatientSidebar } from "../../Components";
import PatientImage from "../../assets/img/PatientAndAdminIcon.svg";
import copyLinkIcon from "../../assets/img/copy-link.svg";
import { getPatientAccountUrl } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { UserContext } from "../../mobx/UserState";
import { observer } from "mobx-react";

const link = process.env.REACT_APP_PAYMENT_LINK;
const ThirdPartyFunding = observer(()=> {
  const { user } = useContext(UserContext);
  const { firstName, lastName } = user;
  
  const alert = (
    <div
    className="position-absolute bg-success p-2 rounded text-white"
    style={{ right: "0", left: "0" }}
    >
      <b>Link Copied</b>
    </div>
  );
  
  const [state, setState] = useState({
    thirdPartyFundingLink: "",
  });
  const { thirdPartyFundingLink } = state;
  const [showAlert, setShowAlert] = useState(false);

  const copyToClipboard = () => {
    console.log(navigator.clipboard, "lalalalalalal");
    navigator.clipboard.writeText(`${thirdPartyFundingLink}`);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  useEffect(() => {
    getAccount();
  }, []);

  const getAccount = async () => {
    try {
      const getPatientAccount = getPatientAccountUrl(user.id);
      const getPatientAccountConfig = fetchConfig({
        url: getPatientAccount,
        method: "get",
      });
      const {
        data: { account },
      } = await fetchWrapper(getPatientAccountConfig);
      console.log(account, user.id, 3223);
      setState({
        thirdPartyFundingLink: `${link}ThirdPartyFundAccount/${account.accountNumber}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <PatientSidebar />
      <div className="d-flex justify-content-center align-items-center ">
        <div className="card m-0 border-light px-5">
          <div className="card-body text-center">
            <div className="d-flex justify-content-center">
              <img
                src={PatientImage}
                style={{ height: "100px", width: "100px" }}
                className="m-2 "
                alt="user"
              />
            </div>
            <div className="w-75 m-auto">
              <h4>
                {" "}
                {firstName} {lastName}
              </h4>
              <p className="">
                Share this link to have your account funded by a 3rd party
              </p>
            </div>
            <span className=" d-flex text-secondary p-3 m-2 bg-light">
              <img
                src={copyLinkIcon}
                alt="copylinkicon"
                style={{ height: "16px", width: "55px" }}
                className=""
                onClick={copyToClipboard}
              />
              <p><u>{thirdPartyFundingLink}</u></p>
            </span>
            {showAlert && alert}
          </div>
        </div>
      </div>
    </div>
  );
})
export default ThirdPartyFunding;
