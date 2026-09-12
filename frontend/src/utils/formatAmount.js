const numberFormatter = (number) => {
  number = String(number);
  let newArray = [];
  if (number.includes(".")) {
    let mainNumber = number.split(".")[0];
    let decimal = number.split(".")[1];
    number = mainNumber.split("").reverse();
    number.forEach((element, index) => {
      if (index % 3 === 0 && index !== 0) {
        newArray.push(",");
      }
      newArray.push(element);
    });
    return newArray.reverse().join("") + "." + decimal;
  } else {
    number = number.split("").reverse();
    number.forEach((element, index) => {
      if (index % 3 === 0 && index !== 0) {
        newArray.push(",");
      }
      newArray.push(element);
    });
    return newArray.reverse().join("");
  }
};

export default numberFormatter;
