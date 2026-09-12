import React from 'react'
import { DoctorProfile } from '../../Components/Profiles/DoctorProfile'

const DoctorsProfile = ({ match }) => {
    return (
        <DoctorProfile doctorId={match.params.id} />
    )
}

export default DoctorsProfile