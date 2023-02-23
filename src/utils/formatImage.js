const formatImageToBase64 = (file) =>
	new Promise((resolve, reject) => {
		if (!file) {
			return reject("No file selected, select a file");
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

export default formatImageToBase64;
