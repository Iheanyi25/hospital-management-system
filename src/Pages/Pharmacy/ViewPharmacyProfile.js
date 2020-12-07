import React from 'react';
import { PharmacyProfile } from '../../Components/Profiles';

export default function ViewPharmacyProfile() {
    return (
        <>
            <PharmacyProfile pharmacyId={JSON.parse(localStorage.getItem("authenticatedUser")).id}/>
        </>
    )
}
