import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useApiGet } from "../../../../api/apiCall";
import { getApplicationJupebFeeInvoiceData } from "../../../../api/urls";
import {
	Jumbotron,
	Button,
	SMSelect,
	TextField
} from "../../../../ui_elements";
import { JambFormSchema } from "./schema";

export const JupebStudentForms = ({
	allApplicationTypes,
	setUserFormState,
	setUserFormData,
	userFormState,
	setJupebAplicationId,
	makeRequest,
	state,
	setMakeRequest
}) => {
	const [applicationTypeId, setApplicationTypeId] = useState("");
	const [regNo, setRegNumber] = useState("");
	const { push } = useHistory();

	const {
		control,
		register,
		handleSubmit,
		getValues,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			InvoiceTypeId: {
				value: state?.application?.id,
				label: state?.application?.name
			}
		},
		resolver: yupResolver(JambFormSchema)
	});

	const {
		data: invoiceData,
		isLoading,
		error: requestError
	} = useApiGet(
		getApplicationJupebFeeInvoiceData({
			applicationTypeId,
			regNumber: encodeURIComponent(regNo)
		}),
		{
			enabled: makeRequest,
			refetchOnWindowFocus: false
		}
	);

	useEffect(() => {
		if (invoiceData?.success && makeRequest && !isLoading) {
			setMakeRequest(false);
			if (invoiceData?.data?.invoiceNo) {
				push({
					pathname: `/jupeb_students_invoice`,
					state: { data: invoiceData?.data }
				});
			} else {
				setUserFormState(true);
				setUserFormData(invoiceData?.data);
			}
		}
		if (requestError && makeRequest && !isLoading) {
			setMakeRequest(false);
			setUserFormState(false);
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
		invoiceData,
		requestError,
		makeRequest,
		isLoading,
		userFormState,
		setUserFormData,
		setUserFormState,
		setMakeRequest,
		push
	]);

	const onSubmit = () => {
		setApplicationTypeId(getValues("InvoiceTypeId.value"));
		setJupebAplicationId(getValues("InvoiceTypeId.value"));
		setRegNumber(getValues("MobileNo"));
		setMakeRequest(true);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-100 mt-3">
			<Jumbotron
				headerText="Generate Payment Invoice"
				footerContent={
					<Button
						data-cy="fetch_details"
						type="submit"
						buttonClass="primary"
						label="Submit"
						loading={isSubmitting || isLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<section className="p-4 container flex-wrap align-items-center justify-content-between">
					<div className="row">
						<div className="col-md-6">
							<div className="row align-items-center">
								<div className="col-lg-3 align-items-center">
									<label
										className="font-weight-bold"
										htmlFor="setupCategoryId"
									>
										Invoice Type
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="InvoiceTypeId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												placeholder="Select a Invoice Type"
												options={allApplicationTypes}
												id="InvoiceTypeId"
												searchable={true}
												disabled
												{...field}
												isError={!!errors.InvoiceTypeId}
												errorText={
													errors.InvoiceTypeId &&
													errors.InvoiceTypeId.message
												}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<div className={`col-md-6 mt-3 mt-md-0`}>
							<div className={`row align-items-center`}>
								<div className="col-lg-3 align-items-center">
									<label htmlFor="regNo">Phone Number</label>
								</div>
								<div className="d-flex col-lg-9">
									<TextField
										className="w-100"
										placeholder="Enter Phone Number"
										name="MobileNo"
										type="text"
										register={register}
										required
										error={errors.MobileNo}
										errorText={
											errors.MobileNo &&
											errors.MobileNo.message
										}
										id="RegNo"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Jumbotron>
		</form>
	);
};
