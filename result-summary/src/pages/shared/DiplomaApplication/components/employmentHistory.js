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
import { employmentHistorySchema } from "../diplomaSchema";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_DIPLOMA_INFO } from "../../../../store/constant";
import { useEffect } from "react";
import { EmploymentInstitutions } from "./employmentInstitutions";
import { useApiPost } from "../../../../api/apiCall";
import { setDiplomaApplicationEmploymentHistory } from "../../../../api/urls";

const initialObj = {
	employmentPlaces: {
		employer: "",
		yearFrom: "",
		yearTo: "",
		jobDescription: ""
	}
};

export const EmploymentHistory = ({ setOpen, confirmed, setConfirmed }) => {
	const diplomaState = useSelector((state) => state.diplomaData);
	const { employmentInfo, basicInformation } = diplomaState;
	const { applicantId } = basicInformation;
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
			employmentInfo
		},
		resolver: yupResolver(employmentHistorySchema)
	});

	useEffect(() => {
		setConfirmed(false);
	}, [setConfirmed]);
	const onSubmit = async (values) => {
		if (!confirmed) {
			setOpen(true);
		} else {
			const { employmentInfo: valueToBeChanged } = values;
			const employmentInfo = valueToBeChanged[0].employer
				? valueToBeChanged
				: [];
			const data = {
				applicantId,
				employmentInfo
			};
			const requestBody = {
				url: setDiplomaApplicationEmploymentHistory(),
				data
			};
			mutate(requestBody, {
				onSuccess: () => {
					dispatch({
						type: SAVE_DIPLOMA_INFO,
						payload: {
							...diplomaState,
							employmentInfo
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
					replace({ pathname: "/diploma_preview", state });
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
		}
	};

	useEffect(() => {
		if (!employmentInfo || !employmentInfo.length) {
			dispatch({
				type: SAVE_DIPLOMA_INFO,
				payload: { ...diplomaState, employmentInfo: [0] }
			});
		}
	}, [employmentInfo, diplomaState, dispatch]);

	const handleAddAnother = () => {
		dispatch({
			type: SAVE_DIPLOMA_INFO,
			payload: {
				...diplomaState,
				employmentInfo: [...employmentInfo, initialObj.employmentPlaces]
			}
		});
		setValue("workHistory", [
			...getValues().employmentInfo,
			initialObj.employmentPlaces
		]);
	};

	const handleRemoveItem = (targetElement) => {
		dispatch({
			type: SAVE_DIPLOMA_INFO,
			payload: {
				...diplomaState,
				employmentInfo: employmentInfo.filter(
					(_, index) => index !== targetElement
				)
			}
		});
		setValue(
			"employmentInfo",
			getValues().employmentInfo.filter(
				(_, index) => index !== targetElement
			)
		);
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Jumbotron
					headerText={
						<span>
							Employment History (If any) <CompulsoryIndicator />
						</span>
					}
					footerContent={
						<Button
							data-cy="submit_personal"
							label={!confirmed ? "Confirm" : "Submit"}
							type="submit"
							buttonClass="primary"
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
					{employmentInfo?.map((_, index) => (
						<EmploymentInstitutions
							index={index}
							errors={errors}
							register={register}
							watch={watch}
							handleRemoveItem={handleRemoveItem}
							setValue={setValue}
							key={index}
						/>
					))}
					<div className="container-fluid px-4 my-4">
						<div
							className={`${
								employmentInfo?.length > 0 ? "" : "border-top"
							} d-flex justify-content-end pt-2`}
						>
							<SecondaryLink
								label="Add another "
								onClick={() =>
									handleAddAnother("employmentPlaces")
								}
							/>
						</div>
					</div>
				</Jumbotron>
			</form>
		</>
	);
};
