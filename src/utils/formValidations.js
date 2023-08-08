export const checkforValidName = (value) =>
	value
		? /^[\w ]*[a-zA-Z]+(([', -][a-zA-Z])?[a-zA-Z]*)\s*$/.test(value)
		: true;

export const checkForCorrectPhoneNumber = (value) =>
	/^\+[0-9]{7,15}$|^0[0-9]{10}$/.test(value ?? "");

export const checkIfUserIsMoreThanMinimumAge = (value) => {
	if (!(new Date().getFullYear() - value.split("-")[0] < 15)) {
		return true;
	}
};

export const checkForNumbersAndStrings = (value) =>
	/^[A-Za-z0-9 ]+$/.test(value);

export const checkForValidDate = (value) =>
	/^\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$/.test(value);

export const checkIfUserIsLessThanMaximumAge = (value) => {
	if (!(new Date().getFullYear() - value.split("-")[0] > 80)) {
		return true;
	}
};

export const checkIfValidFullName = (value) => {
	const names = value?.split(" ");
	return !!names && !!names[0] && !!names[1];
};

export const checkifDuplicateEntriesExist = (values) => {
	const subjects = values?.map((subValue) => {
		let value = subValue?.subject?.value;
		return value?.toString()?.toLowerCase();
	});
	if (subjects?.length === new Set(subjects)?.size) {
		return true;
	}
	return false;
};

export const checkIfMinimumNumberOfSubjectIsSelected = (value) => {
	const verifyEight = [];

	for (let i = 0; i < value?.length; i++) {
		if (i === 8) {
			break;
		}
		if (!value?.[i]?.subject?.value || !value?.[i]?.grade?.value) {
			verifyEight?.push(false);
		} else {
			verifyEight?.push(true);
		}
	}
	return verifyEight?.every((item) => item === true);
};

export const checkIfCertificateTypeHasCertificateUpload = (value) => {
	const verifyOne = [];

	for (let i = 0; i < value?.length; i++) {
		if (
			!value?.[i]?.certificateType?.value &&
			value?.[i]?.certificateData
		) {
			verifyOne.push(false);
		} else if (
			value?.[i]?.certificateType?.value &&
			!value?.[i]?.certificateData
		) {
			verifyOne?.push(false);
		} else {
			verifyOne?.push(true);
		}
	}
	return verifyOne?.every((item) => item === true);
};

export const checkIfAtLeastOneInstitutionIsSelected = (value) => {
	const verifyOne = [];

	for (let i = 0; i < value?.length; i++) {
		if (i === 1) {
			break;
		}
		if (
			!value?.[i]?.institution ||
			!value?.[i]?.fieldOfStudy ||
			!value?.[i]?.dateFrom ||
			!value?.[i]?.dateTo ||
			!value?.[i]?.certificate
		) {
			verifyOne.push(false);
		} else {
			verifyOne.push(true);
		}
	}
	return verifyOne.every((item) => item === true);
};

export const checkForValidPassword = (value) =>
	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/.test(value);
