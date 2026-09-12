import { useMemo } from "react";
import {
	TMTable,
	Search,
	Button,
	Badge
} from "../../../../../../../../ui_elements";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
	paginationProps,
	applicationType
}) => {
	const history = useHistory();
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
				Header: "Surname",
				accessor: "lastname"
			},
			{
				Header: "First Name",
				accessor: "firstname"
			},
			{
				Header: "Middle Name",
				accessor: "middlename"
			},
			{
				Header: "Application No",
				accessor: "applicationNumber"
			},
			{
				Header: "Status",
				accessor: "status",
				Cell: ({ cell: { row } }) => (
					<Badge
						item={{
							title: row?.original?.status,
							type:
								row?.original?.status === "Verified"
									? "success"
									: row?.original?.status === "Unverified"
									? "warning"
									: "fail"
						}}
					/>
				)
			},
			{
				Header: "Exam No",
				accessor: "examNumber"
			},
			{
				Header: "Year",
				accessor: "year"
			},
			{
				Header: "Reference Number",
				accessor: "rrr"
			},
			{
				Header: "Card S/No",
				accessor: "cardSerialNumber"
			},
			{
				Header: "Exam Type",
				accessor: "examType"
			},
			{
				Header: "Action",
				accessor: "action",
				Cell: ({ cell: { row } }) => (
					<Button
						data-cy="Verify"
						buttonClass="primary"
						label="Verify"
						disabled={row?.original?.status === "Verified"}
						onClick={() =>
							applicationType &&
							history.push({
								pathname:
									"/utilities/olevel_verification/verify_result",
								state: {
									data: row?.original,
									applicationType: applicationType,
									applicantId: row?.original?.applicantId
								}
							})
						}
					/>
				)
			}
		],
		[applicationType, history, pageNumber, pageSize]
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
