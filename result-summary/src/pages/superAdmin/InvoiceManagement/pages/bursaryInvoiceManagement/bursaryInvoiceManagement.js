import { CenteredDialog, Spinner } from "../../../../../ui_elements";
import styles from "./style.module.css";
import { EditStatus, SearchApplication } from "./components";
import { useState, useCallback } from "react";
import {
	getApplicationSundryInvoiceDetailsUrl,
	deactivatefeeinvoiceUrl,
	getAllSessionsUrl,
	yearOfStudyUrl
} from "../../../../../api/urls";
import { useApiGet, useApiPut } from "../../../../../api/apiCall";
import { useQueryClient } from "react-query";
import { formatSelectItems } from "../../../../../utils/formatSelectItems";
import { Table } from "./components";

const BursaryInvoiceManagement = () => {
	const [editData, setEditData] = useState({});
	const [invoiceCode, setInvoiceCode] = useState("");
	const [makeRequest, setMakeRequest] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const { mutate: toggle, isLoading: isPosting } = useApiPut();
	const queryClient = useQueryClient();

	const { data, isLoading, isFetching, error } = useApiGet(
		getApplicationSundryInvoiceDetailsUrl(invoiceCode),
		{
			refetchOnWindowFocus: false,
			keepPreviousData: true,
			enabled: makeRequest
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
	const allLevels = formatSelectItems(levels?.data, "name", "id");
	const allSessions = formatSelectItems(sessions?.data, "session", "id");

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
						getApplicationSundryInvoiceDetailsUrl(invoiceCode)
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
		[toggle, queryClient]
	);
	console.log(data);
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
					currentFilterState={{ invoiceCode }}
					studentId={data?.data?.studentData?.studentId}
					studentTypeId={data?.data?.studentData?.studentTypeId}
					invoiceCode={invoiceCode}
				/>
			</CenteredDialog>
			<div style={{ marginTop: "74px" }}>
				<SearchApplication
					isLoading={isLoading}
					setInvoiceCode={setInvoiceCode}
					setMakeRequest={setMakeRequest}
				/>
				<Table
					data={data ? [data?.data] : []}
					loading={
						isLoading || isFetching || isPosting || isLoadingLevels
					}
					title="Invoice"
					toggleInvoiceActivation={toggleInvoiceActivation}
					setEditData={setEditData}
					setEditOpen={setEditOpen}
				/>
			</div>
		</section>
	);
};

export default BursaryInvoiceManagement;
