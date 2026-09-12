const numberFormatter = (number) => {
  let numberString = String(number);
  numberString = numberString?.replaceAll(",", "");
  if (isNaN(Number(numberString))) {
    return "";
  }
  const newArray = [];
  const splitedNumberStringArray = numberString.split(".");
  const mainNumber = splitedNumberStringArray[0];
  const reversedNumber = mainNumber.split("").reverse();
  reversedNumber.forEach((element, index) => {
    if (index % 3 === 0 && index !== 0) {
      newArray.push(",");
    }
    newArray.push(element);
  });
  return splitedNumberStringArray.length > 1
    ? newArray.reverse().join("") + "." + splitedNumberStringArray[1]
    : newArray.reverse().join("");
};

export default numberFormatter;
