
import { generateUrlParams } from '../../utils/generateUrlParams';

const baseUrl = "SchoolProgramme";


export const getAllSchoolProgrammesUrl = (filter) => `${baseUrl}/get-all-school-programes?${generateUrlParams(filter)}`