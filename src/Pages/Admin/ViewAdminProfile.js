import { observer } from "mobx-react";
import React, { useContext } from "react";
import { AdminProfile } from "../../Components/Profiles";
import { UserContext } from "../../mobx/UserState";

const ViewAdminProfile = observer(() => {
  const {
    user: { id },
  } = useContext(UserContext);
  return <AdminProfile adminId={id} />;
});

export default ViewAdminProfile;
