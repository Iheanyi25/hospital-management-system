import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../../../api/apiCall";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllLGAsUrl, getAllStatesUrl } from "../../../../../../api/urls";
import { PersonalInformationSchema } from "../profileSchema";
import { findValueAndLabel } from "../../../../../../utils/findValueAndLabel";
import { useEffect, useMemo, useState } from "react";
import { formatSelectItems } from "../../../../../../utils/formatSelectItems";
import { PersonalInformationForm } from "./personalInformationForm";
import { formatDateFromAPI } from "../../../../../../utils/formatDate";

export const PersonalInformation = ({
	data,
	allBloodGroups,
	allGenotypes,
	allReligions,
	allCountries,
	allGenders,
	refCode
}) => {
	const [countryState, setCountryState] = useState(data?.countryId);
	const [stateFieldState, setStateFieldState] = useState(data?.stateId);
	const { data: states, isFetching: isLoadingStates } = useApiGet(
		getAllStatesUrl(countryState),
		{
			refetchOnWindowFocus: false
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
		setValue,
		watch,
		clearErrors,
		formState: { errors }
	} = useForm({
		defaultValues: {
			Firstname: data?.firstname,
			Middlename: data?.middlename,
			Lastname: data?.lastname,
			GenderId: findValueAndLabel(data?.genderId, allGenders),
			DateOfBirth: formatDateFromAPI(data?.dateOfBirth),
			CountryId: findValueAndLabel(data?.countryId, allCountries),
			ReligionId: findValueAndLabel(data?.religionId, allReligions),
			MobileNumber: data?.mobileNumber.replaceAll("-", ""),
			Email: data?.email,
			ContactAddress: data?.contactAddress,
			HomeTown: data?.homeTown,
			PermanentAddress: data?.permanentAddress,
			BloodGroupId: findValueAndLabel(data?.bloodGroupId, allBloodGroups),
			GenoTypeId: findValueAndLabel(data?.genoType, allGenotypes, "label")
		},
		resolver: yupResolver(PersonalInformationSchema),
		context: {
			isLGARequired: allLGAs?.length > 0 ? true : false
		}
	});
	useEffect(() => {
		const subscription = watch(({ CountryId, StateId }) => {
			setCountryState(CountryId?.value);
			setStateFieldState(StateId?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch]);
	const onCountryChange = (value) => {
		setCountryState(value.value);
		setValue("CountryId", value);
		setValue("StateId", null);
		setValue("LgaId", null);
		clearErrors("CountryId");
	};

	const onStateChange = (value) => {
		setStateFieldState(value.value);
		setValue("StateId", value);
		setValue("LgaId", null);
		clearErrors("StateId");
	};

	return (
		<PersonalInformationForm
			data={data}
			refCode={refCode}
			handleSubmit={handleSubmit}
			errors={errors}
			control={control}
			register={register}
			isLoadingStates={isLoadingStates}
			isLoadingLGAs={isLoadingLGAs}
			allBloodGroups={allBloodGroups}
			allStates={allStates}
			allLGAs={allLGAs}
			onCountryChange={onCountryChange}
			onStateChange={onStateChange}
			allGenotypes={allGenotypes}
			allReligions={allReligions}
			allCountries={allCountries}
			allGenders={allGenders}
		/>
	);
};
