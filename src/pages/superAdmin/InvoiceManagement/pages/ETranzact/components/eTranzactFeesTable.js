import { TMTable, Search } from "../../../../../../ui_elements";

export const EtranzactFeesTable = ({
	loading,
	data,
	title,
	columns,
	searchTerm,
	debouncedSearch,
	setPageNumber,
	paginationProps
}) => {
	return (
		<TMTable
			columns={columns}
			data={data}
			loading={loading}
			title={title}
			additonalTitleData={
				<div className="d-flex align-items-center">
					<Search
						placeholder="Search for E-Tranzact Fees"
						onChange={(e) => {
							debouncedSearch(e.target.value);
							setPageNumber(1);
						}}
						searchParams={searchTerm}
					/>
				</div>
			}
			availablePages={paginationProps.totalPages}
			setPageNumber={setPageNumber}
			searchParams={searchTerm}
		/>
	);
};
