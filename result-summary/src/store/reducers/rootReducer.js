import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import { sampleReducer } from "./sampleReducer";
import storage from "redux-persist/lib/storage";
import { createStudentReducer } from "./createStudentReducer";
import { pgReducer } from "./pgReducer";
import { directEntryReducer } from "./directEntryReducer";
import { jupebApplicationReducer } from "./jupebReducer";
import { putmeReducer } from "./putmeReducer";
import { menuItemsReducer } from "./menuItemsReducer";
import { CSPGReducer } from "./CSPGReducer";
import { feesAssignmentReducer } from "./feesAssignmentReducer";
import { impersonatorReducer } from "./impersonatorReducer";
import { supplementaryReducer } from "./supplementaryReducer";
import { predegreeReducer } from "./predegreeReducer";
import { CLEAR_PERSIST_DATA } from "../constant";
import { cceReducer } from "./cceReducer";
import { supplementaryPutmeReducer } from "./supplementaryPutmeReducer";
import { staffRequestReducer } from "./staffRequestReducer";
import { uniTransferReducer } from "./uniTransferReducer";
import { diplomaApplicationReducer } from "./diplomaReducer";
import { fourYearSandwichReducer } from "./fourYearSandwichReducer";
import { fiveYearSandwichReducer } from "./fiveYearSandwichReducer";

const persistConfig = {
	key: "root",
	storage,
	whitelist: [
		"studentData",
		"pgData",
		"directEntryData",
		"cceData",
		"jupebData",
		"putmeData",
		"menuItemsData",
		"CSPGData",
		"feesAssignment",
		"impersonatorDetails",
		"supplementaryData",
		"predegreeData",
		"supplementaryPutmeData",
		"staffRequestData",
		"diplomaData",
		"fourYearSandwichData",
		"uniTransferData",
		"diplomaData"
	]
};

const appReducer = combineReducers({
	sample: sampleReducer,
	studentData: createStudentReducer,
	pgData: pgReducer,
	uniTransferData: uniTransferReducer,
	directEntryData: directEntryReducer,
	cceData: cceReducer,
	jupebData: jupebApplicationReducer,
	putmeData: putmeReducer,
	supplementaryData: supplementaryReducer,
	menuItemsData: menuItemsReducer,
	CSPGData: CSPGReducer,
	feesAssignment: feesAssignmentReducer,
	impersonatorDetails: impersonatorReducer,
	predegreeData: predegreeReducer,
	supplementaryPutmeData: supplementaryPutmeReducer,
	staffRequestData: staffRequestReducer,
	diplomaData: diplomaApplicationReducer,
	fourYearSandwichData: fourYearSandwichReducer,
	fiveYearSandwichData: fiveYearSandwichReducer
});

const rootReducer = (state, action) => {
	if (action.type === CLEAR_PERSIST_DATA) {
		storage.removeItem("persist:root");
		return appReducer(undefined, action);
	}
	return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
