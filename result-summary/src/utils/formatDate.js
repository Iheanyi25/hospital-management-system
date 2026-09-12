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

export const formatStringToDate = (date, seperator = "/") =>
	date.split(seperator).reverse().join("-");

export const formatDateFromAPI = (date) => date.split("T")[0];

export const getCurrentDate = () => {
	const today = new Date();
	const dd = String(today.getDate()).padStart(2, "0");
	const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
	const yyyy = today.getFullYear();

	return `${dd}/${mm}/${yyyy}`;
};

export function timeAgo(receivedDate) {
	const currentTime = new Date();
	const newRecieved = new Date(receivedDate);
	const timeDifference = currentTime.getTime() - newRecieved.getTime();

	let seconds = Math.floor(timeDifference / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);
	let days = Math.floor(hours / 24);
	let weeks = Math.floor(days / 7);

	if (weeks > 0) {
		return weeks + " week(s) ago";
	} else if (days > 0) {
		return days + " day(s) ago";
	} else if (hours > 0) {
		return hours + " hour(s) ago";
	} else if (minutes > 0) {
		return minutes + " minute(s) ago";
	} else {
		return seconds + " second(s) ago";
	}
}
