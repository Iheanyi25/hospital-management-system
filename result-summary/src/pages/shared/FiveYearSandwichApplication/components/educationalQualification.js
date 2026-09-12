import React from "react";
import { useForm } from "react-hook-form";
import { Button, Jumbotron } from "../../../../ui_elements";
import { yupResolver } from "@hookform/resolvers/yup";
import { educationalQualificationSchema } from "../fiveYearSandwichSchema";
import { ACEDiploma } from "./aceDiploma";
import { TcCertificate } from "./tcCertificate";
import { useDispatch, useSelector } from "react-redux";
import { storeFiveYearSandwichApplicationEducationQualificationDetailsUrl } from "../../../../api/urls";
import { useApiPost } from "../../../../api/apiCall";
import { useLocation, useHistory } from "react-router";
import { SAVE_FIVE_YEAR_SANDWICH_APPLICATION } from "../../../../store/constant";
import { CertificateTypeIds } from "../../../../utils/constants";

const EducationalQualification = ({
	allYears,
	oLevelGrades,
	oLevelSubjects
}) => {
	const fiveYearSandwichState = useSelector(
		(state) => state.fiveYearSandwichData
	);
	const { applicantId, aCEDiplomaQualifications, tcCertificate } =
		fiveYearSandwichState;
	const { mutate, isLoading } = useApiPost();
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

	const {
		handleSubmit,
		setValue,
		control,
		register,
		getValues,
		formState: { errors }
	} = useForm({
		defaultValues: {
			aCEDiplomaQualifications: aCEDiplomaQualifications,
			tcCertificate
		},
		resolver: yupResolver(educationalQualificationSchema)
	});

	const formatACEDiplomaQualifications = (aceData) => {
		return aceData.map((x) => ({
			subjectId: x?.subjectId?.value,
			gradeId: x?.gradeId?.value,
			year: x?.year?.value,
			certificateId: CertificateTypeIds.ACE
		}));
	};

	const formatTcCertificate = (tcData) => {
		return tcData.map((x) => ({
			subjectId: x?.subjectId?.value,
			gradeId: x?.gradeId?.value,
			year: x?.year?.value,
			examNo: x?.examNo,
			certificateId: CertificateTypeIds.TC
		}));
	};

	const formatEducationQualification = (data) => {
		return {
			aCEDiplomaQualifications: formatACEDiplomaQualifications(
				data?.aCEDiplomaQualifications
			),
			tcCertificate: formatTcCertificate(data?.tcCertificate)
		};
	};

	const onSubmit = async (values) => {
		const data = {
			ApplicantId: applicantId,
			...formatEducationQualification(values)
		};
		const requestBody = {
			url: storeFiveYearSandwichApplicationEducationQualificationDetailsUrl(),
			data
		};
		mutate(requestBody, {
			onSuccess: () => {
				dispatch({
					type: SAVE_FIVE_YEAR_SANDWICH_APPLICATION,
					payload: {
						...fiveYearSandwichState,
						aCEDiplomaQualifications,
						tcCertificate
					}
				});
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Application details updated.",
					body: "Your educational qualifications details have been successfully updated."
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
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={<span>Educational Qualifications</span>}
				footerContent={
					<Button
						data-cy="submit_personal"
						label="Submit"
						buttonClass="primary"
						type="submit"
						loading={isLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<ACEDiploma
					setValue={setValue}
					getValues={getValues}
					errors={errors}
					control={control}
					allYears={allYears}
					oLevelGrades={oLevelGrades}
					oLevelSubjects={oLevelSubjects}
				/>
				<TcCertificate
					setValue={setValue}
					getValues={getValues}
					errors={errors}
					control={control}
					register={register}
					allYears={allYears}
					oLevelGrades={oLevelGrades}
					oLevelSubjects={oLevelSubjects}
				/>
			</Jumbotron>
		</form>
	);
};

export default EducationalQualification;
