const formatTme = (time) => {
  let timeArray = time.split(":");
  time = parseInt(timeArray[0]);
  if (time > 12) {
    return `${time - 12}:${timeArray[1]}PM`;
  }
  if (time === 0) {
    return `${time + 12}:${timeArray[1]}AM`;
  } else {
    return `${time}:${timeArray[1]}AM`;
  }
};
export default formatTme;
