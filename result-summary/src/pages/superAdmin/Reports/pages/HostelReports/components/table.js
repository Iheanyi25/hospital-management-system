import React, { useMemo } from "react";
import { Button, Search, TMTable } from "../../../../../../ui_elements";

export const Table = ({
	data,
	paginationProps,
	setPageNumber,
	pageNumber,
	pageSize,
	hasPerformedQuery,
	searchTerm,
	debouncedSearch,
	setDownloadFile,
	fileLoading,
	loading
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
				Header: "Reg No",
				accessor: "matricNumber"
			},
			{
				Header: "Fullname",
				accessor: "fullName"
			},
			{
				Header: "Department",
				accessor: "department"
			},
			{
				Header: "Sex",
				accessor: "gender"
			},
			{
				Header: "RM Number",
				accessor: "room"
			},
			{
				Header: "Bedspace",
				accessor: "bedSpace"
			}
		],
		[pageNumber, pageSize]
	);
	return (
		<div>
			<TMTable
				columns={columns}
				data={data}
				availablePages={paginationProps.totalPages}
				setPageNumber={setPageNumber}
				title="Reports"
				searchParams={searchTerm}
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
										data-cy="download_hostel_reports"
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
				loading={loading}
			/>
		</div>
	);
};
