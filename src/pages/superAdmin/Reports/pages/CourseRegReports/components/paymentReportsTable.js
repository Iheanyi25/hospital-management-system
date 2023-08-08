import React, { useMemo } from "react";
import { Button, Search, TMTable } from "../../../../../../ui_elements";

export const PaymentReportsTable = ({
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
				Header: "Name",
				accessor: "name"
			},
			{
				Header: "Matric No",
				accessor: "matricNumber"
			},
			{
				Header: "Department",
				accessor: "department"
			},
			{
				Header: "Session",
				accessor: "session"
			},
			{
				Header: "Semester",
				accessor: "semester",
			},
			{
				Header: "Level",
				accessor: "level",
			},
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
				loading={loading}
			/>
		</div>
	);
};
