import { useState, useMemo, useEffect } from "react";
import {
	Jumbotron,
	Button,
	TextField,
	SMSelect,
	Spinner
} from "../../../../ui_elements";
import { useLocation, useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { useApiPost, useApiGet } from "../../../../api/apiCall";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePredegreePersonalInfoFormUrl } from "../../../../api/urls";
import { getAllLGAsUrl, getAllStatesUrl } from "../../../../api/urls";
import { personalDetailsSchema } from "../predegreeSchema";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_PRE_DEGREE_INFO } from "../../../../store/constant";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { formatInputDate } from "../../../../utils/formatDate";
import { MAXIMUM_AGE, MINIMUM_AGE } from "../../../../utils/constants";

export const PersonalDetails = ({
	allGenders,
	relationships,
	allCountries,
	allStatuses,
	allReligions
}) => {
	const predegreeData = useSelector((state) => state.predegreeData);
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

	if (!state) {
		replace("/pre_degree_login");
	}
	const { mutate, isLoading: isFormLoading } = useApiPost();
	const [countryState, setCountryState] = useState(
		predegreeData?.personalInfo?.country?.value
	);
	const [stateFieldState, setStateFieldState] = useState(
		predegreeData?.personalInfo?.state?.value
	);
	const { data: states, isFetching: isLoadingStates } = useApiGet(
		getAllStatesUrl(countryState),
		{
			refetchOnWindowFocus: false,
			enabled: !!countryState
		}
	);
	const { data: lgas, isFetching: isLoadingLGAs } = useApiGet(
		getAllLGAsUrl({ stateId: stateFieldState, countryId: countryState }),
		{
			refetchOnWindowFocus: false,
			enabled: !!(stateFieldState && countryState)
		}
	);
	const allStates = useMemo(
		() => formatSelectItems(states?.data, "name", "id"),
		[states]
	);
	const allLGAs = useMemo(
		() => formatSelectItems(lgas?.data, "name", "id"),
		[lgas]
	);

	const onCountryChange = (value) => {
		setCountryState(value.value);
		setValue("country", value);
		setValue("state", null);
		setValue("lgaId", null);
		clearErrors("country");
	};

	const onStateChange = (value) => {
		setStateFieldState(value.value);
		setValue("state", value);
		setValue("lgaId", null);
		clearErrors("state");
	};

	const {
		register,
		control,
		handleSubmit,
		setValue,
		clearErrors,
		watch,
		formState: { errors }
	} = useForm({
		defaultValues: {
			firstName: predegreeData?.personalInfo?.firstName,
			surName: predegreeData?.personalInfo?.surName,
			middleName: predegreeData?.personalInfo?.middleName,
			sex: predegreeData?.personalInfo?.sex,
			dateOfBirth: predegreeData?.personalInfo?.dateOfBirth,
			country: predegreeData?.personalInfo?.country,
			state: predegreeData?.personalInfo?.state,
			lga: predegreeData?.personalInfo?.lga,
			homeTown: predegreeData?.personalInfo?.homeTown,
			mobileNo: predegreeData?.personalInfo?.mobileNo,
			email: predegreeData?.personalInfo?.email,
			contactAddress: predegreeData?.personalInfo?.contactAddress,
			permanentAddress: predegreeData?.personalInfo?.permanentAddress,
			sponsorFullName: predegreeData?.personalInfo?.sponsorFullName,
			sponsorAddress: predegreeData?.personalInfo?.sponsorAddress,
			sponsorMobileNo: predegreeData?.personalInfo?.sponsorMobileNo,
			maritalStatusId: predegreeData?.personalInfo?.maritalStatusId,
			religionId: predegreeData?.personalInfo?.religionId,
			sponsorRelationship:
				predegreeData?.personalInfo?.sponsorRelationship
		},
		resolver: yupResolver(personalDetailsSchema),
		context: {
			isLGARequired: lgas?.data?.length > 0 ? true : false
		}
	});

	useEffect(() => {
		const subscription = watch(({ country, state }) => {
			setCountryState(country?.value);
			setStateFieldState(state?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);
	const onSubmit = (personalInfo) => {
		if (!predegreeData?.passport?.passport) {
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
			url: updatePredegreePersonalInfoFormUrl(),
			data: {
				BasicInformation: {
					rrr: predegreeData?.personalInfo?.rrr,
					DateOfBirth: personalInfo?.dateOfBirth,
					CountryId: personalInfo?.country?.value,
					StateId: personalInfo?.state?.value,
					LGAId: personalInfo?.lga?.value,
					GenderId: personalInfo?.sex?.value,
					ContactAddress: personalInfo.contactAddress,
					Email: personalInfo.email,
					MobileNumber: personalInfo.mobileNo,
					ReligionId: personalInfo.religionId?.value,
					MaritalStatusId: personalInfo.maritalStatusId?.value,
					PermanentAddress: personalInfo.permanentAddress,
					Passport: predegreeData?.passport.passport
				},
				NextOKin: {
					Fullname: personalInfo.sponsorFullName,
					PhoneNo: personalInfo.sponsorMobileNo,
					Address: personalInfo.sponsorAddress,
					Relationship: personalInfo.sponsorRelationship?.value
				}
			}
		};
		mutate(requestBody, {
			onSuccess: ({ data }) => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Successfully updated personal details",
					body: "You can now proceed to next step"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				dispatch({
					type: SAVE_PRE_DEGREE_INFO,
					payload: {
						...predegreeData,
						personalInfo: {
							...personalInfo,
							rrr: predegreeData?.personalInfo?.rrr
						},
						applicantId: data?.data
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
				headerText="Personal Details"
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
										name="firstName"
										register={register}
										disabled
									/>
								</div>
								<div className="col-4">
									<TextField
										autoComplete="off"
										placeholder="Middle Name"
										className="w-100 px-2"
										name="middleName"
										register={register}
										disabled
									/>
								</div>
								<div className="col-4">
									<TextField
										autoComplete="off"
										placeholder="Last Name"
										className="w-100"
										name="surName"
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
							<label htmlFor="sex">Sex</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="sex"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										searchable={false}
										placeholder="Choose a sex"
										id="sex"
										options={allGenders}
										isError={!!errors.sex}
										errorText={
											errors.sex && errors.sex.message
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
							<label htmlFor="country">Country of Origin</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="country"
								control={control}
								rules={{ required: true }}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Choose country"
										id="country"
										options={allCountries}
										onChange={onCountryChange}
										searchable={true}
										isError={!!errors.country}
										errorText={
											errors.country &&
											errors.country.message
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
									<label htmlFor="state">
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
								<label htmlFor="state">State of Origin</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="state"
									control={control}
									defaultValue={
										predegreeData?.personalInfo?.state
									}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Choose state"
											searchable={true}
											id="state"
											options={allStates}
											onChange={onStateChange}
											isError={!!errors.state}
											errorText={
												errors.state &&
												errors.state.message
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
									<label htmlFor="lga">LGA Of Origin</label>
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
								<label htmlFor="lga">LGA Of Origin</label>
							</div>
							<div className="col-lg-9">
								<Controller
									name="lga"
									control={control}
									defaultValue={
										predegreeData?.personalInfo?.lga
									}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											placeholder="Choose Local Government"
											searchable={true}
											id="lga"
											options={allLGAs}
											isError={!!errors.lga}
											errorText={
												errors.lga && errors.lga.message
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
				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="religionId">Religion</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="religionId"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="religionId"
										placeholder="Choose a religion"
										name="religionId"
										options={allReligions}
										searchable={false}
										isError={!!errors.religionId}
										errorText={
											errors.religionId &&
											errors.religionId.message
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
							<label htmlFor="mobileNo">Phone Number</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								className="w-100"
								placeholder="Enter phone number"
								type="text"
								id="mobileNo"
								name="mobileNo"
								register={register}
								required
								error={errors.mobileNo}
								errorText={
									errors.mobileNo && errors.mobileNo.message
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
				<div className="border-top border-bottom px-4 py-3 jumbotron-header jumbo-header">
					<span>Next of Kin / Parent Details</span>
				</div>
				<div className="container-fluid px-4 mt-4 mb-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="sponsorFullName">Fullname</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="sponsorFullName"
								autoComplete="off"
								placeholder="Enter next of kin's full name"
								className="w-100"
								type="text"
								name="sponsorFullName"
								register={register}
								error={errors.sponsorFullName}
								errorText={
									errors.sponsorFullName &&
									errors.sponsorFullName.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3">
							<label htmlFor="sponsorAddress">Address</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="sponsorAddress"
								autoComplete="off"
								placeholder="Enter next of kin's address"
								className="w-100"
								inputType="textarea"
								name="sponsorAddress"
								register={register}
								error={errors.sponsorAddress}
								errorText={
									errors.sponsorAddress &&
									errors.sponsorAddress.message
								}
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
								id="sponsorMobileNo"
								className="w-100"
								placeholder="Enter next of kin's phone number"
								type="text"
								name="sponsorMobileNo"
								register={register}
								error={errors.sponsorMobileNo}
								errorText={
									errors.sponsorMobileNo &&
									errors.sponsorMobileNo.message
								}
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 mt-4 mb-5">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="sponsorRelationship">
								Relationship
							</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="sponsorRelationship"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										placeholder="Choose relationship"
										options={relationships}
										searchable={false}
										id="sponsorRelationship"
										isError={!!errors.sponsorRelationship}
										errorText={
											errors.sponsorRelationship &&
											errors.sponsorRelationship.message
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
