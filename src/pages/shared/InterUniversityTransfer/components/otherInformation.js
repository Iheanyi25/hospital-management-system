import {
	Jumbotron,
	Button,
	TextField,
	SMSelect,
	Checkbox
} from "../../../../ui_elements";
import { useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { otherInformationSchema } from "../uniTransferSchema";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useApiPost } from "../../../../api/apiCall";
import styles from "../style.module.css";
import { updateTransferApplicationExtraDetailsUrl } from "../../../../api/urls";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";

const selectOptions = [
	{
		label: `Yes`,
		value: "true"
	},
	{ label: "No", value: "false" }
];

export const OtherInformation = ({ allYears, allDepartments }) => {
	const uniTransferData = useSelector((state) => state.uniTransferData);
	const { applicantId, personalInfoResponse } = uniTransferData;
	const [
		appliedToUniversityDateRequired,
		setAppliedToUniversityDateRequired
	] = useState(false);
	const [isDepartmentRequired, setIsDepartmentRequired] = useState(false);
	const [watchData, setWatchData] = useState({
		appliedToUniversity: "",
		offeredAdmission: ""
	});
	const { replace } = useHistory();
	const { mutate, isLoading } = useApiPost();

	useEffect(() => {
		setAppliedToUniversityDateRequired(
			watchData?.appliedToUniversity === selectOptions[0].value ||
			personalInfoResponse?.appliedToUniversityDate
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchData?.appliedToUniversity]);

	useEffect(() => {
		setIsDepartmentRequired(
			watchData.offeredAdmission === selectOptions[0].value ||
			!!personalInfoResponse?.departmentId
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watchData?.appliedToUniversity]);

	const {
		register,
		handleSubmit,
		watch,
		clearErrors,
		setValue,
		control,
		formState: { errors }
	} = useForm({
		defaultValues: {
			appliedToUniversity: personalInfoResponse?.appliedToUniversity
				? findValueAndLabel("true", selectOptions)
				: null,
			appliedToUniversityDate: findValueAndLabel(
				personalInfoResponse?.appliedToUniversityDate,
				allYears
			),
			offeredAdmission: personalInfoResponse?.offeredAdmission
				? findValueAndLabel("true", selectOptions)
				: null,
			departmentId: findValueAndLabel(
				personalInfoResponse?.departmentId,
				allDepartments
			),
			scholarshipDetails: personalInfoResponse?.scholarshipDetails,
			paymentPlan: personalInfoResponse?.paymentPlan
		},
		resolver: yupResolver(otherInformationSchema),
		context: {
			appliedToUniversityDateRequired,
			isDepartmentRequired
		}
	});

	const checkBoxValue = watch(`isDeclarationChecked`);

	const onSubmit = async (values) => {
		const data = {
			applicationFormId: applicantId,
			appliedToUniversity: appliedToUniversityDateRequired,
			appliedToUniversityDate: values?.appliedToUniversityDate?.value,
			offeredAdmission: isDepartmentRequired,
			departmentId: values?.departmentId?.value,
			scholarshipDetails: values?.scholarshipDetails,
			paymentPlan: values?.paymentPlan
		};
		const requestBody = {
			url: updateTransferApplicationExtraDetailsUrl(),
			data
		};
		mutate(requestBody, {
			onSuccess: () => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Application details updated.",
					body: "Your records have been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace({
					pathname: "/uni_transfer_application_details",
					state: {
						email: personalInfoResponse.email
					}
				});
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body: response?.data?.message || "Something went wrong"
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	useEffect(() => {
		const subscription = watch(
			({ appliedToUniversity, offeredAdmission }) => {
				setWatchData((state) => ({
					appliedToUniversity:
						appliedToUniversity?.value ?? state.appliedToUniversity,
					offeredAdmission:
						offeredAdmission?.value ?? state.offeredAdmission
				}));
			}
		);
		return () => subscription.unsubscribe();
	}, [watch]);

	const onOfferedAdmissionChange = (value) => {
		setWatchData({ ...watchData, offeredAdmission: value?.value });
		setValue("offeredAdmission", value);
		setValue("departmentId", null);
		clearErrors("offeredAdmission");
		setIsDepartmentRequired(value?.value === selectOptions[0].value);
	};

	const onAppliedToUniversityChange = (value) => {
		setWatchData({ ...watchData, appliedToUniversity: value?.value });
		setValue("appliedToUniversity", value);
		setValue("appliedToUniversityDate", null);
		clearErrors("appliedToUniversity");
		setAppliedToUniversityDateRequired(
			value?.value === selectOptions[0].value
		);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={<span>Other Information</span>}
				footerContent={
					<Button
						data-cy="submit_personal"
						label="Submit"
						buttonClass="primary"
						type="submit"
						disabled={!checkBoxValue}
						loading={isLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 mt-4 mb-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="appliedToUniversity">
								Have you ever applied for admission to this
								university?
							</label>
						</div>
						<div className="col-lg-9 d-flex align-items-center">
							<div className="w-100">
								<Controller
									name="appliedToUniversity"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Choose an answer"
											options={selectOptions}
											searchable={false}
											id="appliedToUniversity"
											onChange={
												onAppliedToUniversityChange
											}
											isError={
												!!errors.appliedToUniversity
											}
											errorText={
												errors.appliedToUniversity &&
												errors.appliedToUniversity
													.message
											}
										/>
									)}
								/>
							</div>
						</div>
					</div>
				</div>
				{appliedToUniversityDateRequired && (
					<>
						<div className="container-fluid px-4 mt-4 mb-3">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="appliedToUniversityDate">
										When
									</label>
								</div>
								<div className="col-lg-9 d-flex align-items-center">
									<div className="w-100">
										<Controller
											name="appliedToUniversityDate"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<SMSelect
													placeholder="Select year"
													options={allYears}
													searchable={false}
													defaultValue={
														personalInfoResponse?.appliedToUniversityDate
													}
													id="appliedToUniversityDate"
													{...field}
													isError={
														!!errors.appliedToUniversityDate
													}
													errorText={
														errors.appliedToUniversityDate &&
														errors
															.appliedToUniversityDate
															.message
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
				<div className="container-fluid px-4 mt-4 mb-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="offeredAdmission">
								Were you offered Admission?
							</label>
						</div>
						<div className="col-lg-9 d-flex align-items-center">
							<div className="w-100">
								<Controller
									name="offeredAdmission"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Choose an answer"
											options={selectOptions}
											searchable={false}
											onChange={onOfferedAdmissionChange}
											id="offeredAdmission"
											isError={!!errors.offeredAdmission}
											errorText={
												errors.offeredAdmission &&
												errors.offeredAdmission.message
											}
										/>
									)}
								/>
							</div>
						</div>
					</div>
				</div>
				{isDepartmentRequired && (
					<>
						<div className="container-fluid px-4 mt-4 mb-3">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="departmentId">
										State Course of Study
									</label>
								</div>
								<div className="col-lg-9 d-flex align-items-center">
									<div className="w-100">
										<Controller
											name="departmentId"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<SMSelect
													placeholder="Select department"
													options={allDepartments}
													searchable={false}
													id="departmentId"
													{...field}
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
						</div>
					</>
				)}
				<div className="container-fluid my-4">
					<p className={styles.welcome_text}>
						Do you hold a scholarship?
					</p>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex">
							<label htmlFor="scholarshipDetails">
								If so, state awarding body and nature of the
								scholarship
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								className="w-100"
								inputType="textarea"
								id="scholarshipDetails"
								name="scholarshipDetails"
								register={register}
								required
								error={errors.scholarshipDetails}
								errorText={
									errors.scholarshipDetails &&
									errors.scholarshipDetails.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex">
							<label htmlFor="paymentPlan">
								If not, how do you intend to pay for your
								university fees?
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								className="w-100"
								inputType="textarea"
								id="paymentPlan"
								name="paymentPlan"
								register={register}
								required
								error={errors.paymentPlan}
								errorText={
									errors.paymentPlan &&
									errors.paymentPlan.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid my-2">
					<p className={styles.declaration_text}>Declaration</p>
				</div>
				<div className="container-fluid col-lg-12">
					<div className={styles.declaration_box}>
						<Checkbox
							label="I certify that the information given in this form is, to the best of my knowledge and belief, correct and complete"
							labelClassName="ml-3"
							id={`isDeclarationChecked`}
							checked={checkBoxValue}
							onSelect={() =>
								setValue(`isDeclarationChecked`, !checkBoxValue)
							}
						/>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
