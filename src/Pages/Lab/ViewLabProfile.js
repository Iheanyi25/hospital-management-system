import React, {Fragment} from 'react'
import { LabProfile } from '../../Components/Profiles'

export default function ViewLabProfile() {
    return (
        <Fragment>
            <LabProfile labId={JSON.parse(localStorage.getItem("authenticatedUser")).id}/>
        </Fragment>
    )
}
