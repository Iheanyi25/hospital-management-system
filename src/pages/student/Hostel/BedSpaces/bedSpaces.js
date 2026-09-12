import { useContext, useState } from "react";
import {
	useHistory,
	useLocation
} from "react-router-dom/cjs/react-router-dom.min";
import { useApiGet, useApiPost } from "../../../../api/apiCall";
import {
	generateFeesInvoiceUrl,
	getHostelBedSpaceUrl
} from "../../../../api/urls";
import {
	BedSpaceCard,
	Breadcrumbs,
	Button,
	Jumbotron,
	PageTitle,
	ProfileContext
} from "../../../../ui_elements";

import styles from "../styles.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { PAYMENTIDENTIFIER } from "../../../../utils/constants";

const BedSpaces = () => {
	const { push, goBack } = useHistory();
	const { state } = useLocation();

	const profileData = useContext(ProfileContext);

	if (!state) goBack();

	const { data, isFetching } = useApiGet(
		getHostelBedSpaceUrl({ hostelRoomId: state.roomId }),
		{
			keepPreviousData: true
		}
	);

	const [currentBedSpace, setCurrentdBedSpace] = useState(null);

	const crumbItems = state?.isArrears
		? [
				{
					name: "Hostel",
					path: "/hostel"
				},
				{
					name: "Pay Arrears",
					path: "/hostel/arrears_payment",
					state
				},
				{
					name: state?.roomName,
					path: ""
				}
		  ]
		: [
				{
					name: "Hostel",
					path: "/hostel"
				},
				{
					name: "Book Hostel",
					path: "/hostel/book_hostel",
					state
				},
				{
					name: state?.name,
					path: "/hostel/select_room",
					state
				},
				{
					name: state?.roomName,
					path: ""
				}
		  ];

	const selectedBedSpace = (item) => {
		setCurrentdBedSpace(item);
	};

	const markers = [
		{
			isBorder: true,
			bg: "#fff",
			text: "Available"
		},
		{
			isBorder: false,
			bg: "#DEEBFF",
			text: "Selected"
		},
		{
			isBorder: false,
			bg: "#C4C4C4",
			text: "Booked"
		}
	];

	const { mutate, isLoading: isPosting } = useApiPost();

	const onSubmit = (data) => {
		const requestDet = {
			url: generateFeesInvoiceUrl(),
			data: {
				amount: state?.price,
				hostelBedId: currentBedSpace?.id,
				sessionId: state?.sessionId ?? currentBedSpace?.sessionId,
				levelId: profileData?.profileData?.programmeDetail?.levelId,
				paymentPurposeId: state?.isArrears
					? PAYMENTIDENTIFIER?.hostelArrears
					: PAYMENTIDENTIFIER?.hostel,
				paymentTypeId: "Full"
			}
		};

		mutate(requestDet, {
			onSuccess: (data) => {
				push({
					pathname: `/hostel/invoice`,
					state: { data: data?.data?.data }
				});
				const successFlag = window.AJS.flag({
					type: "success",
					title: "Invoice Action Successful!",
					body: "Invoice generated successfully!"
				});
				setTimeout(() => {
					successFlag.close();
				}, 3000);
			},
			onError: ({ response }) => {
				const errorFlag = window.AJS.flag({
					type: "error",
					title: "Invoice Action Failed!",
					body:
						response?.data?.message || `Invoice generated failed!!`
				});
				setTimeout(() => {
					errorFlag.close();
				}, 3000);
			}
		});
	};

	return (
		<>
			<Breadcrumbs crumbs={crumbItems} />
			<div className="mt-3">
				<PageTitle title={state?.name} />
			</div>
			<motion.div
				className="mt-5"
				transition={{ type: "spring", stiffness: 100 }}
				initial={{ visibility: "hidden", x: -25 }}
				animate={{ visibility: "visible", x: 1 }}
				style={{
					filter: isFetching ? "blur(5px)" : "none"
				}}
			>
				<Jumbotron
					headerContainer={
						<div className="d-flex align-items-center justify-content-between">
							<h6>Bedspaces</h6>
							<div className="d-flex align-items-center">
								{markers.map((item) => (
									<div
										key={item.bg}
										className="d-flex align-items-center ml-4"
									>
										<div
											style={{
												border:
													item.isBorder &&
													"1px solid #A5ADBA",
												backgroundColor: item.bg
											}}
											className={styles.markerBox}
										></div>
										<p
											className={`ml-2 ${styles.markerDescription}`}
										>
											{item.text}
										</p>
									</div>
								))}
							</div>
						</div>
					}
					footerContent={
						<div className="d-flex justify-content-end">
							<Button
								buttonClass="primary"
								label="Generate Invoice"
								onClick={onSubmit}
								loading={isPosting}
								disabled={
									currentBedSpace === null ? true : false
								}
							/>
							<Button
								buttonClass="standard"
								label="Cancel"
								onClick={() =>
									push({
										pathname: "/hostel/select_room",
										state: {
											...state
										}
									})
								}
							/>
						</div>
					}
				>
					<AnimatePresence exitBeforeEnter={true}>
						<motion.div
							className={`p-4 d-flex ${styles.bedSpacesContainer}`}
							transition={{ type: "spring", stiffness: 100 }}
							initial={{ visibility: "hidden", x: -25 }}
							animate={{ visibility: "visible", x: 1 }}
							style={{
								filter: isFetching ? "blur(5px)" : "none"
							}}
						>
							{data?.data?.items?.map((item) => (
								<div className={styles.bedSpaceHolder}>
									<BedSpaceCard
										price={state?.price}
										numeration={item?.name}
										disabled={item?.active ? false : true}
										selected={
											currentBedSpace === item
												? true
												: false
										}
										onClick={() => selectedBedSpace(item)}
									/>
								</div>
							))}
						</motion.div>
					</AnimatePresence>
					{currentBedSpace !== null && (
						<div className="px-4 py-3 d-flex align-items-center justify-content-center">
							<div className={styles.bedDetails}>
								<p>
									{" "}
									<strong>Note:</strong> You are about to book
									-{" "}
									<strong>
										{currentBedSpace?.name} {state?.name}.
									</strong>
								</p>
								<p className="py-2">
									Once you have booked a room you have a time
									limit of 2 days to make payment. If payment
									hasn’t been made within 2 days, the room can
									be made available to someone else and your
									invoice deactivated.{" "}
								</p>
							</div>
						</div>
					)}
				</Jumbotron>
			</motion.div>
		</>
	);
};

export default BedSpaces;
