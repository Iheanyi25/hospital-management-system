const formatTme = (time) => {
  const formatItem = (time) => {
    let timeArray = time.split(":");
    console.log(timeArray, "I got here");
    time = parseInt(timeArray[0]);
    if (time > 12) {
      console.log(time, timeArray[1], "I got ");
      return `${time - 12}:${timeArray[1]} PM`;
    }
    if (time === 0) {
      return `${time + 12}:${timeArray[1]} AM`;
    } else {
      return `${time}:${timeArray[1]} AM`;
    }
  };
  if (time.includes("T")) {
    return formatItem(time.split("T")[1]);
  } else {
    return formatItem(time);
  }
};
export default formatTme;
