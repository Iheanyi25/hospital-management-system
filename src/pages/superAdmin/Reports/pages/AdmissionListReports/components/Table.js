import { useMemo } from "react";
import { TMTable, Search, Button } from "../../../../../../ui_elements";

export const Table = ({
	loading,
	data,
	isPosting,
	setPageNumber,
	debouncedSearch,
	hasPerformedQuery,
	pageSize,
	pageNumber,
	fileLoading,
	setDownloadFile,
	paginationProps
}) => {
	const columns = useMemo(
		() => [
			{
				Header: "S/N",
				accessor: "serialNo",
				Cell: ({ cell: { row } }) => (
					<div>
						<span>
							{pageSize * (pageNumber - 1) + (row.index + 1)}
						</span>
					</div>
				)
			},
			{
				Header: "Fullname",
				accessor: "fullName"
			},
			{
				Header: "Reg Number",
				accessor: "jambNo"
			},
			{
				Header: "Faculty",
				accessor: "faculty"
			},
			{
				Header: "Department",
				accessor: "department"
			}
		],
		[pageNumber, pageSize]
	);
	return (
		<TMTable
			columns={columns}
			data={data}
			loading={loading || isPosting}
			title=" "
			pageNumber={pageNumber}
			additonalTitleData={
				<div className="d-flex align-items-center">
					{hasPerformedQuery && (
						<div className="d-flex align-items-center">
							<Search
								placeholder="Search for report"
								onChange={(e) => {
									debouncedSearch(e.target.value);
									setPageNumber(1);
								}}
							/>
							{data.length > 0 && (
								<Button
									data-cy="download_sundry_report"
									buttonClass="secondary"
									label="Download Report"
									customClass="ml-3"
									loading={fileLoading}
									onClick={() => setDownloadFile(true)}
								/>
							)}
						</div>
					)}
				</div>
			}
			setPageNumber={setPageNumber}
			availablePages={paginationProps.totalPages}
		/>
	);
};
