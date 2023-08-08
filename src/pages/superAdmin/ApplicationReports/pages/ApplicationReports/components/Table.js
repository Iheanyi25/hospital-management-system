import { useMemo } from "react";
import { TMTable, Search, Badge, Button } from "../../../../../../ui_elements";

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
				Header: "Payment PIN",
				accessor: "rrr"
			},
			{
				Header: "Fullname",
				accessor: "fullName"
			},
			{
				Header: "Reg Number",
				accessor: "regNo"
			},
			{
				Header: "Status",
				accessor: "status",
				Cell: ({ cell: { row } }) => (
					<Badge
						item={{
							title: row.original.paymentStatus
								? "Paid"
								: "Unpaid",
							type: !row.original.paymentStatus
								? "warning"
								: "success"
						}}
					/>
				)
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
