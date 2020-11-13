const formatDate = (time) => {
  let date = new Date(time);
  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thurs",
    "Fri",
    "Sat",
  ];
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
  return `${days[date.getDay()]}, ${date.getDate() === 1 ? date.getDate()+"st":date.getDate() ===2 ? date.getDate()+"nd":date.getDate() ===3 ? date.getDate()+"rd": date.getDate()+"th"} ${months[date.getMonth()]} ${date.getFullYear()}`
};

export default formatDate;
