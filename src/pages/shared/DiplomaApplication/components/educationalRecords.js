import {
	Jumbotron,
	Button,
	CompulsoryIndicator,
	SecondaryLink,
	Spinner
} from "../../../../ui_elements";
import styles from "../style.module.css";
import { useLocation, useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { educationalRecordsSchema } from "../diplomaSchema";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_DIPLOMA_INFO } from "../../../../store/constant";
import { PostPrimaryInstitutions } from "./postPrimaryInstitutions";
import { useEffect } from "react";
import { useApiPost, useApiGet } from "../../../../api/apiCall";
import { setDiplomaApplicationEducationalRecords } from "../../../../api/urls";
import { getAllCountriesUrl } from "../../../../api/urls";
import { formatSelectItems } from "../../../../utils/formatSelectItems";

const initialObj = {
	educationalRecords: {
		schoolName: "",
		countryId: "",
		yearFrom: "",
		yearTo: "",
		certificate: ""
	}
};

export const EducationalRecords = () => {
	const diplomaState = useSelector((state) => state.diplomaData);
	const { educationalRecords, basicInformation } = diplomaState;
	const dispatch = useDispatch();
	const { mutate, isLoading } = useApiPost();
	const { replace } = useHistory();
	const { state } = useLocation();
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		getValues,
		control,
		formState: { errors }
	} = useForm({
		defaultValues: { educationalRecords },
		resolver: yupResolver(educationalRecordsSchema)
	});

	const {
		data: countries,
		isLoadingCountries,
		countryError
	} = useApiGet(getAllCountriesUrl(), {
		refetchOnWindowFocus: false
	});

	const arrayHolder = {
		educationalRecords
	};
	const formatEducationHistory = (histories) => {
		const data = [];
		histories.forEach((item) => {
			if (!item.id) {
				data.push({
					...item,
					countryId: item.countryId.value
				});
			} else {
				data.push(item);
			}
		});
		return data;
	};

	const allCountries = formatSelectItems(countries?.data, "name", "id");

	const onSubmit = async (values) => {
		const { educationalRecords } = values;
		const data = {
			ApplicantId: basicInformation?.applicantId,
			EducationInfo: formatEducationHistory(educationalRecords)
		};

		const requestBody = {
			url: setDiplomaApplicationEducationalRecords(),
			data
		};
		mutate(requestBody, {
			onSuccess: () => {
				dispatch({
					type: SAVE_DIPLOMA_INFO,
					payload: {
						...diplomaState,
						educationalRecords: educationalRecords
					}
				});
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Application details updated.",
					body: "Your educational records have been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace({ hash: "#section_d", state });
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
	};

	useEffect(() => {
		if (!educationalRecords || !educationalRecords.length) {
			dispatch({
				type: SAVE_DIPLOMA_INFO,
				payload: { ...diplomaState, educationalRecords: [0] }
			});
		}
	}, [educationalRecords, diplomaState, dispatch]);

	const handleAddAnother = (key) => {
		dispatch({
			type: SAVE_DIPLOMA_INFO,
			payload: {
				...diplomaState,
				[key]: [...arrayHolder[key], initialObj[key]]
			}
		});
		setValue(key, [...getValues()[key], initialObj[key]]);
	};

	const handleRemoveItem = (targetElement, key) => {
		dispatch({
			type: SAVE_DIPLOMA_INFO,
			payload: {
				...diplomaState,
				[key]: [arrayHolder[key]].filter(
					(_, index) => index !== targetElement
				)
			}
		});
		setValue(
			key,
			getValues()[key].filter((_, index) => index !== targetElement)
		);
	};

	if (isLoadingCountries) return <Spinner />;
	if (countryError)
		return (
			"An error has occurred: " + countryError?.response?.data?.message
		);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={
					<span>
						Tertiary Institutions and qualifications Obtained
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
				<div className="container-fluid my-4">
					<p className={styles.welcome_text}>
						Please List all Post Primary Institutions Attended: *
					</p>
				</div>
				{educationalRecords?.map((_, index) => (
					<PostPrimaryInstitutions
						index={index}
						errors={errors}
						control={control}
						allCountries={allCountries}
						register={register}
						watch={watch}
						handleRemoveItem={handleRemoveItem}
						key={index}
					/>
				))}
				<div className="container-fluid px-4 my-4">
					<div
						className={`${
							educationalRecords?.length > 0 ? "" : "border-top"
						} d-flex justify-content-end pt-2`}
					>
						<SecondaryLink
							label="Add another"
							onClick={() =>
								handleAddAnother("educationalRecords")
							}
						/>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
