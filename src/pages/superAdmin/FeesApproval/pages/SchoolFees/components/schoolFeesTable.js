import { TMTable, Search } from "../../../../../../ui_elements";

export const SchoolFeesTable = ({
	loading,
	data,
	columns,
	searchTerm,
	debouncedSearch,
	setPageNumber,
	hasPerformedQuery,
	paginationProps,
	pageNumber
}) => {
	return (
		<TMTable
			columns={columns}
			data={data}
			loading={loading}
			title="Regular"
			additonalTitleData={
				<div className="d-flex align-items-center">
					<Search
						placeholder="Search for department"
						onChange={(e) => {
							debouncedSearch(e.target.value);
							setPageNumber(1);
						}}
						searchParams={searchTerm}
					/>
				</div>
			}
			availablePages={paginationProps?.totalPages}
			pageNumber={pageNumber}
			setPageNumber={setPageNumber}
			hasPerformedQuery={hasPerformedQuery}
			searchParams={searchTerm}
		/>
	);
};
