import styles from "../style.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
	Button,
	Checkbox,
	SignatureUpload as FileUpload
} from "../../../../../../../ui_elements";
import {
	checkIfFilesAreCorrectType,
	checkIfFilesAreTooBig
} from "../../../../../../../utils/FileValidation";
import { downloadCBTScoresheetUrl } from "../../../../../../../api/urls";
import { useApiBlob } from "../../../../../../../api/apiCall";

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

export const CourseUpload = ({
	setUploaded,
	setFileData,
	currentFilterState,
	setFilter
}) => {
	const [downloadFile, setDownloadFile] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue
	} = useForm({ resolver: yupResolver(schema) });
	const onSubmit = (data) => {
		setUploaded(true);
		setFileData(data.resultSheet[0]);
	};
	const fileFieldValue = watch("resultSheet");

	const handleCheckBoxClick = () => {
		const newValue = !currentFilterState?.hasCA;

		setFilter((state) => ({
			...state,
			hasCA: newValue
		}));

		setValue("HasCA", newValue);
	};

	const { isLoading: fileLoading } = useApiBlob(
		downloadCBTScoresheetUrl({
			sessionId: currentFilterState?.sessionId,
			courseId: currentFilterState?.courseId,
			semesterId: currentFilterState?.semesterId,
			hasCA: currentFilterState?.hasCA
		}),
		{
			enabled: downloadFile,
			refetchOnWindowFocus: false,
			onError: (error) => {
				const textDecoder = new TextDecoder("utf-8");
				const errorMessage = JSON.parse(
					textDecoder.decode(error?.response?.data)
				)?.message;
				const errorFlag = window.AJS.flag({
					type: "error",
					title: `Failed To Download `,
					body: errorMessage || `Couldn't download template`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 5000);
			},
			onSuccess: (data) => {
				const outputFilename = `Bulk Courses Upload Template.xlsx`;
				// file file actions.
				const url = URL.createObjectURL(new Blob([data.data]));
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", outputFilename);
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Template download successful"
				});
				setTimeout(() => {
					successFlag.close();
				}, 5000);
			},
			onSettled: () => {
				setDownloadFile(false);
			}
		}
	);

	return (
		<form
			className={`${styles.form_content} w-100 mt-3`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<FileUpload
				name="resultSheet"
				register={register}
				required={true}
				errorText={errors?.resultSheet?.message}
				fileName={fileFieldValue && fileFieldValue[0]?.name}
			/>
			<div className={"d-flex mt-4 align-items-center"}>
				<div className="container-fluid px-3 my-4">
					<div className="row">
						<div className="col-lg-9">
							<Checkbox
								label="Has CA?"
								labelClassName="ml-3"
								id={`HasCA`}
								checked={currentFilterState?.hasCA}
								onSelect={() => handleCheckBoxClick()}
							/>
						</div>
					</div>
				</div>
				<div className="d-flex justify-content-end flex-shrink-0">
					<Button
						data-cy="upload_result"
						label="Upload"
						buttonClass="primary"
						type="submit"
					/>
					<Button
						data-cy="download_excel_temp"
						label="Download excel template"
						buttonClass="standard"
						type="button"
						onClick={() => setDownloadFile(true)}
						loading={fileLoading}
					/>
				</div>
			</div>
		</form>
	);
};
