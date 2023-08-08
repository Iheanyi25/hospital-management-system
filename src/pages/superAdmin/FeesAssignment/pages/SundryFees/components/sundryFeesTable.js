import { TMTable } from "../../../../../../ui_elements";

export const SundryFeesTable = ({ loading, data, columns }) => {
	return (
		<TMTable
			columns={columns}
			data={data}
			loading={loading}
			title="Fee Records"
		/>
	);
};
