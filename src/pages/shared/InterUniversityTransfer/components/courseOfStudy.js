import { useHistory } from "react-router";
import { Jumbotron, Button, SMSelect, Spinner } from "../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useApiGet, useApiPost } from "../../../../api/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_UNI_TRANSFER_INFO } from "../../../../store/constant";
import { updateCourseOfStudySchema } from "../uniTransferSchema";
import {
	getApplicationDepartmentsUrl,
	getDepartmentOptionUrl,
	updateTransferApplicationProgrammeDetailsUrl
} from "../../../../api/urls";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";

export const CourseOfStudy = ({ allFaculties }) => {
	const uniTransferState = useSelector((state) => state.uniTransferData);
	const { studentTypeId, applicationTypeId, applicantId, programmeInfo } =
		uniTransferState;
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();
	const [facultyState, setFacultyState] = useState(programmeInfo?.facultyId);
	const [departmentIdState, setDepartmentId] = useState(
		programmeInfo?.departmentId
	);

	const { data: departments } = useApiGet(
		getApplicationDepartmentsUrl(applicationTypeId, facultyState),
		{
			refetchOnWindowFocus: false,
			enabled: !!facultyState
		}
	);

	const { data: departmentOption, isLoading: isLoadingDepartmentOption } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: departmentIdState,
				studentTypeId: studentTypeId
			}),
			{
				refetchOnWindowFocus: false,
				enabled:
					!!departmentIdState || !!programmeInfo?.departmentOptionId
			}
		);

	const allDepartments = useMemo(
		() =>
			formatSelectItems(departments?.data, "department", "departmentId"),
		[departments?.data]
	);

	const allDepartmentOption = useMemo(
		() =>
			formatSelectItems(
				departmentOption?.data,
				"departmentOption",
				"departmentOptionId"
			),
		[departmentOption]
	);

	const { mutate, isLoading: isFormLoading } = useApiPost();

	const {
		handleSubmit,
		control,
		watch,
		setValue,
		clearErrors,
		formState: { errors }
	} = useForm({
		defaultValues: {
			facultyId: findValueAndLabel(
				programmeInfo?.facultyId,
				allFaculties
			),
			departmentId: findValueAndLabel(
				programmeInfo?.departmentId,
				allDepartments
			),
			departmentOptionId: programmeInfo?.departmentOptionId
				? findValueAndLabel(
						programmeInfo?.departmentOptionId,
						allDepartmentOption
				  )
				: null
		},
		resolver: yupResolver(updateCourseOfStudySchema),
		context: {
			isDepartmentOptionRequired:
				departmentOption?.data?.length > 0 ? true : false
		}
	});

	useEffect(() => {
		setValue(
			"departmentOptionId",
			findValueAndLabel(
				programmeInfo?.departmentOptionId,
				allDepartmentOption
			)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [programmeInfo?.departmentOptionId, allDepartmentOption]);

	useEffect(() => {
		setValue(
			"departmentId",
			findValueAndLabel(programmeInfo?.departmentId, allDepartments)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [programmeInfo?.departmentId, allDepartments]);

	useEffect(() => {
		const subscription = watch(({ departmentId }) => {
			setDepartmentId(departmentId?.value);
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

	const onSubmit = async (values) => {
		const payload = {
			applicantId,
			presentUniversity: programmeInfo?.presentUniversity,
			presentFaculty: programmeInfo?.presentFaculty,
			presentDepartment: programmeInfo?.presentDepartment,
			presentCourseOfStudy: programmeInfo?.presentCourseOfStudy,
			departmentId: values?.departmentId?.value,
			departmentOptionId: values?.departmentOptionId?.value
		};

		const storePayload = {
			...payload,
			department: values?.departmentId?.label,
			faculty: values?.facultyId?.label,
			departmentOption: values?.departmentOptionId?.label
		};

		const requestBody = {
			url: updateTransferApplicationProgrammeDetailsUrl(),
			data: payload
		};
		mutate(requestBody, {
			onSuccess: () => {
				dispatch({
					type: SAVE_UNI_TRANSFER_INFO,
					payload: {
						...uniTransferState,
						programmeInfo: storePayload
					}
				});
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Application details updated.",
					body: "Your programme details have been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace({ hash: "#section_d", state });
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

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={<span>Proposed Course of Study</span>}
				footerContent={
					<Button
						data-cy="submit_uni_details"
						label="Next"
						buttonClass="primary"
						type="submit"
						loading={isFormLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
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
										searchable={false}
										placeholder="Choose a faculty"
										onChange={onFacultyChange}
										id="facultyId"
										options={allFaculties}
										isError={!!errors.facultyId}
										errorText={
											errors.facultyId &&
											errors.facultyId.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				{departments?.data?.length > 0 && (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3 d-flex align-items-center">
								<label htmlFor="mobileNumber">Department</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="departmentId"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											searchable={false}
											placeholder="Select a department"
											onChange={onDepartmentChange}
											id="departmentId"
											options={allDepartments}
											isError={!!errors.departmentId}
											errorText={
												errors.departmentId &&
												errors.departmentId.message
											}
										/>
									)}
								/>
							</div>
						</div>
					</div>
				)}
				{departmentOption?.data?.length > 0 && (
					<div className="container-fluid px-4 my-4">
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
											options={allDepartmentOption}
											searchable={false}
											isError={
												!!errors.departmentOptionId
											}
											errorText={
												errors.departmentOptionId &&
												errors.departmentOptionId
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
			</Jumbotron>
		</form>
	);
};
