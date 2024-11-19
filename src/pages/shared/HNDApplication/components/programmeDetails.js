import { useEffect, useMemo, useState } from "react";
import {
	Jumbotron,
	Button,
	SMSelect,
	Spinner
} from "../../../../ui_elements";
import { useLocation, useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_PUTME_INFO } from "../../../../store/constant";
import { useApiGet, useApiPost } from "../../../../api/apiCall";
import {
	getDepartmentsUrl,
	hndProgrammeDetailsFormUrl,
	getDepartmentOptionUrl,
} from "../../../../api/urls";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProgrammeDetailsSchema } from "../hndSchema";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { fieldSetterAndClearer } from "../../../../utils/fieldSetterAndClearer";

export const ProgrammeDetails = ({
	allFaculties,
	fromJambState,
}) => {
	const putmeStoreData = useSelector((state) => state.putmeData);
	const { programmeInfo, StudentTypeId, personalInfo } = putmeStoreData;
	const [facultyState, setFacultyState] = useState(
		programmeInfo?.faculty?.value
	);

	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

	if (!state) {
		replace("/hnd_login");
	}

	const { data: departments, isLoading: isDepartmentLoading } = useApiGet(
		getDepartmentsUrl(StudentTypeId, facultyState),
		{
			refetchOnWindowFocus: false,
			enabled: !!facultyState
		}
	);

	const { data: departmentsOptions, isLoading: isLoadingDepartmentsOptions } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: programmeInfo?.department?.value,
				studentTypeId: StudentTypeId
			}),
			{
				refetchOnWindowFocus: false,
				enabled:
					programmeInfo?.department?.value !==
					undefined
			}
		);

	const allDepartments = useMemo(
		() =>
			formatSelectItems(departments?.data, "department", "departmentId"),
		[departments?.data]
	);

	const allDepartmentOptions = formatSelectItems(
		departmentsOptions?.data,
		"departmentOption",
		"departmentOptionId"
	);

	const { mutate, isLoading: isFormLoading } = useApiPost();

	const {
		control,
		handleSubmit,
		watch,
		setValue,
		formState: { errors }
	} = useForm({
		defaultValues: {
			faculty: putmeStoreData?.programmeInfo?.faculty,
			department: putmeStoreData?.programmeInfo?.department,
			regNo: putmeStoreData?.programmeInfo?.regNo,
			alternativeDepartment: putmeStoreData?.alternativeDepartment
			
		},
		resolver: yupResolver(ProgrammeDetailsSchema)
	});

	const onSubmit = (programmeInfo) => {
		const requestBody = {
			url: hndProgrammeDetailsFormUrl(),
			data: {
				JambNumber: programmeInfo?.regNo,
				FacultyId: programmeInfo?.faculty?.value,
				DepartmentId: programmeInfo?.department?.value,
				DepartmentOptionId: programmeInfo?.departmentOption?.value,
				AlternativeDepartmentId: programmeInfo?.alternativeDepartment?.value,
				ApplicantId: personalInfo?.postUtmeApplicantBasicInformationId,
			}
		};
		mutate(requestBody, {
			onSuccess: () => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Details saved successfully",
					body: "Your programme details has been successfully saved"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				dispatch({
					type: SAVE_PUTME_INFO,
					payload: {
						...putmeStoreData,
						programmeInfo
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
		const subscription = watch(({ faculty, department }) => {
			setFacultyState(faculty?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch, setValue]);

	useEffect(() => {
		if (errors?.utmeResultSlip) {
			const successFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body: "You have to upload your UTME slip!"
			});
			setTimeout(() => {
				successFlag.close();
			}, 5000);
		}
	}, [errors]);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText="Programme Details"
				endText="Step 2 of 4"
				footerContent={
					<div>
						<Button
							data-cy="back"
							label="Previous"
							buttonClass="secondary"
							type="button"
							disabled={isFormLoading || isDepartmentLoading}
							onClick = {() => replace({ hash: "#section_a", state })}
						/>
						<Button
							data-cy="submit_personal"
							label="Next"
							buttonClass="primary"
							type="submit"
							disabled={isFormLoading || isDepartmentLoading}
							loading={isFormLoading}
						/>
					</div>

				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="faculty">First Choice School*</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="faculty"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a school"
										searchable={true}
										id="faculty"
										onChange={(value) =>
											fieldSetterAndClearer({
												value,
												setterFunc: setValue,
												setField: "faculty",
												clearFields: ["department"]
											})
										}
										disabled={fromJambState}
										options={allFaculties}
										isError={!!errors.faculty}
										errorText={
											errors.faculty &&
											errors.faculty.message
										}
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
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="department">
										First Choice Programme*
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="department"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select a department"
												searchable={true}
												id="department"
												disabled={fromJambState}
												options={allDepartments}
												isError={!!errors.department}
												errorText={
													errors.department &&
													errors.department.message
												}
											/>
										)}
									/>
								</div>
							</div>
						</div>
					)
				)}
				{isLoadingDepartmentsOptions ? (
					<div className="mb-4">
						<Spinner/>
					</div>
				) : (allDepartmentOptions?.length > 0 && (
					<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="departmentOption">
								Programme Option*
							</label>
						</div>
						<div className="col-lg-9">
									<Controller
										name="departmentOption"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select a programme option"
												searchable={true}
												id="departmentOption"
												disabled={fromJambState}
												options={allDepartments}
												isError={!!errors.departmentOption}
												errorText={
													errors.departmentOption &&
													errors.departmentOption.message
												}
											/>
										)}
									/>
								</div>
					</div>
				</div>
				))}
				
				{isDepartmentLoading ? (
					<div className="mb-4">
						<Spinner />
					</div>
				) : (
					allDepartments?.length > 0 &&
					facultyState && (
						<div className="container-fluid px-4 my-4">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="alternativeDepartment">
										Second Choice Programme
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="alternativedepartment"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select a department"
												searchable={true}
												id="department"
												disabled={fromJambState}
												options={allDepartments}
												isError={!!errors.department}
												errorText={
													errors.department &&
													errors.department.message
												}
											/>
										)}
									/>
								</div>
							</div>
						</div>
					)
				)}
			</Jumbotron>
		</form>
	);
};
