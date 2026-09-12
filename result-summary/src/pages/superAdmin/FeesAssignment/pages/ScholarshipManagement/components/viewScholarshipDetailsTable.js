import { TMTable } from "../../../../../../ui_elements";

export const ViewScholarshipDetailsTable = ({ loading, data, columns }) => {
	return (
		<TMTable
			loading={loading}
			columns={columns}
			data={data}
			title="Students Records"
		/>
	);
};
