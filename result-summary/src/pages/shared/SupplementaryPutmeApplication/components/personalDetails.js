import { useState, useMemo, useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { useApiGet, useApiPost } from "../../../../api/apiCall";
import { yupResolver } from "@hookform/resolvers/yup";
import { personalDetailsSchema } from "../supplementaryPutmeSchema";
import { useSelector } from "react-redux";
import { PersonalDetailsForm } from "./personalDetailsForm";
import { getAllLGAsUrl, getAllStatesUrl } from "../../../../api/urls";
import { formatSelectItems } from "../../../../utils/formatSelectItems";

export const PersonalDetails = ({ allGenders, allCountries }) => {
	const supplementaryPutme = useSelector(
		(state) => state.supplementaryPutmeData
	);

	const { personalInfoResponse } = useSelector(
		(state) => state.supplementaryPutmeData
	);

	const { isPassportValid } = useSelector(
		(state) => state.supplementaryPutmeData
	);
	const { mutate, isLoading: isFormLoading } = useApiPost();

	const { replace } = useHistory();
	const { state } = useLocation();

	if (!state) {
		replace("/supplementary_putme_login");
	}

	const [countryValue, setCountryValue] = useState(
		supplementaryPutme?.personalInfoResponse?.CountryId?.value
	);
	const [stateValue, setStateValue] = useState(
		supplementaryPutme?.personalInfoResponse?.StateId?.value
	);

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
			Surname: personalInfoResponse?.Surname,
			Firstname: personalInfoResponse?.Firstname,
			Middlename: personalInfoResponse?.Middlename,
			GenderId: personalInfoResponse?.GenderId,
			DateofBirth: personalInfoResponse?.DateofBirth,
			BloodGroupId: personalInfoResponse?.BloodGroupId,
			GenoTypeId: personalInfoResponse?.GenoTypeId,
			CountryId: personalInfoResponse?.CountryId,
			StateId: personalInfoResponse?.StateId,
			LgaId: personalInfoResponse?.LgaId,
			Town: personalInfoResponse?.Town,
			PermanentAddress: personalInfoResponse?.PermanentAddress,
			MobileNo: personalInfoResponse?.MobileNo,
			Email: personalInfoResponse?.Email,
			Hobby: personalInfoResponse?.Hobby,
			ReligionId: personalInfoResponse?.ReligionId,
			Disability:
				personalInfoResponse?.Disability === true ? "Yes" : "No",
			CourseId: personalInfoResponse?.CourseId,
			SponsersFullname: personalInfoResponse?.SponsersFullname,
			SponsersEmail: personalInfoResponse?.SponsersEmail,
			SponsersAddress: personalInfoResponse?.SponsersAddress,
			SponsersMobileNo: personalInfoResponse?.SponsersMobileNo,
			SponsersRelationship: personalInfoResponse?.SponsersRelationship
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
			countries={allCountries}
			states={allStateData}
			localGovernments={allLGA}
			watchData={watchData}
			loadingStates={loadingStates}
			loadingLga={loadingLga}
			onCountryChange={onCountryChange}
			onStateChange={onStateChange}
		/>
	);
};
