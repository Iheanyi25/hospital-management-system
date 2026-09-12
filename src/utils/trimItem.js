export const trimItem = (item) => {
	//returns timmed string and excludes other items
	return typeof item === "string" ? item?.trim() : item;
};
