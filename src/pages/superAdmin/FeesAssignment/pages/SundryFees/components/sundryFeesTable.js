import { TMTable } from "../../../../../../ui_elements";

export const SundryFeesTable = ({
	loading,
	data,
	columns,
	paginationProps,
	setPageNumber
}) => {
	return (
		<TMTable
			columns={columns}
			data={data}
			loading={loading}
			availablePages={paginationProps.totalPages}
			setPageNumber={setPageNumber}
		/>
	);
};
