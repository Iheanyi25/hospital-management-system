import React, { useState, useEffect } from "react";
import { PatientSidebar } from "../../Components";
import PatientImage from "../../assets/img/PatientAndAdminIcon.svg";
import copyLinkIcon from "../../assets/img/copy-link.svg";
import { getPatientAccountUrl } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { UserContext } from "../../mobx/UserState";
import { observer } from "mobx-react";

const local = "http://localhost:3000";
function ThirdPartyFunding() {
   const { user }= UserContext;

  const [state, setState] = useState({
    thirdPartyFundingLink: "",
  })

  const copyToClipboard = () => {
    console.log(navigator.clipboard);
    const { thirdPartyFundingLink } = state;
    navigator.clipboard.writeText(`${thirdPartyFundingLink}`);
  };

  useEffect(async () => {
    // const content = this.context;
    // const { user } = content;
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
        thirdPartyFundingLink: `${local}/common/ThirdPartyFundAccount/${account.accountNumber}`,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  //   render() {

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
              <h4>Dr Vitalis Emene</h4>
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
              <p> https://vitalisemene.com/account/blablabla</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
// }
export default observer(ThirdPartyFunding);
