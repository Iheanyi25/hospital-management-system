// import React, {Fragment} from 'react'
// import { LabProfile } from '../../Components/Profiles'

// export default function ViewLabProfile() {
//     return (
//         <Fragment>
//             <LabProfile labId={JSON.parse(localStorage.getItem("authenticatedUser")).id}/>
//         </Fragment>
//     )
// }
import React, { useContext } from "react";
import { LabProfile } from '../../Components/Profiles'
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";

const ViewLabProfile = observer(({ match }) => {
  const { id } = match.params;
  const { user } = useContext(UserContext);
  console.log(id, user.id);
  return (
    <>
      <LabProfile labId={id ? id : user.id} />
    </>
  );
});

export default ViewLabProfile;
