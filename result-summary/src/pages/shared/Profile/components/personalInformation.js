import {
	Jumbotron,
	Button,
	TextField,
	RadioButtons,
	SMSelect,
	Spinner
} from "../../../../ui_elements";
// import { useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { useApiEdit, useApiGet } from "../../../../api/apiCall";
import {
	getAllLGAsUrl,
	getAllStatesUrl,
	getUserProfileUrl,
	updateStaffProfileUrl
} from "../../../../api/urls";
import { useQueryClient } from "react-query";
import { trimItem } from "../../../../utils/trimItem";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	formatDateFromAPI,
	formatInputDate
} from "../../../../utils/formatDate";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { useEffect, useMemo, useState } from "react";
import { findValueAndLabel } from "../../../../utils/findValueAndLabel";
import { personalInformationSchema } from "./schema";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const PersonalInformation = ({
	data,
	allCountries,
	allReligions,
	allMaritalStatus,
	allTitles
}) => {
	const { replace } = useHistory();
	const { mutate, isLoading } = useApiEdit();
	const queryClient = useQueryClient();
	const [isLga, setIsLga] = useState(false);
	const [isMarried, setIsMarried] = useState(false);
	const {
		control,
		register,
		handleSubmit,
		watch,
		setValue,
		clearErrors,
		formState: { errors }
	} = useForm({
		defaultValues: {
			TitleId: findValueAndLabel(data?.titleId, allTitles),
			DateOfBirth: formatDateFromAPI(data?.birthday),
			MaritalStatusId: findValueAndLabel(
				data?.maritalStatusId,
				allMaritalStatus
			),
			NameOfSpouse: data?.spouseName,
			NumberOfChildren: data?.numberOfChildren,
			IsSpouseAStaff: {
				value: data?.isSpouseAStaffId,
				label: data?.isSpouseAStaff
			},
			ReligionId: { value: data?.religionId, label: data?.religion },
			CountryId: { value: data?.countryId, label: data?.country },
			StateId: { value: data?.stateId, label: data?.state },
			LgaId: { value: data?.lgaId, label: data?.lga },
			PermanentAddress: data?.permanentAddress,
			ContactAddress: data?.contactAddress
		},
		resolver: yupResolver(personalInformationSchema),
		context: {
			isLGARequired: isLga,
			isMarriedRequired: isMarried
		}
	});

	const watchData = watch({
		CountryId: "CountryId",
		StateId: "StateId",
		LgaId: "LgaId",
		MaritalStatusId: "MaritalStatusId"
	});

	const [countryValue, setCountryValue] = useState(
		watchData?.CountryId?.value
	);
	const [stateValue, setStateValue] = useState(watchData?.StateId?.value);
	const { data: statesData, isFetching: loadingStates } = useApiGet(
		getAllStatesUrl(countryValue),
		{
			refetchOnWindowFocus: false,
			enabled: !!countryValue
		}
	);

	const { data: lgaData, isFetching: loadingLga } = useApiGet(
		getAllLGAsUrl({ stateId: stateValue, countryId: countryValue }),
		{
			enabled: !!(stateValue && countryValue),
			refetchOnWindowFocus: false
		}
	);

	const allStateData = useMemo(
		() => formatSelectItems(statesData?.data, "name", "id"),
		[statesData?.data]
	);

	const allLGA = useMemo(
		() => formatSelectItems(lgaData?.data, "name", "id"),
		[lgaData?.data]
	);

	useEffect(() => {
		const subscription = watch(({ CountryId, StateId }) => {
			setCountryValue(CountryId?.value);
			setStateValue(StateId?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	useEffect(() => {
		lgaData?.data?.length > 0 ? setIsLga(true) : setIsLga(false);
	}, [lgaData]);

	useEffect(() => {
		watchData?.MaritalStatusId?.value === 2
			? setIsMarried(true)
			: setIsMarried(false);
	}, [watchData?.MaritalStatusId?.value]);

	const onCountryChange = (value) => {
		setValue("CountryId", value);
		setValue("StateId", null);
		setValue("LgaId", null);
		clearErrors("CountryId");
	};

	const onStateChange = (value) => {
		setValue("StateId", value);
		setValue("LgaId", null);
		clearErrors("StateId");
	};

	const onMaritalStatusChange = (value) => {
		setValue("MaritalStatusId", value);
		setValue("NameOfSpouse", null);
		setValue("NumberOfChildren", null);
		setValue("IsSpouseAStaff", null);
		clearErrors("MaritalStatusId");
	};

	const onSubmit = (values) => {
		const requestData = [];
		const {
			TitleId,
			MaritalStatusId,
			ReligionId,
			CountryId,
			StateId,
			LgaId,
			NameOfSpouse,
			NumberOfChildren,
			IsSpouseAStaff,
			DateOfBirth,
			...editedValues
		} = values;
		const newObj = {
			...editedValues,
			TitleId: TitleId.value,
			MaritalStatusId: MaritalStatusId.value,
			ReligionId: ReligionId.value,
			CountryId: CountryId.value,
			StateId: StateId.value,
			Birthday: DateOfBirth,
			...(lgaData?.data?.length > 0 && { LgaId: LgaId?.value }),
			...(watchData?.MaritalStatusId?.value === 2 && {
				SpouseName: NameOfSpouse,
				NumberOfChildren: NumberOfChildren,
				IsSpouseAStaffId: IsSpouseAStaff.value
			})
		};
		Object.keys(newObj).map((item) =>
			requestData.push({
				op: "replace",
				path: `/${item}`,
				value: trimItem(newObj[item])
			})
		);
		const requestBody = {
			url: updateStaffProfileUrl(),
			data: requestData
		};
		mutate(requestBody, {
			onSuccess: () => {
				queryClient.invalidateQueries(getUserProfileUrl());
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Profile details updated.",
					body: "Your profile details has been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace("#section_b");
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
				headerText="Update your profile"
				footerContent={
					<Button
						data-cy="save"
						label="Save & Continue"
						buttonClass="primary"
						type="submit"
						loading={isLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="staffNo.">Staff No *</label>
						</div>
						<div className="col-lg-9">
							<TextField
								autoComplete="off"
								placeholder="Enter staff No."
								className="w-100"
								name="StaffNo"
								value={data?.staffNumber}
								disabled
							/>
						</div>
					</div>
				</div>

				<div className="container-fluid px-4 my-4">
					<div className="row">
						<div className="col-lg-3  d-flex align-items-center">
							<label htmlFor="title">Title</label>
						</div>
						<div className="col-lg-9">
							<Controller
								name="TitleId"
								control={control}
								render={({ field }) => (
									<SMSelect
										{...field}
										id="TitleId"
										placeholder="Choose a title"
										name="TitleId"
										options={allTitles}
										searchable={false}
										isError={!!errors.TitleId}
										errorText={
											errors.TitleId &&
											errors.TitleId.message
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
							<span className="font-weight-bold">Full Name</span>
						</div>
						<div className="col-lg-9">
							<div className="row">
								<div className="col-12 col-md-4 mb-4 mb-md-0">
									<TextField
										autoComplete="off"
										placeholder="First Name"
										className="w-100 pr-2"
										name="Firstname"
										value={data?.firstName}
										disabled
									/>
								</div>
								<div className="col-12 col-md-4 mb-4 mb-md-0">
									<TextField
										autoComplete="off"
										placeholder="Middle Name"
										className="w-100 px-2"
										name="MiddleName"
										value={data?.middlename}
										disabled
									/>
								</div>
								<div className="col-12 col-md-4 mb-4 mb-md-0">
									<TextField
										autoComplete="off"
										placeholder="Last Name"
										className="w-100"
										name="Surname"
										value={data?.lastName}
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
							<label>Gender</label>
						</div>
						<div className="col-lg-9" name="gender">
							<RadioButtons
								label="Female"
								value="Female"
								name="gender"
								checked={data?.gender === "Female"}
								disabled
							/>
							<RadioButtons
								label="Male"
								value="Male"
								name="gender"
								checked={data?.gender === "Male"}
								disabled
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
							<label htmlFor="maritalStatusId">
								Marital Status
							</label>
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
										onChange={onMaritalStatusChange}
										options={allMaritalStatus}
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
				{watchData.MaritalStatusId?.value === 2 && (
					<>
						<div className="container-fluid px-4 my-3">
							<div className="row">
								<div className="col-lg-3">
									<label htmlFor="nameOfSpouse">
										Name of Spouse*
									</label>
								</div>
								<div className="col-lg-9">
									<TextField
										autoComplete="off"
										placeholder="Enter name of spouse"
										className="w-100"
										id="NameOfSpouse"
										name="NameOfSpouse"
										register={register}
										required
										error={errors.NameOfSpouse}
										errorText={
											errors.NameOfSpouse &&
											errors.NameOfSpouse.message
										}
									/>
								</div>
							</div>
						</div>
						<div className="container-fluid px-4 my-3">
							<div className="row">
								<div className="col-lg-3">
									<label htmlFor="noOfChildren">
										No. of Children Below Age 25 *
									</label>
								</div>
								<div className="col-lg-9">
									<TextField
										autoComplete="off"
										placeholder="Enter no. of children below age 25 *"
										className="w-100"
										id="NumberOfChildren"
										name="NumberOfChildren"
										register={register}
										required
										error={errors.NumberOfChildren}
										errorText={
											errors.NumberOfChildren &&
											errors.NumberOfChildren.message
										}
									/>
								</div>
							</div>
						</div>
						<div className="container-fluid px-4 my-4">
							<div className="row">
								<div className="col-lg-3  d-flex align-items-center">
									<label htmlFor="isSpouseAStaff">
										Is Spouse a Staff? *
									</label>
								</div>
								<div className="col-lg-9">
									<Controller
										name="IsSpouseAStaff"
										control={control}
										render={({ field }) => (
											<SMSelect
												{...field}
												id="IsSpouseAStaff"
												placeholder="Choose a marital status"
												name="IsSpouseAStaff"
												options={[
													{
														value: "1",
														label: "Yes"
													},
													{ value: "2", label: "No" }
												]}
												searchable={false}
												isError={
													!!errors.IsSpouseAStaff
												}
												errorText={
													errors.IsSpouseAStaff &&
													errors.IsSpouseAStaff
														.message
												}
											/>
										)}
									/>
								</div>
							</div>
						</div>
					</>
				)}
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
										watchData?.StateId?.value
											? findValueAndLabel(
													watchData?.StateId?.value,
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
										watchData?.LgaId?.value
											? findValueAndLabel(
													watchData?.LgaId?.value,
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
							<label htmlFor="email">Email Address</label>
						</div>
						<div className="col-lg-9">
							<TextField
								id="email"
								autoComplete="off"
								placeholder="example@examplemail.com"
								className="w-100"
								type="email"
								name="email"
								value={data?.email}
								disabled
							/>
						</div>
					</div>
				</div>
				<div className="container-fluid px-4 my-3">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor="mobile_no">Phone Number</label>
						</div>
						<div className="d-flex col-lg-9">
							<TextField
								// id="mobile_no"
								className="w-100"
								placeholder="Enter phone number"
								disabled
								type="text"
								value={data?.mobileNumber}
								// name="MobileNo"
								// register={register}
								// error={errors.MobileNo}
								// errorText={
								// 	errors.MobileNo && errors.MobileNo.message
								// }
								required
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
			</Jumbotron>
		</form>
	);
};
