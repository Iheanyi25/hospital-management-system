import React from 'react'
import { LabProfile } from '../../Components/Profiles'

export default function ViewLabProfile() {
    return (
        <div>
            <LabProfile labId={JSON.parse(localStorage.getItem("authenticatedUser")).id}/>
        </div>
    )
}
