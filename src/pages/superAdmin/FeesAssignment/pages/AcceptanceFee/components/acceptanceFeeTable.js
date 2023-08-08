import { TMTable } from "../../../../../../ui_elements";

export const AcceptanceFeeTable = ({ loading, data, columns }) => {
	return (
		<TMTable
			loading={loading}
			columns={columns}
			data={data}
			title="Acceptance fee summary"
		/>
	);
};
