import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import { useApiGet, useApiPost } from "../../../api/apiCall";
import {
	getDepartmentOptionUrl,
	getAllDepartmentsWithoutValuesUrl,
	getAllSessionsUrl,
	getTranscriptPostingUrl,
	generateTranscriptInvoiceUrl,
	getTranscriptBaseFeeeUrl
} from "../../../api/urls";
import {
	Jumbotron,
	Button,
	TextField,
	Spinner,
	SMSelect,
	RadioButtons
} from "../../../ui_elements";
import { formatSelectItems } from "../../../utils/formatSelectItems";
import { Schema } from "./schema";
import ContainerStyles from "../../superAdmin/CourseManagement/pages/AssignCourse/style.module.css";
import { findValueAndLabel } from "../../../utils/findValueAndLabel";

const Transcript = () => {
	const [watchData, setWatchData] = useState({
		departmentId: "",
		scanning: "false",
		destination: ""
	});
	const { push } = useHistory();
	const { mutate, isLoading } = useApiPost();

	const {
		data: departments,
		isLoading: isDepartmentLoading,
		error: departmentError
	} = useApiGet(getAllDepartmentsWithoutValuesUrl());
	const {
		data: sessions,
		isLoading: isSessionsLoading,
		error: sessionsError
	} = useApiGet(getAllSessionsUrl());
	const {
		data: baseFee,
		isLoading: isLoadingBaseFee,
		error: feeError
	} = useApiGet(getTranscriptBaseFeeeUrl(), {
		refetchOnWindowFocus: false
	});
	const {
		data: transcriptPostings,
		isLoading: isTranscriptPostingsLoading,
		error: transcriptPostingsError
	} = useApiGet(getTranscriptPostingUrl());
	const { data: departmentOption, isLoading: isLoadingDepartmentOption } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: watchData?.departmentId
			}),
			{
				refetchOnWindowFocus: false,
				enabled: !!watchData?.departmentId
			}
		);
	const allDepartments = formatSelectItems(departments?.data, "name", "id");
	const allDepartmentOption = formatSelectItems(
		departmentOption?.data,
		"name",
		"id"
	);
	const allSessions = formatSelectItems(sessions?.data, "session", "id");
	const allTranscriptPostings = formatSelectItems(
		transcriptPostings?.data,
		"location",
		["deliveryFee", "scanningFee"]
	);
	const {
		register,
		control,
		watch,
		setValue,
		formState: { errors },
		handleSubmit
	} = useForm({
		resolver: yupResolver(Schema),
		context: {
			isDepartmentOptionRequired:
				departmentOption?.data?.length > 0 ? true : false
		}
	});

	useEffect(() => {
		const subscription = watch(
			({ departmentId, scanning, destination }) => {
				setWatchData((state) => ({
					...state,
					departmentId: departmentId?.value,
					scanning,
					destination: destination?.value
				}));
			}
		);
		return () => subscription.unsubscribe();
	}, [watch]);
	useEffect(() => {
		if (watchData.destination && watchData.scanning) {
			setValue(
				"amount",
				baseFee?.data?.amount +
					(watchData.scanning === "false"
						? watchData.destination.deliveryFee
						: watchData.destination.deliveryFee +
						  watchData.destination.scanningFee)
			);
		}
	}, [watchData.destination, baseFee, watchData.scanning, setValue]);
	const onSubmit = (values) => {
		const requestDet = {
			url: generateTranscriptInvoiceUrl(),
			data: {
				surname: values?.surname,
				firstName: values?.firstName,
				middleName: values?.middleName,
				regNumber: values?.regNo,
				mobileNumber: values?.phoneNo,
				email: values?.email,
				departmentId: values?.departmentId.value,
				departmentOptionId: values?.departmentOptionId?.value,
				sessionId: values?.sessionId.value,
				amount: values?.amount,
				destination: values?.destination.label,
				scanning: values?.scanning === "false" ? false : true
			}
		};
		mutate(requestDet, {
			onSuccess: (data) => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Invoice successfully generated!",
					body: "You generated an invoice for transcript payment successfully"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				push({
					pathname: `/academic_fees/sundry_reciepts`,
					state: { data: data?.data?.data }
				});
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Invoice generation failed!",
					body:
						response?.data?.message ||
						`Something went wrong while generating invoice.`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	const defaultLocation = findValueAndLabel(
		"No Posting",
		allTranscriptPostings,
		"label"
	);
	if (
		isDepartmentLoading ||
		isTranscriptPostingsLoading ||
		isSessionsLoading ||
		isLoadingBaseFee
	)
		return (
			<div style={{ marginTop: "100px" }}>
				<Spinner />
			</div>
		);
	if (departmentError || transcriptPostingsError || sessionsError || feeError)
		return (
			"An error has occurred: " + departmentError?.response?.data?.message
		);
	return (
		<div className={ContainerStyles.page_content}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Jumbotron
					headerText="Transcript Processing & Posting"
					footerContent={
						<Button
							data-cy="sub_next_of_kin"
							label="Submit"
							buttonClass="primary"
							type="submit"
							loading={isLoading}
						/>
					}
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
											id="surname"
											autoComplete="off"
											placeholder="Enter your surname"
											className="w-100"
											type="text"
											name="surname"
											register={register}
											error={errors.surname}
											errorText={
												errors.surname &&
												errors.surname.message
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
											id="firstName"
											autoComplete="off"
											placeholder="Enter your first name"
											className="w-100"
											type="text"
											name="firstName"
											register={register}
											error={errors.firstName}
											errorText={
												errors.firstName &&
												errors.firstName.message
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
											id="middleName"
											autoComplete="off"
											placeholder="Enter your middle name"
											className="w-100"
											type="text"
											name="middleName"
											register={register}
											error={errors.middleName}
											errorText={
												errors.middleName &&
												errors.middleName.message
											}
										/>
									</div>
								</div>
							</div>
							<div className="col-md-6 mt-5">
								<div className="row">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor="regNo">Reg No</label>
									</div>
									<div className="col-lg-9">
										<TextField
											id="regNo"
											autoComplete="off"
											placeholder="Enter your reg no"
											className="w-100"
											type="text"
											name="regNo"
											register={register}
											error={errors.regNo}
											errorText={
												errors.regNo &&
												errors.regNo.message
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
											id="email"
											autoComplete="off"
											placeholder="example@examplemail.com"
											className="w-100"
											type="email"
											name="email"
											register={register}
											error={errors.email}
											errorText={
												errors.email &&
												errors.email.message
											}
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
											id="phoneNo"
											autoComplete="off"
											placeholder="Enter your phone number"
											className="w-100"
											type="text"
											name="phoneNo"
											register={register}
											error={errors.phoneNo}
											errorText={
												errors.phoneNo &&
												errors.phoneNo.message
											}
										/>
									</div>
								</div>
							</div>
							<div className="col-md-6 mt-5">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label htmlFor="departmentId">
											Department
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="departmentId"
											control={control}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="departmentId"
													placeholder="Select department"
													options={allDepartments}
													searchable={true}
													isError={
														!!errors.departmentId
													}
													errorText={
														errors.departmentId &&
														errors.departmentId
															.message
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
							{departmentOption?.data?.length > 0 && (
								<div className="col-md-6 mt-5">
									<div className="row">
										<div className="col-lg-3  d-flex align-items-center">
											<label htmlFor="departmentOptionId">
												Department Option
											</label>
										</div>
										<div className="col-lg-9">
											<Controller
												name="departmentOptionId"
												control={control}
												rules={{
													required: true
												}}
												render={({ field }) => (
													<SMSelect
														{...field}
														id="departmentOptionId"
														placeholder="Select department option"
														options={
															allDepartmentOption
														}
														searchable={false}
														isError={
															!!errors.departmentOptionId
														}
														errorText={
															errors.departmentOptionId &&
															errors
																.departmentOptionId
																.message
														}
													/>
												)}
											/>
										</div>
									</div>
								</div>
							)}
							{isLoadingDepartmentOption && (
								<div className="col-md-6">
									<Spinner />
								</div>
							)}
							<div className="col-md-6 mt-5">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label htmlFor="sessionId">
											Payment Session
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="sessionId"
											control={control}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="sessionId"
													placeholder="Select payment session"
													options={allSessions}
													searchable={true}
													isError={!!errors.sessionId}
													errorText={
														errors.sessionId &&
														errors.sessionId.message
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
							<div className="col-md-6 mt-5">
								<div className="row">
									<div className="col-lg-3  d-flex align-items-center">
										<label htmlFor="destination">
											Posting Location
										</label>
									</div>
									<div className="col-lg-9">
										<Controller
											name="destination"
											control={control}
											defaultValue={defaultLocation}
											rules={{
												required: true
											}}
											render={({ field }) => (
												<SMSelect
													{...field}
													id="destination"
													placeholder="Select posting location"
													options={
														allTranscriptPostings
													}
													searchable={true}
													isError={
														!!errors.destination
													}
													errorText={
														errors.destination &&
														errors.destination
															.message
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
							<div className="col-md-6 mt-5">
								<div className="row">
									<div className="col-lg-3">
										<label htmlFor="scanning">
											Scanning
										</label>
									</div>
									<div
										className="col-lg-9"
										name="scanning"
										id="scanning"
									>
										<RadioButtons
											label="Yes"
											value="true"
											name="scanning"
											register={register}
											checked={
												watchData?.scanning === "true"
											}
										/>
										<RadioButtons
											label="No"
											value="false"
											name="scanning"
											register={register}
											checked={
												watchData?.scanning === "false"
											}
										/>
									</div>
								</div>
							</div>
							<div className="col-md-6 mt-5">
								<div className="row">
									<div className="col-lg-3 d-flex align-items-center">
										<label htmlFor="amount">
											Amount (₦)
										</label>
									</div>
									<div className="col-lg-9">
										<TextField
											id="amount"
											autoComplete="off"
											placeholder="Amount (₦)"
											className="w-100"
											type="text"
											name="amount"
											defaultValue={
												defaultLocation?.value
													?.deliveryFee +
												baseFee?.data?.amount
											}
											register={register}
											disabled
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Jumbotron>
			</form>
		</div>
	);
};

export default Transcript;
