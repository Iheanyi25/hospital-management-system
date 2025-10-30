import React, { useMemo } from "react";
import { Button, Search, TMTable } from "../../../../../../ui_elements";
import { shortDate } from "../../../../../../utils/formatDate";
import numberFormatter from "../../../../../../utils/numberFormatter";

export const SundryReportTable = ({
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
				Header: "Full Name",
				accessor: "fullName"
			},
			{
				Header: "Matric No",
				accessor: "matricNo"
			},
			{
				Header: "Payment PIN",
				accessor: "paymentPin",
				Cell: ({ cell: { row } }) => (
					<>{row.original.paymentPin || "NONE"}</>
				)
			},
			{
				Header: "Amount",
				accessor: "amount",
				Cell: ({ cell: { row } }) => (
					<>{numberFormatter(row.original.amount) || "NONE"}</>
				)
			},
			{
				Header: "Description",
				accessor: "description"
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
				Header: "Date Registered",
				accessor: "dateRegistered",
				Cell: ({ cell: { row } }) => (
					<>{shortDate(row.original.dateRegistered) || "NONE"}</>
				)
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
										data-cy="download_sundry_report"
										buttonClass="secondary"
										label="Download Report"
										customClass="ml-3"
										loading={fileLoading}
										disabled={loading}
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
