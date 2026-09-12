export const stringToBoolean = (str) => {
	const value = String(str || "").toLowerCase();
	return value === "true";
};
