import { Jumbotron, Button, SMSelect, Spinner } from "../../../../ui_elements";
import { useHistory, useLocation } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { programmeDetailsSchema } from "../fourYearSandwichSchema";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useApiGet, useApiPost } from "../../../../api/apiCall";
import { SAVE_FOUR_YEAR_SANDWICH_APPLICATION } from "../../../../store/constant";
import {
	storeFourYearSandwichApplicationProgrammeDetailsUrl,
	getApplicationDepartmentsUrl,
	getDepartmentOptionUrl
} from "../../../../api/urls";
import { formatSelectItems } from "../../../../utils/formatSelectItems";

const booleanOptions = [
	{
		label: `Yes`,
		value: true
	},
	{ label: "No", value: false }
];
export const ProgrammeDetails = ({ allFaculties, allYears }) => {
	const fourYearSandwichState = useSelector(
		(state) => state.fourYearSandwichData
	);
	const { programme, studentTypeId, basicInformation } =
		fourYearSandwichState;
	const [departmentIdState, setDepartmentId] = useState(
		programme?.departmentId?.value
	);
	const [facultyState, setFacultyState] = useState(
		programme?.facultyId?.value
	);
	const { applicantId } = fourYearSandwichState;
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { mutate, isLoading } = useApiPost();
	const { state } = useLocation();

	const { data: departments, isLoading: isDepartmentLoading } = useApiGet(
		getApplicationDepartmentsUrl(
			programme?.applicationTypeId,
			facultyState
		),
		{
			refetchOnWindowFocus: false,
			enabled: !!facultyState
		}
	);
	const { data: departmentOption, isLoading: isLoadingDepartmentOptions } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: departmentIdState,
				studentTypeId
			}),
			{
				enabled: !!departmentIdState,
				refetchOnWindowFocus: false
			}
		);
	const allDepartmentOption = useMemo(
		() =>
			formatSelectItems(
				departmentOption?.data,
				"departmentOption",
				"departmentOptionId"
			),
		[departmentOption?.data]
	);

	const allDepartments = useMemo(
		() =>
			formatSelectItems(departments?.data, "department", "departmentId"),
		[departments?.data]
	);

	const {
		handleSubmit,
		watch,
		setValue,
		clearErrors,
		control,
		formState: { errors }
	} = useForm({
		defaultValues: {
			facultyId: basicInformation?.facultyId,
			appliedToUniversity: basicInformation.appliedToUniversity,
			appliedToUniversityDate: basicInformation.appliedToUniversityDate,
			offeredAdmission: basicInformation.offeredAdmission,
			departmentId: basicInformation.departmentId
		},
		resolver: yupResolver(programmeDetailsSchema),
		context: {
			isDepartmentOptionRequired:
				departmentOption?.data?.length > 0 ? true : false
		}
	});

	const onSubmit = async (values) => {
		const data = {
			applicantId,
			appliedToUniversity: values.appliedToUniversity.value,
			appliedToUniversityDate: values.appliedToUniversityDate.value,
			offeredAdmission: values.offeredAdmission.value,
			departmentId: values.departmentId.value
		};
		const requestBody = {
			url: storeFourYearSandwichApplicationProgrammeDetailsUrl(),
			data
		};
		mutate(requestBody, {
			onSuccess: () => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Application details updated.",
					body: "Your sandwich diploma course details successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				dispatch({
					type: SAVE_FOUR_YEAR_SANDWICH_APPLICATION,
					payload: {
						...fourYearSandwichState,
						basicInformation: { ...basicInformation, ...values }
					}
				});
				replace({ hash: "#section_c", state });
			},
			onError: () => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body: "Something went wrong"
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	useEffect(() => {
		const subscription = watch(({ facultyId, departmentId }) => {
			setDepartmentId(departmentId?.value);
			setFacultyState(facultyId?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);
	const onFacultyChange = (value) => {
		setFacultyState(value.value);
		setValue("facultyId", value);
		setValue("departmentId", null);
		setValue("departmentOptionId", null);
		clearErrors("facultyId");
	};

	const onDepartmentChange = (value) => {
		setDepartmentId(value.value);
		setValue("departmentId", value);
		setValue("departmentOptionId", null);
		clearErrors("departmentId");
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={<span>Sandwich Diploma Course</span>}
				footerContent={
					<Button
						data-cy="submit_personal"
						label="Submit"
						buttonClass="primary"
						type="submit"
						loading={isLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="facultyId">Faculty</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="facultyId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a faculty"
										onChange={onFacultyChange}
										searchable={true}
										options={allFaculties}
										isError={!!errors.facultyId}
										errorText={
											errors.facultyId &&
											errors.facultyId.message
										}
										id="facultyId"
									/>
								)}
							/>
						</div>
					</div>
				</div>
				{isDepartmentLoading ? (
					<div className="mb-4">
						<Spinner />
					</div>
				) : (
					allDepartments?.length > 0 &&
					facultyState && (
						<div className="container-fluid px-4 my-4">
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
										defaultValue={programme?.departmentId}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select a department"
												onChange={onDepartmentChange}
												searchable={true}
												options={allDepartments}
												isError={!!errors.departmentId}
												errorText={
													errors.departmentId &&
													errors.departmentId.message
												}
												id="departmentId"
											/>
										)}
									/>
								</div>
							</div>
						</div>
					)
				)}
				{isLoadingDepartmentOptions ? (
					<div className="mb-4">
						<Spinner />
					</div>
				) : (
					allDepartmentOption?.length > 0 && (
						<div className="container-fluid px-4 my-4">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label htmlFor="departmentOptionId">
										Option
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="departmentOptionId"
										control={control}
										defaultValue={
											programme?.departmentOptionId
										}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select an option"
												searchable={true}
												options={allDepartmentOption}
												isError={
													!!errors.departmentOptionId
												}
												errorText={
													errors.departmentOptionId &&
													errors.departmentOptionId
														.message
												}
												id="departmentOption"
											/>
										)}
									/>
								</div>
							</div>
						</div>
					)
				)}
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
											placeholder="Choose an answer"
											options={booleanOptions}
											searchable={false}
											id="appliedToUniversity"
											{...field}
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
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor={`appliedToUniversityDate`}>
								When
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name={`appliedToUniversityDate`}
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select exam year"
										searchable={true}
										options={allYears}
										isError={
											errors?.appliedToUniversityDate
										}
										errorText={
											errors?.appliedToUniversityDate &&
											errors?.appliedToUniversityDate
												?.message
										}
										id={`appliedToUniversityDate`}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 mt-4 mb-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="offeredAdmission">
								Were you offered Admission ? *
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
											placeholder="Choose an answer"
											options={booleanOptions}
											searchable={false}
											id="offeredAdmission"
											{...field}
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
			</Jumbotron>
		</form>
	);
};
