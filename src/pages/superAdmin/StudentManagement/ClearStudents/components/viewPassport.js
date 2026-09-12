import Avatar from "react-avatar";
import styles from "../style.module.css";

export const ViewPassport = ({ data }) => {
	return (
		<Avatar
			name={`${data.surname} ${data.firstname}`}
			className={styles.profile_img}
			src={data.photo}
			size={240}
			round={false}
			maxInitials={2}
		/>
	);
};
