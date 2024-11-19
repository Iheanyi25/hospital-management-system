// import { CopyIcon } from "../../../assets/svgs";
import { Button, Spinner } from "../../../ui_elements";
import { ReferralCard } from "../../../ui_elements/referralCard/referralCard";
import styles from "./Referral.module.css";
import { TMTable } from "../../../ui_elements/tMTable/TMTable";
import { Search } from "../../../ui_elements/search/search";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { PAGESIZE, SEARCH_DELAY } from "../../../utils/constants/index";
import { useMemo } from "react";
import { useRef } from "react";
import { useApiGet } from "../../../api/apiCall";
import { getReferralsUrl } from "../../../api/urls";
import { truncateString } from "../../../utils/truncateString";
import { shortDate } from "../../../utils/formatDate";

const instructions = [
	{
		step: 1,
		instruction: "Share Link",
		detail: "Login to the portal and copy your referal Link"
	},
	{
		step: 2,
		instruction: "Invite Friends / Family",
		detail: "Invite your friends or family to regiseter for a programme"
	},
	{
		step: 3,
		instruction: "Get Paid",
		detail: "You’ll receive commissions from the university."
	}
];

const ReferAndEarn = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [pageNumber, setPageNumber] = useState(1);
	const pageSize = PAGESIZE.sm;
	const linkRef = useRef(null);

	const { data, isLoading, isFetching, error } = useApiGet(
		getReferralsUrl({
			pageSize,
			pageNumber,
			searchTerm,
			userId: "7EE4D32C-BBA0-4A85-9284-7B60CA465DDC"
		}),
		{
			keepPreviousData: true
		}
	);

	const columns = useMemo(
		() => [
			{
				Header: "S/N",
				accessor: "serialNo",
				Cell: ({ cell: { row } }) => (
					<div>
						<span>
							{pageSize * (pageNumber - 1) + (row.index + 1)}
						</span>
					</div>
				)
			},
			{
				Header: "Referral",
				accessor: "fullName"
			},
			{
				Header: "Reg No",
				accessor: "userName"
			},
			{
				Header: "Phone Number",
				accessor: "mobileNumber"
			},
			// {
			// 	Header: "Session",
			// 	accessor: "session"
			// },
			{
				Header: "Date Registered",
				accessor: "registrationDate",
				Cell: ({ cell: { row } }) => {
					return <>{shortDate(row.original.dateRegistered)}</>;
				}
			}
		],
		[pageNumber, pageSize]
	);

	const debounced = useDebouncedCallback((value) => {
		setSearchTerm(value);
	}, SEARCH_DELAY.sm);

	const handleCopy = () => {
		navigator.clipboard.writeText(data?.data?.referralLink);

		const successFlag = window.AJS.flag({
			type: "success",
			title: "Referral link copied",
			body: "You can now share this link with your friends."
		});
		setTimeout(() => {
			successFlag.close();
		}, 5000);
	};
	if (isLoading) return <Spinner />;
	if (error)
		return "An error has occurred: " + error?.response?.data?.message;

	return (
		<div>
			<div className={`${styles.background}`}>
				<div className="d-flex justify-content-center">
					<h6>Refer Friends. Earn Commissions, Get Paid</h6>
				</div>
				<div className="d-flex justify-content-center">
					<div className={`${styles.referral_link_card}`}>
						<div>
							<h5>Referral Link</h5>
							<p className={`${styles.instruction}`}>
								Use the Referral Link to invite your friends and
								family and earn commissions
							</p>
						</div>
						<div className="w-100 d-flex align-items-center justify-content-between">
							<div className={`${styles.link_holder}`}>
								<p ref={linkRef}>
									{truncateString(
										data?.data?.referralLink,
										24
									)}
								</p>
							</div>
							<div
								className={`${styles.copy} d-flex align-items-center`}
								onClick={handleCopy}
							>
								<p>Copy</p>
								{/* <CopyIcon /> */}
							</div>
						</div>
						<Button
							label="Share Referral Link"
							buttonClass="primary"
							className={`${styles.referral_button}`}
						/>
					</div>
				</div>
			</div>
			<section
				className={` ${styles.linkList} d-flex align-items-center justify-content-between`}
			>
				{instructions.map((item, index) => (
					<ReferralCard
						key={index}
						step={item.step}
						instruction={item.instruction}
						detail={item.detail}
					/>
				))}
			</section>

			<section>
				<TMTable
					columns={columns}
					data={data?.data?.referrals?.items}
					title={"Referral History"}
					additonalTitleData={
						<div className={`${styles.utility}`}>
							<Search
								placeholder="Search for student"
								onChange={(e) => {
									debounced(e.target.value);
									setPageNumber(1);
								}}
							/>
						</div>
					}
					availablePages={data?.data?.referrals?.metaData?.totalPages}
					setPageNumber={setPageNumber}
					pageNumber={pageNumber}
					searchParams={searchTerm}
					loading={isLoading || isFetching}
				/>
			</section>
		</div>
	);
};

export default ReferAndEarn;
