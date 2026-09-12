import React, { useContext } from "react";
import { AccountantProfile } from '../../Components/Profiles'
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";

const ViewAccountantProfile = observer(({ match }) => {
  const { id } = match.params;
  const { user } = useContext(UserContext);
  console.log(id, user.id);
  return (
    <>
      <AccountantProfile AccountantId={id ? id : user.id} />
    </>
  );
});

export default ViewAccountantProfile;
