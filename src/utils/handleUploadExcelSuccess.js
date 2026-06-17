

export const handleUploadExcelSuccess = (response, fileData) => {
	if (response.data.message) {
		const infoFlag = window.AJS.flag({
			type: "info",
			title: "Upload Info",
			body: response.data.message
		});
		setTimeout(() => {
			infoFlag.close();
		}, 5000);
	} else {
		const successFlag = window.AJS.flag({
			type: "success",
			title: "Upload Successful",
			body: `${fileData?.name} was uploaded successfully!`
		});
		setTimeout(() => {
			successFlag.close();
		}, 5000);
	}
};
