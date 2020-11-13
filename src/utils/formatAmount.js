const numberFormatter = (number) => {
  number = String(number);
  number = number.split("").reverse();
  let newArray = [];
  number.forEach((element, index) => {
    if (index % 3 === 0 && index !== 0) {
      newArray.push(",");
    }
    newArray.push(element);
  });
  return newArray.reverse().join("");
};

export default numberFormatter;
