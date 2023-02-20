import { ResultTable, ResultTableHeader } from "../../ui_elements";

const ViewResultSheet = () => {
	const headerDetails = {
		faculty: "school of applied sciences",
		department: "pharmarcy",
		semester: "first",
		date: "09/12/2023",
		programme: "pharm 211",
		session: "2018/2019",
	};
	return (
		<>
			<ResultTableHeader details={headerDetails} />
			<ResultTable />
		</>
	);
};

export default ViewResultSheet;
