import { useState, useMemo, useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { useApiGet, useApiPut } from "../../../../api/apiCall";
import { yupResolver } from "@hookform/resolvers/yup";
import { personalDetailsSchema } from "../directEntrySchema";
import { useSelector } from "react-redux";
import { PersonalDetailsForm } from "./personalDetailsForm";
import { getAllLGAsUrl, getAllStatesUrl } from "../../../../api/urls";
import { formatSelectItems } from "../../../../utils/formatSelectItems";

export const PersonalDetails = ({
	allGenders,
	religions,
	relationships,
	departments,
	bloodGroups,
	genotypes,
	allCountries
}) => {
	const directEntry = useSelector((state) => state.directEntryData);

	const { basicInformation } = useSelector(
		(state) => state.directEntryData
	);

	const { isPassportValid } = useSelector((state) => state.directEntryData);
	const { mutate, isLoading: isFormLoading } = useApiPut();

	const { replace } = useHistory();
	const { state } = useLocation();
	const [countryValue, setCountryValue] = useState(
		directEntry?.CountryId?.value
	);
	const [stateValue, setStateValue] = useState(directEntry?.StateId?.value);

	const { data: statesData, isFetching: loadingStates } = useApiGet(
		getAllStatesUrl(countryValue),
		{
			enabled: !!countryValue,
			refetchOnWindowFocus: false
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

	const {
		register,
		control,
		handleSubmit,
		setValue,
		watch,
		clearErrors,
		formState: { errors }
	} = useForm({
		defaultValues: {
			Surname: basicInformation?.Surname,
			Firstname: basicInformation?.Firstname,
			Middlename: basicInformation?.Middlename,
			GenderId: basicInformation?.GenderId,
			DateofBirth: basicInformation?.DateofBirth?.split("T")[0],
			BloodGroupId: basicInformation?.BloodGroupId,
			GenoTypeId: basicInformation?.GenoTypeId,
			CountryId: basicInformation?.CountryId,
			StateId: basicInformation?.StateId,
			LgaId: basicInformation?.LgaId,
			Town: basicInformation?.Town,
			PermanentAddress: basicInformation?.PermanentAddress,
			MobileNo: basicInformation?.MobileNo,
			Email: basicInformation?.Email,
			Hobby: basicInformation?.Hobby,
			ReligionId: basicInformation?.ReligionId,
			Disability: basicInformation?.Disability === true ? "Yes" : "No",
			CourseId: basicInformation?.CourseId,
			SponsersFullname: basicInformation?.SponsersFullname,
			SponsersEmail: basicInformation?.SponsersEmail,
			SponsersAddress: basicInformation?.SponsersAddress,
			SponsersMobileNo: basicInformation?.SponsersMobileNo,
			SponsersRelationship: basicInformation?.SponsersRelationship
		},
		resolver: yupResolver(personalDetailsSchema),
		context: {
			isLGARequired: lgaData?.data?.length > 0 ? true : false
		}
	});
	const watchData = watch({
		country: "CountryId",
		endDate: "endDate",
		Disability: "Disability",
		middleName: "Middlename"
	});

	// useEffect(() => {
	// 	setValue("StateId", directEntry?.StateId);
	// }, [setValue, allStateData, directEntry?.StateId]);

	// useEffect(() => {
	// 	setValue("LgaId", directEntry?.LgaId);
	// }, [setValue, directEntry?.LgaId, allLGA]);

	useEffect(() => {
		const subscription = watch(({ CountryId, StateId }) => {
			setCountryValue(CountryId?.value);
			setStateValue(StateId?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	const onCountryChange = (value) => {
		setCountryValue(value.value);
		setValue("CountryId", value);
		setValue("StateId", null);
		setValue("LgaId", null);
		clearErrors("CountryId");
	};

	const onStateChange = (value) => {
		setStateValue(value.value);
		setValue("StateId", value);
		setValue("LgaId", null);
		clearErrors("StateId");
	};

	return (
		<PersonalDetailsForm
			replace={replace}
			state={state}
			register={register}
			errors={errors}
			control={control}
			handleSubmit={handleSubmit}
			isPassportValid={isPassportValid}
			mutate={mutate}
			isFormLoading={isFormLoading}
			allGenders={allGenders}
			bloodGroups={bloodGroups}
			genotypes={genotypes}
			countries={allCountries}
			states={allStateData}
			localGovernments={allLGA}
			religions={religions}
			watchData={watchData}
			departments={departments}
			relationships={relationships}
			loadingStates={loadingStates}
			loadingLga={loadingLga}
			onCountryChange={onCountryChange}
			onStateChange={onStateChange}
		/>
	);
};
