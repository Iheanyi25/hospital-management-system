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
import { findValueAndLabel } from "../../../../../../utils/findValueAndLabel";

export const ProgrammeDetailsForm = ({
	refCode,
	data,
	handleSubmit,
	errors,
	control,
	register,
	isLoadingDepartmentOptions,
	allDepartmentOption,
	isLoadingLevels,
	allLevels,
	allDepartments,
	allProgrammes,
	allStudentModesOfEntry,
	allStudentTypes,
	allStudentModesOfStudy,
	allSessions,
	allStudentModes,
	onStudentTypeChange,
	onDepartmentChange,
	isDepartmentLoading,
	isLoadingProgrammes
}) => {
	const { replace } = useHistory();
	const { state } = useLocation();
	const { mutate, isLoading } = useApiPatch();
	const queryClient = useQueryClient();

	const onSubmit = async (values) => {
		const data = [];
		Object.keys(values).map((item) => {
			return data.push({
				op: "replace",
				path: `/StudentProgrammeDetail/${item}`,
				value:
					typeof values[item] === "object"
						? values[item]?.value
						: typeof values[item] === "string"
						? values[item].toUpperCase()
						: null
			});
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
										options={allStudentTypes}
										onChange={onStudentTypeChange}
										isError={!!errors.StudentTypeId}
										errorText={
											errors.StudentTypeId &&
											errors.StudentTypeId.message
										}
										id="studentType"
									/>
								)}
							/>
						</div>
					</div>
				</div>
				{isDepartmentLoading ? (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="department">Department</label>
							</div>
							<div className="col-lg-9">
								<Spinner />
							</div>
						</div>
					</div>
				) : (
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
											options={allDepartments}
											onChange={onDepartmentChange}
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
				)}
				{isLoadingDepartmentOptions && (
					<>
						<div className="container-fluid px-4 my-4">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label htmlFor="departmentOption">
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
								<label htmlFor="departmentOption">Option</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="DepartmentOptionId"
									defaultValue={findValueAndLabel(
										data?.departmentOptionId,
										allDepartmentOption
									)}
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
											errorText={
												errors.DepartmentOptionId &&
												errors.DepartmentOptionId
													.message
											}
											id="departmentOption"
										/>
									)}
								/>
							</div>
						</div>
					</div>
				)}
				{isLoadingProgrammes && (
					<>
						<div className="container-fluid px-4 my-4">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label htmlFor="schoolProgramme">
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
				{allProgrammes?.length > 0 && (
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
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Select a programme"
											searchable={false}
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
							<label htmlFor="MatricNumber">Matric No</label>
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
								id="MatricNumber"
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="JambRegNumber">JAMB No</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								placeholder="Enter JAMB number"
								name="JambRegNumber"
								type="text"
								register={register}
								error={errors.JambRegNumber}
								errorText={
									errors.JambRegNumber &&
									errors.JambRegNumber.message
								}
								id="JambRegNumber"
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
										options={allStudentModesOfEntry}
										isError={!!errors.StudentModeOfEntryId}
										errorText={
											errors.StudentModeOfEntryId &&
											errors.StudentModeOfEntryId.message
										}
										id="studentModeOfEntry"
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
										options={allStudentModesOfStudy}
										isError={!!errors.StudentModeOfStudyId}
										errorText={
											errors.StudentModeOfStudyId &&
											errors.StudentModeOfStudyId.message
										}
										id="studentModeOfStudy"
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
							<label htmlFor="studentModeId">Student Mode</label>
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
										options={allSessions}
										errorText={
											errors.EntryYearId &&
											errors.EntryYearId.message
										}
										id="EntryYearId"
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
										options={allSessions}
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
			</Jumbotron>
		</form>
	);
};
