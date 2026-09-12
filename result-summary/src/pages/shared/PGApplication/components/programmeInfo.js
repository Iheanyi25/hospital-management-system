import { useHistory, useLocation } from "react-router";
import {
	Jumbotron,
	Button,
	SMSelect,
	CompulsoryIndicator,
	Spinner
} from "../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { prgramInfoSchema } from "../pgSchema";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_PG_INFO } from "../../../../store/constant";
import {
	getDepartmentOptionUrl,
	getDepartmentsUrl,
	submitPGApplicationStepUrl
} from "../../../../api/urls";
import { useApiGet, useApiPost } from "../../../../api/apiCall";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { useEffect, useMemo, useState } from "react";

export const ProgrammeInfo = ({ allProgrammes, allFaculties }) => {
	const pgState = useSelector((state) => state.pgData);
	const { programme, studentTypeId } = pgState;
	const [departmentIdState, setDepartmentId] = useState(
		programme?.departmentId?.value
	);
	const [facultyState, setFacultyState] = useState(
		programme?.facultyId?.value
	);
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { mutate, isLoading } = useApiPost();
	const { state } = useLocation();
	const { data: departments, isLoading: isDepartmentLoading } = useApiGet(
		getDepartmentsUrl(studentTypeId, facultyState),
		{
			refetchOnWindowFocus: false,
			enabled: !!facultyState
		}
	);
	const { data: departmentOption, isLoading: isLoadingDepartmentOptions } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: departmentIdState
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
		control,
		handleSubmit,
		watch,
		setValue,
		clearErrors,
		formState: { errors }
	} = useForm({
		defaultValues: {
			programmeId: programme?.programmeId ?? null,
			facultyId: programme?.facultyId
		},
		resolver: yupResolver(prgramInfoSchema),
		context: {
			isDepartmentOptionRequired:
				departmentOption?.data?.length > 0 ? true : false
		}
	});
	const onSubmit = (values) => {
		if (programme.passport) {
			const data = { ...programme, sessionId: pgState?.sessionId };
			Object.keys(values).map((item) => {
				if (typeof values[item] === "object") {
					if (item === "programmeId") {
						return (data[item] = Number(values[item]?.value));
					} else {
						return (data[item] = values[item]?.value);
					}
				} else {
					return (data[item] = values[item]);
				}
			});
			const requestBody = {
				url: submitPGApplicationStepUrl(1),
				data
			};
			mutate(requestBody, {
				onSuccess: (data) => {
					dispatch({
						type: SAVE_PG_INFO,
						payload: {
							...pgState,
							programme: { ...programme, ...values },
							pgApplicationFormId: data?.data?.data
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
					replace({ hash: "#section_b", state });
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
		} else {
			window.scrollTo(0, 0);
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Invalid Action!",
				body: "Please, upload your profile picture before you can proceed!"
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
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
				headerText={
					<span>
						A. Program Information
						<CompulsoryIndicator />
					</span>
				}
				endText="Step 1 of 5"
				footerContent={
					<Button
						data-cy="sumit_profile"
						label="Next"
						buttonClass="primary"
						type="submit"
						disabled={isLoadingDepartmentOptions}
						loading={isLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="programmeId">Programme</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="programmeId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a programme"
										searchable={false}
										options={allProgrammes}
										isError={!!errors.programmeId}
										errorText={
											errors.programmeId &&
											errors.programmeId.message
										}
										id="programmeId"
									/>
								)}
							/>
						</div>
					</div>
				</div>
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
			</Jumbotron>
		</form>
	);
};
