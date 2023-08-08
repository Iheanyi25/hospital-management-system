import { Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
	TextField,
	SMSelect,
	Jumbotron,
	Button,
	RadioButtons,
	ValidationText,
	Spinner
} from "../../../../ui_elements";
import { DIRECT_ENTRY } from "../../../../store/constant";
import { postDirectEntryPersonalDetailsFormUrl } from "../../../../api/urls";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";
import { formatInputDate } from "../../../../utils/formatDate";
import { MAXIMUM_AGE, MINIMUM_AGE } from "../../../../utils/constants";

export const PersonalDetailsForm = ({
	register,
	errors,
	replace,
	state,
	control,
	handleSubmit,
	mutate,
	isFormLoading,
	allGenders,
	bloodGroups,
	genotypes,
	countries,
	states,
	loadingStates,
	loadingLga,
	localGovernments,
	religions,
	watchData,
	departments,
	relationships,
	onCountryChange,
	onStateChange
}) => {
	const directEntry = useSelector((state) => state.directEntryData);

	const dispatch = useDispatch();

	const onSubmit = (basicInformation) => {
		if (!directEntry?.passport?.passport) {
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
			url: postDirectEntryPersonalDetailsFormUrl(),
			data: {
				basicInformation: {
					jambRegNumber: directEntry?.JambRegNumber,
					genderId: basicInformation?.GenderId?.value,
					dateOfBirth: basicInformation?.DateofBirth,
					bloodGroupId: basicInformation?.BloodGroupId?.value,
					genoTypeId: basicInformation?.GenoTypeId?.value,
					countryId: basicInformation?.CountryId?.value,
					stateId: basicInformation?.StateId?.value,
					lgaId: basicInformation?.LgaId?.value,
					town: basicInformation?.Town,
					permanentAddress: basicInformation?.PermanentAddress,
					mobileNumber: basicInformation?.MobileNo,
					email: basicInformation?.Email,
					religionId: basicInformation?.ReligionId?.value,
					disability:
						basicInformation?.Disability === "Yes" ? true : false,
					departmentId: basicInformation?.CourseId?.value,
					passport: directEntry?.passport?.passport,
					extraCurricularActivities: basicInformation?.Hobby
				},
				nextOfKin: {
					fullname: basicInformation?.SponsersFullname,
					email: basicInformation.SponsersEmail,
					contactAddress: basicInformation?.SponsersAddress,
					mobileNumber: basicInformation?.SponsersMobileNo,
					relationshipId:
						basicInformation?.SponsersRelationship?.value
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
					type: DIRECT_ENTRY,
					payload: {
						...directEntry,
						Id: data?.data?.data,
						basicInformation,
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
						loading={isFormLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
				endText={"1 of 3"}
			>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="full_name">Full Name</label>
						</div>
						<div className="col-lg-9">
							<div className="row" id="full_name">
								<div className="col-4">
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
								<div className="col-4">
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
								<div className="col-4">
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
								name="GenderId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										searchable={false}
										placeholder="Choose a sex"
										id="GenderId"
										disabled
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
								name="DateofBirth"
								register={register}
								id="DateofBirth"
								max={formatInputDate({
									minYear: MINIMUM_AGE,
									useFullYear: true
								})}
								min={formatInputDate({
									minYear: MAXIMUM_AGE,
									useFullYear: true
								})}
								required
								error={errors.DateofBirth}
								errorText={
									errors.DateofBirth &&
									errors.DateofBirth.message
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
										options={countries}
										searchable={true}
										onChange={onCountryChange}
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
				{!loadingStates && states?.length !== 0 && (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="state">State of Origin</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="StateId"
									control={control}
									defaultValue={
										directEntry?.StateId?.value
											? findValueAndLabel(
													directEntry?.StateId?.value,
													states
											  )
											: null
									}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Choose state"
											searchable={true}
											id="StateId"
											options={states}
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
				{localGovernments.length !== 0 && (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="lga">LGA Of Origin</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="LgaId"
									control={control}
									defaultValue={
										directEntry?.LgaId?.value
											? findValueAndLabel(
													directEntry?.LgaId?.value,
													localGovernments
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
											options={localGovernments}
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
								placeholder="Enter contact address"
								className="w-100"
								inputType="textarea"
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

				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3">
							<label htmlFor="contactAddress">Hobby</label>
						</div>
						<div className="col-lg-9">
							<TextField
								placeholder="Enter Hobby"
								className="w-100"
								// inputType="textarea"
								id="Hobby"
								name="Hobby"
								register={register}
								required
								error={errors.Hobby}
								errorText={errors.Hobby && errors.Hobby.message}
							/>
						</div>
					</div>
				</div>

				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="email">
								Do you have any disability
							</label>
						</div>
						<div className="col-lg-9 d-flex">
							<RadioButtons
								label={"Yes"}
								value={"Yes"}
								name={"Disability"}
								id={"Disability"}
								register={register}
								checked={watchData?.Disability === "Yes"}
							/>
							<div className="mx-4">
								<RadioButtons
									label={"No"}
									value={"No"}
									name={"Disability"}
									id={"Disability"}
									register={register}
									checked={watchData?.Disability === "No"}
								/>
							</div>
							<div>
								{errors.Disability &&
									errors.Disability.message && (
										<ValidationText
											status={"error"}
											message={errors.Disability.message}
										/>
									)}
							</div>
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
								name="CourseId"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="CourseId"
										placeholder="Choose a Course of Study"
										name="CourseId"
										options={departments}
										// searchable={false}
										isError={!!errors.CourseId}
										errorText={
											errors.CourseId &&
											errors.CourseId.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>
				<div className="border-top border-bottom px-4 py-3 jumbotron-header jumbo-header">
					<span>Next of Kin / Parent Details</span>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="full_name">Full Name</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter Full Name"
								className="w-100 pr-2"
								name="SponsersFullname"
								register={register}
								error={errors.SponsersFullname}
								errorText={
									errors.SponsersFullname &&
									errors.SponsersFullname.message
								}
								// disabled
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
								id="SponsersEmail"
								name="SponsersEmail"
								register={register}
								required
								error={errors.SponsersEmail}
								errorText={
									errors.SponsersEmail &&
									errors.SponsersEmail.message
								}
							/>
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
								name="SponsersRelationship"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="SponsersRelationship"
										placeholder="Choose a Relationship"
										name="SponsersRelationship"
										options={relationships}
										searchable={false}
										isError={!!errors.SponsersRelationship}
										errorText={
											errors.SponsersRelationship &&
											errors.SponsersRelationship.message
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
								id="SponsersMobileNo"
								className="w-100"
								placeholder="Enter phone number"
								type="text"
								name="SponsersMobileNo"
								register={register}
								error={errors.SponsersMobileNo}
								errorText={
									errors.SponsersMobileNo &&
									errors.SponsersMobileNo.message
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
								autoComplete="off"
								placeholder="Enter contact address"
								inputType="textarea"
								className="w-100"
								id="SponsersAddress"
								name="SponsersAddress"
								register={register}
								required
								error={errors.SponsersAddress}
								errorText={
									errors.SponsersAddress &&
									errors.SponsersAddress.message
								}
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
