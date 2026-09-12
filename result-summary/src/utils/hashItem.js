export const hashItem = (value) => {
	return [
		...value.split("").filter((_, index) => index < 4),
		"*********",
		value.includes("@") ? ".com" : value.charAt(value.length - 1)
	].join("");
};
