export const formatInputDate = () => {
  const dateObject = new Date();
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const date = dateObject.getDate();

  return `${year}-${month < 10 ? "0" + month : month}-${
    date < 10 ? "0" + date : date
  }`;
};

export const formatInputTime = () => {
  const dateObject = new Date();
  const hour = dateObject.getHours();
  const minute = dateObject.getMinutes();

  console.log(`${hour}:${minute}`);
  return `${hour < 10 ? "0" + hour : hour}:${minute < 10 ? "0" + minute : minute}
  }`;
};

