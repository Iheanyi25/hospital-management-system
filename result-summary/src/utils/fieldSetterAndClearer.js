export const fieldSetterAndClearer = ({
	value,
	setterFunc,
	setField,
	clearFields,
	trigger
}) => {
	setterFunc(setField, value);
	clearFields?.forEach((field) => setterFunc(field, null));
	if (trigger) {
		trigger(setField);
	}
};
