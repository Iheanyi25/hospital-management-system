import { useContext } from "react";
import { ProfileContext } from "../../../../../../ui_elements";
import styles from "../style.module.css";

export const Title = ({ info }) => {
	const data = useContext(ProfileContext);

	return (
		<div className="row justify-content-center">
			<div
				className={`col-12 mx-0 col-lg-10 mt-5 ${styles.title_container}`}
			>
				<h2 className="mb-2">
					Hello{" "}
					{`${data?.profileData?.personalData?.surname ?? ""} ${
						data?.profileData?.personalData?.firstname ?? ""
					} ${data?.profileData?.personalData?.middlename ?? ""},`}
				</h2>
				<p className="mb-2">
					Kindly click on the respective buttons below to print the
					Admision letter and other
					<br /> clearance forms.
				</p>
			</div>
		</div>
	);
};
