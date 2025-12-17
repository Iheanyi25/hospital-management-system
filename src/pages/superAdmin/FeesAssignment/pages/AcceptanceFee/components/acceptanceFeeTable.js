import { Search, TMTable } from "../../../../../../ui_elements";

export const AcceptanceFeeTable = ({
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
			loading={loading}
			columns={columns}
			data={data}
			title="Acceptance fee summary"
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
			availablePages={paginationProps.totalPages}
			setPageNumber={setPageNumber}
			pageNumber={pageNumber}
			hasPerformedQuery={hasPerformedQuery}
			searchParams={searchTerm}
		/>
	);
};
