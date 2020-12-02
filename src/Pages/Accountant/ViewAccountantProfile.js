import React, {Fragment} from 'react'
import { AccountantProfile } from '../../Components/Profiles'


export default function ViewAccountantProfile() {
    return (
        <Fragment>
            <AccountantProfile AccountantId={JSON.parse(localStorage.getItem("authenticatedUser")).id}/>
        </Fragment>
    )
}
