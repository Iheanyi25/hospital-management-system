export const uniqueArrayOfObjects = (arr) => {
	//returns an array of unique objects, y confirming that at each index, the object is unique and not equal to any other object in the array
	return arr.filter((item, index) => {
		return (
			arr.findIndex((obj) => {
				return (
					obj.courseAssignedForDepartmentId ===
					item.courseAssignedForDepartmentId
				);
			}) === index
		);
	});
};
