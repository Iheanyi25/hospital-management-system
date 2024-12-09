import { useHistory, useLocation } from "react-router";
import {
	Jumbotron,
	Button,
	TextField,
	SMSelect,
	Spinner,
	CompulsoryIndicator
} from "../../../../../../ui_elements";
import { Controller } from "react-hook-form";
import { useApiPatch } from "../../../../../../api/apiCall";
import {
	updateStudentProfileUrl,
	getStudentProfileUrl
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { fieldSetterAndClearer } from "../../../../../../utils/fieldSetterAndClearer";
import { findValueAndLabel } from "../../../../../../utils/findValueAndLabel";

export const ProgrammeDetailsForm = ({
	refCode,
	handleSubmit,
	errors,
	control,
	register,
	setValue,
	isLoadingDepartmentOptions,
	isLoadingStudentModesOfEntry,
	allDepartmentOption,
	isLoadingLevels,
	allLevels,
	allDepartments,
	allProgrammes,
	allStudentModesOfEntry,
	allStudentTypes,
	allStudentModesOfStudy,
	allSessions,
	allProgrammeTypes,
	isLoadingSchoolProgrammes,
	isPGStudent,
	data,
	allStudentModes,
	hasMatricNumber
}) => {
	const { replace } = useHistory();
	const { state } = useLocation();
	const { mutate, isLoading } = useApiPatch();
	const queryClient = useQueryClient();

	const onSubmit = async (values) => {
		const data = [];
		Object.keys(values).map((item) => {
			return (
				item !== "areaOfSpecializationId" &&
				data.push({
					op: "replace",
					path: `/StudentProgrammeDetail/${item}`,
					value:
						typeof values[item] === "object"
							? values[item]?.value
							: typeof values[item] === "string"
							? values[item].toUpperCase()
							: undefined
				})
			);
		});

		const requestBody = {
			url: updateStudentProfileUrl({ refCode }),
			data
		};
		mutate(requestBody, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getStudentProfileUrl({ refCode })
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Profile details updated.",
					body: "Your student profile details have been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace({ hash: "#section_e", state });
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body:
						response?.data?.message ||
						`Something went wrong with this action. Check your forms and submit again`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			}
		});
	};
	const onStudentTypeChange = (value) => {
		fieldSetterAndClearer({
			value,
			setterFunc: setValue,
			setField: "StudentTypeId",
			clearFields: [
				"ModeOfEntryId",
				"DepartmentId",
				"DepartmentOptionId",
				"LevelId",
				"SchoolProgrammeId"
			]
		});
	};

	const onDepartmentChange = (value) => {
		fieldSetterAndClearer({
			value,
			setterFunc: setValue,
			setField: "DepartmentId",
			clearFields: ["DepartmentOptionId", "areaOfSpecializationId"]
		});
	};

	const onProgrammeChange = (value) => {
		fieldSetterAndClearer({
			value,
			setterFunc: setValue,
			setField: "SchoolProgrammeId",
			clearFields: ["areaOfSpecializationId"]
		});
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
						loading={isLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="StudentTypeId">Student Type</label>
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
										options={allStudentTypes}
										onChange={onStudentTypeChange}
										isError={!!errors.StudentTypeId}
										errorText={
											errors.StudentTypeId &&
											errors.StudentTypeId.message
										}
										id="StudentTypeId"
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="DepartmentId">Department</label>
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
										onChange={onDepartmentChange}
										options={allDepartments}
										isError={!!errors.DepartmentId}
										errorText={
											errors.DepartmentId &&
											errors.DepartmentId.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				{isLoadingDepartmentOptions && (
					<>
						<div className="container-fluid px-4 my-4">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label htmlFor="DepartmentOptionId">
										Option
									</label>
								</div>
								<div className="col-lg-9">
									<Spinner />
								</div>
							</div>
						</div>
					</>
				)}
				{allDepartmentOption?.length > 0 && (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="DepartmentOptionId">
									Option
								</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="DepartmentOptionId"
									defaultValue={
										data?.departmentOptionId
											? findValueAndLabel(
													data?.departmentOptionId,
													allDepartmentOption
											  )
											: null
									}
									control={control}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Select an option"
											searchable={true}
											options={allDepartmentOption}
											isError={
												!!errors.DepartmentOptionId
											}
											id="DepartmentOptionId"
										/>
									)}
								/>
							</div>
						</div>
					</div>
				)}
				{isLoadingSchoolProgrammes && (
					<>
						<div className="container-fluid px-4 my-4">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label htmlFor="DepartmentOptionId">
										Programme
									</label>
								</div>
								<div className="col-lg-9">
									<Spinner />
								</div>
							</div>
						</div>
					</>
				)}
				{!isLoadingSchoolProgrammes && allProgrammes?.length > 0 && (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="schoolProgramme">
									Programme
								</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="SchoolProgrammeId"
									defaultValue={findValueAndLabel(
										data?.schoolProgrammeId,
										allProgrammes
									)}
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Select a programme"
											searchable={false}
											onChange={onProgrammeChange}
											options={allProgrammes}
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
								disabled={hasMatricNumber}
								error={errors.MatricNo}
								errorText={
									errors.MatricNo &&
									errors.MatricNumber.message
								}
								id="matricNo"
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="jambRegNumber">JAMB No</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								placeholder="Enter JAMB number"
								name="JambRegNumber"
								type="text"
								register={register}
								disabled
								error={errors.MatricNo}
								errorText={
									errors.MatricNo &&
									errors.JambRegNumber.message
								}
								id="jambRegNumber"
							/>
						</div>
					</div>
				</div>
				{isLoadingStudentModesOfEntry && (
					<div className="mb-4">
						<Spinner />
					</div>
				)}
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="ModeOfEntry">Mode of Entry</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="ModeOfEntryId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a mode"
										searchable={false}
										options={allStudentModesOfEntry}
										isError={!!errors.modeOfEntryId}
										errorText={
											errors.ModeOfEntryId &&
											errors.ModeOfEntryId.message
										}
										id="ModeOfEntryId"
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="ModeOfStudyId">Mode of Study</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="ModeOfStudyId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Select a mode of study"
										searchable={false}
										options={allStudentModesOfStudy}
										isError={!!errors.ModeOfStudyId}
										errorText={
											errors.ModeOfStudyId &&
											errors.ModeOfStudyId.message
										}
										id="ModeOfStudyId"
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="LevelId">Level of Study</label>
						</div>
						<div className="col-lg-9">
							{isLoadingLevels ? (
								<Spinner />
							) : (
								allLevels?.length > 0 && (
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
												isError={!!errors.LevelId}
												errorText={
													errors.LevelId &&
													errors.LevelId.message
												}
												id="LevelId"
											/>
										)}
									/>
								)
							)}
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
										disabled={true}
										id="studentModeId"
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="entryYearId">Entry Year</label>
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
										options={allSessions}
										isError={!!errors.EntryYear}
										errorText={
											errors.EntryYear &&
											errors.EntryYearId.message
										}
										id="entryYearId"
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="graduationYearId">
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
										options={allSessions}
										isError={!!errors.GraduationYear}
										errorText={
											errors.GraduationYear &&
											errors.GraduationYearId.message
										}
										id="graduationYearId"
									/>
								)}
							/>
						</div>
					</div>
				</div>
				{isPGStudent && (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="programmeTypeId">
									Programme Type
								</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="programmeTypeId"
									control={control}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Select a programme type"
											searchable={false}
											options={allProgrammeTypes}
											id="programmeTypeId"
										/>
									)}
								/>
							</div>
						</div>
					</div>
				)}
			</Jumbotron>
		</form>
	);
};
