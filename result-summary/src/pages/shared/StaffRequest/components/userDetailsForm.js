import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { useApiPost } from "../../../../api/apiCall";
import {
	generateApplicationInvoiceUrl,
	getApplicationInvoiceData
} from "../../../../api/urls";
import {
	Jumbotron,
	Button,
	TextField,
	SMSelect
} from "../../../../ui_elements";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";
import { UserDetailsSchema } from "./schema";
import queryString from "query-string";

export const UserDetailsForm = ({
	userFormData,
	allSessions,
	applicationId,
	makeRequest,
	state
}) => {
	const { push } = useHistory();

	const parsed = queryString.parse(window.location.search);

	const { mutate, isLoading: isPosting } = useApiPost();

	const queryClient = useQueryClient();

	const {
		register,
		control,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting }
	} = useForm({
		defaultValues: {
			Surname: userFormData?.lastname,
			Firstname: userFormData?.firstname,
			Middlename: userFormData?.middleName,
			MobileNo: userFormData?.mobileNo,
			RegNo: userFormData?.regNo,
			Email: userFormData?.email,
			SessionId: findValueAndLabel(userFormData?.sessionId, allSessions),
			Amount: userFormData?.amount,
			ApplicationId: applicationId,
			Referral: parsed.rfc
		},
		resolver: yupResolver(UserDetailsSchema)
	});

	const onSubmit = (data) => {
		const requestDet = {
			url: generateApplicationInvoiceUrl(),
			data: {
				Lastname: data?.Surname,
				FirstName: data?.Firstname,
				Middlename: data?.Middlename ?? "",
				MobileNumber: data?.MobileNo,
				RegNumber: data?.RegNo,
				Email: data?.Email,
				SessionId: data?.SessionId?.value,
				Amount: data?.Amount,
				ApplicationTypeId: 16,
				ReferralCode: parsed.rfc
			}
		};
		mutate(requestDet, {
			onSuccess: (data) => {
				queryClient.invalidateQueries(
					getApplicationInvoiceData({
						ApplicationTypeId: applicationId,
						RegNo: userFormData?.regNo
					})
				);
				push({
					pathname: `/jamb_students_invoice`,
					state: {
						data: data?.data?.data,
						breadcrumb: state?.application?.breadcrumb
					}
				});
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Invoice Action Successful!",
					body: "Invoice generated successfully!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 3000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Invoice Action Failed!",
					body:
						response?.data?.message || `Invoice generated failed!!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 3000);
			}
		});
	};

	useEffect(() => {
		setValue(
			"SessionId",
			findValueAndLabel(userFormData?.sessionId, allSessions)
		);
		setValue("MobileNo", userFormData?.mobileNo);
		setValue("Email", userFormData?.email);
		setValue("Surname", userFormData?.lastname);
		setValue("Firstname", userFormData?.firstname);
		setValue("Lastname", userFormData?.lastname);
		setValue("Amount", userFormData?.amount);
		setValue("RegNo", userFormData?.regNo);
	}, [makeRequest, userFormData, allSessions, setValue]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={"Form"}
				footerContent={
					<Button
						data-cy="sub_next_of_kin"
						label="Generate Invoice"
						buttonClass="primary"
						type="submit"
						loading={isSubmitting || isPosting}
					/>
				}
				borderClasses="border-top-0"
				footerStyle="d-flex justify-content-end"
			>
				<div className="p-4">
					<div className="row">
						<div className="col-md-6">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="surname">Surname</label>
								</div>
								<div className="col-lg-9">
									<TextField
										id="Surname"
										autoComplete="off"
										placeholder="Enter your surname"
										className="w-100"
										type="text"
										name="Surname"
										disabled={userFormData?.lastname}
										register={register}
										error={errors.Surname}
										errorText={
											errors.Surname &&
											errors.Surname.message
										}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="firstName">
										First Name
									</label>
								</div>
								<div className="col-lg-9">
									<TextField
										id="Firstname"
										autoComplete="off"
										placeholder="Enter your first name"
										className="w-100"
										type="text"
										name="Firstname"
										register={register}
										disabled={userFormData?.firstname}
										error={errors.Firstname}
										errorText={
											errors.Firstname &&
											errors.Firstname.message
										}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6 mt-5">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="middleName">
										Middle name
									</label>
								</div>
								<div className="col-lg-9">
									<TextField
										id="Middlename"
										autoComplete="off"
										placeholder="Enter your middle name"
										className="w-100"
										type="text"
										name="Middlename"
										register={register}
										disabled={userFormData?.middleName}
										error={errors.Middlename}
										errorText={
											errors.Middlename &&
											errors.Middlename.message
										}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6 mt-5">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="email">Email</label>
								</div>
								<div className="col-lg-9">
									<TextField
										id="Email"
										autoComplete="off"
										placeholder="example@examplemail.com"
										className="w-100"
										type="email"
										name="Email"
										register={register}
										disabled={userFormData?.email}
										error={errors.Email}
										errorText={
											errors.Email && errors.Email.message
										}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6 mt-5">
							<div className={`row align-items-center`}>
								<div className="col-lg-3 align-items-center">
									<label htmlFor="regNo">Reg. No.</label>
								</div>
								<div className="d-flex col-lg-9">
									<TextField
										className="w-100"
										placeholder="Enter Reg. No."
										name="RegNo"
										type="text"
										register={register}
										disabled={userFormData?.regNo}
										required
										error={errors.RegNo}
										errorText={
											errors.RegNo && errors.RegNo.message
										}
										id="RegNo"
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6 mt-5">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="phoneNo">
										Phone Number
									</label>
								</div>
								<div className="col-lg-9">
									<TextField
										id="MobileNo"
										autoComplete="off"
										placeholder="Enter your phone number"
										className="w-100"
										type="text"
										name="MobileNo"
										register={register}
										disabled={userFormData?.mobileNo}
										error={errors.MobileNo}
										errorText={
											errors.MobileNo &&
											errors.MobileNo.message
										}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6 mt-5">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="phoneNo">Session</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="SessionId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Session"
												options={allSessions}
												id="SessionId"
												searchable={true}
												disabled={
													userFormData?.sessionId
												}
												isError={!!errors.SessionId}
												errorText={
													errors.SessionId &&
													errors.SessionId.message
												}
											/>
										)}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6 mt-5">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="amount">Amount (₦)</label>
								</div>
								<div className="col-lg-9">
									<TextField
										id="Amount"
										autoComplete="off"
										placeholder="Amount (₦)"
										className="w-100"
										type="text"
										name="Amount"
										register={register}
										disabled={userFormData?.amount}
										error={errors.Amount}
										errorText={
											errors.Amount &&
											errors.Amount.message
										}
									/>
								</div>
							</div>
						</div>
						<div className="col-md-6 mt-5">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="amount">Referral</label>
								</div>
								<div className="col-lg-9">
									<TextField
										id="Referral"
										autoComplete="off"
										placeholder="Referral"
										className="w-100"
										type="text"
										name="Referral"
										register={register}
										disabled={parsed.rfc}
										error={errors.Referral}
										errorText={
											errors.Referral &&
											errors.Referral.message
										}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
