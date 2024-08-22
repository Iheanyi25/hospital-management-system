import { useHistory, useLocation } from "react-router";

import {
	Jumbotron,
	Button,
	Note,
	SignatureUpload
} from "../../../../ui_elements";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useApiPost } from "../../../../api/apiCall";

import { useDispatch, useSelector } from "react-redux";
import { CLEAR_APPLICATION_DATA } from "../../../../store/constant";

import { UploadCertificateSchema } from "../directEntrySchema";

import formatImageToBase64 from "../../../../utils/formatImage";
import { directEntryUploadCertificateUrl } from "../../../../api/urls";
import {
	checkIfFilesAreTooBig,
	checkIfImagesAreCorrectType
} from "../../../../utils/FileValidation";

export const UploadCertificate = () => {
	const directEntry = useSelector((state) => state.directEntryData);
	const { uploadCertificate } = directEntry;


	const dispatch = useDispatch();
	const { replace } = useHistory();
	const { state } = useLocation();

	if (!state) {
		replace("/direct_entry_login");
	}

	const { mutate, isLoading: isFormLoading } = useApiPost();

	const {
		handleSubmit,
		getValues,
		setValue,
		trigger,
		formState: { errors }
	} = useForm({
		defaultValues: {
			...uploadCertificate
		},
		resolver: yupResolver(UploadCertificateSchema)
	});

	const handleFileUpload = async (e) => {
		if (!checkIfFilesAreTooBig(e.target.files)) {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body: "File too Large."
			});
			setTimeout(() => {
				errorFlag.close();
			}, 3000);
			return;
		} else if (!checkIfImagesAreCorrectType(e.target.files)) {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body: "Invalid file type. Try again"
			});
			setTimeout(() => {
				errorFlag.close();
			}, 3000);
			return;
		}
		try {
			setValue(
				e?.target?.name,
				await formatImageToBase64(e?.target?.files[0])
			);
			trigger(e?.target?.name);
		} catch (error) {
			throw error;
		}
	};

	const onSubmit = (uploadCertificate) => {
		const requestBody = {
			url: directEntryUploadCertificateUrl(),
			data: {
				ApplicantId: directEntry.Id,
				BirthCertificate: uploadCertificate.birthCertificate,
				LGAIdentification: uploadCertificate.lgaIdentification,
				Testimonials: uploadCertificate.testimonials,
				FirstSchoolLeavingCertificate:
					uploadCertificate.firstSchoolLeaving,
				ONDHNDStatementOfResult:
					uploadCertificate.ondHndStatementOfResult,
				OLevelResult1: uploadCertificate.olevelResult
			}
		};
		mutate(requestBody, {
			onSuccess: (data) => {
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Successfully uploaded certificate(s)",
					body: "That would be all!!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
				dispatch({
					type: CLEAR_APPLICATION_DATA
				});
				replace({
					pathname: "/direct_entry_application/preview",
					state: { details: directEntry?.JambRegNumber }
				});
			},
			onError: () => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Failed!",
					body: "Something went wrong"
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
				headerText={<span>Upload Certificate</span>}
				footerContent={
					<Button
						data-cy="sumit_profile"
						label="Next"
						buttonClass="primary"
						type="submit"
						loading={isFormLoading}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="p-4">
					<Note
						blueVariant
						paragraph={`NB: All Scanned Certificates must be in JPG, BMP or JPEG file format. Any vague/unclear 
						 document you upload could lead to your disqualification. All documents to upload MUST be less than 100kb`}
					/>
				</div>
				<div className="container-fluid px-4 my-3 mb-5">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor={`birthCertificate`}>
								Birth Certificate
							</label>
						</div>
					</div>
					<SignatureUpload
						name={`birthCertificate`}
						onChange={handleFileUpload}
						currentValue={getValues(`birthCertificate`) ?? ""}
						errorText={
							errors?.birthCertificate &&
							errors?.birthCertificate?.message
						}
					/>
				</div>
				<div className="container-fluid px-4 my-3 mb-5">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor={`lgaIdentification`}>
								LGA Identification
							</label>
						</div>
					</div>
					<SignatureUpload
						name={`lgaIdentification`}
						onChange={handleFileUpload}
						currentValue={getValues(`lgaIdentification`) ?? ""}
						errorText={
							errors?.lgaIdentification &&
							errors?.lgaIdentification?.message
						}
					/>
				</div>
				<div className="container-fluid px-4 my-3 mb-5">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor={`testimonials`}>Testimonials</label>
						</div>
					</div>
					<SignatureUpload
						name={`testimonials`}
						onChange={handleFileUpload}
						currentValue={getValues(`testimonials`) ?? ""}
						errorText={
							errors?.testimonials &&
							errors?.testimonials?.message
						}
					/>
				</div>
				<div className="container-fluid px-4 my-3 mb-5">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor={`firstSchoolLeaving`}>
								First School Leaving Certificate (Optional)
							</label>
						</div>
					</div>
					<SignatureUpload
						name={`firstSchoolLeaving`}
						onChange={handleFileUpload}
						currentValue={getValues(`firstSchoolLeaving`) ?? ""}
						errorText={
							errors?.firstSchoolLeaving &&
							errors?.firstSchoolLeaving?.message
						}
					/>
				</div>
				<div className="container-fluid px-4 my-3 mb-5">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor={`ondHndStatementOfResult`}>
								OND/HND Statement of Result
							</label>
						</div>
					</div>
					<SignatureUpload
						name={`ondHndStatementOfResult`}
						onChange={handleFileUpload}
						currentValue={
							getValues(`ondHndStatementOfResult`) ?? ""
						}
						errorText={
							errors?.ondHndStatementOfResult &&
							errors?.ondHndStatementOfResult?.message
						}
					/>
				</div>
				<div className="container-fluid px-4 my-3 mb-5">
					<div className="row">
						<div className="col-lg-3 d-flex align-items-center">
							<label htmlFor={`olevelResult`}>
								O-level result
							</label>
						</div>
					</div>
					<SignatureUpload
						name={`olevelResult`}
						onChange={handleFileUpload}
						currentValue={getValues(`olevelResult`) ?? ""}
						errorText={
							errors?.olevelResult &&
							errors?.olevelResult?.message
						}
					/>
				</div>
			</Jumbotron>
		</form>
	);
};
