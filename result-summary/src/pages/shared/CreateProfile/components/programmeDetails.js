import { useHistory, useLocation } from "react-router";
import {
	Jumbotron,
	Button,
	TextField,
	SMSelect,
	CompulsoryIndicator
} from "../../../../ui_elements";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProgrammeDetailSchema } from "../profileSchema";
import { Controller, useForm } from "react-hook-form";
import { SAVE_STUDENT_DATA } from "../../../../store/constant";
import { useMemo } from "react";

export const ProgrammeDetails = ({
	allLevels,
	allSessions,
	allStudentModes,
	allStudentModesOfStudy,
	allProgrammes,
	allStudentModesOfEntry
}) => {
	const studentState = useSelector((state) => state.studentData);
	const {
		ProgrammeDetail: {
			MatricNumber,
			JambRegNumber,
			DepartmentId,
			DepartmentOptionId,
			EntryYearId,
			StudentTypeId,
			ModeOfEntryId,
			ProgrammeId,
			GraduationYearId,
			SessionId,
			LevelId,
			StudentModeId,
			ModeOfStudyId
		}
	} = studentState;
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm({
		defaultValues: {
			MatricNumber,
			JambRegNumber,
			DepartmentId,
			DepartmentOptionId,
			EntryYearId,
			StudentTypeId,
			StudentModeOfEntryId: ModeOfEntryId,
			StudentModeOfStudyId: ModeOfStudyId,
			GraduationYearId,
			SchoolProgrammeId: ProgrammeId,
			SessionId,
			LevelId,
			StudentModeId
		},
		resolver: yupResolver(ProgrammeDetailSchema),
		context: {
			isProgrammeRequired: allProgrammes?.length > 0 ? true : false
		}
	});

	const graduationYears = useMemo(
		() =>
			allSessions.filter(
				(session) =>
					session.label.split("-")[0] >
					EntryYearId.label.split("-")[0]
			),
		[allSessions, EntryYearId.label]
	);
	const onSubmit = async (ProgrammeDetail) => {
		dispatch({
			type: SAVE_STUDENT_DATA,
			payload: {
				...studentState,
				ProgrammeDetail: {
					...ProgrammeDetail,
					ModeOfEntryId: ProgrammeDetail.StudentModeOfEntryId,
					ModeOfStudyId: ProgrammeDetail.StudentModeOfStudyId
				},
				isProgrammeDetailValid: true
			}
		});
		replace({ hash: "#section_e", state });
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={
					<span>
						Your programme details
						<CompulsoryIndicator />
					</span>
				}
				footerContent={
					<Button
						data-cy="sumit_profile"
						label="Next"
						buttonClass="primary"
						type="submit"
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="department">Department</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="DepartmentId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a department"
										searchable={true}
										isError={!!errors.DepartmentId}
										errorText={
											errors.DepartmentId &&
											errors.DepartmentId.message
										}
										disabled
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="departmentOption">Option</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="DepartmentOptionId"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select an option"
										searchable={true}
										isError={!!errors.DepartmentOptionId}
										errorText={
											errors.DepartmentOptionId &&
											errors.DepartmentOptionId.message
										}
										id="departmentOption"
										disabled
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="studentType">Student Type</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="StudentTypeId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a type"
										searchable={false}
										isError={!!errors.StudentTypeId}
										errorText={
											errors.StudentTypeId &&
											errors.StudentTypeId.message
										}
										id="studentType"
										disabled
									/>
								)}
							/>
						</div>
					</div>
				</div>
				{allProgrammes.length > 0 && (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="SchoolProgrammeId">
									Programme
								</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="SchoolProgrammeId"
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Select a programme"
											searchable={false}
											options={allProgrammes}
											disabled={
												StudentTypeId?.value === 4
											}
											isError={!!errors.SchoolProgrammeId}
											errorText={
												errors.SchoolProgrammeId &&
												errors.SchoolProgrammeId.message
											}
											id="schoolProgramme"
										/>
									)}
								/>
							</div>
						</div>
					</div>
				)}
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="matricNo">Matric No</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								placeholder="Enter matric number"
								name="MatricNumber"
								type="text"
								register={register}
								error={errors.MatricNumber}
								errorText={
									errors.MatricNumber &&
									errors.MatricNumber.message
								}
								id="matricNo"
								disabled
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="jambRegNo">JAMB No</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								placeholder="Enter JAMB number"
								name="JambRegNumber"
								type="text"
								register={register}
								error={errors.MatricNumber}
								errorText={
									errors.MatricNumber &&
									errors.MatricNumber.message
								}
								id="jambRegNo"
								disabled
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="studentModeOfEntry">
								Mode of Entry
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="StudentModeOfEntryId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a mode"
										searchable={false}
										isError={!!errors.StudentModeOfEntryId}
										errorText={
											errors.StudentModeOfEntryId &&
											errors.StudentModeOfEntryId.message
										}
										id="studentModeOfEntry"
										disabled
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="studentMode">Student Mode</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="StudentModeId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a mode"
										searchable={false}
										options={allStudentModes}
										isError={!!errors.StudentModeId}
										errorText={
											errors.StudentModeId &&
											errors.StudentModeId.message
										}
										id="StudentModeId"
										// disabled
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="studentModeOfStudy">
								Mode of Study
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="StudentModeOfStudyId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a mode of study"
										searchable={false}
										id="StudentModeOfStudyId"
										options={allStudentModesOfStudy}
										isError={!!errors.StudentModeOfStudyId}
										errorText={
											errors.StudentModeOfStudyId &&
											errors.StudentModeOfStudyId.message
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
							<label htmlFor="EntryYearId">Entry Year</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="EntryYearId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a year"
										searchable={false}
										isError={!!errors.EntryYearId}
										errorText={
											errors.EntryYearId &&
											errors.EntryYearId.message
										}
										id="EntryYearId"
										disabled
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="GraduationYearId">
								Year of Graduation
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="GraduationYearId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a year"
										searchable={false}
										options={graduationYears}
										isError={!!errors.GraduationYearId}
										errorText={
											errors.GraduationYearId &&
											errors.GraduationYearId.message
										}
										id="GraduationYearId"
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="LevelId">Year of Study</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="LevelId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a level"
										searchable={false}
										options={allLevels}
										// value={allLevels[0]}
										isError={!!errors.LevelId}
										errorText={
											errors.LevelId &&
											errors.LevelId.message
										}
										id="LevelId"
										// disabled
									/>
								)}
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
