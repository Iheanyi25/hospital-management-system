import { generateUrlParams } from "../../utils/generateUrlParams";

const baseURL = "Results";

export const studentCompositeResultsUrl = (filter) =>
  `${baseURL}/students-composite-results?${generateUrlParams(filter)}`;
