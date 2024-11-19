import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { getUserProfileUrl, updateStaffProfileUrl } from "../../../../api/urls";
import {
	Jumbotron,
	TextField,
	SMSelect,
	Button
} from "../../../../ui_elements";
import {
	formatDateFromAPI,
	formatInputDate
} from "../../../../utils/formatDate";
import { appointmentDetailsSchema } from "./schema";
import { useApiEdit } from "../../../../api/apiCall";
import { useQueryClient } from "react-query";
import { trimItem } from "../../../../utils/trimItem";
import { useHistory } from "react-router-dom";

export const AppointmentDetails = ({
	allStaffTypes,
	programmeDetail,
	allDesignations,
	allSalaryStructure,
	allSalaryGrade,
	allSalaryStep,
	allEmploymentStatus
}) => {
	const { replace } = useHistory();
	const { mutate, isLoading } = useApiEdit();
	const queryClient = useQueryClient();
	const {
		register,
		control,
		formState: { errors },
		handleSubmit
	} = useForm({
		defaultValues: {
			StaffType: {
				value: programmeDetail.staffTypeId,
				label: programmeDetail.staffType
			},
			Designation: {
				value: programmeDetail.staffDesignationId,
				label: programmeDetail.designation
			},
			SalaryStructure: {
				value: programmeDetail.salaryStructureId,
				label: programmeDetail.salaryStructure
			},
			StaffGrade: {
				value: programmeDetail.salaryGradeId,
				label: programmeDetail.salaryGrade
			},
			SalaryStep: {
				value: programmeDetail.salaryStepId,
				label: programmeDetail.salaryStep
			},
			EmploymentStatus: {
				value: programmeDetail.employmentStatusId,
				label: programmeDetail.employmentStatus
			},
			DateOfFirstAppointment: formatDateFromAPI(
				programmeDetail.appointmentDate
			),
			DateOfLastPromotion: formatDateFromAPI(
				programmeDetail.lastPromotionDate
			),
			ExpectedDateOfRetirment: formatDateFromAPI(
				programmeDetail.retirementDate
			),
			RankOnAppointment: {
				value: programmeDetail.appointmentRankId,
				label: programmeDetail.appointmentRank
			},
			CurrentPost: {
				value: programmeDetail.rankId,
				label: programmeDetail.rank
			},
			LengthOfService: programmeDetail.serviceLength,
			PositionHeld: programmeDetail.positionHeld,
			UniversityCommunityService: programmeDetail.communityService
		},
		resolver: yupResolver(appointmentDetailsSchema)
	});

	const onSubmit = (values) => {
		const requestData = [];
		const {
			StaffType,
			Designation,
			SalaryStructure,
			StaffGrade,
			SalaryStep,
			EmploymentStatus,
			CurrentPost,
			RankOnAppointment,
			LengthOfService,
			PositionHeld,
			UniversityCommunityService,
			DateOfFirstAppointment,
			DateOfLastPromotion,
			ExpectedDateOfRetirment,
			...editedValues
		} = values;

		const newObj = {
			...editedValues,
			StaffTypeId: StaffType.value,
			StaffDesignationId: Designation.value,
			SalaryStructureId: SalaryStructure.value,
			SalaryGradeId: StaffGrade.value,
			SalaryStepId: SalaryStep.value,
			EmploymentStatusId: EmploymentStatus.value,
			AppointmentRankId: RankOnAppointment.value,
			RankId: CurrentPost.value,
			ServiceLength: LengthOfService,
			PositionHeld: PositionHeld,
			CommunityService: UniversityCommunityService,
			AppointmentDate: DateOfFirstAppointment,
			LastPromotionDate: DateOfLastPromotion,
			RetirementDate: ExpectedDateOfRetirment
		};

		Object.keys(newObj).map((item) =>
			requestData.push({
				op: "replace",
				path: `/ProgrammeDetail/${item}`,
				value: trimItem(newObj[item])
			})
		);
		const requestBody = {
			url: updateStaffProfileUrl(),
			data: requestData
		};
		mutate(requestBody, {
			onSuccess: () => {
				queryClient.invalidateQueries(getUserProfileUrl());
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Profile details updated.",
					body: "Your profile details has been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace("#section_d");
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
				headerText={<span>Appointment Details</span>}
				footerStyle="d-flex justify-content-end"
				footerContent={
					<>
						<Button
							data-cy="submit_qualification"
							label="Next"
							buttonClass="primary"
							type="submit"
							loading={isLoading}
						/>
					</>
				}
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="genotypeId">Staff Type *</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="StaffType"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="StaffType"
										placeholder="Choose Staff Type"
										name="StaffType"
										options={allStaffTypes}
										searchable={false}
										isError={!!errors.StaffType}
										errorText={
											errors.StaffType &&
											errors.StaffType.message
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
							<label htmlFor="Faculty">Faculty *</label>
						</div>
						<div className="col-lg-9">
							<SMSelect
								placeholder="Choose faculty"
								value={{
									value: programmeDetail.facultyId,
									label: programmeDetail.faculty
								}}
								disabled
							/>
						</div>
					</div>
				</div>

				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="Department">Department *</label>
						</div>
						<div className="col-lg-9">
							<SMSelect
								placeholder="Choose department"
								value={{
									value: programmeDetail.departmentId,
									label: programmeDetail.department
								}}
								disabled
							/>
						</div>
					</div>
				</div>

				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="Designation">Designation *</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="Designation"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="Designation"
										placeholder="Choose Designation"
										name="Designation"
										options={allDesignations}
										searchable={false}
										isError={!!errors.Designation}
										errorText={
											errors.Designation &&
											errors.Designation.message
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
							<label htmlFor="SalaryStructure">
								Salary Structure *
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="SalaryStructure"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="SalaryStructure"
										placeholder="Choose Salary Structure"
										name="SalaryStructure"
										options={allSalaryStructure}
										searchable={false}
										isError={!!errors.SalaryStructure}
										errorText={
											errors.SalaryStructure &&
											errors.SalaryStructure.message
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
							<label htmlFor="StaffGrade">
								Staff Grade Level *
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="StaffGrade"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="StaffGrade"
										placeholder="Choose Staff Grade Level"
										name="StaffGrade"
										options={allSalaryGrade}
										searchable={false}
										isError={!!errors.StaffGrade}
										errorText={
											errors.StaffGrade &&
											errors.StaffGrade.message
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
							<label htmlFor="SalaryStep">Salary Step *</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="SalaryStep"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="SalaryStep"
										placeholder="Choose Salary Step"
										name="SalaryStep"
										options={allSalaryStep}
										searchable={false}
										isError={!!errors.SalaryStep}
										errorText={
											errors.SalaryStep &&
											errors.SalaryStep.message
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
							<label htmlFor="EmploymentStatus">
								Employment Status *
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="EmploymentStatus"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="EmploymentStatus"
										placeholder="Choose Employment Status"
										name="EmploymentStatus"
										options={allEmploymentStatus}
										searchable={false}
										isError={!!errors.EmploymentStatus}
										errorText={
											errors.EmploymentStatus &&
											errors.EmploymentStatus.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="DateOfFirstAppointment">
								Date of First Appointment *
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								type="date"
								className="w-100"
								name={`DateOfFirstAppointment`}
								register={register}
								required
								max={formatInputDate(new Date())}
								error={
									errors?.DateOfFirstAppointment &&
									errors?.DateOfFirstAppointment
								}
								errorText={
									errors?.DateOfFirstAppointment &&
									errors?.DateOfFirstAppointment &&
									errors?.DateOfFirstAppointment?.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="DateOfLastPromotion">
								Date of Last Promotion * Same as date of
								appointment for new staff
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								type="date"
								className="w-100"
								name={`DateOfLastPromotion`}
								register={register}
								required
								max={formatInputDate(new Date())}
								error={
									errors?.DateOfLastPromotion &&
									errors?.DateOfLastPromotion
								}
								errorText={
									errors?.DateOfLastPromotion &&
									errors?.DateOfLastPromotion &&
									errors?.DateOfLastPromotion?.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="ExpectedDateOfRetirment">
								Expected Date of Retirement *
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								type="date"
								className="w-100"
								name={`ExpectedDateOfRetirment`}
								register={register}
								required
								max={formatInputDate(new Date())}
								error={
									errors?.ExpectedDateOfRetirment &&
									errors?.ExpectedDateOfRetirment
								}
								errorText={
									errors?.ExpectedDateOfRetirment &&
									errors?.ExpectedDateOfRetirment &&
									errors?.ExpectedDateOfRetirment?.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="rankOnAppointment">
								Rank on Appointment *
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="RankOnAppointment"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="RankOnAppointment"
										placeholder="Choose a rank on appointment"
										name="RankOnAppointment"
										options={allSalaryStep}
										searchable={false}
										isError={!!errors.RankOnAppointment}
										errorText={
											errors.RankOnAppointment &&
											errors.RankOnAppointment.message
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
							<label htmlFor="currentPost">
								Current Post/Rank *
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="CurrentPost"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="CurrentPost"
										placeholder="Choose a current post"
										name="CurrentPost"
										options={allSalaryStep}
										searchable={false}
										isError={!!errors.CurrentPost}
										errorText={
											errors.CurrentPost &&
											errors.CurrentPost.message
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
							<label htmlFor="lengthOfService">
								Length of Service (Years)*
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								placeholder="Enter position held"
								className="w-100"
								name={`LengthOfService`}
								register={register}
								required
								max={formatInputDate(new Date())}
								error={
									errors?.LengthOfService &&
									errors?.LengthOfService
								}
								errorText={
									errors?.LengthOfService &&
									errors?.LengthOfService &&
									errors?.LengthOfService?.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="PositionHeld">Positions Held</label>
						</div>
						<div className="col-lg-9">
							<TextField
								placeholder="Enter position held"
								className="w-100"
								name={`PositionHeld`}
								register={register}
								required
								max={formatInputDate(new Date())}
								error={
									errors?.PositionHeld && errors?.PositionHeld
								}
								errorText={
									errors?.PositionHeld &&
									errors?.PositionHeld &&
									errors?.PositionHeld?.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="universityCommunityService">
								University Community Services (Faculty
								representative, special projects, etc)
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								placeholder="Enter position held"
								className="w-100"
								name={`UniversityCommunityService`}
								register={register}
								required
								max={formatInputDate(new Date())}
								error={
									errors?.UniversityCommunityService &&
									errors?.UniversityCommunityService
								}
								errorText={
									errors?.UniversityCommunityService &&
									errors?.UniversityCommunityService &&
									errors?.UniversityCommunityService?.message
								}
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
