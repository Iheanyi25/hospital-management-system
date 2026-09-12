import {
	Jumbotron,
	Button,
	CompulsoryIndicator,
	SecondaryLink
} from "../../../../ui_elements";
import styles from "../style.module.css";
import { useLocation, useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { educationalRecordsSchema } from "../centerOfSafetyApplicationSchema";
import { useDispatch, useSelector } from "react-redux";
import { CSPG_APPLICATIONS } from "../../../../store/constant";
import { PostPrimaryInstitutions } from "./postPrimaryInstitutions";
import { useEffect } from "react";
import { Distinctions } from "./distinctions";
import { CSPGAddOrUpdateQualificationUrl } from "../../../../api/urls";
import { useApiPut } from "../../../../api/apiCall";

const initialObj = {
	schoolName: "",
	majorField: "",
	yearFrom: "",
	yearTo: "",
	certificate: ""
};

export const EducationalRecords = () => {
	const CSPGData = useSelector((state) => state.CSPGData);
	const { educationHistory, honours, id } = CSPGData;
	const dispatch = useDispatch();
	const { mutate, isLoading } = useApiPut();
	const { replace } = useHistory();
	const { state } = useLocation();
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		getValues,
		formState: { errors }
	} = useForm({
		defaultValues: { educationHistory, honours },
		resolver: yupResolver(educationalRecordsSchema)
	});

	const formatEducationHistory = (histories) => {
		const data = [];
		histories.forEach((item) => {
			if (!item.id) {
				data.push({
					...item,
					id: 0
				});
			} else {
				data.push(item);
			}
		});
		return data;
	};
	const formatHonours = (honours) => {
		return honours.filter((item) => item.honour);
	};
	const onSubmit = async (values) => {
		const { educationHistory, honours } = values;

		const data = {
			applicationFormId: id,
			educationalRecords: formatEducationHistory(educationHistory),
			honours: formatHonours(honours)
		};
		const requestBody = {
			url:  CSPGAddOrUpdateQualificationUrl(),
			data
		};
		mutate(requestBody, {
			onSuccess: () => {
				dispatch({
					type: CSPG_APPLICATIONS,
					payload: { ...CSPGData, educationHistory, honours }
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
		if (!educationHistory || !educationHistory.length) {
			dispatch({
				type: CSPG_APPLICATIONS,
				payload: { ...CSPGData, educationHistory: [0] }
			});
		}
	}, [educationHistory, CSPGData, dispatch]);

	const handleAddAnother = () => {
		dispatch({
			type: CSPG_APPLICATIONS,
			payload: {
				...CSPGData,
				educationHistory: [...educationHistory, initialObj]
			}
		});
		setValue("educationHistory", [
			...getValues().educationHistory,
			initialObj
		]);
	};
	const handleRemoveItem = (targetElement) => {
		dispatch({
			type: CSPG_APPLICATIONS,
			payload: {
				...CSPGData,
				educationHistory: educationHistory.filter(
					(_, index) => index !== targetElement
				)
			}
		});
		setValue(
			"educationHistory",
			getValues().educationHistory.filter(
				(_, index) => index !== targetElement
			)
		);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={
					<span>
						Academic Qualifications
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
							label="Add another "
							onClick={handleAddAnother}
						/>
					</div>
				</div>
				<div className="border-top border-bottom px-4 py-3 jumbotron-header jumbo-header">
					<span>Higher Qualifications Obtained</span>
				</div>

				{new Array(4).fill(0).map((_, index) => (
					<Distinctions
						index={index}
						key={index}
						register={register}
					/>
				))}
			</Jumbotron>
		</form>
	);
};
