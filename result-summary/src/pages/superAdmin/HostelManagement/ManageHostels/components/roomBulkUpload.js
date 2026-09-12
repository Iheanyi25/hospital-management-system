import styles from "../style.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {
	Button,
	SignatureUpload as FileUpload,
	SMSelect
} from "../../../../../ui_elements";
import {
	checkIfFilesAreCorrectType,
	checkIfFilesAreTooBig
} from "../../../../../utils/FileValidation";
import { downloadHostelRoomSampleUrl } from "../../../../../api/urls";
import { useApiBlob } from "../../../../../api/apiCall";
import { findValueAndLabel } from "../../../../../utils/findValueAndLabel";

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
	genderId: yup.mixed().required("please select a gender"),
	groupSelectionId: yup.mixed().required("please select an option"),
	levelId: yup
		.mixed()
		.when(
			"$isChooseSelectionRquired",
			(isChooseSelectionRquired, schema) => {
				if (isChooseSelectionRquired)
					return schema
						.required("please select a level")
						.test(
							"test department length",
							"select at least 1 level",
							(value) => {
								return value?.length > 0;
							}
						);
				return schema.default(null);
			}
		),
	hostelRoomCategoryId: yup.mixed().required("please select room category")
});

export const RoomBulkUpload = ({
	setUploaded,
	setFileData,
	allGenders,
	allLevels,
	setSubmitData,
	allCategories,
	allActivationStatuses,
	state
}) => {
	const [downloadFile, setDownloadFile] = useState(false);
	const [watchData, setWatchData] = useState({
		groupSelectionId: ""
	});
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		watch
	} = useForm({
		defaultValues: {
			genderId: findValueAndLabel(state?.genderId, allGenders)
		},
		resolver: yupResolver(schema)
	});
	const onSubmit = (data) => {
		setUploaded(true);
		setFileData(data.resultSheet[0]);
		setSubmitData(data);
	};
	useEffect(() => {
		const subscription = watch(({ groupSelectionId }) => {
			setWatchData((state) => ({
				groupSelectionId:
					groupSelectionId?.value ?? state.groupSelectionId
			}));
		});
		return () => subscription.unsubscribe();
	}, [watch]);
	const fileFieldValue = watch("resultSheet");
	const isChooseSelectionRquired =
		watchData.groupSelectionId === 2 || watchData.groupSelectionId === 3;
	const {
		data: file,
		isLoading: fileLoading,
		error: fileError
	} = useApiBlob(downloadHostelRoomSampleUrl(), {
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
			const outputFilename = `Bulk Rooms Upload Template.xlsx`;
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
					<label htmlFor="genderId">Gender</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="genderId"
						control={control}
						rules={{
							required: true
						}}
						render={({ field }) => (
							<SMSelect
								{...field}
								id={"genderId"}
								options={allGenders}
								placeholder="Choose occupant gender"
								isError={!!errors.genderId}
								disabled={
									state?.genderId === 1 ||
									state?.genderId === 2
								}
								errorText={
									errors.genderId && errors.genderId.message
								}
							/>
						)}
					/>
				</div>
			</div>
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="groupSelectionId">Select Levels</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="groupSelectionId"
						control={control}
						rules={{
							required: true
						}}
						render={({ field }) => (
							<SMSelect
								{...field}
								id={"groupSelectionId"}
								options={allActivationStatuses}
								placeholder="Select action"
								isError={!!errors.groupSelectionId}
								errorText={
									errors.groupSelectionId &&
									errors.groupSelectionId.message
								}
							/>
						)}
					/>
				</div>
			</div>
			{isChooseSelectionRquired && (
				<div className="row mb-4">
					<div className="col-lg-3 d-flex align-items-center">
						<label htmlFor="levelId">Specify Exception</label>
					</div>
					<div className="col-lg-9">
						<Controller
							name="levelId"
							control={control}
							rules={{
								required: true
							}}
							render={({ field }) => (
								<SMSelect
									{...field}
									id="levelId"
									options={allLevels}
									placeholder="Select levels"
									isMulti
									searchable={true}
									isError={!!errors.levelId}
									errorText={
										errors.levelId && errors.levelId.message
									}
								/>
							)}
						/>
					</div>
				</div>
			)}
			<div className="row mb-4">
				<div className="col-lg-3 d-flex align-items-center">
					<label htmlFor="hostelRoomCategoryId">Categories</label>
				</div>
				<div className="col-lg-9">
					<Controller
						name="hostelRoomCategoryId"
						control={control}
						rules={{
							required: true
						}}
						render={({ field }) => (
							<SMSelect
								{...field}
								id={"hostelRoomCategoryId"}
								options={allCategories}
								placeholder="Choose occupant level"
								isError={!!errors.hostelRoomCategoryId}
								errorText={
									errors.hostelRoomCategoryId &&
									errors.hostelRoomCategoryId.message
								}
							/>
						)}
					/>
				</div>
			</div>
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
