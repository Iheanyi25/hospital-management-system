import { Jumbotron, Button, SMSelect, Spinner } from "../../../../ui_elements";
import { useHistory, useLocation } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { programmeDetailsSchema } from "../fiveYearSandwichSchema";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { useApiGet, useApiPost } from "../../../../api/apiCall";
import { SAVE_FIVE_YEAR_SANDWICH_APPLICATION } from "../../../../store/constant";
import {
	storeFiveYearSandwichApplicationProgrammeDetailsUrl,
	getSchoolProgrammesUrl,
	getAllDepartmentsWithoutValuesUrl,
	getSandwichCampusesUrl
} from "../../../../api/urls";
import { formatSelectItems } from "../../../../utils/formatSelectItems";

export const ProgrammeDetails = () => {
	const fiveYearSandwichState = useSelector(
		(state) => state.fiveYearSandwichData
	);
	const { programme, basicInformation } = fiveYearSandwichState;
	const { applicantId } = fiveYearSandwichState;
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { mutate, isLoading } = useApiPost();
	const { state } = useLocation();

	const { data: programmes, isLoading: isProgrammeLoading } = useApiGet(
		getSchoolProgrammesUrl({ studentTypeId: 1 }),
		{
			refetchOnWindowFocus: false
		}
	);

	const { data: departments, isLoading: isDepartmentLoading } = useApiGet(
		getAllDepartmentsWithoutValuesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);
	const { data: campuses, isLoading: isLoadingCampuses } = useApiGet(
		getSandwichCampusesUrl(),
		{
			refetchOnWindowFocus: false
		}
	);

	const allCampuses = formatSelectItems(campuses?.data, "name", "id");

	const allProgrammes = useMemo(
		() => formatSelectItems(programmes?.data, "name", "id"),
		[programmes?.data]
	);

	const allDepartments = useMemo(
		() => formatSelectItems(departments?.data, "name", "id"),
		[departments?.data]
	);

	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm({
		defaultValues: {
			sandwichCampusId: basicInformation?.sandwichCampusId,
			schoolProgrammeId: basicInformation?.schoolProgrammeId,
			departmentId: basicInformation?.departmentId
		},
		resolver: yupResolver(programmeDetailsSchema)
	});

	const onSubmit = async (values) => {
		const data = {
			applicantId,
			sandwichCampusId: values.sandwichCampusId.value,
			schoolProgrammeId: values.schoolProgrammeId.value,
			departmentId: values.departmentId.value
		};
		const requestBody = {
			url: storeFiveYearSandwichApplicationProgrammeDetailsUrl(),
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
					type: SAVE_FIVE_YEAR_SANDWICH_APPLICATION,
					payload: {
						...fiveYearSandwichState,
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

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={<span>Campus Programme Details</span>}
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
				{isLoadingCampuses ? (
					<div className="mb-4">
						<Spinner />
					</div>
				) : (
					allCampuses?.length > 0 && (
						<div className="container-fluid px-4 my-4">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label htmlFor="facultyId">
										Campus of choice
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="sandwichCampusId"
										control={control}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select a campus"
												searchable={true}
												options={allCampuses}
												isError={
													!!errors.sandwichCampusId
												}
												errorText={
													errors.sandwichCampusId &&
													errors.sandwichCampusId
														.message
												}
												id="sandwichCampusId"
											/>
										)}
									/>
								</div>
							</div>
						</div>
					)
				)}
				{isDepartmentLoading ? (
					<div className="mb-4">
						<Spinner />
					</div>
				) : (
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
										defaultValue={programme?.departmentId}
										rules={{ required: true }}
										render={({ field }) => (
											<SMSelect
												{...field}
												placeholder="Select a course"
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
				{isProgrammeLoading ? (
					<div className="mb-4">
						<Spinner />
					</div>
				) : (
					allProgrammes?.length > 0 && (
						<div className="container-fluid px-4 mt-4 mb-3">
							<div className="row">
								<div className="col-lg-3 d-flex align-items-center">
									<label htmlFor="schoolProgrammeId">
										Degree in view
									</label>
								</div>
								<div className="col-lg-9 d-flex align-items-center">
									<div className="w-100">
										<Controller
											name="schoolProgrammeId"
											control={control}
											rules={{ required: true }}
											render={({ field }) => (
												<SMSelect
													placeholder="Select a degree"
													options={allProgrammes}
													searchable={true}
													id="schoolProgrammeId"
													{...field}
													isError={
														!!errors.schoolProgrammeId
													}
													errorText={
														errors.schoolProgrammeId &&
														errors.schoolProgrammeId
															.message
													}
												/>
											)}
										/>
									</div>
								</div>
							</div>
						</div>
					)
				)}
			</Jumbotron>
		</form>
	);
};
