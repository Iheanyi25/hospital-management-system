import React from "react";
import { PatientSidebar } from "../../Components";
import PatientImage from "../../assets/img/PatientAndAdminIcon.svg";


class ThirdPartyFunding extends React.Component {
    constructor (props){
        super (props);
    }
    render(){
    return(
        <div className="h-100 d-flex align-items-center justify-content-center">
            <PatientSidebar/>
            <div className="d-flex justify-content-center align-items-center">
                <div className="card m-0 border-light">
                    <div className="card-body text-center">
                        <div className="d-flex justify-content-center">
                            <img
                            src={PatientImage}
                            style={{ height: "100px", width: "100px" }}
                            className=" "
                            alt="user"
                            /> 
                        </div>
                        <h5 className="mb-1">Dr. Vitalis Emene</h5>
                        <p className="m-0 mb-1"><small>Fund Vitalis’s HMS account</small></p>
                        <button className="m-0 text-white p-2 btn btn-primary"><small>Copy link: https://vitalisemene,acc...</small></button>
                    </div>
                </div>
            </div>

        </div>
    );
    }
};
export default ThirdPartyFunding