import {
	Badge,
	Button,
	CenteredDialog,
	TMTable
} from "../../../../../../ui_elements";
import styles from "./style.module.css";
import { useMemo, useRef, useState } from "react";
import { EditReferee } from "./components";
import { useReactToPrint } from "react-to-print";
import { PGRefereeFormPrintout } from "../../../pgRefereeFormPrintout";
import { useEffect } from "react";
import { useApiGet } from "../../../../../../api/apiCall";
import { getRefereePrintOutUrl } from "../../../../../../api/urls";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const refereePrintoutPageStyle = `
@page {
// size: 80mm 50mm;
margin-top: 1rem;
}

// @media all {
//   .pagebreak {
//     display: none;
//   }
// }

@media print {
.pagebreak {
// page-break-before: always;

}
}
`;

export const TrackReferee = ({
	refereeStatuses,
	isFetchingRefereeStatuses,
	rrr
}) => {
	const [editOpen, setEditOpen] = useState(false);
	const { push } = useHistory();
	const [editData, setEditData] = useState({});
	const [refereeEmail, setRefereeEmail] = useState("");
	const [makeRequest, setMakeRequest] = useState(false);
	const refereeFormRef = useRef();
	const handleRefereeForm = useReactToPrint({
		content: () => refereeFormRef.current,
		pageStyle: refereePrintoutPageStyle
	});

	const {
		data: formDetails,
		isFetching,
		error: requestError
	} = useApiGet(getRefereePrintOutUrl(refereeEmail), {
		enabled: makeRequest,
		refetchOnWindowFocus: false
	});
	useEffect(() => {
		if (formDetails?.success && makeRequest && !isFetching) {
			handleRefereeForm();
			setMakeRequest(false);
		}
		if (requestError && makeRequest && !isFetching) {
			setMakeRequest(false);
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Invalid Action!",
				body:
					requestError?.response?.data?.message ||
					`Invalid action, please enter correct details`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	}, [
		handleRefereeForm,
		formDetails,
		requestError,
		push,
		makeRequest,
		isFetching
	]);
	const onSubmit = (data) => {
		setRefereeEmail(data);
		setMakeRequest(true);
	};

	const columns = useMemo(
		() => [
			{
				Header: "Referee Name",
				accessor: "name"
			},
			{
				Header: "Email Address",
				accessor: "email"
			},
			{
				Header: "Status",
				accessor: "status",
				Cell: ({ cell: { row } }) => (
					<Badge
						item={{
							title: row.original.completed
								? "Completed"
								: "Not Completed",
							type: !row.original.completed
								? "warning"
								: "success"
						}}
					/>
				)
			},
			{
				Header: "Action",
				accessor: "buttons",
				Cell: ({ cell: { row } }) => (
					<div>
						<Button
							data-cy="edit-ref"
							label="Edit"
							buttonClass="standard"
							onClick={() => {
								setEditData(row.original);
								setEditOpen(true);
							}}
						/>
						<Button
							data-cy="print_ref"
							label="Print Referee Form"
							buttonClass="primary"
							onClick={() => onSubmit(row.original.email)}
							disabled={!row.original.completed}
							loading={isFetching}
						/>
					</div>
				)
			}
		],
		[isFetching]
	);
	return (
		<div className={styles.container}>
			<div className="d-none">
				<PGRefereeFormPrintout
					componentRef={refereeFormRef}
					formDetails={formDetails?.data}
				/>
			</div>
			<CenteredDialog
				modalId="edit_referee"
				isOpen={editOpen}
				closeModal={() => setEditOpen(false)}
				width={705}
				formTitle="Edit Referee"
			>
				<EditReferee
					data={editData}
					closeModal={() => setEditOpen(false)}
					rrr={rrr}
				/>
			</CenteredDialog>
			<div className={styles.page_content}>
				<div className="w-100">
					<TMTable
						columns={columns}
						data={refereeStatuses?.pgRefereeDetails || []}
						loading={isFetchingRefereeStatuses}
						title="Referee Details"
					/>
				</div>
			</div>
		</div>
	);
};
