import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { addAndUpdateProfileAndNextOfKinUrl } from "../../../../api/urls";
import { JUPEP_APPLICATIONS } from "../../../../store/constant";
import {
	Jumbotron,
	Button,
	TextField,
	SMSelect,
	Spinner
} from "../../../../ui_elements";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";

import { formatInputDate } from "../../../../utils/formatDate";

export const PersonalDetailsForm = ({
	isFormLoading,
	register,
	handleSubmit,
	errors,
	allGenders,
	bloodGroups,
	allCountries,
	allStateData,
	allLGA,
	relationships,
	loadingSubjects,
	control,
	allDepartmentSubjects,
	maritalStatus,
	genotypes,
	loadingStates,
	loadingLga,
	religions,
	departments,
	mutate,
	dispatch,
	replace,
	state,
	allFaculties,
	allChoiceDepartments,
	loadingChoiceSubjects,
	onCountryChange,
	onStateChange
}) => {
	const jupebData = useSelector((state) => state.jupebData);
	const onSubmit = (personalInfo) => {
		if (!jupebData?.passport?.passport) {
			window.scrollTo(0, 0);
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Invalid Action!",
				body: "Please, upload your profile picture before you can proceed!"
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
			return;
		}
		const requestBody = {
			url: addAndUpdateProfileAndNextOfKinUrl(),
			data: {
				rrr: jupebData?.RRR,
				mobileNumber: personalInfo?.MobileNo,
				genderId: personalInfo?.GenderId?.value,
				maritalStatusId: personalInfo?.MaritalStatusId?.value,
				dateOfBirth: personalInfo?.DateOfBirth,
				bloodGroupId: personalInfo?.BloodGroupId?.value,
				genoTypeId: personalInfo?.GenoTypeId?.value,
				countryId: personalInfo?.CountryId?.value,
				stateId: personalInfo?.StateId?.value,
				lgaId: personalInfo?.LgaId?.value,
				town: personalInfo?.Town,
				permanentAddress: personalInfo?.PermanentAddress,
				religionId: personalInfo?.ReligionId?.value,
				facultyId: personalInfo?.ChoiceSchoolId?.value,
				departmentId: personalInfo?.ChoiceDepartmentId?.value,
				jupebOptionSubjectId: personalInfo?.JupebOptionSubjectId?.value,
				jupebOptionId: personalInfo?.DepartmentId?.value,
				passport: jupebData?.passport?.passport,
				nextOfKin: {
					fullName: personalInfo?.SponsorsFullname,
					address: personalInfo?.SponsorsAddress,
					mobileNumber: personalInfo?.SponsorsMobileNo,
					relationshipId: personalInfo?.SponsorsRelationship?.value,
					email: personalInfo?.SponsorsEmail
				}
			}
		};
		mutate(requestBody, {
			onSuccess: (data) => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Successfully updated personal details",
					body: "You can now proceed to next step"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				dispatch({
					type: JUPEP_APPLICATIONS,
					payload: {
						...jupebData,
						Id: data?.data?.data,
						...personalInfo
					}
				});
				replace({ hash: "#section_b", state });
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
				headerText={<span>Personal Details</span>}
				footerContent={
					<Button
						data-cy="submit_personal"
						label="Next"
						buttonClass="primary"
						type="submit"
						disabled={
							loadingChoiceSubjects ||
							loadingStates ||
							loadingLga ||
							loadingSubjects
						}
						loading={isFormLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="full_name">Full Name</label>
						</div>
						<div className="col-lg-9">
							<div className="row" id="full_name">
								<div className="col-12 col-md-4 mb-4 mb-md-0">
									<TextField
										autoComplete="off"
										placeholder="First Name"
										className="w-100 pr-2"
										name="Firstname"
										register={register}
										disabled
										error={errors.Firstname}
										errorText={
											errors.Firstname &&
											errors.Firstname.message
										}
									/>
								</div>
								<div className="col-12 col-md-4 mb-4 mb-md-0">
									<TextField
										autoComplete="off"
										placeholder="Middle Name"
										className="w-100 px-2"
										name="Middlename"
										register={register}
										disabled
										error={errors.Middlename}
										errorText={
											errors.Middlename &&
											errors.Middlename.message
										}
									/>
								</div>
								<div className="col-12 col-md-4 mb-4 mb-md-0">
									<TextField
										autoComplete="off"
										placeholder="Last Name"
										className="w-100"
										name="Surname"
										register={register}
										disabled
										error={errors.Surname}
										errorText={
											errors.Surname &&
											errors.Surname.message
										}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="sex">Sex</label>
						</div>
						<div className="col-lg-9">
							<Controller
								id="GenderId"
								name="GenderId"
								control={control}
								// rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										searchable={false}
										placeholder="Choose a sex"
										id="GenderId"
										name="GenderId"
										options={allGenders}
										isError={!!errors.GenderId}
										errorText={
											errors.GenderId &&
											errors.GenderId.message
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
							<label htmlFor="dateOfBirth">Date of Birth</label>
						</div>
						<div className="col-lg-9">
							<TextField
								type="date"
								name="DateOfBirth"
								register={register}
								id="DateOfBirth"
								max={formatInputDate({
									minYear: 15,
									useFullYear: true
								})}
								required
								error={errors.DateOfBirth}
								errorText={
									errors.DateOfBirth &&
									errors.DateOfBirth.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="sex">Blood Group</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="BloodGroupId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										searchable={false}
										placeholder="Choose a Blood Group"
										id="BloodGroupId"
										options={bloodGroups}
										isError={!!errors.BloodGroupId}
										errorText={
											errors.BloodGroupId &&
											errors.BloodGroupId.message
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
							<label htmlFor="sex">Genotype</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="GenoTypeId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										searchable={false}
										placeholder="Choose a Genotype"
										id="GenoTypeId"
										options={genotypes}
										isError={!!errors.GenoTypeId}
										errorText={
											errors.GenoTypeId &&
											errors.GenoTypeId.message
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
							<label htmlFor="country">Country of Origin</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="CountryId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Choose country"
										id="CountryId"
										name={"CountryId"}
										onChange={onCountryChange}
										options={allCountries}
										searchable={true}
										isError={!!errors.CountryId}
										errorText={
											errors.CountryId &&
											errors.CountryId.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				{loadingStates && (
					<>
						<div className="container-fluid px-4 my-4">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label htmlFor="StateId">
										State of Origin
									</label>
								</div>
								<div className="col-lg-9">
									<Spinner />
								</div>
							</div>
						</div>
					</>
				)}
				{!loadingStates && allStateData?.length !== 0 && (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="state">State of Origin</label>
							</div>
							<div className="col-lg-9">
								<Controller
									id="StateId"
									name="StateId"
									defaultValue={
										jupebData?.StateId?.value
											? findValueAndLabel(
													jupebData?.StateId?.value,
													allStateData
											  )
											: null
									}
									control={control}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Choose a state"
											searchable={true}
											id="StateId"
											name={"StateId"}
											options={allStateData}
											onChange={onStateChange}
											isError={!!errors.StateId}
											errorText={
												errors.StateId &&
												errors.StateId.message
											}
										/>
									)}
								/>
							</div>
						</div>
					</div>
				)}

				{!loadingLga && allLGA?.length !== 0 && (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="lga">LGA Of Origin</label>
							</div>
							<div className="col-lg-9">
								<Controller
									id="LgaId"
									name="LgaId"
									control={control}
									defaultValue={
										jupebData?.LgaId?.value
											? findValueAndLabel(
													jupebData?.LgaId?.value,
													allLGA
											  )
											: null
									}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Choose Local Government"
											searchable={true}
											id="LgaId"
											name={"LgaId"}
											options={allLGA}
											isError={!!errors.LgaId}
											errorText={
												errors.LgaId &&
												errors.LgaId.message
											}
										/>
									)}
								/>
							</div>
						</div>
					</div>
				)}
				{loadingLga && (
					<>
						<div className="container-fluid px-4 my-4">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label htmlFor="LgaId">LGA Of Origin</label>
								</div>
								<div className="col-lg-9">
									<Spinner />
								</div>
							</div>
						</div>
					</>
				)}
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3">
							<label htmlFor="contactAddress">Town</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter your town"
								className="w-100"
								id="Town"
								name="Town"
								register={register}
								required
								error={errors.Town}
								errorText={errors.Town && errors.Town.message}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3">
							<label htmlFor="contactAddress">Address</label>
						</div>
						<div className="col-lg-9">
							<TextField
								inputType="textarea"
								placeholder="Enter contact address"
								className="w-100"
								id="PermanentAddress"
								name="PermanentAddress"
								register={register}
								required
								error={errors.PermanentAddress}
								errorText={
									errors.PermanentAddress &&
									errors.PermanentAddress.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="mobileNo">Phone Number</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								placeholder="Enter phone number"
								type="text"
								id="MobileNo"
								name="MobileNo"
								register={register}
								required
								error={errors.MobileNo}
								errorText={
									errors.MobileNo && errors.MobileNo.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="email">Email Address</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="example@examplemail.com"
								className="w-100"
								type="email"
								id="Email"
								name="Email"
								register={register}
								disabled
								required
								error={errors.Email}
								errorText={errors.Email && errors.Email.message}
							/>
						</div>
					</div>
				</div>

				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="religion">Religion</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="ReligionId"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="ReligionId"
										placeholder="Choose a religion"
										name="ReligionId"
										options={religions}
										searchable={false}
										isError={!!errors.ReligionId}
										errorText={
											errors.ReligionId &&
											errors.ReligionId.message
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
							<label>Marital Status</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="MaritalStatusId"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="MaritalStatusId"
										placeholder="Choose a marital status"
										name="MaritalStatusId"
										options={maritalStatus}
										searchable={false}
										isError={!!errors.MaritalStatusId}
										errorText={
											errors.MaritalStatusId &&
											errors.MaritalStatusId.message
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
							<label htmlFor="maritalStatus">
								Course of Study
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								id="DepartmentId"
								name="DepartmentId"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="DepartmentId"
										placeholder="Choose a Course of Study"
										name="DepartmentId"
										options={departments}
										// searchable={false}
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

				{allDepartmentSubjects.length !== 0 && (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="maritalStatus">
									Subject Combination
								</label>
							</div>
							<div className="col-lg-9">
								<Controller
									id="JupebOptionSubjectId"
									name="JupebOptionSubjectId"
									control={control}
									render={({ field }) => (
										<SMSelect
											{...field}
											id="JupebOptionSubjectId"
											placeholder="Choose a Subject Combination"
											name="JupebOptionSubjectId"
											options={allDepartmentSubjects}
											isError={
												!!errors.JupebOptionSubjectId
											}
											errorText={
												errors.JupebOptionSubjectId &&
												errors.JupebOptionSubjectId
													.message
											}
										/>
									)}
								/>
							</div>
						</div>
					</div>
				)}
				{loadingSubjects && <Spinner />}
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="maritalStatus">Choice School</label>
						</div>
						<div className="col-lg-9">
							<Controller
								id="ChoiceSchoolId"
								name="ChoiceSchoolId"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="ChoiceSchoolId"
										placeholder="Choose a School/Faculty"
										name="ChoiceSchoolId"
										options={allFaculties}
										// searchable={false}
										isError={!!errors.ChoiceSchoolId}
										errorText={
											errors.ChoiceSchoolId &&
											errors.ChoiceSchoolId.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				{allChoiceDepartments.length !== 0 && (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="maritalStatus">
									Choice Department
								</label>
							</div>
							<div className="col-lg-9">
								<Controller
									id="ChoiceDepartmentId"
									name="ChoiceDepartmentId"
									control={control}
									render={({ field }) => (
										<SMSelect
											{...field}
											id="ChoiceDepartmentId"
											placeholder="Choose a Department"
											name="ChoiceDepartmentId"
											options={allChoiceDepartments}
											// searchable={false}
											isError={
												!!errors.ChoiceDepartmentId
											}
											errorText={
												errors.ChoiceDepartmentId &&
												errors.ChoiceDepartmentId
													.message
											}
										/>
									)}
								/>
							</div>
						</div>
					</div>
				)}
				{loadingChoiceSubjects && <Spinner />}

				<div className="border-top border-bottom px-4 py-3 jumbotron-header jumbo-header">
					<span>Next of Kin / Parent Details</span>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="full_name">Full Name</label>
						</div>
						<div className="col-lg-9">
							<div className="row" id="full_name">
								<div className="col-12  mb-4 mb-md-0">
									<TextField
										autoComplete="off"
										placeholder="Full Name"
										className="w-100 pr-2"
										name="SponsorsFullname"
										register={register}
										error={errors.SponsorsFullname}
										errorText={
											errors.SponsorsFullname &&
											errors.SponsorsFullname.message
										}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="religion">Relationship</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="SponsorsRelationship"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="SponsorsRelationship"
										placeholder="Choose a Relationship"
										name="SponsorsRelationship"
										options={relationships}
										searchable={false}
										isError={!!errors.SponsorsRelationship}
										errorText={
											errors.SponsorsRelationship &&
											errors.SponsorsRelationship.message
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
							<label htmlFor="sponsorMobileNo">Mobile No</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								id="SponsorsMobileNo"
								className="w-100"
								placeholder="Enter phone number"
								type="text"
								name="SponsorsMobileNo"
								register={register}
								error={errors.SponsorsMobileNo}
								errorText={
									errors.SponsorsMobileNo &&
									errors.SponsorsMobileNo.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3">
							<label htmlFor="contactAddress">Address</label>
						</div>
						<div className="col-lg-9">
							<TextField
								inputType="textarea"
								autoComplete="off"
								placeholder="Enter contact address"
								className="w-100"
								id="SponsorsAddress"
								name="SponsorsAddress"
								register={register}
								required
								error={errors.SponsorsAddress}
								errorText={
									errors.SponsorsAddress &&
									errors.SponsorsAddress.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="email">Email Address</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="example@examplemail.com"
								className="w-100"
								type="email"
								id="SponsorsEmail"
								name="SponsorsEmail"
								register={register}
								required
								error={errors.SponsorsEmail}
								errorText={
									errors.SponsorsEmail &&
									errors.SponsorsEmail.message
								}
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
