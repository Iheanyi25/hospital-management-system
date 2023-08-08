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
	getLevelForBorrowCoursesUrl
} from "../../../../../api/urls";
import { useApiGet, useApiPut } from "../../../../../api/apiCall";
import { useQueryClient } from "react-query";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { SearchInvoice, Table } from "./components";

const InvoiceManagement = () => {
	const [editData, setEditData] = useState({});
	const [matricNo, setMatricNo] = useState("");
	const { mutate: toggle, isLoading: isPosting } = useApiPut();
	const queryClient = useQueryClient();

	const { data, isLoading, error } = useApiGet(
		getAllStudetInvoicesUrl(matricNo),
		{
			refetchOnWindowFocus: false,
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
		getLevelForBorrowCoursesUrl(data?.data?.studentData?.userId),
		{
			refetchOnWindowFocus: false,
			enabled: !!data?.data?.studentData
		}
	);
	const allLevels = formatSelectItems(levels?.data, "name", "id");
	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const [editOpen, setEditOpen] = useState(false);

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
			value: data?.data?.studentData?.studentModeOfEntry
		},
		{ title: "Level", value: data?.data?.studentData?.level }
	];

	const toggleInvoiceActivation = useCallback(
		({ active, rrr }) => {
			const requestDet = {
				url: deactivatefeeinvoiceUrl(),
				data: {
					active,
					rrr
				}
			};
			toggle(requestDet, {
				onSuccess: () => {
					queryClient.invalidateQueries(
						getAllStudetInvoicesUrl(matricNo)
					);
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Invoice Action Success!",
						body: `Invoice was ${
							active ? "activated" : "deactivated"
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
							`Invoice wasn't ${
								active ? "activated" : "deactivated"
							} successfully!`
					});
					setTimeout(() => {
						errorFlag.close();
					}, 5000);
				}
			});
		},
		[queryClient, toggle, matricNo]
	);

	if (isLoadingSessions) return <Spinner />;
	if (error || sessionsError || levelsError)
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
					data={data}
					emptyState={emptyState}
					loading={isLoading || isPosting || isLoadingLevels}
					title="Invoice"
					toggleInvoiceActivation={toggleInvoiceActivation}
					setEditData={setEditData}
					setEditOpen={setEditOpen}
				/>
			</div>
		</section>
	);
};

export default InvoiceManagement;
