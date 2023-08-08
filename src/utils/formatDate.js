export const fullDate = (time) => {
	const date = new Date(time);
	const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
	const months = [
		"Jan",
		"Feb",
		"March",
		"April",
		"May",
		"June",
		"July",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	return `${days[date.getDay()]}, ${
		date.getDate() === 1
			? date.getDate() + "st"
			: date.getDate() === 2
			? date.getDate() + "nd"
			: date.getDate() === 3
			? date.getDate() + "rd"
			: date.getDate() + "th"
	} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const shortDate = (time) => {
	const newDate = new Date(time);
	const date = newDate.getDate();
	const month = newDate.getMonth() + 1;
	const year = newDate.getFullYear();
	return `${date < 10 ? `0${date}` : date}/${
		month < 10 ? `0${month}` : month
	}/${year}`;
};

export const formatInputDate = ({ minYear, maxYear, useFullYear = false }) => {
	const dateObject = new Date();
	const year = dateObject.getFullYear();
	const month = dateObject.getMonth() + 1;
	const date = dateObject.getDate();
	return useFullYear
		? `${minYear ? year - minYear : minYear ? year + maxYear : year}-12-31`
		: `${minYear ? year - minYear : minYear ? year + maxYear : year}-${
				month < 10 ? "0" + month : month
		  }-${date < 10 ? "0" + date : date}`;
};

export const formatProfileInitalDate = (date) => {
	const dateSplit = date.split(" ")[0].split("/");
	const year = dateSplit[2];
	const month = dateSplit[0];
	const day = dateSplit[1];
	return `${year}-${month < 10 ? `0${month}` : month}-${
		day < 10 ? `0${day}` : day
	}`;
};

export const formatStringToDate = (date) => date.split("/").reverse().join("-");

export const formatDateFromAPI = (date) => date.split("T")[0];
