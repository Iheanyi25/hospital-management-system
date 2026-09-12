import {
	Jumbotron,
	Button,
	SMSelect,
	CompulsoryIndicator,
	Spinner
} from "../../../../ui_elements";
import { useLocation, useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { useApiPost, useApiGet } from "../../../../api/apiCall";
import {
	getDepartmentOptionUrl,
	setDiplomaApplicationProgrammeDetails,
	getApplicationDepartmentsUrl
} from "../../../../api/urls";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_DIPLOMA_INFO } from "../../../../store/constant";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { courseInfoSchema } from "../diplomaSchema";
import { useState } from "react";
import { useEffect } from "react";

export const DiplomaCourseForm = ({
	allFaculties,
}) => {
	const diplomaState = useSelector((state) => state.diplomaData);
	const { programme,basicInformation } = diplomaState;
	const { mutate, isLoading } = useApiPost();
	const [departmentOptionData, setDepartmentOptionData] = useState([]);
	const dispatch = useDispatch();
	const { state } = useLocation();
	const { replace } = useHistory();
	const { applicantId } = state;

	const {
		control,
		handleSubmit,
		watch,
		setValue,
		clearErrors,
		formState: { errors }
	} = useForm({
		defaultValues: {
			facultyId: programme?.faculty,
			departmentId: programme?.department,
			departmentOptionId: programme?.departmentOption
		},
		resolver: yupResolver(courseInfoSchema),
		context: {
			isDepartmentOptionRequired:
				departmentOptionData?.length > 0 ? true : false
		}
	});

	const { data: departments, isLoading: isLoadingDepartment, refetch:getDepartments } = useApiGet(
		getApplicationDepartmentsUrl(basicInformation?.applicationTypeId, programme?.faculty?.value),
		{
			refetchOnWindowFocus: false,
			enabled: !!programme?.faculty?.value
		}
	);


	const watchData = watch("departmentId");

	const { data: departmentOption, isLoading: isLoadingDepartmentOption } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: watchData?.value
			}),
			{
				refetchOnWindowFocus: false,
				enabled: !!watchData
			}
		);

	useEffect(() => {
		if (departmentOption) {
			setDepartmentOptionData(departmentOption?.data);
		}
	}, [departmentOption]);

	const onFacultyChange = (value) => {
		dispatch({
			type: SAVE_DIPLOMA_INFO,
			payload: {
				...diplomaState,
				programme: {
					...programme,
					faculty: value,
				}
			}
		})
		setValue("facultyId", value);
		setValue("departmentId", null);
		setValue("departmentOptionId", null);
		clearErrors("facultyId");
		getDepartments()
	};

	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);


	const allDepartmentOptions = formatSelectItems(
		departmentOptionData,
		"departmentOption",
		"departmentOptionId"
	);


	const onSubmit = (values) => {
		const data = {
			ApplicantId: applicantId,
			DepartmentId: values?.departmentId?.value,
			DepartmentOptionId: values?.departmentOptionId?.value,
		};
		const requestBody = {
			url: setDiplomaApplicationProgrammeDetails(),
			data
		};
		mutate(requestBody, {
			onSuccess: () => {
				dispatch({
					type: SAVE_DIPLOMA_INFO,
					payload: {
						...diplomaState,
						programme: {
							faculty: values?.facultyId,
							department: values?.departmentId,
							departmentOption: values?.departmentOptionId
						}
					}
				});
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Application details updated.",
					body: "Your personal details have been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace({ hash: "#section_c", state });
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
				headerText={
					<span>
						Diploma Course
						<CompulsoryIndicator />
					</span>
				}
				footerContent={
					<Button
						data-cy="submit_personal"
						label="Next"
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
										placeholder="Choose faculty"
										id="facultyId"
										options={allFaculties}
										onChange={onFacultyChange}
										searchable={true}
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

				{isLoadingDepartment && (
					<div className="w-100">
						<Spinner />
					</div>
				)}

				{
					allDepartments?.length > 0 && (
						<div className="container-fluid px-4 my-4">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label htmlFor="departmentId">Course</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="departmentId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Choose course"
												id="departmentId"
												options={allDepartments}
												searchable={true}
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

					)
				}

				{departmentOption?.data?.length > 0 && (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="departmentOptionId">
									Course Option
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
											options={allDepartmentOptions}
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
					<div className="w-100">
						<Spinner />
					</div>
				)}
			</Jumbotron>
		</form>
	);
};
