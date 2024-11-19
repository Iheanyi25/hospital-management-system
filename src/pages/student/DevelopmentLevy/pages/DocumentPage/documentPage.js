import styles from "./style.module.css";
import { Cards, Title } from "./components";
import { useLocation } from "react-router-dom";

const DocumentPage = () => {
	const { state } = useLocation();

	return (
		<div className={styles.container}>
			<Title />
			<Cards state={state}/>
		</div>
	);
};
export default DocumentPage;
