import {
	Jumbotron,
	Button,
	SMSelect,
	Spinner,
	TextField,
	ProfileContext
} from "../../../../ui_elements";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { programmeDetailsSchema } from "../changeOfDepartmentSchema";
import { useEffect, useMemo, useState } from "react";
import { useApiGet, useApiPost } from "../../../../api/apiCall";
import {
	applyForChangeDepartmentUrl,
	getDepartmentOptionUrl,
	getAllDepartmentsWithoutValuesUrl
} from "../../../../api/urls";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";

export const ProgrammeDetails = () => {
	const data = useContext(ProfileContext);
	const [departmentIdState, setDepartmentId] = useState(null);
	const { state } = useLocation();
	const { replace } = useHistory();
	const { mutate, isLoading } = useApiPost();

	const { data: departments, isLoading: isDepartmentLoading } = useApiGet(
		getAllDepartmentsWithoutValuesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: departmentOption, isLoading: isLoadingDepartmentOptions } =
		useApiGet(
			getDepartmentOptionUrl({
				departmentId: departmentIdState,
				studentTypeId: data?.profileData?.programmeDetail?.studentTypeId
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
		() => formatSelectItems(departments?.data, "name", "id"),
		[departments?.data]
	);

	const {
		handleSubmit,
		watch,
		setValue,
		clearErrors,
		control,
		register,
		formState: { errors }
	} = useForm({
		defaultValues: {},
		resolver: yupResolver(programmeDetailsSchema),
		context: {
			isDepartmentOptionRequired:
				departmentOption?.data?.length > 0 ? true : false
		}
	});

	const onSubmit = async ({ departmentId, departmentOptionId, reason }) => {
		const data = {
			sessionId: state?.sessionId,
			departmentId: departmentId.value,
			departmentOptionId: departmentOptionId?.value,
			reason: reason
		};
		const requestBody = {
			url: applyForChangeDepartmentUrl(),
			data
		};
		mutate(requestBody, {
			onSuccess: () => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Application details updated.",
					body: "Your details have been updated!!!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace({
					pathname: "/change_of_department_application_details",
					state: {
						departmentId: departmentId?.label,
						departmentOptionId: departmentOptionId?.label,
						reason,
						session: state?.session,
						rrr: state?.rrr
					}
				});
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
		const subscription = watch(({ departmentId }) => {
			setDepartmentId(departmentId?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const onDepartmentChange = (value) => {
		setDepartmentId(value.value);
		setValue("departmentId", value);
		setValue("departmentOptionId", null);
		clearErrors("departmentId");
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={<span>Alternative Department</span>}
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
				<div className="px-4 my-4">
					<p>
						<span className="text-bold">Note:</span> Please you are
						requested to select the department to which you want to
						transfer
					</p>
				</div>
				{isDepartmentLoading ? (
					<div className="mb-4">
						<Spinner />
					</div>
				) : (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="departmentId">Department</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="departmentId"
									control={control}
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
										Department Option
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="departmentOptionId"
										control={control}
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
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="reason">Reason</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Why do you want to switch degree??"
								className="w-100"
								inputType="textarea"
								id={`reason`}
								name={`reason`}
								register={register}
								required
								error={errors?.reason && errors?.reason}
								errorText={
									errors?.reason && errors?.reason.message
								}
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
