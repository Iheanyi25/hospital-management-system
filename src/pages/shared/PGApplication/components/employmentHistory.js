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
import { employmentHistorySchema } from "../pgSchema";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_PG_INFO } from "../../../../store/constant";
import { useEffect } from "react";
import { EmploymentInstitutions } from "./employmentInstitutions";
import { Referees } from "./referees";
import { useApiPost } from "../../../../api/apiCall";
import { submitPGApplicationStepUrl } from "../../../../api/urls";

const initialObj = {
	employmentPlaces: {
		employer: "",
		description: "",
		yearFrom: "",
		yearTo: ""
	},
	referees: {
		name: "",
		email: "",
		position: "",
		organisation: ""
	}
};

export const EmploymentHistory = () => {
	const pgState = useSelector((state) => state.pgData);
	const { workHistory, referees, pgApplicationFormId } = pgState;
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
		formState: { errors }
	} = useForm({
		defaultValues: {
			workHistory,
			referees
		},
		resolver: yupResolver(employmentHistorySchema)
	});
	const onSubmit = async (values) => {
		const { workHistory, referees } = values;

		const data = {
			pgApplicationFormId,
			workHistory,
			referees
		};
		const requestBody = {
			url: submitPGApplicationStepUrl(4),
			data
		};
		mutate(requestBody, {
			onSuccess: () => {
				dispatch({
					type: SAVE_PG_INFO,
					payload: {
						...pgState,
						workHistory,
						referees
					}
				});
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Application details updated.",
					body: "Your employment history have been successfully updated."
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace({ hash: "#section_e", state });
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
		if (!workHistory || !workHistory.length) {
			dispatch({
				type: SAVE_PG_INFO,
				payload: { ...pgState, workHistory: [0], referees: [0] }
			});
		}
	}, [workHistory, pgState, dispatch]);

	const handleAddAnother = () => {
		dispatch({
			type: SAVE_PG_INFO,
			payload: {
				...pgState,
				workHistory: [...workHistory, initialObj.employmentPlaces]
			}
		});
		setValue("workHistory", [
			...getValues().workHistory,
			initialObj.employmentPlaces
		]);
	};

	const handleRemoveItem = (targetElement) => {
		dispatch({
			type: SAVE_PG_INFO,
			payload: {
				...pgState,
				workHistory: workHistory.filter(
					(_, index) => index !== targetElement
				)
			}
		});
		setValue(
			"workHistory",
			getValues().workHistory.filter(
				(_, index) => index !== targetElement
			)
		);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={
					<span>
						F: Employment History
						<CompulsoryIndicator />
					</span>
				}
				endText="Step 4 of 5"
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
						List Employment Since Leaving
						School/University/Polytechnic
					</p>
				</div>
				{workHistory?.map((_, index) => (
					<EmploymentInstitutions
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
							workHistory?.length > 0 ? "" : "border-top"
						} d-flex justify-content-end pt-2`}
					>
						<SecondaryLink
							label="Add another "
							onClick={() => handleAddAnother("employmentPlaces")}
						/>
					</div>
				</div>
				<div className="border-top border-bottom px-4 py-3 jumbotron-header jumbo-header">
					<span>
						G: Referees
						<CompulsoryIndicator />
					</span>
				</div>
				<div className="container-fluid my-4">
					<p className={styles.welcome_text}>
						Three letters of recommendations are required. Please
						provide the following information on each referee:
					</p>
				</div>
				{new Array(3).fill(0).map((_, index) => (
					<Referees
						index={index}
						errors={errors}
						register={register}
						key={index}
					/>
				))}
			</Jumbotron>
		</form>
	);
};
