import {
	Jumbotron,
	Button,
	TextField,
	SMSelect,
	CompulsoryIndicator,
	Spinner
} from "../../../../ui_elements";
import { useLocation, useHistory } from "react-router";
import { Controller } from "react-hook-form";
import { useApiPost } from "../../../../api/apiCall";
import { setDiplomaApplicationPersonalDetails } from "../../../../api/urls";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_DIPLOMA_INFO } from "../../../../store/constant";
import { formatInputDate } from "../../../../utils/formatDate";
import { MAXIMUM_AGE, MINIMUM_AGE } from "../../../../utils/constants";

export const PersonalDetailsForm = ({
	control,
	register,
	errors,
	handleSubmit,
	allCountries,
	allLGAs,
	allStates,
	allGenders,
	allStatuses,
	relationships,
	isLoadingStates,
	onCountryChange,
	onStateChange,
	isLoadingLGAs
}) => {
	const diplomaState = useSelector((state) => state.diplomaData);
	const { basicInformation } = diplomaState;
	const dispatch = useDispatch();
	const { mutate, isLoading } = useApiPost();
	const { replace } = useHistory();
	const { state } = useLocation();
	const { rrr } = state;

	const formatSubmitData = (values) => {
		const data = {};
		Object.keys(values).map((item) => {
			if (typeof values[item] === "object") {
				return (data[item] = values[item]?.value);
			} else {
				return (data[item] = values?.[item]);
			}
		});
		return data;
	};

	const onSubmit = (values) => {
		const basicInfo = {
			rrr: rrr,
			surname: values?.surname,
			firstname: values?.firstname,
			middlename: values?.middlename,
			GenderId: values?.sexId?.value,
			DateOfBirth: values?.dateOfBirth,
			CountryId: values?.countryId?.value,
			StateId: values?.stateId?.value,
			LGAId: values?.lgaId?.value,
			ContactAddress: values?.contactAddress,
			MaritalStatusId: values?.maritalStatusId?.value,
			PermanentAddress: values?.permanentAddress,
			PassportAsBase64: basicInformation?.passport
		};
		const nextOfKinObj = {
			Fullname: values?.fullname,
			MobileNumber: values?.phoneNo,
			Address: values?.address,
			Relationship: values?.relationshipId?.label
		};
		const data = {
			...formatSubmitData(basicInfo),
			Guardian: formatSubmitData(nextOfKinObj)
		};

		const requestBody = {
			url: setDiplomaApplicationPersonalDetails(),
			data
		};
		mutate(requestBody, {
			onSuccess: (data) => {
				dispatch({
					type: SAVE_DIPLOMA_INFO,
					payload: {
						...diplomaState,
						basicInformation: {
							...basicInformation,
							applicantId: data?.data?.data,
							email: values?.email,
							gender: values?.sexId,
							dateOfBirth: values?.dateOfBirth,
							country: values?.countryId,
							state: values?.stateId,
							lga: values?.lgaId,
							mobileNumber: values?.phoneNo,
							contactAddress: values?.contactAddress,
							maritalStatus: values?.maritalStatusId,
							permanentAddress: values?.permanentAddress,
							sponsorFullName: values?.fullname,
							sponsorContactAddress: values?.contactAddress,
							sponsorMobileNumber: values?.phoneNo,
							sponsorRelationship: values?.relationshipId
						}
					}
				});
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Application details updated.",
					body: "Your personal details have been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace({
					hash: "#section_b",
					state: {
						...state,
						applicantId: data?.data?.data
					}
				});
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body: response?.data?.message || "Something went wrong"
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
						Personal Details
						<CompulsoryIndicator />
					</span>
				}
				footerContent={
					<Button
						data-cy="submit_personal"
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
										name="firstname"
										register={register}
										disabled
									/>
								</div>
								<div className="col-4">
									<TextField
										autoComplete="off"
										placeholder="Middle Name"
										className="w-100 px-2"
										name="middlename"
										register={register}
										disabled
									/>
								</div>
								<div className="col-4">
									<TextField
										autoComplete="off"
										placeholder="Last Name"
										className="w-100"
										name="surname"
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
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="sexId">Sex</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="sexId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										searchable={false}
										placeholder="Choose a sex"
										id="sexId"
										options={allGenders}
										isError={!!errors.sexId}
										errorText={
											errors.sexId && errors.sexId.message
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
							<label htmlFor="dateOfBirth">Date Of Birth</label>
						</div>
						<div className="col-lg-9">
							<TextField
								type="date"
								name="dateOfBirth"
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
								error={errors.dateOfBirth}
								errorText={
									errors.dateOfBirth &&
									errors.dateOfBirth.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="countryId">Country</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="countryId"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Choose country"
										id="countryId"
										options={allCountries}
										onChange={onCountryChange}
										searchable={true}
										isError={!!errors.countryId}
										errorText={
											errors.countryId &&
											errors.countryId.message
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
										State Of Origin
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
								<label htmlFor="stateId">State Of Origin</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="stateId"
									control={control}
									defaultValue={basicInformation?.stateId}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Choose state"
											searchable={true}
											id="stateId"
											options={allStates}
											onChange={onStateChange}
											isError={!!errors.stateId}
											errorText={
												errors.stateId &&
												errors.stateId.message
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
								<label htmlFor="lgaId">LGA Of Origin</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="lgaId"
									control={control}
									defaultValue={basicInformation?.lgaId}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Choose Local Government"
											searchable={true}
											id="lgaId"
											options={allLGAs}
											isError={!!errors.lgaId}
											errorText={
												errors.lgaId &&
												errors.lgaId.message
											}
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
							<label htmlFor="mobileNumber">Phone Number</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								placeholder="Enter phone number"
								type="text"
								id="mobileNumber"
								name="mobileNumber"
								register={register}
								required
								error={errors.mobileNumber}
								errorText={
									errors.mobileNumber &&
									errors.mobileNumber.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="email">Email</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								placeholder="Enter email address"
								type="text"
								id="email"
								name="email"
								register={register}
								required
								error={errors.email}
								errorText={errors.email && errors.email.message}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="contactAdress">
								Mailing Address
							</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								placeholder="Enter mailing address"
								inputType="textarea"
								id="contactAddress"
								name="contactAddress"
								register={register}
								required
								error={errors.mailingAddress}
								errorText={
									errors.mailingAddress &&
									errors.mailingAddress.message
								}
							/>
						</div>
					</div>
				</div>

				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3">
							<label htmlFor="permanentAddress">
								Permanent Address
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter permanent address"
								className="w-100"
								inputType="textarea"
								id="permanentAddress"
								name="permanentAddress"
								register={register}
								required
								error={errors.permanentAddress}
								errorText={
									errors.permanentAddress &&
									errors.permanentAddress.message
								}
							/>
						</div>
					</div>
				</div>

				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="maritalStatusId">
								Marital Status
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="maritalStatusId"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="maritalStatusId"
										placeholder="Choose a marital status"
										name="maritalStatusId"
										options={allStatuses}
										searchable={false}
										isError={!!errors.maritalStatusId}
										errorText={
											errors.maritalStatusId &&
											errors.maritalStatusId.message
										}
									/>
								)}
							/>
						</div>
					</div>
				</div>

				<div className="border-top border-bottom px-4 py-3 jumbotron-header jumbo-header">
					<span>
						Next of Kin
						<CompulsoryIndicator />
					</span>
				</div>
				<div className="container-fluid px-4 mt-4 mb-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="fullname">Fullname</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="fullname"
								autoComplete="off"
								placeholder="Enter next of Kin's full name"
								className="w-100"
								type="text"
								name="fullname"
								register={register}
								error={errors.fullname}
								errorText={
									errors.fullname && errors.fullname.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3">
							<label htmlFor="address">Address</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="address"
								autoComplete="off"
								placeholder="Enter Next of Kin's address"
								className="w-100"
								inputType="textarea"
								name="address"
								register={register}
								error={errors.address}
								errorText={
									errors.address && errors.address.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="phoneNo">Mobile No</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								id="phoneNo"
								className="w-100"
								placeholder="Enter Next of Kin's phone number"
								type="text"
								name="phoneNo"
								register={register}
								error={errors.phoneNo}
								errorText={
									errors.phoneNo && errors.phoneNo.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 mt-4 mb-5">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="relationshipId">Relationship</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="relationshipId"
								control={control}
								render={({ field }) => (
									<SMSelect
										placeholder="Choose relationship"
										options={relationships}
										searchable={false}
										id="relationshipId"
										{...field}
										isError={!!errors.relationshipId}
										errorText={
											errors.relationshipId &&
											errors.relationshipId.message
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
