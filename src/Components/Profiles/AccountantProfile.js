import React, { Fragment, useState } from 'react';
import { fetchConfig } from '../../api/fetchConfig';
import { useRequest } from '../../api/fetcher';
import { getAccountantProfileUrl } from '../../api/URLs';
import { PageLoader } from '../Loader';
import { Success } from '../Alerts';
import Bio from './profile-components/common/Bio';
import ContactDetail from './profile-components/common/ContactDetail';
import AccountantImage from '../../assets/img/AccountantIcon.svg';

function AccountantProfile({ AccountantId }) {
	const [ success, setSucces ] = useState({ show: false, message: '' });
	const accountantProfileUrl = getAccountantProfileUrl(AccountantId);
	const getAccountantProfileConfig = fetchConfig({ url: accountantProfileUrl, method: 'get' });
	const { data, error, mutate } = useRequest(getAccountantProfileConfig, {revalidateOnFocus: false});

	const resetShowState = () => setSucces((state) => ({ ...state, show: false }));
	if (error) return <div>failed to load</div>;
	return (
		<Fragment>
			{!data ? (
				<PageLoader />
			) : (
				<main className="main-content">
					<div className="app-loader">
						<i className="icofont-spinner-alt-4 rotate" />
					</div>
					{success.show && <Success message={success.message} callback={resetShowState} />}
					<div className="main-content-wrap">
						<div className="page-content">
							<Bio bioDetails={data.accountant.accountant} user="accountant" image={AccountantImage} />
							<ContactDetail
								otherDetails={data.accountant}
								primaryDetails={data.accountant.accountant}
								userId={data.accountant.accountantId}
								mutate={mutate}
								setSucces={setSucces}
							/>{' '}
							*
						</div>
					</div>
				</main>
			)}
		</Fragment>
	);
}

export { AccountantProfile };
