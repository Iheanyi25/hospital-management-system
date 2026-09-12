import {
	CenteredDialog,
	InvoiceTitle,
	Spinner
} from "../../../../../ui_elements";
import styles from "./style.module.css";
import { EditStatus } from "./components";
import { useState, useCallback } from "react";
import emptyState from "../../../../../assets/svgs/emptyDetails.svg";
import {
	getAllStudetInvoicesUrl,
	deactivatefeeinvoiceUrl,
	getAllSessionsUrl,
	yearOfStudyUrl,
	getSchoolFeesPaymentTypesUrl
} from "../../../../../api/urls";
import { useApiGet, useApiPut } from "../../../../../api/apiCall";
import { useQueryClient } from "react-query";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { SearchInvoice, Table } from "./components";
import { PAGESIZE } from "../../../../../utils/constants";

const InvoiceManagement = () => {
	const [editData, setEditData] = useState({});
	const [matricNo, setMatricNo] = useState("");
	const [pageNumber, setPageNumber] = useState(1);
	const [editOpen, setEditOpen] = useState(false);
	const { mutate: toggle, isLoading: isPosting } = useApiPut();
	const queryClient = useQueryClient();
	const pageSize = PAGESIZE.xl;

	const { data, isLoading, isFetching, error } = useApiGet(
		getAllStudetInvoicesUrl({ userId: matricNo, pageSize, pageNumber }),
		{
			refetchOnWindowFocus: false,
			keepPreviousData: true,
			enabled: !!matricNo
		}
	);
	const {
		data: sessions,
		isLoading: isLoadingSessions,
		error: sessionsError
	} = useApiGet(getAllSessionsUrl(), {
		refetchOnWindowFocus: false
	});

	const {
		data: levels,
		isLoading: isLoadingLevels,
		error: levelsError
	} = useApiGet(
		yearOfStudyUrl({
			studentTypeId: data?.data?.studentData?.studentTypeId
		}),
		{
			refetchOnWindowFocus: false,
			enabled: !!data?.data?.studentData
		}
	);
	const {
		data: paymentTypes,
		isLoading: isPaymentTypesLoading,
		error: paymentTypesError
	} = useApiGet(getSchoolFeesPaymentTypesUrl(), {
		refetchOnWindowFocus: false
	});
	const allLevels = formatSelectItems(levels?.data, "name", "id");
	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allPaymentTypes = formatSelectItems(paymentTypes?.data, "name", "id");

	const details = [
		{
			title: "Full Name",
			value: data?.data?.studentData?.fullname?.toUpperCase()
		},
		{ title: "Matric No", value: data?.data?.studentData?.matricNumber },
		{ title: "Faculty", value: data?.data?.studentData?.faculty },
		{ title: "Department", value: data?.data?.studentData?.department },
		{
			title: "Entry Mode",
			value: data?.data?.studentData?.modeOfEntry
		},
		{ title: "Level", value: data?.data?.studentData?.level }
	];

	const toggleInvoiceActivation = useCallback(
		({ active, invoiceCode }) => {
			const requestDet = {
				url: deactivatefeeinvoiceUrl(),
				data: {
					active,
					invoiceCode
				}
			};
			toggle(requestDet, {
				onSuccess: () => {
					queryClient.invalidateQueries(
						getAllStudetInvoicesUrl({ userId: matricNo, pageSize, pageNumber })
					);
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Invoice Action Success!",
						body: `Invoice was ${active ? "activated" : "deactivated"
							} successfully!`
					});
					setTimeout(() => {
						successFlag.close();
					}, 5000);
				},
				onError: ({ response }) => {
					const errorFlag = window.AJS.flag({
						type: "error",
						title: "Invoice Action Success!",
						body:
							response?.data?.message ||
							`Invoice wasn't ${active ? "activated" : "deactivated"
							} successfully!`
					});
					setTimeout(() => {
						errorFlag.close();
					}, 5000);
				}
			});
		},
		[toggle, queryClient, matricNo, pageSize, pageNumber]
	);

	if (isLoadingSessions || isPaymentTypesLoading) return <Spinner />;
	if (error || sessionsError || levelsError || paymentTypesError)
		return (
			"An error has occurred: " +
			error?.response?.data?.messagese?.data?.message
		);

	return (
		<section>
			<CenteredDialog
				modalId="edit_course"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={605}
				customStyles={styles.custom_modal}
				formTitle="Edit invoice	"
			>
				<EditStatus
					closeModal={() => setEditOpen(false)}
					data={editData}
					allLevels={allLevels}
					allSessions={allSessions}
					allPaymentTypes={allPaymentTypes}
					currentFilterState={{ userId: matricNo, pageSize, pageNumber }}
					studentId={data?.data?.studentData?.studentId}
					studentTypeId={data?.data?.studentData?.studentTypeId}
					matricNo={matricNo}
				/>
			</CenteredDialog>
			<div style={{ marginTop: "74px" }}>
				<SearchInvoice
					isLoading={isLoading}
					setMatricNo={setMatricNo}
				/>
				{data && (
					<InvoiceTitle
						noMargin={false}
						details={details}
						user={{
							fullName:
								data?.data?.studentData?.fullName?.toUpperCase(),
							passPort: data?.data?.studentData?.passPort
						}}
					/>
				)}
				<Table
					data={data?.data?.invoiceData?.items || []}
					emptyState={emptyState}
					loading={
						isLoading || isFetching || isPosting || isLoadingLevels
					}
					title="Invoice"
					toggleInvoiceActivation={toggleInvoiceActivation}
					setEditData={setEditData}
					setPageNumber={setPageNumber}
					pageNumber={pageNumber}
					setEditOpen={setEditOpen}
					metaData={data?.data?.invoiceData.metaData}
					paginationProps={data?.data?.invoiceData?.metaData || {}}
				/>
			</div>
		</section>
	);
};

export default InvoiceManagement;
