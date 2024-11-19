import {
	Jumbotron,
	Button,
	SecondaryLink,
	Checkbox
} from "../../../../ui_elements";
import styles from "../style.module.css";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { employmentHistorySchema } from "../fourYearSandwichSchema";
import { useDispatch, useSelector } from "react-redux";
import {
	CLEAR_APPLICATION_DATA,
	SAVE_FOUR_YEAR_SANDWICH_APPLICATION
} from "../../../../store/constant";
import { useEffect, useState } from "react";
import { EmploymentInstitutions } from "./employmentInstitutions";
import { useApiPost } from "../../../../api/apiCall";
import { storeFourYearSandwichApplicationEmploymentDetailsUrl } from "../../../../api/urls";

const DECLARATION_STYLE = Object.freeze({
	backgroundColor: "#deebff",
	padding: "10px 0px"
});

const initialObj = {
	employmentPlaces: {
		employer: "",
		yearFrom: "",
		yearTo: "",
		reasonForLeaving: "",
		jobDescription: "",
		currentlyWorkingHere: false
	}
};

export const EmploymentHistory = () => {
	const [declaration, setDeclaration] = useState(false);
	const fourYearSandwichState = useSelector(
		(state) => state.fourYearSandwichData
	);
	const { basicInformation, workHistory, applicantId } =
		fourYearSandwichState;
	const dispatch = useDispatch();
	const { mutate, isLoading } = useApiPost();
	const { replace } = useHistory();
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		getValues,
		clearErrors,
		formState: { errors }
	} = useForm({
		defaultValues: {
			workHistory
		},
		resolver: yupResolver(employmentHistorySchema)
	});
	const onSubmit = async (values) => {
		const { workHistory: valueToBeChanged } = values;
		const workHistory = valueToBeChanged[0].employer
			? valueToBeChanged
			: [];
		const data = {
			applicantId,
			employmentInfo: workHistory
		};
		const requestBody = {
			url: storeFourYearSandwichApplicationEmploymentDetailsUrl(),
			data
		};
		mutate(requestBody, {
			onSuccess: () => {
				dispatch({
					type: CLEAR_APPLICATION_DATA
				});
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Application details updated.",
					body: "That would be all!!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				replace({
					pathname: "/four_year_sandwich_application_details",
					state: {
						rrr: basicInformation.rrr,
						fromReprintLogin: true
					}
				});
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
				type: SAVE_FOUR_YEAR_SANDWICH_APPLICATION,
				payload: {
					...fourYearSandwichState,
					workHistory: [0]
				}
			});
		}
	}, [workHistory, fourYearSandwichState, dispatch]);

	const handleAddAnother = () => {
		dispatch({
			type: SAVE_FOUR_YEAR_SANDWICH_APPLICATION,
			payload: {
				...fourYearSandwichState,
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
			type: SAVE_FOUR_YEAR_SANDWICH_APPLICATION,
			payload: {
				...fourYearSandwichState,
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
				headerText={<span>Employment History (If any)</span>}
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
						setValue={setValue}
						clearErrors={clearErrors}
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
				<div className="mt-2 mb-3 px-4">
					<h3 className="mb-3">Declaration</h3>
					<div style={DECLARATION_STYLE}>
						<Checkbox
							id="declaration"
							label="I hereby declare that the information given on this form, to the best of my knowledge and belief,is complete and accurate. I am aware that withholding information or giving false informationautomatically disqualifies me from admission. If admitted into this University, I shall regard myselfby its statues, ordinances and regulations in so far as they affect me."
							labelClassName="ml-4 font-weight-normal"
							checked={declaration}
							value={declaration}
							onSelect={() => setDeclaration(!declaration)}
							required
						/>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
