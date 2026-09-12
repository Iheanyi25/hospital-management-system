import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import {
	CSNDAppAddOrUpdateUrl,
	CSPGAppAddOrUpdateUrl
} from "../../../../api/urls";
import { CSPG_APPLICATIONS } from "../../../../store/constant";
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
	allCountries,
	allStateData,
	allLGA,
	loadingSubjects,
	control,
	loadingStates,
	loadingLga,
	mutate,
	dispatch,
	replace,
	state,
	loadingChoiceSubjects,
	onCountryChange,
	onStateChange
}) => {
	const CSPGData = useSelector((state) => state.CSPGData);

	const onSubmit = (personalInfo) => {
		if (!CSPGData?.passport) {
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
			url:
				CSPGData?.studentTypeId?.label === "CSEPG"
					? CSPGAppAddOrUpdateUrl()
					: CSNDAppAddOrUpdateUrl(),
			data: {
				rrr: CSPGData?.rrr,
				firstname: CSPGData?.basicInformation?.firstname,
				middlename: CSPGData?.basicInformation?.middlename,
				lastname: CSPGData?.basicInformation?.lastname,
				email: CSPGData?.basicInformation?.email,
				mobileNumber: personalInfo?.MobileNo,
				genderId: personalInfo?.GenderId?.value,
				dateOfBirth: personalInfo?.DateOfBirth,
				countryId: personalInfo?.CountryId?.value,
				stateId: personalInfo?.StateId?.value,
				lgaId: personalInfo?.LgaId?.value,
				applicantPassport: CSPGData?.passport
			}
		};
		mutate(requestBody, {
			onSuccess: (data) => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Successfully updated biodata",
					body: "You can now proceed to next step"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				dispatch({
					type: CSPG_APPLICATIONS,
					payload: {
						...CSPGData,
						id: data?.data?.data,
						basicInformation: {
							rrr: CSPGData?.rrr,
							firstname: CSPGData?.basicInformation?.firstname,
							middlename: CSPGData?.basicInformation?.middlename,
							lastname: CSPGData?.basicInformation?.lastname,
							email: CSPGData?.basicInformation?.email,
							mobileNumber: personalInfo?.MobileNo,
							genderId: personalInfo?.GenderId,
							dateOfBirth: personalInfo?.DateOfBirth,
							countryId: personalInfo?.CountryId,
							stateId: personalInfo?.StateId,
							lgaId: personalInfo?.LgaId,
							passport: CSPGData?.passport
						}
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
				headerText={<span>Bio Data</span>}
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
										CSPGData?.basicInformation?.stateId
											?.value
											? findValueAndLabel(
													CSPGData?.basicInformation
														?.stateId?.value,
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
										CSPGData?.basicInformation?.lgaId?.value
											? findValueAndLabel(
													CSPGData?.basicInformation
														?.lgaId?.value,
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
			</Jumbotron>
		</form>
	);
};
