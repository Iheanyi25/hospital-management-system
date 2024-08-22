import styles from "../style.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
	Button,
	SignatureUpload as FileUpload,
	TextField
} from "../../../../../../ui_elements";
import {
	checkIfFilesAreCorrectType,
	checkIfFilesAreTooBig
} from "../../../../../../utils/FileValidation";
import { downloadFeesSampleUrl } from "../../../../../../api/urls";
import { useApiBlob } from "../../../../../../api/apiCall";

const schema = yup.object().shape({
	teneceCommission: yup
		.string()
		.required("please input tenece commission")
		.test(
			"Is positive?",
			"number must be a valid positive number!",
			(value) => value >= 0
		),
	kSmartCommission: yup
		.string()
		.required("please input kSmart commission")
		.test(
			"Is positive?",
			"number must be a valid positive number!",
			(value) => value >= 0
		),
	hubblyCommission: yup
		.string()
		.required("please input hubbly commission")
		.test(
			"Is positive?",
			"number must be a valid positive number!",
			(value) => value >= 0
		),
	seamfixCommission: yup
		.string()
		.required("please input seamfix commission")
		.test(
			"Is positive?",
			"number must be a valid positive number!",
			(value) => value >= 0
		),
	feesSheet: yup
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

export const FeesUpload = ({ setUploaded, setFileData, allAdmissionTypes }) => {
	const [downloadFile, setDownloadFile] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch
	} = useForm({ resolver: yupResolver(schema) });

	const onSubmit = (data) => {
		console.log(data, "data");
		setUploaded(true);
		setFileData({
			teneceCommission: data?.teneceCommission,
			kSmartCommission: data?.kSmartCommission,
			hubblyCommission: data?.hubblyCommission,
			seamfixCommission: data?.seamfixCommission,
			file: data.feesSheet[0]
		});
	};
	const fileFieldValue = watch("feesSheet");

	const {
		data: file,
		isLoading: fileLoading,
		error: fileError
	} = useApiBlob(downloadFeesSampleUrl(), {
		enabled: downloadFile,
		refetchOnWindowFocus: false
	});
	const downloadXLSFile = useCallback(async () => {
		setDownloadFile(true);
		if (fileError || !file?.data) {
			const errorFlag = window.AJS.flag({
				type: "error",
				title: `Failed To Download `,
				body: `Couldn't download template`
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		} else {
			const outputFilename = `Bulk Fees Upload Template.xlsx`;
			// file file actions.
			const url = URL.createObjectURL(new Blob([file.data]));
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
			setDownloadFile(false);
		}
	}, [file, fileError]);
	useEffect(() => {
		if (file && downloadFile) {
			downloadXLSFile();
		}
	}, [file, downloadFile, downloadXLSFile]);
	return (
		<form
			className={`${styles.form_content} w-100 mt-3`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="admission_batch"
						className={styles.admission_list_edit_label}
					>
						Tenece Commission
					</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="teneceCommission"
						placeholder="Enter commission"
						type="text"
						name="teneceCommission"
						register={register}
						error={errors.teneceCommission}
						errorText={
							errors.teneceCommission &&
							errors.teneceCommission.message
						}
						required
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="admission_batch"
						className={styles.admission_list_edit_label}
					>
						KSmart Commission
					</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="kSmartCommission"
						placeholder="Enter commission"
						type="text"
						name="kSmartCommission"
						register={register}
						error={errors.kSmartCommission}
						errorText={
							errors.kSmartCommission &&
							errors.kSmartCommission.message
						}
						required
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="admission_batch"
						className={styles.admission_list_edit_label}
					>
						Hubbly Commission
					</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="hubblyCommission"
						placeholder="Enter commission"
						type="text"
						name="hubblyCommission"
						register={register}
						error={errors.hubblyCommission}
						errorText={
							errors.hubblyCommission &&
							errors.hubblyCommission.message
						}
						required
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="admission_batch"
						className={styles.admission_list_edit_label}
					>
						Seamfix Commission
					</label>
				</div>
				<div className="col-lg-9">
					<TextField
						id="seamfixCommission"
						placeholder="Enter commission"
						type="text"
						name="seamfixCommission"
						register={register}
						error={errors.seamfixCommission}
						errorText={
							errors.seamfixCommission &&
							errors.seamfixCommission.message
						}
						required
					/>
				</div>
			</div>
			<FileUpload
				name="feesSheet"
				register={register}
				required={true}
				errorText={errors?.feesSheet?.message}
				fileName={fileFieldValue && fileFieldValue[0]?.name}
			/>
			<div className="d-flex justify-content-end  mt-4">
				<Button
					data-cy="upload_fees"
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
		</form>
	);
};
