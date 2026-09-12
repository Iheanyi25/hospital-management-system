export const findValueAndLabel = (
	id,
	array,
	property = "value",
	strictCompare = false
) => {
	const found = array.find((item) =>
		// eslint-disable-next-line
		strictCompare ? item[property] === id : item[property] == id
	);
	return found?.value ? { value: found?.value, label: found?.label } : null;
};
