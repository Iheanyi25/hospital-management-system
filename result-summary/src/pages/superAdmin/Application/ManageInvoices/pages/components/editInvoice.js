import styles from "../style.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApiPut } from "../../../../../../api/apiCall";
import { Button, TextField } from "../../../../../../ui_elements";
import { useQueryClient } from "react-query";
import {
	getApplicationInvoiceDetailsUrl,
	updateApplicationInvoiceUrl
} from "../../../../../../api/urls";
import { UploadSchema } from "./componentsSchema";
import { useEffect } from "react";

export const EditInvoice = ({ closeModal, rrr, editInvoiceData }) => {
	const { mutate, isLoading } = useApiPut();
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset
	} = useForm({
		resolver: yupResolver(UploadSchema)
	});

	useEffect(() => {
		console.log(editInvoiceData);
		const getObjectByTitle = (data, title) => {
			const foundObject = Object.values(data).find(
				(item) => item.title === title
			);
			return foundObject ? foundObject.value : "";
		};

		reset({
			rrr: getObjectByTitle(editInvoiceData, "Reference Number"),
			firstname: getObjectByTitle(editInvoiceData, "First Name"),
			middlename: getObjectByTitle(editInvoiceData, "Middle Name"),
			lastname: getObjectByTitle(editInvoiceData, "Last Name"),
			email: getObjectByTitle(editInvoiceData, "Email"),
			mobileNumber: getObjectByTitle(editInvoiceData, "Phone number"),
			regNo: getObjectByTitle(editInvoiceData, "Reg Number"),
			sessionId: getObjectByTitle(editInvoiceData, "SessionId"),
			applicationTypeId: getObjectByTitle(
				editInvoiceData,
				"ApplicationTypeId"
			)
		});
	}, [editInvoiceData, reset]);

	const onSubmit = (data) => {
		console.log(data);

		const requestDet = {
			url: updateApplicationInvoiceUrl(),
			data: {
				Email: data?.email,
				FirstName: data?.firstname,
				MiddleName: data?.middlename,
				LastName: data?.lastname,
				mobileNumber: data?.mobileNumber,
				RegNumber: data?.regNo,
				RRR: data?.rrr,
				ApplicationTypeId: data?.applicationTypeId,
				SessionId: data?.sessionId
			}
		};

		mutate(requestDet, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getApplicationInvoiceDetailsUrl(rrr)
				);
				closeModal();
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Invoice Update Success!",
					body: "You have successfully updated this invoice"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				closeModal();
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Invoice Update Failed!",
					body: response?.data?.message || `Something went wrong`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};

	return (
		<form
			className={`${styles.form_content} w-100 mt-5`}
			onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}
		>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="rrr">Reference Number</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="rrr"
						type="text"
						disabled
						name="rrr"
						register={register}
					/>
				</div>
			</div>

			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="full_name">Full Name</label>
				</div>
				<div className="col-lg-9">
					<div className="row" id="full_name">
						<div className="col-4">
							<TextField
								autoComplete="off"
								className="w-100 pr-2"
								name="firstname"
								register={register}
								placeholder="First Name"
							/>
						</div>
						<div className="col-4">
							<TextField
								autoComplete="off"
								className="w-100 px-2"
								name="middlename"
								register={register}
								placeholder="Middle Name"
							/>
						</div>
						<div className="col-4">
							<TextField
								autoComplete="off"
								className="w-100"
								name="lastname"
								register={register}
								placeholder="Last Name"
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="email">Email Address</label>
				</div>
				<div className="col-lg-9">
					<TextField
						autoComplete="off"
						className="w-100"
						type="email"
						id="email"
						name="email"
						register={register}
						required
						error={errors.email}
						errorText={errors.email && errors.email.message}
						placeholder="example@examplemail.com"
					/>
				</div>
			</div>

			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="mobileNumber">Phone Number</label>
				</div>
				<div className="d-flex col-lg-9">
					<TextField
						id="mobileNumber"
						className="w-100"
						type="text"
						name="mobileNumber"
						register={register}
						error={errors.mobileNumber}
						errorText={
							errors.mobileNumber && errors.mobileNumber.message
						}
						placeholder="Enter phone number"
					/>
				</div>
			</div>

			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="regNumber">Reg No</label>
				</div>
				<div className="d-flex col-lg-9">
					<TextField
						id="regNo"
						className="w-100"
						type="text"
						name="regNo"
						register={register}
						error={errors.regNo}
						errorText={errors.regNo && errors.regNo.message}
						placeholder="Enter registration number"
					/>
				</div>
			</div>
			<div className="d-flex justify-content-end">
				<Button
					data-cy="update_invoice_assignment"
					label="Update"
					buttonClass="primary"
					loading={isSubmitting || isLoading}
				/>
			</div>
		</form>
	);
};
