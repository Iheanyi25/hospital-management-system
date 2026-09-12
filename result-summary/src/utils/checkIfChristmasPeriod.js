const d = new Date();
let month = d.getMonth();

export const checkIfChristmasPeriod = () => {
	if (month === 11) {
		return true;
	} else {
		return false;
	}
};
