import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useApiGet } from "../../../../api/apiCall";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAllLGAsUrl, getAllStatesUrl } from "../../../../api/urls";
import { formatSelectItems } from "../../../../utils/formatSelectItems";
import { PersonalInformationSchema } from "../profileSchema";
import { useSelector } from "react-redux";
import { PersonalInformationForm } from "./personalInformationForm";

export const PersonalInformation = ({
	allCountries,
	allBloodGroups,
	allGenders,
	allReligions,
	allGenotypes
}) => {
	const { PersonalData } = useSelector((state) => state.studentData);
	const [countryState, setCountryState] = useState(
		PersonalData?.CountryId?.value
	);
	const [stateFieldState, setStateFieldState] = useState(
		PersonalData?.StateId?.value
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
		setValue,
		clearErrors,
		watch,
		formState: { errors }
	} = useForm({
		defaultValues: {
			Firstname: PersonalData?.Firstname,
			Middlename: PersonalData?.Middlename,
			Surname: PersonalData?.Surname,
			Gender: PersonalData?.Gender,
			DateOfBirth: PersonalData?.DateOfBirth,
			CountryId: PersonalData?.CountryId,
			StateId: PersonalData?.StateId,
			LgaId: PersonalData?.LgaId,
			Religion: PersonalData?.Religion,
			MobileNo: PersonalData?.MobileNo,
			Email: PersonalData?.Email,
			ContactAddress: PersonalData?.ContactAddress,
			HomeTown: PersonalData?.HomeTown,
			PermanentAddress: PersonalData?.PermanentAddress,
			BloodGroup: PersonalData?.BloodGroup,
			GenoType: PersonalData?.GenoType
		},
		resolver: yupResolver(PersonalInformationSchema),
		context: {
			isStateRequired: allStates?.length > 0 ? true : false,
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

	return (
		<PersonalInformationForm
			handleSubmit={handleSubmit}
			errors={errors}
			control={control}
			register={register}
			isLoadingStates={isLoadingStates}
			isLoadingLGAs={isLoadingLGAs}
			allStates={allStates}
			allLGAs={allLGAs}
			onCountryChange={onCountryChange}
			onStateChange={onStateChange}
			allGenders={allGenders}
			allReligions={allReligions}
			allBloodGroups={allBloodGroups}
			allGenotypes={allGenotypes}
			allCountries={allCountries}
		/>
	);
};
