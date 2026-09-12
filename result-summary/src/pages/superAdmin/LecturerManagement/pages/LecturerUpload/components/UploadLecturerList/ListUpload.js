import styles from "../../../../../AdmissionList/style.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {
	Button,
	SignatureUpload as FileUpload,
	SMSelect,
	Spinner
} from "../../../../../../../ui_elements";
import {
	checkIfFilesAreCorrectType,
	checkIfFilesAreTooBig
} from "../../../../../../../utils/FileValidation";
import {
	downloadLecturerListTemplateUrl,
	getDepartmentsUrl
} from "../../../../../../../api/urls";
import { useApiBlob, useApiGet } from "../../../../../../../api/apiCall";
import { formatSelectItems } from "../../../../../../../utils/formatSelectItems";

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
		),
	departmentId: yup.mixed().required("please select department"),
	studentTypeId: yup.mixed().required("please select student type")
});

export const ListUpload = ({
	setUploaded,
	allStudentTypes,
	setDepartmentId,
	studentTypeIdState,
	setStudentTypeIdState,
	setFileData
}) => {
	const [downloadFile, setDownloadFile] = useState(false);

	const {
		register,
		handleSubmit,
		control,
		setValue,
		clearErrors,
		formState: { errors },
		watch
	} = useForm({ resolver: yupResolver(schema) });

	const { data: departments, isLoading: isDepartmentLoading } = useApiGet(
		getDepartmentsUrl(studentTypeIdState),
		{
			enabled: !!studentTypeIdState,
			refetchOnWindowFocus: false
		}
	);

	const onSubmit = (data) => {
		setUploaded(true);
		setDepartmentId(data.departmentId.value);
		setFileData(data.resultSheet[0]);
	};
	const fileFieldValue = watch("resultSheet");

	const {
		data: file,
		isLoading: fileLoading,
		error: fileError
	} = useApiBlob(downloadLecturerListTemplateUrl(), {
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
			const outputFilename = `LecturerListSample.xlsx`;
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
	useEffect(() => {
		const subscription = watch(({ studentTypeId }) => {
			setStudentTypeIdState(studentTypeId?.value);
		});
		return () => subscription.unsubscribe();
	}, [watch, setStudentTypeIdState]);

	const onStudentTpeChange = (value) => {
		setStudentTypeIdState(value.value);
		setValue("studentTypeId", value);
		setValue("departmentId", null);
		clearErrors("studentTypeId");
	};
	const allDepartments = formatSelectItems(
		departments?.data,
		"department",
		"departmentId"
	);
	return (
		<form
			className={`${styles.form_content} w-100 mt-3`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label
						htmlFor="studentTypeId"
						className={styles.admission_list_edit_label}
					>
						Student Type
					</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="studentTypeId"
						control={control}
						render={({ field }) => (
							<SMSelect
								{...field}
								placeholder="Select student type"
								searchable={true}
								id="studentTypeId"
								onChange={onStudentTpeChange}
								options={allStudentTypes}
								isError={!!errors.studentTypeId}
								errorText={
									errors.studentTypeId &&
									errors.studentTypeId.message
								}
							/>
						)}
					/>
				</div>
			</div>
			{isDepartmentLoading && (
				<>
					<div className="container-fluid px-4 my-4">
						<div className="row">
							<div className="col-lg-3  d-flex align-items-center">
								<label htmlFor="departmentId">Department</label>
							</div>
							<div className="col-lg-9">
								<Spinner />
							</div>
						</div>
					</div>
				</>
			)}
			{allDepartments?.length > 0 && (
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label
							htmlFor="admission_batch"
							className={styles.admission_list_edit_label}
						>
							Department
						</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name="departmentId"
							control={control}
							render={({ field }) => (
								<SMSelect
									placeholder="Select department"
									searchable={true}
									id="admission_batch"
									{...field}
									options={allDepartments}
									isError={!!errors.departmentId}
									errorText={
										errors.departmentId &&
										errors.departmentId.message
									}
								/>
							)}
						/>
					</div>
				</div>
			)}
			<FileUpload
				name="resultSheet"
				register={register}
				required={true}
				errorText={errors?.resultSheet?.message}
				fileName={fileFieldValue && fileFieldValue[0]?.name}
			/>
			<div className="d-flex justify-content-end  mt-4">
				<Button
					data-cy="upload_result"
					label="Upload List"
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
