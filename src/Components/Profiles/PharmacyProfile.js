import React from 'react'
import { fetchConfig } from '../../api/fetchConfig'
import { useRequest } from '../../api/fetcher'
import { getPharmacyProfileUrl } from '../../api/URLs'
import { PageLoader } from '../Loader';

function PharmacyProfile({ pharmacyId }) {
    const PharmacyProfileUrl = getPharmacyProfileUrl(pharmacyId);
    const getPharmacyProfileConfig = fetchConfig({ url: PharmacyProfileUrl, method: 'get' });
    const { data, error } = useRequest(getPharmacyProfileConfig, {
        revalidateOnFocus: false,
      });
      
    console.log(data, error, "++++++++++++++==")
    
    if (error) return <div>failed to load</div>
    return (
        <div>
            {!data ? <PageLoader /> :  <div>{data.pharmacist[0].fullName}</div>}
        </div>
    )
}

export { PharmacyProfile }