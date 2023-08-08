import {
	Jumbotron,
	Button,
	TextField,
	SMSelect,
	Spinner,
	CompulsoryIndicator
} from "../../../../ui_elements";
import { useLocation, useHistory } from "react-router";
import { Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_STUDENT_DATA } from "../../../../store/constant";
import { formatInputDate } from "../../../../utils/formatDate";
import { MAXIMUM_AGE, MINIMUM_AGE } from "../../../../utils/constants";

export const PersonalInformationForm = ({
	control,
	register,
	errors,
	handleSubmit,
	allCountries,
	allLGAs,
	allStates,
	allReligions,
	allBloodGroups,
	allGenotypes,
	isLoadingStates,
	onCountryChange,
	onStateChange,
	allGenders,
	isLoadingLGAs
}) => {
	const studentState = useSelector((state) => state.studentData);
	const { PersonalData, isPassportValid } = studentState;
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

	const onSubmit = async (PersonalData) => {
		if (isPassportValid) {
			dispatch({
				type: SAVE_STUDENT_DATA,
				payload: {
					...studentState,
					PersonalData,
					isPersonalDataValid: true
				}
			});
			replace({ hash: "#section_b", state });
		} else {
			window.scrollTo(0, 0);
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Invalid Action!",
				body: "Please, upload your profile picture before you can proceed!"
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
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
						label="Next"
						buttonClass="primary"
						type="submit"
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
										placeholder="Last Name"
										className="w-100"
										name="Surname"
										register={register}
										disabled
									/>
								</div>
								<div className="col-4">
									<TextField
										autoComplete="off"
										placeholder="First Name"
										className="w-100 pr-2"
										name="Firstname"
										register={register}
										disabled
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
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3">
							<label htmlFor="gender">Gender</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="Gender"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										searchable={false}
										placeholder="Choose a sex"
										id="Gender"
										options={allGenders}
										isError={!!errors.Gender}
										errorText={
											errors.Gender &&
											errors.Gender.message
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
						<div className="col-lg-3">
							<TextField
								type="date"
								name="DateOfBirth"
								register={register}
								id="dateOfBirth"
								max={formatInputDate({
									minYear: MINIMUM_AGE,
									useFullYear: true
								})}
								min={formatInputDate({
									minYear: MAXIMUM_AGE,
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
									rules={{ required: true }}
									defaultValue={PersonalData?.StateId}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Choose a state"
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
				{allLGAs?.length > 0 && (
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="LgaId">LGA Of Origin</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="LgaId"
									control={control}
									rules={{ required: true }}
									defaultValue={PersonalData?.LgaId}
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
								name="BloodGroup"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="BloodGroup"
										placeholder="Choose blood group"
										options={allBloodGroups}
										searchable={false}
										isError={!!errors.BloodGroup}
										errorText={
											errors.BloodGroup &&
											errors.BloodGroup.message
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
								name="GenoType"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="GenoType"
										placeholder="Choose a genotype"
										options={allGenotypes}
										searchable={false}
										isError={!!errors.GenoType}
										errorText={
											errors.GenoType &&
											errors.GenoType.message
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
							<label htmlFor="Religion">Religion</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="Religion"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="Religion"
										placeholder="Choose a religion"
										name="Religion"
										options={allReligions}
										searchable={false}
										isError={!!errors.Religion}
										errorText={
											errors.Religion &&
											errors.Religion.message
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
