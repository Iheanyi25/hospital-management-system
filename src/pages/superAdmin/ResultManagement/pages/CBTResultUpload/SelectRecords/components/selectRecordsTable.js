import React, { useMemo } from "react";
import { Button, Search, TMTable } from "../../../../../../../ui_elements";

export const SelectRecordsTable = ({
	data,
	paginationProps,
	setPageNumber,
	pageNumber,
	pageSize,
	searchValue,
	hasPerformedQuery,
	debouncedSearch,
	loading,
	openModal
}) => {
	const columns = useMemo(
		() => [
			{
				Header: "S/N",
				accessor: "sn",
				Cell: ({ cell: { row } }) => (
					<div>
						<span>
							{pageSize * (pageNumber - 1) + (row.index + 1)}
						</span>
					</div>
				)
			},
			{
				Header: "Matric No",
				accessor: "matricNumber"
			},
			{
				Header: "C/A",
				accessor: "ca"
			},
			{
				Header: "Exam",
				accessor: "exam"
			},
			{
				Header: "Total",
				accessor: "total"
			},
			{
				Header: "Grade",
				accessor: "grade"
			}
		],
		[pageNumber, pageSize]
	);
	return (
		<div>
			<TMTable
				columns={columns}
				data={data}
				title={`Results`}
				availablePages={paginationProps.totalPages}
				additonalTitleData={
					<>
						{hasPerformedQuery && (
							<div className="d-flex align-items-center">
								<Search
									placeholder="Search for result"
									onChange={(e) => {
										debouncedSearch(e.target.value);
										setPageNumber(1);
									}}
								/>
								<Button
									data-cy="default"
									buttonClass="primary"
									label="Upload Result"
									customClass="ml-3"
									onClick={openModal}
								/>
							</div>
						)}
					</>
				}
				setPageNumber={setPageNumber}
				hasPerformedQuery={hasPerformedQuery}
				searchParams={searchValue}
				loading={loading}
			/>
		</div>
	);
};
