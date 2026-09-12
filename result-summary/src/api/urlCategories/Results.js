import { generateUrlParams } from "../../utils/generateUrlParams";

const baseURL = "Results";

export const studentCompositeResultsUrl = (filter) =>
  `${baseURL}/students-composite-results?${generateUrlParams(filter)}`;
export const studentSummaryResultsUrl = (filter) => 
  `${baseURL}/students-summary-results?${generateUrlParams(filter)}`;
export const studentResultReportUrl = (filter) => 
  `${baseURL}/students-result-report?${generateUrlParams(filter)}`;