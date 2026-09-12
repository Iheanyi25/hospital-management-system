import styles from "../style.module.css";

export const Signature = ({ name }) => {
	return (
		<div className={styles.signature_container}>
			<p className={styles.range_current_text}>{name}</p>
			<main className={styles.signature_container_space}></main>
		</div>
	);
};
