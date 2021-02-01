import React from "react";
import PatientImg from "../../../assets/img/user.png";
import { FlexBetweenContainer } from "../../../Components/reusable-css-in-js-components/Flex";

export const PatientBioDetails = ({ profile }) => {
    return (
      <FlexBetweenContainer width="18rem">
        <div>
          <img src={PatientImg} alt="patient profile" />
        </div>
        <div>
          <h3 className="font-weight-bold">{`${profile.firstname} ${profile.lastname}`}</h3>
          <div></div>
        </div>
      </FlexBetweenContainer>
    );
  };
  
 export const PatientHealthDetails = ({ profile }) => {
    return (
      <div>
        <h5 className="font-weight-bold">Health Details</h5>
        <FlexBetweenContainer width="30rem">
          <div>
            <h6>Blood Group</h6>
            <div>{profile?.bloodGroup}</div>
          </div>
          <div>
            <h6>Genotype</h6>
            <div>{profile?.genotype}</div>
          </div>
          <div>
            <h6>Gender</h6>
            <div>{profile?.gender}</div>
          </div>
          <div>
            <h6>Diabetic</h6>
            <div>{profile?.diabetic ? "True" : "False"}</div>
          </div>
        </FlexBetweenContainer>
  
        <FlexBetweenContainer width="38rem">
          <div>
            <h6>Allergies</h6>
            <div>{profile?.allergies}</div>
          </div>
          <div>
            <h6>Disabilities</h6>
            <div>{profile?.disabilities}</div>
          </div>
        </FlexBetweenContainer>
      </div>
    );
  };
  

  export const PatientContactDetails = ({ profile }) => {
    return (
      <div>
        <h5 className="font-weight-bold">Contact Information</h5>
        <FlexBetweenContainer width="18rem">
          <div>
            <h6>Mobile</h6>
            <div>{profile?.phoneNumber}</div>
          </div>
          <div>
            <h6>Email</h6>
            <div>{profile?.email}</div>
          </div>
        </FlexBetweenContainer>
  
        <FlexBetweenContainer width="42rem">
          <div>
            <h6>Address</h6>
            <div>{profile?.address}</div>
          </div>
          <div>
            <h6>Country</h6>
            <div>{profile?.country}</div>
          </div>
          <div>
            <h6>State of Origin</h6>
            <div>{profile?.state}</div>
          </div>
        </FlexBetweenContainer>
      </div>
    );
  };
  