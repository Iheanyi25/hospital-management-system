import { Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
	TextField,
	SMSelect,
	Jumbotron,
	Button,
	Spinner
} from "../../../../ui_elements";
import { CCE_APPLICATION } from "../../../../store/constant";
import { postCcePersonalDetailsFormUrl } from "../../../../api/urls";
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
	allReligions,
	countries,
	states,
	loadingStates,
	loadingLga,
	localGovernments,
	onCountryChange,
	onStateChange
}) => {
	const cce = useSelector((state) => state.cceData);

	const dispatch = useDispatch();

	const onSubmit = (personalInfoResponse) => {
		if (!cce?.passport?.passport) {
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
			url: postCcePersonalDetailsFormUrl(),
			data: {
				rrr: cce?.rrr,
				genderId: personalInfoResponse?.GenderId?.value,
				religionId: personalInfoResponse?.Religion?.value,
				dateOfBirth: personalInfoResponse?.DateofBirth,
				countryId: personalInfoResponse?.CountryId?.value,
				stateId: personalInfoResponse?.StateId?.value,
				lgaId: personalInfoResponse?.LgaId?.value,
				mobileNumber: personalInfoResponse?.MobileNo,
				ContactAddress: personalInfoResponse?.ContactAddress,
				PermanentAddress: personalInfoResponse?.PermanentAddress,
				email: personalInfoResponse?.Email,
				passport: cce?.passport?.passport
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
					type: CCE_APPLICATION,
					payload: {
						...cce,
						Id: data?.data?.data,
						personalInfoResponse
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
							<label htmlFor="Religion">Religion</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="Religion"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										searchable={false}
										placeholder="Choose a religion"
										id="Religion"
										options={allReligions}
										isError={!!errors.religion}
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
										cce?.StateId?.value
											? findValueAndLabel(
													cce?.StateId?.value,
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
										cce?.LgaId?.value
											? findValueAndLabel(
													cce?.LgaId?.value,
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
							<label htmlFor="ContactAddress">
								Contact Address
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
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
						<div className="col-lg-3">
							<label htmlFor="PermanentAddress">
								Permanent Address
							</label>
						</div>
						<div className="col-lg-9">
							<TextField
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
			</Jumbotron>
		</form>
	);
};
