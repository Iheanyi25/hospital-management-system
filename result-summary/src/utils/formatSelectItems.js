export const formatSelectItems = (items, label, value) => {
	return items?.length > 0
		? items.map((sessionData) => {
				const newObj = {};
				if (Array.isArray(value)) {
					value.forEach((item) => {
						newObj[item] = sessionData[item];
					});
				}
				return {
					value: Array.isArray(value) ? newObj : sessionData[value],
					label: sessionData[label]
				};
		  })
		: [];
};
