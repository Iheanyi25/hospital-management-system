import { useEffect, useState } from "react";
import {
	InvoiceTitle,
	Button,
	ConfirmationModal
} from "../../../../../ui_elements";
import {
	deactivateApplicationInvoiceUrl,
	getApplicationInvoiceDetailsUrl
} from "../../../../../api/urls";
import { useApiGet, useApiPut } from "../../../../../api/apiCall";
import { SearchApplication } from "./components";
import { EmptyState } from "../../../../../assets/svgs";
import { formatDateFromAPI } from "../../../../../utils/formatDate";

const DeleteInvoice = () => {
	const [rrr, setRrr] = useState("");
	const [makeRequest, setMakeRequest] = useState(false);
	const [emptyState, setEmptyState] = useState(true);
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
		{ title: "Invoice Number", value: data?.data?.invoiceNo },
		{ title: "Amount", value: data?.data?.amount },
		{ title: "Invoice Description", value: data?.data?.description },
		{
			title: "Date Generated",
			value: data?.data?.invoiceDate
				? formatDateFromAPI(data?.data?.invoiceDate)
				: ""
		}
	];

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

	return (
		<section>
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
						details={details}
						user={{
							fullName: data?.data?.fullName?.toUpperCase()
						}}
					/>
					<div className="border py-2 d-flex justify-content-end">
						<Button
							type="button"
							buttonClass="danger"
							label="Delete Application"
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

export default DeleteInvoice;
