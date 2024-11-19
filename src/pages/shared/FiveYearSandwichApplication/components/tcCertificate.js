import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_FIVE_YEAR_SANDWICH_APPLICATION } from "../../../../store/constant";
import styles from "../style.module.css";
import { SecondaryLink } from "../../../../ui_elements";
import { TcForm } from "./tcForm";

const initialObj = {
	subjectId: null,
	examNo: "",
	gradeId: null,
	year: null
};

export const TcCertificate = ({
	allYears,
	oLevelGrades,
	oLevelSubjects,
	setValue,
	getValues,
	errors,
	register,
	control
}) => {
	const fiveYearSandwichState = useSelector(
		(state) => state.fiveYearSandwichData
	);

	const { tcCertificate } = fiveYearSandwichState;

	const dispatch = useDispatch();

	const arrayHolder = {
		tcCertificate
	};

	useEffect(() => {
		if (!tcCertificate || !tcCertificate.length) {
			dispatch({
				type: SAVE_FIVE_YEAR_SANDWICH_APPLICATION,
				payload: {
					...fiveYearSandwichState,
					tcCertificate: [0]
				}
			});
		}
	}, [tcCertificate, fiveYearSandwichState, dispatch]);

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
				tcCertificate: tcCertificate.filter(
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
				(iii) Details of T.T.C II Certificate
			</div>
			<div className="container-fluid my-4">
				<p className={styles.welcome_text}>
					Please list all subjects *
				</p>
			</div>
			{tcCertificate?.map((_, index) => (
				<TcForm
					index={index}
					errors={errors}
					control={control}
					register={register}
					oLevelGrades={oLevelGrades}
					allYears={allYears}
					oLevelSubjects={oLevelSubjects}
					handleRemoveItem={handleRemoveItem}
					key={index}
				/>
			))}
			<div className="container-fluid px-4 my-4">
				<div
					className={`${
						tcCertificate?.length > 0 ? "" : "border-top"
					} d-flex justify-content-end pt-2`}
				>
					<SecondaryLink
						label="Add another"
						onClick={() => handleAddAnother("tcCertificate")}
					/>
				</div>
			</div>
		</>
	);
};
