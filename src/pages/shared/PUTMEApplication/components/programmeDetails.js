import { useEffect, useMemo, useState } from "react";
import {
	Jumbotron,
	Button,
	TextField,
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
	putmeProgrammeDetailsFormUrl
} from "../../../../api/urls";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProgrammeDetailsSchema } from "../putmeSchema";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { fieldSetterAndClearer } from "../../../../utils/fieldSetterAndClearer";

export const ProgrammeDetails = ({
	allFaculties,
	allPutmeSubjects,
	fromJambState
}) => {
	const putmeStoreData = useSelector((state) => state.putmeData);
	const { programmeInfo, StudentTypeId } = putmeStoreData;
	const [facultyState, setFacultyState] = useState(
		programmeInfo?.faculty?.value
	);
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

	if (!state) {
		replace("/putme_login");
	}

	const { data: departments, isLoading: isDepartmentLoading } = useApiGet(
		getDepartmentsUrl(StudentTypeId, facultyState),
		{
			refetchOnWindowFocus: false,
			enabled: !!facultyState
		}
	);

	const allDepartments = useMemo(
		() =>
			formatSelectItems(departments?.data, "department", "departmentId"),
		[departments?.data]
	);

	const { mutate, isLoading: isFormLoading } = useApiPost();

	const {
		register,
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
			firstSubject: putmeStoreData?.programmeInfo?.firstSubject,
			secondSubject: putmeStoreData?.programmeInfo?.secondSubject,
			thirdSubject: putmeStoreData?.programmeInfo?.thirdSubject,
			fourthSubject: putmeStoreData?.programmeInfo?.fourthSubject,
			utmeScore: putmeStoreData?.programmeInfo?.utmeScore,
			utmeResultSlip: putmeStoreData?.programmeInfo?.utmeResultSlip
		},
		resolver: yupResolver(ProgrammeDetailsSchema)
	});

	const onSubmit = (programmeInfo) => {
		const requestBody = {
			url: putmeProgrammeDetailsFormUrl(),
			data: {
				JambNumber: programmeInfo?.regNo,
				FacultyId: programmeInfo?.faculty?.value,
				DepartmentId: programmeInfo?.department?.value,
				SecondSubjectId: programmeInfo?.secondSubject?.value,
				ThirdSubjectId: programmeInfo?.thirdSubject?.value,
				FourthSubjectId: programmeInfo?.fourthSubject?.value,
				UtmeScore: programmeInfo?.utmeScore
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
		const subscription = watch(({ faculty }) => {
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
				headerText={<span>JAMB &amp; Programme Details</span>}
				footerContent={
					<Button
						data-cy="submit_personal"
						label="Next"
						buttonClass="primary"
						type="submit"
						disabled={isFormLoading || isDepartmentLoading}
						loading={isFormLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="faculty">Faculty</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="faculty"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a faculty"
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
								<div className="col-lg-3  d-flex align-items-center">
									<label htmlFor="departmentId">
										Department
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
												id="departmentId"
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
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="regNo">Reg No</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter registration number"
								className="w-100"
								type="text"
								id="regNo"
								name="regNo"
								register={register}
								required
								disabled
							/>
						</div>
					</div>
				</div>
				<div className="border-top border-bottom px-4 py-3 jumbotron-header jumbo-header">
					<span>JAMB Subject Details</span>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="firstSubjectId">1st Subject</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="firstSubject"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a 1st subject"
										searchable={true}
										id="firstSubjectId"
										disabled
										options={allPutmeSubjects}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="secondSubjectId">2nd Subject</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="secondSubject"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a second subject"
										searchable={true}
										id="secondSubjectId"
										disabled={fromJambState}
										options={allPutmeSubjects}
										isError={!!errors.secondSubject}
										errorText={
											errors.secondSubject &&
											errors.secondSubject.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="thirdSubjectId">3rd Subject</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="thirdSubject"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a third subject"
										searchable={true}
										id="thirdSubjectId"
										disabled={fromJambState}
										options={allPutmeSubjects}
										isError={!!errors.thirdSubject}
										errorText={
											errors.thirdSubject &&
											errors.thirdSubject.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="fourthSubjectId">4th Subject</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="fourthSubject"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a fourth subject"
										searchable={true}
										id="fourthSubjectId"
										disabled={fromJambState}
										options={allPutmeSubjects}
										isError={!!errors.fourthSubject}
										errorText={
											errors.fourthSubject &&
											errors.fourthSubject.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="utmeScoreId">UTME Score</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter utme score"
								className="w-100"
								type="text"
								id="utmeScoreId"
								name="utmeScore"
								register={register}
								required
								disabled={fromJambState}
								isError={!!errors.utmeScore}
								errorText={
									errors.utmeScore && errors.utmeScore.message
								}
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
