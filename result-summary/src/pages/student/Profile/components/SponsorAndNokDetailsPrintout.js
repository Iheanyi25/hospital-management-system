import React from "react";
import styles from "../style.module.css";

export default function SponsorAndNokDetailsPrintout({
	studentNextOfKin,
	studentSponsor,
	sponsorNextOfKin
}) {
	return (
		<div className={styles.print_out__section}>
			<div className={styles.grid_header}>
				Sponsor and Next of Kin Details
			</div>
			<div className={styles.print_out__grid}>
				<div className={styles.print_out__grid_col}>
					<div>
						<div>Sponsor's fullname</div>
						<div>{studentSponsor?.fullname}</div>
					</div>
					<div>
						<div>Sponsor's address</div>
						<div>{studentSponsor?.address}</div>
					</div>
					<div>
						<div>Sponsor's mobile No</div>
						<div>{studentSponsor?.mobileNumber}</div>
					</div>
					<div>
						<div>Sponsor's email</div>
						<div>{studentSponsor?.email}</div>
					</div>
					<div>
						<div>Relationship</div>
						<div>{studentSponsor?.relationship}</div>
					</div>
				</div>

				<div className={styles.print_out__grid_col}>
					<div>
						<div>Next of Kin's fullname</div>
						<div>{studentNextOfKin?.fullname}</div>
					</div>
					<div>
						<div>Next of Kin's address</div>
						<div>{studentNextOfKin?.address}</div>
					</div>
					<div>
						<div>Next of Kin's mobile No</div>
						<div>{studentNextOfKin?.mobileNumber}</div>
					</div>
					<div>
						<div>Next of Kin's email </div>
						<div>{studentNextOfKin?.email}</div>
					</div>
					<div>
						<div>Next of Kin's relationship</div>
						<div>{studentNextOfKin?.relationship}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
