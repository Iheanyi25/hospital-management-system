import { useLocation } from "react-router-dom";
import {
	StatusCheck,
	StatusFailure,
	StatusSuccess,
	StatusUnpaid
} from "./components";

const ProspectiveStudents = () => {
	const { hash } = useLocation();

	switch (hash) {
		case "#failure":
			return <StatusFailure />;
		case "#success":
			return <StatusSuccess />;
		case "#unpaid":
			return <StatusUnpaid />;
		default:
			return <StatusCheck />;
	}
};

export default ProspectiveStudents;
