import { useState, useMemo } from "react";
import { useApiGet } from "../../../../../api/apiCall";
import { getAllETranzactFeesUrl } from "../../../../../api/urls";
import { Button, CenteredDialog } from "../../../../../ui_elements";
import { EtranzactFeesTable } from "./components";
import { PAGESIZE, SEARCH_DELAY } from "../../../../../utils/constants";
import { useDebouncedCallback } from "use-debounce/lib";
import numberFormatter from "../../../../../utils/numberFormatter";
import { ViewTranzactFeesDetails } from "./components/viewTranzactFeesModal";

const EtranzactFees = () => {
	const [cloneOpen, setCloneOpen] = useState(null);

	const [pageNumber, setPageNumber] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");

	const debounced = useDebouncedCallback(
		(value) => {
			setSearchTerm(value);
		},
		// delay in ms
		SEARCH_DELAY.sm
	);

	const {
		data: eTranzactData,
		isLoading: isLoadingETranzact,
		isFetching: isFetchingETranzact
		// error: feesToAssignError
	} = useApiGet(
		getAllETranzactFeesUrl({
			pageNumber,
			pageSize: PAGESIZE.lg,
			searchTerm
		})
	);

	const columns = useMemo(
		() => [
			{
				Header: "Full Name",
				accessor: "fullName"
			},

			{
				Header: "Confirmation Order Number",
				accessor: "confirmationOrderNumber"
			},
			{
				Header: "Amount (₦)",
				accessor: "amount",
				Cell: ({ cell: { row } }) => (
					<div>{`${numberFormatter(row?.original?.amount)}`}</div>
				)
			},

			{
				Header: "Payment Description",
				accessor: "paymentDescription",
				Cell: ({ cell: { row } }) => (
					<div>
						{row?.original?.paymentDescription?.toUpperCase() ||
							"-"}
					</div>
				)
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div className="">
						<Button
							label="View"
							buttonClass="primary"
							onClick={() => {
								setCloneOpen(row?.original);
							}}
						/>
					</div>
				)
			}
		],
		[]
	);

	return (
		<section>
			<CenteredDialog
				modalId="view_etranzact_fees_details"
				isOpen={!!cloneOpen}
				closeModal={() => setCloneOpen(null)}
				width={705}
				formTitle="E Tranzact"
			>
				<ViewTranzactFeesDetails
					data={cloneOpen}
					closeModal={() => setCloneOpen(null)}
				/>
			</CenteredDialog>

			<div className="d-flex justify-content-between align-items-center px-4 py-3 border">
				<h5 className="">E Tranzact Payments</h5>
			</div>
			<EtranzactFeesTable
				title={"Search by confirmation order no, full name or amount"}
				data={eTranzactData?.data.items || []}
				columns={columns}
				debouncedSearch={debounced}
				paginationProps={eTranzactData?.data?.metaData || {}}
				searchTerm={searchTerm}
				setPageNumber={setPageNumber}
				pageNumber={pageNumber}
				loading={isLoadingETranzact || isFetchingETranzact}
			/>
		</section>
	);
};

export default EtranzactFees;
