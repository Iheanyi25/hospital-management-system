import React, { useEffect } from "react";
import { PageTitle, SideTabs, Spinner } from "../../../ui_elements";
import styles from "./style.module.css";
import { useLocation } from "react-router";
import { PersonalInformation } from "./components";
import { parent } from "../../../ui_elements/layout/layout";
import { useApiGet } from "../../../api/apiCall";
import { getLecturerProfileUrl } from "../../../api/urls";
import Avatar from "react-avatar";
// import { useQueryClient } from "react-query";
// import formatImageToBase64 from "../../../utils/formatImage";
// import {
// 	checkIfFilesAreTooBig,
// 	checkIfImagesAreCorrectType
// } from "../../../utils/FileValidation";

const LecturerProfile = () => {
	// const ref = useRef();
	// const updatePassport = useApiPost();
	// const queryClient = useQueryClient();
	// const [loading, setLoading] = useState(false);
	const loading = false;
	const { hash } = useLocation();
	useEffect(() => {
		parent.current?.scrollTo(0, 0);
	}, [hash]);
	const navs = [
		{
			linkName: "Personal Information",
			hashName: "#section_a"
		}
		// {
		// 	linkName: "Signature",
		// 	hashName: "#section_b"
		// }
	];
	const { data, isLoading, error } = useApiGet(getLecturerProfileUrl(), {
		refetchOnWindowFocus: false
	});
	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	// const uploadImage = async (images) => {
	// 	if (
	// 		checkIfFilesAreTooBig(images) &&
	// 		checkIfImagesAreCorrectType(images)
	// 	) {
	// 		setLoading(true);
	// 		const requestBody = {
	// 			url: updatePassportUrl(),
	// 			data: { Passport: await formatImageToBase64(images[0]) }
	// 		};
	// 		updatePassport.mutate(requestBody, {
	// 			onSuccess: () => {
	// 				queryClient.invalidateQueries(getLecturerProfileUrl());
	// 				const successFlag = window.AJS.flag({
	// 					type: "success",
	// 					title: "Success!",
	// 					body: "Image uploaded sucessfully"
	// 				});
	// 				setLoading(false);
	// 				setTimeout(() => {
	// 					successFlag.close();
	// 				}, 5000);
	// 			},
	// 			onError: () => {
	// 				setLoading(false);
	// 				const errorFlag = window.AJS.flag({
	// 					type: "error",
	// 					title: "Failed!",
	// 					body: "Something went wrong"
	// 				});
	// 				setTimeout(() => {
	// 					errorFlag.close();
	// 				}, 5000);
	// 			}
	// 		});
	// 	} else {
	// 		const errorFlag = window.AJS.flag({
	// 			type: "error",
	// 			title: "Failed!",
	// 			body: !checkIfFilesAreTooBig(images)
	// 				? "File too Large."
	// 				: "Invalid file type. Try again"
	// 		});
	// 		setTimeout(() => {
	// 			errorFlag.close();
	// 		}, 5000);
	// 	}
	// };
	return (
		<div className={styles.container}>
			<div className="row mb-3 mx-0">
				<div className="col-12 col-xl-2">
					<div className={styles.profile_img}>
						{loading ? (
							<Spinner width={100} />
						) : (
							<Avatar
								name={`${data?.data?.lastname} ${data?.data?.firstName}`}
								className={styles.profile_img}
								src={data?.data?.passport}
								size={100}
								round={true}
								maxInitials={2}
							/>
						)}
					</div>
				</div>
				<div className="col-12 col-md-10 col-lg-10 py-4">
					<PageTitle
						title={`${data?.data?.lastname} ${
							data?.data?.firstName
						} ${data?.data?.middlename ?? ""}`}
					/>
				</div>
			</div>
			<div className="row mx-0">
				<div className="col-12 col-xl-2">
					<div className="">
						{/* <div className="">
							<Button
								data-cy="upload"
								buttonClass="standard"
								label="Upload"
								customClass={styles.upload_button}
								onClick={() => ref?.current?.click()}
							/>
							<input
								type="file"
								ref={ref}
								className={styles.input}
								onChange={(e) => uploadImage(e.target.files)}
							/>
						</div> */}
					</div>
					<div className={styles.key_comes_tabs}>
						<div className={styles.key_comes_sticky}>
							<SideTabs navItems={navs} />
						</div>
					</div>
				</div>
				<div className="col-12 col-md-10 col-lg-10">
					<DisplayInformation data={data?.data} />
				</div>
			</div>
		</div>
	);
};

const DisplayInformation = ({ allDepartments, data }) => {
	let location = useLocation();
	useEffect(() => {
		if (!location.hash) {
			location.hash = "#section_a";
		}
	}, [location]);
	switch (location.hash) {
		case "#section_a":
			return (
				<PersonalInformation
					data={data}
					// allDepartments={allDepartments}
				/>
			);
		// case "#section_b":
		// 	return <Signature signature={data?.signature} />;
		default:
			return (
				<PersonalInformation
					data={data}
					// allDepartments={allDepartments}
				/>
			);
	}
};
export default LecturerProfile;
