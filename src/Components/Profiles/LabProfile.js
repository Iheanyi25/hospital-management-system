import React from 'react'
import { fetchConfig } from '../../api/fetchConfig';
import { useRequest } from '../../api/fetcher';
import { getLabProfileUrl } from '../../api/URLs';

function LabProfile({labId}) {
    const LabProfileUrl = getLabProfileUrl(labId);
    const getLabProfileConfig = fetchConfig({ url: LabProfileUrl, method: 'GET', });
    const { data, error } = useRequest(getLabProfileConfig, {
        revalidateOnFocus: false,
      });
      console.log(data, error, "++++++++++++++==")
    return (
        <div>
            Lab page here
        </div>
    )
}

export { LabProfile };

