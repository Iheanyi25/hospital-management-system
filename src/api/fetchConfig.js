export const fetchConfig = ({url, params, method, user = {}}) => {
	if (!url) return null;

	return {
		url,
		method,
		headers: { "Content-Type": "application/json-patch+json",  Authorization: `Bearer ${user.token}` },
		data: {},
        params,
        redirect: "follow",
	};
};

