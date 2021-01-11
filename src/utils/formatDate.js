const formatDate = (inputedDate) => {
  let date = new Date(inputedDate);
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
    "Dec",
  ];
  return `${days[date.getDay()]}, ${
    date.getDate() === 1 || date.getDate() === 21 || date.getDate() === 31
      ? date.getDate() + "st"
      : date.getDate() === 2 || date.getDate() === 22
      ? date.getDate() + "nd"
      : date.getDate() === 3 || date.getDate() === 23
      ? date.getDate() + "rd"
      : date.getDate() + "th"
  } ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export default formatDate;
