export const fieldSetterAndClearer = ({
	value,
	setterFunc,
	setField,
	clearFields
}) => {
	setterFunc(setField, value);
	clearFields?.forEach((field) => setterFunc(field, null));
};
