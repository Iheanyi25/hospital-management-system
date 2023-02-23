export function checkIfFilesAreTooBig(files, limit) {
	let valid = true;
	if (files[0]) {
		const file = files[0];
		const size = file.size / 1024;
		if (size > (limit | 100)) {
			valid = false;
		}
	}
	return valid;
}

export function checkIfFilesAreCorrectType(files, isImage) {
	let valid = true;
	if (files[0]) {
		const file = files[0];
		if (
			![
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
			].includes(file.type)
		) {
			valid = false;
		}
	}
	return valid;
}

export function checkIfImagesAreCorrectType(files) {
	let valid = true;
	if (files[0]) {
		const file = files[0];
		if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
			valid = false;
		}
	}
	return valid;
}

export function checkImageFileSizeAndImageType(files) {
	const fileSizeLimit = 500;
	let passedValidation = true;
	if (!checkIfFilesAreTooBig(files, fileSizeLimit)) {
		passedValidation = false;
		const errorFlag = window.AJS.flag({
			type: "error",
			title: "Failed!",
			body: `File too large, limit is ${fileSizeLimit}${
				fileSizeLimit >= 1000 ? "Mb" : "Kb"
			}`
		});
		setTimeout(() => {
			errorFlag.close();
		}, 3000);
		return;
	} else if (!checkIfImagesAreCorrectType(files)) {
		passedValidation = false;
		const errorFlag = window.AJS.flag({
			type: "error",
			title: "Failed!",
			body: "Invalid file type. Try again"
		});
		setTimeout(() => {
			errorFlag.close();
		}, 3000);
		return;
	}
	return passedValidation;
}
