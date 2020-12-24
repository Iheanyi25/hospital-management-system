import React, { useContext } from "react";
import { PharmacyProfile } from "../../Components/Profiles";
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";

const ViewPharmacyProfile = observer(({ match }) => {
  const { id } = match.params;
  const { user } = useContext(UserContext);
  console.log(id, user.id);
  return (
    <>
      <PharmacyProfile pharmacyId={id ? id : user.id} />
    </>
  );
});

export default ViewPharmacyProfile;
