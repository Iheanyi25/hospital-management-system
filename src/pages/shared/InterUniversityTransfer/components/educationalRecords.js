import { Jumbotron, Button, SecondaryLink } from "../../../../ui_elements";
import styles from "../style.module.css";
import { useLocation, useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { educationalRecordsSchema } from "../uniTransferSchema";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_UNI_TRANSFER_INFO } from "../../../../store/constant";
import { PostPrimaryInstitutions } from "./postPrimaryInstitutions";
import { useEffect } from "react";
import { useApiPost } from "../../../../api/apiCall";
import { updateTransferApplicationEducationHistoryDetailsUrl } from "../../../../api/urls";

const initialObj = {
	educationalRecords: {
		school: "",
		countryId: "",
		yearFrom: "",
		yearTo: "",
		certificate: ""
	}
};

export const EducationalRecords = ({ allCountries }) => {
	const uniTransferData = useSelector((state) => state.uniTransferData);
	const { educationalRecords, applicantId } = uniTransferData;
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
		clearErrors,
		control,
		formState: { errors }
	} = useForm({
		defaultValues: { educationalRecords },
		resolver: yupResolver(educationalRecordsSchema)
	});
	const arrayHolder = {
		educationalRecords
	};
	const formatEducationHistory = (histories) => {
		const data = [];
		histories.forEach((item) => {
			const newObj = { ...item, countryId: item.countryId.value };
			if (!newObj.id) {
				data.push({
					...newObj,
					id: 0
				});
			} else {
				data.push(newObj);
			}
		});
		return data;
	};

	const onSubmit = async (values) => {
		const { educationalRecords } = values;
		const data = {
			applicantId,
			educationInfo: formatEducationHistory(educationalRecords)
		};
		const requestBody = {
			url: updateTransferApplicationEducationHistoryDetailsUrl(),
			data
		};
		mutate(requestBody, {
			onSuccess: () => {
				dispatch({
					type: SAVE_UNI_TRANSFER_INFO,
					payload: {
						...uniTransferData,
						educationHistory: educationalRecords
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
				replace({ hash: "#section_f", state });
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
				type: SAVE_UNI_TRANSFER_INFO,
				payload: { ...uniTransferData, educationalRecords: [0] }
			});
		}
	}, [educationalRecords, uniTransferData, dispatch]);

	const handleAddAnother = (key) => {
		dispatch({
			type: SAVE_UNI_TRANSFER_INFO,
			payload: {
				...uniTransferData,
				[key]: [...arrayHolder[key], initialObj[key]]
			}
		});
		setValue(key, [...getValues()[key], initialObj[key]]);
	};

	const handleRemoveItem = (targetElement, key) => {
		dispatch({
			type: SAVE_UNI_TRANSFER_INFO,
			payload: {
				...uniTransferData,
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

	const onCountryChange = (value, index) => {
		setValue(`educationalRecords.${index}.countryId`, value);
		clearErrors(`educationalRecords.${index}.countryId`);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={
					<span>
						Educational Records (Including Post Primary) Attended
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
						register={register}
						watch={watch}
						onCountryChange={onCountryChange}
						control={control}
						allCountries={allCountries}
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
