
const formatDate = (time) => {
  let date = new Date(time);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${
    days[date.getDay()]
  },  ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

export default formatDate;
