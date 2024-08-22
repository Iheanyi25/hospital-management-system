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
import { useDispatch, useSelector } from "react-redux";
import { SAVE_FIVE_YEAR_SANDWICH_APPLICATION } from "../../../../store/constant";
import { PostPrimaryInstitutions } from "./postPrimaryInstitutions";
import { useEffect } from "react";
import { educationalHistorySchema } from "../fiveYearSandwichSchema";
import { useApiGet, useApiPost } from "../../../../api/apiCall";
import {
	getAllCountriesUrl,
	storeFiveYearSandwichApplicationEducationHistoryDetailsUrl
} from "../../../../api/urls";
import { formatSelectItems } from "../../../../utils/formatSelectItems";

const initialObj = {
	schoolName: "",
	countryId: "",
	yearFrom: "",
	yearTo: "",
	certificate: ""
};

export const EducationHistory = () => {
	const fiveYearSandwichState = useSelector(
		(state) => state.fiveYearSandwichData
	);
	const { educationHistory, applicantId } = fiveYearSandwichState;
	const dispatch = useDispatch();
	const { mutate, isLoading } = useApiPost();
	const { replace } = useHistory();
	const { state } = useLocation();
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		control,
		getValues,
		formState: { errors }
	} = useForm({
		defaultValues: { educationHistory },
		resolver: yupResolver(educationalHistorySchema)
	});

	const {
		data: countries,
		isLoadingCountries,
		countryError
	} = useApiGet(getAllCountriesUrl(), {
		refetchOnWindowFocus: false
	});

	const allCountries = formatSelectItems(countries?.data, "name", "id");

	const arrayHolder = {
		educationHistory
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

	const onSubmit = async (values) => {
		const { educationHistory } = values;
		const data = {
			ApplicantId: applicantId,
			EducationInfo: formatEducationHistory(educationHistory)
		};
		const requestBody = {
			url: storeFiveYearSandwichApplicationEducationHistoryDetailsUrl(),
			data
		};
		mutate(requestBody, {
			onSuccess: () => {
				dispatch({
					type: SAVE_FIVE_YEAR_SANDWICH_APPLICATION,
					payload: {
						...fiveYearSandwichState,
						educationHistory
					}
				});
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Application details updated.",
					body: "Your educational records details have been successfully updated."
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
		if (!educationHistory || !educationHistory.length) {
			dispatch({
				type: SAVE_FIVE_YEAR_SANDWICH_APPLICATION,
				payload: { ...fiveYearSandwichState, educationHistory: [0] }
			});
		}
	}, [educationHistory, fiveYearSandwichState, dispatch]);

	const handleAddAnother = (key) => {
		dispatch({
			type: SAVE_FIVE_YEAR_SANDWICH_APPLICATION,
			payload: {
				...fiveYearSandwichState,
				[key]: [...arrayHolder[key], { ...initialObj }]
			}
		});
		setValue(key, [...getValues()[key], { ...initialObj }]);
	};

	const handleRemoveItem = (targetElement, key) => {
		dispatch({
			type: SAVE_FIVE_YEAR_SANDWICH_APPLICATION,
			payload: {
				...fiveYearSandwichState,
				educationHistory: educationHistory.filter(
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
				{educationHistory?.map((_, index) => (
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
							educationHistory?.length > 0 ? "" : "border-top"
						} d-flex justify-content-end pt-2`}
					>
						<SecondaryLink
							label="Add another"
							onClick={() => handleAddAnother("educationHistory")}
						/>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
