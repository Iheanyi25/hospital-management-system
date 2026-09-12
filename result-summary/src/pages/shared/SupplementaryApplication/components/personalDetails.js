import { useState, useMemo, useEffect } from "react";
import {
	Jumbotron,
	Button,
	TextField,
	SMSelect,
	Spinner,
} from "../../../../ui_elements";
import { useLocation, useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { useApiGet } from "../../../../api/apiCall";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllLGAsUrl, getAllStatesUrl } from "../../../../api/urls";
import { personalDetailsSchema } from "../supplementarySchema";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { formatInputDate } from "../../../../utils/formatDate";
import { MAXIMUM_AGE, MINIMUM_AGE } from "../../../../utils/constants";
import { useSelector } from 'react-redux';

export const PersonalDetails = () => {
	const supplementaryStoreData = useSelector((state) => state.supplementaryData);
	const { replace } = useHistory();
	const { state } = useLocation();

	if (!state) {
		replace("/supplementary_login");
	}

	const [countryState, setCountryState] = useState(
		supplementaryStoreData?.personalInfo?.country?.value
	);
	const [stateFieldState, setStateFieldState] = useState(
		supplementaryStoreData?.personalInfo?.state?.value
	);
	const [hasDisabilityField, setHasDisabilityField] = useState(
		supplementaryStoreData?.personalInfo?.hasDisability
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

	const {
		register,
		control,
		handleSubmit,
		watch,
		formState: { errors }
	} = useForm({
		defaultValues: {
			firstName: supplementaryStoreData?.personalInfo?.firstName,
			surName: supplementaryStoreData?.personalInfo?.surName,
			middleName: supplementaryStoreData?.personalInfo?.middleName,
			sex: supplementaryStoreData?.personalInfo?.sex,
			dateOfBirth: supplementaryStoreData?.personalInfo?.dateOfBirth,
			country: supplementaryStoreData?.personalInfo?.country,
			state: supplementaryStoreData?.personalInfo?.state,
			lga: supplementaryStoreData?.personalInfo?.lga,
			homeTown: supplementaryStoreData?.personalInfo?.homeTown,
			mobileNo: supplementaryStoreData?.personalInfo?.mobileNo,
			email: supplementaryStoreData?.personalInfo?.email,
			contactAddress:supplementaryStoreData?.personalInfo?.contactAddress
		},
		resolver: yupResolver(personalDetailsSchema),
		context: {
			isDisabilityRequired: hasDisabilityField === "Yes" ? true : false,
			isLGARequired: lgas?.data?.length > 0 ? true : false
		}
	});

	useEffect(() => {
		const subscription = watch(({ country, state, hasDisability }) => {
			setCountryState(country?.value);
			setStateFieldState(state?.value);
			setHasDisabilityField(hasDisability);
		});
		return () => subscription.unsubscribe();
	}, [watch]);
	const onSubmit = () => {
		replace({ hash: "#section_b", state });	
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
										id="sex"
										disabled
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
								disabled
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
										id="country"
										disabled
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
										supplementaryStoreData?.personalInfo?.state
									}
									rules={{ required: true }}
									render={({ field }) => (
										<SMSelect
											{...field}
											id="state"
											disabled
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
										supplementaryStoreData?.personalInfo?.lga
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
											disabled
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
								disabled
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
								disabled
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
								disabled
							/>
						</div>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};