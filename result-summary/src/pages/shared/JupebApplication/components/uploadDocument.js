import { useState, useRef, useEffect } from "react";
import { useHistory, useLocation } from "react-router";

import {
	Jumbotron,
	Button,
	Note,
	SignatureUpload,
	Checkbox,
	BlueContainer,
	SecondaryLink
} from "../../../../ui_elements";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { UploadDocumentSchema } from "../jupebApplicationSchema";
import { JUPEP_APPLICATIONS } from "../../../../store/constant";
import { uploadDocumentsUrl } from "../../../../api/urls";
import { useSelector, useDispatch } from "react-redux";
import { useApiPost } from "../../../../api/apiCall";
import formatImageToBase64 from "../../../../utils/formatImage";

export const UploadDocument = () => {
	const [fileToUpload, setFileToUpload] = useState();
	const [fileToUpload1, setFileToUpload1] = useState();
	const [fileToUpload2, setFileToUpload2] = useState();
	const [ticked, setTicked] = useState(false);
	const jupebData = useSelector((state) => state.jupebData);
	const { RRR, Id } = useSelector((state) => state.jupebData);
	const dispatch = useDispatch();
	const { replace } = useHistory();
	const picture1Ref = useRef();
	const picture2Ref = useRef();
	const picture3Ref = useRef();
	const { state } = useLocation();

	const { mutate, isLoading: isFormLoading } = useApiPost();

	const {
		handleSubmit,
		setValue,
		register,
		watch,
		formState: { errors }
	} = useForm({
		defaultValues: {
			// certificates: uploadCertificate?.certificates?.map(
			// 	(certificate) => ({
			// 		certificateType: {
			// 			value: certificate?.certificateType?.value,
			// 			label: certificate?.certificateType?.label
			// 		},
			// 		certificateData: certificate?.certificateData
			// 	})
			// )
		},
		resolver: yupResolver(UploadDocumentSchema)
	});

	const onSubmit = async (uploadedDocument) => {
		if (ticked) {
			const requestBody = {
				url: uploadDocumentsUrl(Id),
				data: {
					BirthCertificate: await formatImageToBase64(
						uploadedDocument.Birthcertificate[0]
					),
					OLevelResult: await formatImageToBase64(
						uploadedDocument.OLevelResult[0]
					),
					Signature: await formatImageToBase64(
						uploadedDocument.Signature[0]
					)
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
						type: JUPEP_APPLICATIONS,
						payload: {
							...jupebData,
							uploadedDocument
						}
					});
					replace({
						pathname: "/sub_degree_application/preview",
						state: { details: RRR }
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
		} else {
			const successFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body: "Tick the checkbox to continue"
			});
			setTimeout(() => {
				successFlag.close();
			}, 5000);
		}
	};

	// useEffect(() => {
	// 	if (Object.values(errors)?.length > 0) {
	// 		const successFlag = window.AJS.flag({
	// 			type: "error",
	// 			title: "Failed!",
	// 			body: "Upload the following forms below"
	// 		});
	// 		setTimeout(() => {
	// 			successFlag.close();
	// 		}, 5000);
	// 	}
	// }, [errors]);
	useEffect(() => {
		const subscription = watch(
			({ Birthcertificate, OLevelResult, Signature }) => {
				setFileToUpload(Birthcertificate);
				setFileToUpload1(OLevelResult);
				setFileToUpload2(Signature);
			}
		);
		return () => subscription.unsubscribe();
	}, [watch]);
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerText={<span>Upload Document</span>}
				footerContent={
					<>
						<Button
							label="Previous"
							buttonClass="standard"
							onClick={() => ({ hash: "#section_c", state })}
						/>
						<Button
							data-cy="sumit_profile"
							label="Next"
							buttonClass="primary"
							type="submit"
							loading={isFormLoading}
						/>
					</>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="p-4">
					<Note
						blueVariant
						paragraph={`All Scanned Document must be in JPG, PNG or JPEG file format, all documents to be uploaded must be less than 100kb.`}
					/>
				</div>
				<div className="container-fluid px-4 my-3 mb-5">
					<div className="row">
						<div className="col-lg-6 d-flex align-items-center">
							<label>Birth certificate</label>
						</div>
						{fileToUpload?.length > 0 && (
							<div className="col-lg-6 d-flex justify-content-end align-items-center">
								<SecondaryLink
									label="Remove"
									type="button"
									linkType="danger-link"
									onClick={() =>
										setValue("Birthcertificate", "")
									}
								/>
							</div>
						)}
					</div>
					<SignatureUpload
						name={`Birthcertificate`}
						register={register}
						currentValue={fileToUpload?.[0]}
						parentRef={picture1Ref}
						// fileName={fileToUpload?.name}
						errorText={
							errors?.Birthcertificate &&
							errors?.Birthcertificate?.message
						}
					/>
				</div>
				<div className="container-fluid px-4 my-3 mb-5">
					<div className="row">
						<div className="col-lg-6 d-flex align-items-center">
							<label>O’Level Result</label>
						</div>
						{fileToUpload1?.length > 0 && (
							<div className="col-lg-6 d-flex justify-content-end align-items-center">
								<SecondaryLink
									label="Remove"
									type="button"
									linkType="danger-link"
									onClick={() => setValue("OLevelResult", "")}
								/>
							</div>
						)}
					</div>
					<SignatureUpload
						name={`OLevelResult`}
						currentValue={fileToUpload1?.[0]}
						register={register}
						// fileName={fileToUpload1?.name}
						parentRef={picture2Ref}
						errorText={
							errors?.OLevelResult &&
							errors?.OLevelResult?.message
						}
					/>
				</div>
				<div className="container-fluid px-4 my-3 mb-5">
					<div className="row">
						<div className="col-lg-6 d-flex align-items-center">
							<label>Signature</label>
						</div>
						{fileToUpload2?.length > 0 && (
							<div className="col-lg-6 d-flex justify-content-end align-items-center">
								<SecondaryLink
									label="Remove"
									type="button"
									linkType="danger-link"
									onClick={() => setValue("Signature", "")}
								/>
							</div>
						)}
					</div>
					<SignatureUpload
						name={`Signature`}
						currentValue={fileToUpload2?.[0]}
						register={register}
						parentRef={picture3Ref}
						// fileName={fileToUpload2?.name}
						errorText={
							errors?.Signature && errors?.Signature?.message
						}
					/>
				</div>
				<div className="p-4">
					<h5>Declaration</h5>
					<BlueContainer>
						<div className="d-flex gap-3">
							<div>
								<Checkbox
									label=""
									id="Declaration"
									onSelect={() => setTicked(!ticked)}
									checked={ticked}
								/>
							</div>
							<p>
								I certify that all the information given in this
								form is to the best of my knowledge and belief,
								correct. Any false or incomplete information
								given in this form will automatically disqualify
								me from being considered for admission to, or
								continuing with any Course of Study in the
								University. I shall accept as final the decision
								of the Board with regret to my Course(s) of
								study and placement in the University.
							</p>
						</div>
					</BlueContainer>
				</div>
			</Jumbotron>
		</form>
	);
};
