import React from "react";
import styles from "../style.module.css";
import { formatDateFromAPI } from "../../../../utils/formatDate";

export default function PersonalInfoPrintOut({ personalData }) {
	const {
		contactAddress,
		country,
		dateOfBirth,
		email,
		firstname,
		homeTown,
		lga,
		mobileNumber,
		permanentAddress,
		bloodGroup,
		state,
		middlename,
		lastname,
		gender
	} = personalData;

	return (
		<div className={styles.print_out__section}>
			<div className={styles.grid_header}>Personal Information</div>
			<div className={styles.print_out__grid}>
				<div className={styles.print_out__grid_col}>
					<div>
						<div>Full Name</div>
						<div>{`${lastname} ${firstname} ${middlename}`}</div>
					</div>
					<div>
						<div>Gender</div>
						<div>{gender}</div>
					</div>
					<div>
						<div>Date of birth</div>
						<div>{formatDateFromAPI(dateOfBirth)}</div>
					</div>
					<div>
						<div>Country</div>
						<div>{country}</div>
					</div>
				</div>
				<div className={styles.print_out__grid_col}>
					<div>
						<div>State of origin</div>
						<div>{state}</div>
					</div>
					<div>
						<div>LGA of origin</div>
						<div>{lga}</div>
					</div>
					<div>
						<div>Home town</div>
						<div>{homeTown}</div>
					</div>
					<div>
						<div>Blood group/Genotype</div>
						<div>{bloodGroup || "nil"}</div>
					</div>
				</div>
				<div className={styles.print_out__grid_col}>
					<div>
						<div>Email address</div>
						<div>{email}</div>
					</div>
					<div>
						<div>Mobile phone</div>
						<div>{mobileNumber}</div>
					</div>
					<div>
						<div>Contact address</div>
						<div>{contactAddress}</div>
					</div>
					<div>
						<div>Permanent address</div>
						<div>{permanentAddress || "nil"}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
