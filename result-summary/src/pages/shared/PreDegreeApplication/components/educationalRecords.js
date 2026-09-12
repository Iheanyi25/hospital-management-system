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
import { educationalRecordsSchema } from "../predegreeSchema";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_PRE_DEGREE_INFO } from "../../../../store/constant";
import { PostPrimaryInstitutions } from "./postPrimaryInstitutions";
import { useEffect } from "react";
import { useApiPost } from "../../../../api/apiCall";
import { updatePredegreeEducationFormUrl } from "../../../../api/urls";

const initialObj = {
	schoolName: "",
	yearFrom: "",
	yearTo: "",
	certificate: ""
};

export const EducationalRecords = () => {
	const predegreeData = useSelector((state) => state.predegreeData);
	const { education, applicantId } = predegreeData;
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
		defaultValues: { education },
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
	const onSubmit = async (values) => {
		const { education } = values;

		const data = {
			applicantId,
			education: formatEducationHistory(education)
		};
		const requestBody = {
			url: updatePredegreeEducationFormUrl(3),
			data
		};
		mutate(requestBody, {
			onSuccess: () => {
				dispatch({
					type: SAVE_PRE_DEGREE_INFO,
					payload: { ...predegreeData, education }
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
		if (!education || !education.length) {
			dispatch({
				type: SAVE_PRE_DEGREE_INFO,
				payload: { ...predegreeData, education: [0] }
			});
		}
	}, [education, predegreeData, dispatch]);
	const handleAddAnother = () => {
		setValue("education", [...getValues().education, initialObj]);
		dispatch(
			{
				type: SAVE_PRE_DEGREE_INFO,
				payload: {
					...predegreeData,
					education: [...education, initialObj]
				}
			},
			2000
		);
	};
	const handleRemoveItem = (targetElement) => {
		dispatch({
			type: SAVE_PRE_DEGREE_INFO,
			payload: {
				...predegreeData,
				education: education.filter(
					(_, index) => index !== targetElement
				)
			}
		});
		Object.keys(initialObj).forEach((item) =>
			setValue(`education.${targetElement}.${item}`, "")
		);
		setValue(
			"education",
			getValues().education.filter((_, index) => index !== targetElement)
		);
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={
					<span>
						D: Educational Records Including Institutions Attended
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
				{education?.map((_, index) => (
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
							education?.length > 0 ? "" : "border-top"
						} d-flex justify-content-end pt-2`}
					>
						<SecondaryLink
							label="Add another "
							onClick={handleAddAnother}
						/>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};
