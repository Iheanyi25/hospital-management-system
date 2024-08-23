import styles from "../style.module.css";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { Cards } from "./components/cards";

const UniTransferApplicationDetails = () => {
	const uniTransferState = useSelector((state) => state.uniTransferData);
	const componentRef = useRef();

	return (
		<div className={styles.container}>
			<DisplayCurrentScreen
				uniTransferState={uniTransferState}
				componentRef={componentRef}
			/>
		</div>
	);
};

const DisplayCurrentScreen = ({
	uniTransferState,
	componentRef
}) => {

	return (
		<Cards
			componentRef={componentRef}
			uniTransferState={uniTransferState}
		/>
	)
}

export default UniTransferApplicationDetails;
