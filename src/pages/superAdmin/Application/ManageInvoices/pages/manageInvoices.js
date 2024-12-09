import { useEffect, useState } from "react";
import {
	InvoiceTitle,
	Button,
	CenteredDialog,
	ConfirmationModal
} from "../../../../../ui_elements";
import {
	getApplicationInvoiceDetailsUrl,
	deactivateApplicationInvoiceUrl
} from "../../../../../api/urls";
import { useApiGet, useApiPut } from "../../../../../api/apiCall";
import { SearchApplication, EditInvoice } from "./components";
import { EmptyState } from "../../../../../assets/svgs";
import { formatDateFromAPI } from "../../../../../utils/formatDate";

const ManageInvoices = () => {
	const [rrr, setRrr] = useState("");
	const [editOpen, setEditOpen] = useState(false);
	const [editData, setEditData] = useState({});
	const [emptyState, setEmptyState] = useState(true);
	const [makeRequest, setMakeRequest] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	const { mutate, isLoading: isDeleting } = useApiPut({ retry: false });

	const { remove, data, isLoading, error } = useApiGet(
		getApplicationInvoiceDetailsUrl(rrr),
		{
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			enabled: makeRequest,
			retry: false
		}
	);

	let details = [
		{
			title: "Full Name",
			value: data?.data?.fullName?.toUpperCase()
		},
		{
			title: "First Name",
			value: data?.data?.firstname?.toUpperCase()
		},
		{
			title: "Middle Name",
			value: data?.data?.middlename?.toUpperCase()
		},
		{
			title: "Last Name",
			value: data?.data?.lastname?.toUpperCase()
		},
		{ title: "Email", value: data?.data?.email },
		{ title: "Phone number", value: data?.data?.mobileNumber },
		{ title: "Application Type", value: data?.data?.paymentType },
		{ title: "RRR", value: data?.data?.rrr },
		{ title: "Amount", value: data?.data?.amount },
		{ title: "Session", value: data?.data?.session },
		{
			title: "Date Generated",
			value: data?.data?.dateGenerated
				? formatDateFromAPI(data?.data?.dateGenerated)
				: ""
		},
		{ title: "Reg Number", value: data?.data?.regNumber },
		{ title: "SessionId", value: data?.data?.sessionId },
		{ title: "ApplicationTypeId", value: data?.data?.applicationTypeId }
	];

	const detailsToDisplay = details.filter((detail) => {
		return ![
			"SessionId",
			"ApplicationTypeId",
			"Reg Number",
			"First Name",
			"Middle Name",
			"Last Name"
		].includes(detail.title);
	});

	// const onSubmit = () => {
	//   const requestBody = {
	//     url: updateApplicationInvoiceUrl(),
	//     data: {
	//       RRR: data?.data?.rrr
	//     }
	//   };

	//   mutate(requestBody, {
	//     onSuccess: () => {
	//       setMakeRequest(false);
	//       setEmptyState(true);
	//       remove();
	//       const successFlag = window.AJS.flag({
	//         type: "success",
	//         title: "Manage Invoices",
	//         body: "Invoice update successful"
	//       });
	//       setTimeout(() => {
	//         successFlag.close();
	//       }, 5000);
	//     },
	//     onError: ({ response }) => {
	//       const errorFlag = window.AJS.flag({
	//         type: "error",
	//         title: "Failed!",
	//         body:
	//           response?.data?.message ||
	//           response?.data?.title ||
	//           "Something went wrong"
	//       });
	//       setTimeout(() => {
	//         errorFlag.close();
	//       }, 5000);
	//     }
	//   });
	// };

	const onSubmit = () => {
		const requestBody = {
			url: deactivateApplicationInvoiceUrl(data?.data?.rrr)
		};

		mutate(requestBody, {
			onSuccess: () => {
				setMakeRequest(false);
				setOpenDelete(false);
				setEmptyState(true);
				remove();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Delete Invoice",
					body: "Invoice delete successful"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body:
						response?.data?.message ||
						response?.data?.title ||
						"Something went wrong"
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	useEffect(() => {
		if (error) {
			setMakeRequest(false);
			setEmptyState(true);
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body: error?.response?.data?.message || "Something went wrong"
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	}, [error]);

	const handleCloseEditModal = () => setEditOpen(false);

	return (
		<section>
			<CenteredDialog
				modal="edit_invoice"
				isOpen={editOpen}
				closeModal={handleCloseEditModal}
				formTitle="Edit Invoice"
			>
				<EditInvoice
					closeModal={handleCloseEditModal}
					editInvoiceData={editData}
					rrr={rrr}
				/>
			</CenteredDialog>
			<ConfirmationModal
				isOpen={openDelete}
				closeModal={() => setOpenDelete(false)}
				handleClick={onSubmit}
				formTitle="Delete Application"
				message="Are you sure you want to delete this invoice?"
				isLoading={isDeleting}
				buttonLabel="Delete Application"
			/>
			<SearchApplication
				isLoading={isLoading}
				setRrr={setRrr}
				setMakeRequest={setMakeRequest}
				setEmptyState={setEmptyState}
			/>
			{data && !emptyState ? (
				<>
					<InvoiceTitle
						className="py-5"
						noMargin={false}
						details={detailsToDisplay}
						user={{
							fullName:
								data?.data?.studentData?.fullName.toUpperCase(),
							passPort: data?.data?.passport
						}}
						split={true}
					/>
					<div className="border py-2 d-flex justify-content-end">
						<Button
							type="button"
							buttonClass="standard"
							label="Edit"
							onClick={() => {
								setEditData({
									...details
								});
								setEditOpen(true);
							}}
						/>
						<Button
							type="button"
							buttonClass="danger"
							label="Delete"
							onClick={() => setOpenDelete(true)}
							loading={isLoading}
						/>
					</div>
				</>
			) : emptyState || !data ? (
				<div className="d-flex flex-column align-items-center py-5">
					<EmptyState />
					<h4 className="mt-">
						Your request result will be displayed here
					</h4>
				</div>
			) : (
				""
			)}
		</section>
	);
};

export default ManageInvoices;
