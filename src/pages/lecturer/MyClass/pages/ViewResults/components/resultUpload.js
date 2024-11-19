import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
	Jumbotron,
	Button,
	SignatureUpload as FileUpload
} from "../../../../../../ui_elements";
import {
	checkIfFilesAreCorrectType,
	checkIfFilesAreTooBig
} from "../../../../../../utils/FileValidation";

const schema = yup.object().shape({
	resultSheet: yup
		.mixed()
		.test("required", "Please select an excel file!", (value) => {
			return value && value.length;
		})
		.test(
			"is-correct-file",
			"The file you selected is too big!",
			checkIfFilesAreTooBig
		)
		.test(
			"is-big-file",
			"Wrong file type, ensure this an excel file!",
			checkIfFilesAreCorrectType
		)
});

const ResultUpload = ({
	setUploaded,
	setFileData,
	setDownloadFile,
	fileLoading
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch
	} = useForm({ resolver: yupResolver(schema) });
	const onSubmit = (data) => {
		setUploaded(true);
		setFileData(data.resultSheet[0]);
	};

	const handleDownloadBrochure = (e) => {
		e.preventDefault();
		setDownloadFile(true);
	};

	const fileFieldValue = watch("resultSheet");
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Jumbotron
				headerContainer={
					<div className="d-flex justify-content-between">
						<label>Upload Result</label>
					</div>
				}
				footerContent={
					<>
						<Button
							data-cy="upload"
							label="Upload Result"
							buttonClass="primary"
							type="submit"
						/>
						<Button
							data-cy="download_sheet"
							label="Download Scoresheet"
							buttonClass="standard"
							onClick={handleDownloadBrochure}
							loading={fileLoading}
						/>
					</>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 mt-3 mb-3">
					<p>
						Download the scoresheet by clicking the button below.
						Fill in the results of your students and upload.{" "}
					</p>
					<div>
						<FileUpload
							name="resultSheet"
							register={register}
							required={true}
							errorText={errors?.resultSheet?.message}
							fileName={fileFieldValue && fileFieldValue[0]?.name}
						/>
					</div>
				</div>
			</Jumbotron>
		</form>
	);
};

export default ResultUpload;
