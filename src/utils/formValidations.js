export const checkforValidName = (value) =>
	value ? /^[A-Za-z'-]{2,}$/.test(value) : true;
export const checkforValidInitial = (value) =>
	value ? /^[a-zA-Z.'-]+$/.test(value) : true;

export const checkForCorrectPhoneNumber = (value) =>
	/^\+234[0-9]{10}$|^0[0-9]{10}$/.test(value);

export const checkIfPutmeFormat = (value) =>
	/^2023\d{8}[a-zA-Z]{2}$/.test(value);

export const checkIfSpecialCharacters = (value) => /^[a-zA-Z\s]*$/.test(value);

export const checkIfUserIsMoreThanMinimumAge = (value) => {
	if (!(new Date().getFullYear() - value.split("-")[0] < 15)) {
		return true;
	}
};

export const checkForNumbersAndStrings = (value) =>
	/^[A-Za-z0-9 ]+$/.test(value);

export const checkForOnlyNumbers = (value) => /^[0-9]+$/.test(value);
export const checkForWholeAndTwoDecimalPlaceNumbers = (value) => {
	if (value <= 5.0) {
		return /^\d(\.\d{1,2})?$/.test(value);
	}
	return false;
};

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

export const checkIfMinimumNumberOfSubjectIsSelected = (value, leastNumber) => {
	let verifyLeastNumber = typeof leastNumber === "number" ? leastNumber : 8;
	const verifyLeast = [];

	for (let i = 0; i < value?.length; i++) {
		if (i === verifyLeastNumber) {
			break;
		}
		if (!value?.[i]?.subject?.value || !value?.[i]?.grade?.value) {
			verifyLeast?.push(false);
		} else {
			verifyLeast?.push(true);
		}
	}
	return verifyLeast?.every((item) => item === true);
};

export const checkIfCertificateTypeHasCertificateUpload = (value) => {
	const verifyOne = [];

	for (let i = 0; i < value?.length; i++) {
		if (!value?.[i]?.certificateType?.value && value?.[i]?.certificate) {
			verifyOne.push(false);
		} else if (
			value?.[i]?.certificateType?.value &&
			!value?.[i]?.certificate
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

export const accountNumberValidator = (value) => /^\d{10}$/.test(value);

export const checkDuplicateSubjects = (subjectName) => {
	return function (value) {
		const subjects = this.parent;
		for (const subjectKey in subjects) {
			if (subjectKey !== subjectName && subjects[subjectKey] === value) {
				return false;
			}
		}
		return true;
	};
};
