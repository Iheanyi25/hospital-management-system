import { yupResolver } from "@hookform/resolvers/yup";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router";
import { useApiGet, useApiPatch } from "../../../../api/apiCall";
import {
	getStudentProfileUrl,
	updateStudentProfileUrl,
	yearOfStudyUrl
} from "../../../../api/urls";
import {
	Jumbotron,
	Button,
	TextField,
	SMSelect,
	CompulsoryIndicator,
	Spinner
} from "../../../../ui_elements";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { ProgrammeDetailsSchema } from "./profileSchema";

export const ProgrammeDetails = ({ data, allSessions }) => {
	const { replace } = useHistory();
	const { mutate, isLoading } = useApiPatch();
	const queryClient = useQueryClient();
	const {
		data: levels,
		isLoading: isLoadingLevels,
		error: levelsError
	} = useApiGet(
		yearOfStudyUrl({
			studentTypeId: data?.studentTypeId
		}),
		{
			refetchOnWindowFocus: false
		}
	);

	const getCurrentSession = (session) => Number(session.split("-")[0]);

	const graduationYears = useMemo(
		() =>
			allSessions.filter(
				(session) =>
					getCurrentSession(session.label) >
					getCurrentSession(
						findValueAndLabel(data?.entryYear, allSessions, "label")
							.label
					)
			),
		[allSessions, data?.entryYear]
	);
	const allLevels = formatSelectItems(levels?.data, "name", "id");
	const {
		control,
		formState: { errors },
		handleSubmit
	} = useForm({
		defaultValues: {
			GraduationYearId: findValueAndLabel(
				data?.graduationYearId,
				allSessions
			)
		},
		resolver: yupResolver(ProgrammeDetailsSchema)
	});
	const onSubmit = (values) => {
		const data = [];
		Object.keys(values).map((item) =>
			data.push({
				op: "replace",
				path: `/StudentProgrammeDetail/${item}`,
				value: values[item].value
			})
		);
		const requestBody = {
			url: updateStudentProfileUrl({ refCode: false }),
			data
		};
		mutate(requestBody, {
			onSuccess: () => {
				queryClient.invalidateQueries(
					getStudentProfileUrl({ refCode: false })
				);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Profile details updated.",
					body: "Your student profile details have been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace("#section_e");
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
	if (isLoadingLevels)
		return (
			<div
				style={{ height: "100vh" }}
				className="d-flex justify-content-center align-items-center"
			>
				<Spinner />
			</div>
		);
	if (levelsError)
		return "An error has occurred: " + levelsError?.response?.data?.message;
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
						data-cy="sub_programme"
						label="Next"
						buttonClass="primary"
						type="submit"
						loading={isLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<form>
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label>Department</label>
							</div>
							<div className="col-lg-9">
								<SMSelect
									placeholder="Select a department"
									searchable={true}
									value={{ label: data?.department ?? "N/A" }}
									disabled
								/>
							</div>
						</div>
					</div>
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label>Option</label>
							</div>
							<div className="col-lg-9">
								<SMSelect
									placeholder="Select an option"
									options={[{ value: "None", label: "None" }]}
									searchable={true}
									value={{
										label: data?.departmentOption || "N/A"
									}}
									disabled
								/>
							</div>
						</div>
					</div>
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label>Student Type</label>
							</div>
							<div className="col-lg-9">
								<SMSelect
									placeholder="Select a type"
									searchable={false}
									value={{
										label: data?.studentType ?? "N/A"
									}}
									disabled
								/>
							</div>
						</div>
					</div>
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label>Programme</label>
							</div>
							<div className="col-lg-9">
								<SMSelect
									placeholder="Select a programme"
									searchable={false}
									value={{
										label: data?.schoolProgramme ?? "N/A"
									}}
									disabled
								/>
							</div>
						</div>
					</div>
					<div className="container-fluid px-4 my-3">
						<div className="row">
							<div className="col-lg-3 d-flex align-items-center">
								<label>Matric No</label>
							</div>
							<div className="d-flex col-lg-9">
								<TextField
									className="w-100"
									placeholder="Enter matric number"
									name="phone_number"
									type="text"
									value={data?.matricNumber ?? "N/A"}
									disabled
								/>
							</div>
						</div>
					</div>
					<div className="container-fluid px-4 my-3">
						<div className="row">
							<div className="col-lg-3 d-flex align-items-center">
								<label>JAMB No</label>
							</div>
							<div className="d-flex col-lg-9">
								<TextField
									className="w-100"
									placeholder="Enter JAMB number"
									name="phone_number"
									type="text"
									value={data?.jambRegNumber ?? "N/A"}
									disabled
								/>
							</div>
						</div>
					</div>
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label>Mode of Entry</label>
							</div>
							<div className="col-lg-9">
								<SMSelect
									placeholder="Select a mode"
									searchable={false}
									value={{
										label: data?.studentModeOfEntry ?? "N/A"
									}}
									disabled
								/>
							</div>
						</div>
					</div>
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label>Student Mode</label>
							</div>
							<div className="col-lg-9">
								<SMSelect
									placeholder="Select a mode"
									searchable={false}
									value={{
										label: data?.studentMode ?? "N/A"
									}}
									disabled
								/>
							</div>
						</div>
					</div>
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label>Mode of Study</label>
							</div>
							<div className="col-lg-9">
								<SMSelect
									placeholder="Select a mode"
									searchable={false}
									value={{
										label: data?.studentModeOfStudy ?? "N/A"
									}}
									disabled
								/>
							</div>
						</div>
					</div>
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label>Entry Year</label>
							</div>
							<div className="col-lg-9">
								<SMSelect
									placeholder="Select a year"
									searchable={false}
									value={{
										label: data?.entryYear ?? "N/A"
									}}
									disabled
								/>
							</div>
						</div>
					</div>
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label>Year of Graduation</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="GraduationYearId"
									control={control}
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
								<label>Year of Study</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="LevelId"
									control={control}
									defaultValue={findValueAndLabel(
										data?.levelId,
										allLevels
									)}
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
										/>
									)}
								/>
							</div>
						</div>
					</div>
				</form>
			</Jumbotron>
		</form>
	);
};
