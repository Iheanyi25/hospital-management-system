import { getSearchRequest } from "../api/apiCall";
import { getLecturersUrl, getStudentsUrl } from "../api/urls";
import { PAGESIZE } from "./constants";
import { formatUserSearch } from "./formatUserSearch";

export const studentsApiOptions = async (query) => {
	const data = await getSearchRequest({
		queryKey: getStudentsUrl({
			searchTerm: query,
			pageSize: PAGESIZE.sm
		})
	});
	return formatUserSearch({
		identification: "matricNumber",
		value: "userId",
		fullName: "fullName",
		users: data?.data.items
	});
};

export const lecturersApiOptions = async (query) => {
	const data = await getSearchRequest({
		queryKey: getLecturersUrl({
			searchTerm: query,
			pageSize: PAGESIZE.sm
		})
	});
	return formatUserSearch({
		identification: "email",
		value: "lecturerId",
		fullName: "fullName",
		users: data?.data.items
	});
};
