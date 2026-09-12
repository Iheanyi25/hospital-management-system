export const generateUrlParams = (obj) => {
	let generatedUrl = ``;
	const arrayOfObjectKeys = Object.keys(obj);
	arrayOfObjectKeys.forEach((key) => {
		if (obj[key]) {
			generatedUrl += `${key}=${obj[key]}&`;
		}
	});
	return generatedUrl;
};
