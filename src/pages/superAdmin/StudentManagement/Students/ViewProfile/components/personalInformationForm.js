import {
	Jumbotron,
	Button,
	TextField,
	SMSelect,
	CompulsoryIndicator,
	Spinner
} from "../../../../../../ui_elements";
import { Controller } from "react-hook-form";
import { useApiPatch } from "../../../../../../api/apiCall";
import {
	getStudentProfileUrl,
	updateStudentProfileUrl
} from "../../../../../../api/urls";
import { useQueryClient } from "react-query";
import { findValueAndLabel } from "../../../../../../utils/findValueAndLabel";
import { formatInputDate } from "../../../../../../utils/formatDate";
import { MAXIMUM_AGE, MINIMUM_AGE } from "../../../../../../utils/constants";

export const PersonalInformationForm = ({
	register,
	control,
	data,
	programmeData,
	errors,
	handleSubmit,
	allBloodGroups,
	allGenotypes,
	allReligions,
	allCountries,
	allGenders,
	allLGAs,
	allStates,
	isLoadingLGAs,
	isLoadingStates,
	onCountryChange,
	onStateChange,
	refCode
}) => {

	const { mutate, isLoading } = useApiPatch();
	const queryClient = useQueryClient();
	const onSubmit = async (values) => {
		const data = [];
		Object.keys(values).map((item) => {
			if (typeof values[item] === "object") {
				return data.push({
					op: "replace",
					path: `/${item}`,
					value: values[item]?.value
				});
			} else if (item === "DateOfBirth") {
				return data.push({
					op: "replace",
					path: `/${item}`,
					value: values[item] + "T12:41:57.800Z"
				});
			} else {
				return data.push({
					op: "replace",
					path: `/${item}`,
					value: !values[item] ? null : values[item]?.toUpperCase()
				});
			}
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
			},
			onError: (error) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body: error?.response?.data?.message ||
						`Something went wrong with this action. Check your forms and submit again`
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
						Tell us about yourself
						<CompulsoryIndicator />
					</span>
				}
				footerContent={
					<Button
						data-cy="submit_personal"
						label="Update"
						buttonClass="primary"
						type="submit"
						loading={isLoading}
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
								<div className="col-4">
									<TextField
										autoComplete="off"
										placeholder="First Name"
										className="w-100 pr-2"
										name="Firstname"
										register={register}
										isError={!!errors.Firstname}
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
										isError={!!errors.CountryId}
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
										name="Lastname"
										register={register}
										isError={!!errors.Lastname}
										errorText={
											errors.Lastname &&
											errors.Lastname.message
										}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="GenderId">Sex</label>
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
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="dateOfBirth">Date of Birth</label>
						</div>
						<div className="col-lg-3">
							<TextField
								type="date"
								name="DateOfBirth"
								register={register}
								max={formatInputDate({
									minYear: MINIMUM_AGE,
									useFullYear: true
								})}
								min={formatInputDate({
									minYear: MAXIMUM_AGE,
									useFullYear: true
								})}
								id="dateOfBirth"
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
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="CountryId">Country</label>
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
										options={allCountries}
										onChange={onCountryChange}
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
				{isLoadingStates && (
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
				{allStates?.length > 0 && (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="StateId">State of Origin</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="StateId"
									control={control}
									defaultValue={findValueAndLabel(
										data?.stateId,
										allStates
									)}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Choose state"
											searchable={true}
											id="StateId"
											options={allStates}
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
				{isLoadingLGAs && (
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
				{!isLoadingLGAs && allLGAs?.length > 0 && (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="LgaId">LGA Of Origin</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="LgaId"
									control={control}
									defaultValue={findValueAndLabel(
										data?.lgaId,
										allLGAs
									)}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Choose Local Government"
											searchable={true}
											id="LgaId"
											options={allLGAs}
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
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="HomeTown">Home Town</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter home town"
								className="w-100"
								type="text"
								id="HomeTown"
								name="HomeTown"
								register={register}
								required
								error={errors.HomeTown}
								errorText={
									errors.HomeTown && errors.HomeTown.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3">
							<label htmlFor="PermanentAddress">
								Permanent Address
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter permanent address"
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
							<label htmlFor="Email">Email Address</label>
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
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="MobileNo">Phone Number</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								placeholder="Enter phone number"
								type="text"
								id="MobileNo"
								name="MobileNumber"
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
						<div className="col-lg-3">
							<label htmlFor="ContactAddress">
								Contact Address
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter contact address"
								className="w-100"
								inputType="textarea"
								id="ContactAddress"
								name="ContactAddress"
								register={register}
								required
								error={errors.ContactAddress}
								errorText={
									errors.ContactAddress &&
									errors.ContactAddress.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="BloodGroupId">Blood Group</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="BloodGroupId"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="BloodGroupId"
										placeholder="Choose blood group"
										options={allBloodGroups}
										searchable={false}
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
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="GenoTypeId">Genotype</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="GenoTypeId"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="GenoTypeId"
										placeholder="Choose a Genotype"
										options={allGenotypes}
										searchable={false}
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
							<label htmlFor="ReligionId">Religion</label>
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
										options={allReligions}
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
			</Jumbotron>
		</form>
	);
};
