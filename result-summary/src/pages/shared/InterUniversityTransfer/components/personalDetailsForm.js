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
import { updateTransferApplicationPersonalInfoUrl } from "../../../../api/urls";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_UNI_TRANSFER_INFO } from "../../../../store/constant";
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
	isLoadingStates,
	onCountryChange,
	onStateChange,
	isLoadingLGAs
}) => {
	const uniTransferState = useSelector((state) => state.uniTransferData);
	const { personalInfoResponse, regNumber, passport } = uniTransferState;
	const dispatch = useDispatch();
	const { mutate, isLoading } = useApiPost();
	const { replace } = useHistory();
	const { state } = useLocation();

	const onSubmit = (values) => {
		if (passport) {
			const payload = {
				RegNumber: regNumber,
				GenderId: values?.sexId?.value,
				DateOfBirth: values?.dateOfBirth,
				CountryId: values?.countryId?.value,
				StateId: values?.stateId?.value,
				LGAId: values?.lgaId?.value,
				ContactAddress: values?.contactAddress,
				MaritalStatusId: values?.maritalStatusId?.value,
				PassportAsBase64: passport
			};
			const requestBody = {
				url: updateTransferApplicationPersonalInfoUrl(),
				data: payload
			};
			mutate(requestBody, {
				onSuccess: (data) => {
					dispatch({
						type: SAVE_UNI_TRANSFER_INFO,
						payload: {
							...uniTransferState,
							personalInfoResponse: {
								...uniTransferState.personalInfoResponse,
								...payload
							},
							applicantId: data.data.data
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
					replace({ hash: "#section_b", state });
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
							<label htmlFor="dateOfBirth">Date of Birth</label>
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
							<label htmlFor="countryId">Country of Origin</label>
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
								<label htmlFor="stateId">State of Origin</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="stateId"
									control={control}
									defaultValue={personalInfoResponse?.stateId}
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
									defaultValue={personalInfoResponse?.lgaId}
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
								disabled={true}
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
							<label htmlFor="email">Email Address</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="example@examplemail.com"
								className="w-100"
								type="email"
								id="email"
								name="email"
								register={register}
								required
								disabled={true}
								error={errors.email}
								errorText={errors.email && errors.email.message}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3">
							<label htmlFor="contactAddress">
								Contact Address
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter contact address"
								className="w-100"
								inputType="textarea"
								id="contactAddress"
								name="contactAddress"
								register={register}
								required
								error={errors.contactAddress}
								errorText={
									errors.contactAddress &&
									errors.contactAddress.message
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
			</Jumbotron>
		</form>
	);
};
