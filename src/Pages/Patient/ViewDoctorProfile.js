import React, { useState, useEffect } from "react";
import { DoctorProfile } from "../../Components/Profiles";

const ViewDoctorProfile = (props) => {
  // state = {
  //   id: this.props.match.params.id,
  // };
  const [id, setID] = useState(props.match.params.id);

  useEffect(() => {
    setID(props.match.params.id);
    console.log(props.match.params.id);
  }, [props.match.params.id]);

  // const { params } = this.props.match;
  return <DoctorProfile doctorId={id} user />;
};

// class ViewDoctorProfile extends React.Component {
//   state = {
//     id: this.props.match.params.id,
//   };
//   render() {
//     // const { params } = this.props.match;
//     return <DoctorProfile doctorId={this.state.id} user />;
//   }
// }

export default ViewDoctorProfile;
