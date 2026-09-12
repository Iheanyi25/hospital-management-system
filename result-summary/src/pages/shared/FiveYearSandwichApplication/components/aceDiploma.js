import React from "react";
import { DiplomaForm } from "./diplomaForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_FIVE_YEAR_SANDWICH_APPLICATION } from "../../../../store/constant";
import styles from "../style.module.css";
import { SecondaryLink } from "../../../../ui_elements";

const initialObj = {
	gradeId: null,
	year: null,
	subjectId: null
};

export const ACEDiploma = ({
	allYears,
	oLevelGrades,
	oLevelSubjects,
	setValue,
	getValues,
	errors,
	control
}) => {
	const fiveYearSandwichState = useSelector(
		(state) => state.fiveYearSandwichData
	);

	const { aCEDiplomaQualifications } = fiveYearSandwichState;

	const dispatch = useDispatch();

	const arrayHolder = {
		aCEDiplomaQualifications
	};

	useEffect(() => {
		if (!aCEDiplomaQualifications || !aCEDiplomaQualifications.length) {
			dispatch({
				type: SAVE_FIVE_YEAR_SANDWICH_APPLICATION,
				payload: {
					...fiveYearSandwichState,
					aCEDiplomaQualifications: [0]
				}
			});
		}
	}, [aCEDiplomaQualifications, fiveYearSandwichState, dispatch]);

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
				aCEDiplomaQualifications: aCEDiplomaQualifications.filter(
					(_, index) => index !== targetElement
				)
			}
		});
		setValue(
			key,
			getValues()[key].filter((_, index) => index !== targetElement)
		);
	};
	return (
		<>
			<div className="border-top border-bottom px-4 py-3 mt-5 jumbotron-header jumbo-header">
				(ii) Details of AICE Diploma Qualification
			</div>
			<div className="container-fluid my-4">
				<p className={styles.welcome_text}>
					Please list all certifications obtained *{" "}
				</p>
			</div>
			{aCEDiplomaQualifications?.map((_, index) => (
				<DiplomaForm
					index={index}
					errors={errors}
					control={control}
					oLevelSubjects={oLevelSubjects}
					oLevelGrades={oLevelGrades}
					allYears={allYears}
					handleRemoveItem={handleRemoveItem}
					key={index}
				/>
			))}
			<div className="container-fluid px-4 my-4">
				<div
					className={`${
						aCEDiplomaQualifications?.length > 0 ? "" : "border-top"
					} d-flex justify-content-end pt-2`}
				>
					<SecondaryLink
						label="Add another"
						onClick={() =>
							handleAddAnother("aCEDiplomaQualifications")
						}
					/>
				</div>
			</div>
		</>
	);
};
