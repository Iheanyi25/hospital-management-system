import { useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { useApiPost } from "../../../../api/apiCall";
import {
	getLecturerProfileUrl,
	updateSignatureUrl
} from "../../../../api/urls";
import { Jumbotron, Button, SignatureUpload } from "../../../../ui_elements";
import formatImageToBase64 from "../../../../utils/formatImage";
import styles from "../style.module.css";

export const Signature = ({ signature }) => {
	const ref = useRef();
	const { mutate, isLoading } = useApiPost();
	const queryClient = useQueryClient();
	const [fileToUpload, setFileToUpload] = useState();
	const { push } = useHistory();

	const uploadImage = async () => {
		if (
			fileToUpload.size < 200000 ||
			fileToUpload.type === "image/png" ||
			fileToUpload.type === "image/jpg" ||
			fileToUpload.type === "image/jpeg"
		) {
			const requestBody = {
				url: updateSignatureUrl(),
				data: { Signature: await formatImageToBase64(fileToUpload) }
			};
			mutate(requestBody, {
				onSuccess: () => {
					queryClient.invalidateQueries(getLecturerProfileUrl());
					const successFlag = window.AJS.flag({
						type: "success",
						title: "Success!",
						body: "Profile updated successfully"
					});
					push("/dashboard");
					setTimeout(() => {
						successFlag.close();
					}, 5000);
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
			const errorFlag = window.AJS.flag({
				type: "error",
				title: "Failed!",
				body:
					fileToUpload.size > 200000
						? "File too Large."
						: "Invalid file type. Try again"
			});
			setTimeout(() => {
				errorFlag.close();
			}, 5000);
		}
	};
	return (
		<>
			<Jumbotron
				headerContainer={
					<div className="d-flex justify-content-between">
						<label className={`${styles.sub_header}`}>
							Upload your signature
						</label>
						{signature && (
							<label
								className={`${styles.sub_header} ${styles.signature_text_style} px-4`}
								onClick={() => ref?.current?.click()}
							>
								Update Signature
							</label>
						)}
					</div>
				}
				footerContent={
					<Button
						data-cy="submit"
						label="Submit"
						buttonClass="primary"
						type="button"
						disabled={!fileToUpload}
						loading={isLoading}
						onClick={uploadImage}
					/>
				}
				footerStyle="d-flex justify-content-end"
			>
				<div className="container-fluid px-4 mt-4 mb-3">
					<div>
						<SignatureUpload
							name="Hello"
							onChange={(e) => setFileToUpload(e.target.files[0])}
							currentValue={
								fileToUpload ? fileToUpload : signature
							}
							parentRef={ref}
						/>
					</div>
				</div>
			</Jumbotron>
		</>
	);
};
