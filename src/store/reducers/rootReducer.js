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

const persistConfig = {
	key: "root",
	storage,
	whitelist: [
		"studentData",
		"pgData",
		"directEntryData",
		"jupebData",
		"putmeData",
		"menuItemsData",
		"CSPGData",
		"feesAssignment",
		"impersonatorDetails"
	]
};

const rootReducer = combineReducers({
	sample: sampleReducer,
	studentData: createStudentReducer,
	pgData: pgReducer,
	directEntryData: directEntryReducer,
	jupebData: jupebApplicationReducer,
	putmeData: putmeReducer,
	menuItemsData: menuItemsReducer,
	CSPGData: CSPGReducer,
	feesAssignment: feesAssignmentReducer,
	impersonatorDetails: impersonatorReducer,
});

export default persistReducer(persistConfig, rootReducer);
