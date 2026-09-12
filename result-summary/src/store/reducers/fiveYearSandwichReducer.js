import { formatDateFromAPI } from "../../utils/formatDate";
import {
	CLEAR_APPLICATION_DATA,
	SAVE_FIVE_YEAR_SANDWICH_APPLICATION
} from "../constant";

export const fiveYearSandwichApplicationInitialState = (data) => {
	return {
		programme: {
			id: data?.programme?.id,
			applicationType: data?.applicationType ?? null,
			applicationTypeId: data?.applicationTypeId ?? null,
			rrr: data?.programme?.rrr,
			...(data?.programme?.facultyId
				? {
						facultyId: {
							value: data?.programme?.facultyId,
							label: data?.programme?.faculty
						}
				  }
				: null),
			...(data?.programme?.departmentId && {
				departmentId: {
					value: data?.programme?.departmentId,
					label: data?.programme?.department
				}
			}),
			...(data?.programme?.departmentOptionId && {
				departmentOptionId: {
					value: data?.programme?.departmentOptionId,
					label: data?.programme?.departmentOption
				}
			}),
			...(data?.programme?.programmeId && {
				programmeId: {
					value: String(data?.programme?.programmeId),
					label: data?.programme?.programme
				}
			}),
			...(data?.programme?.modeOfStudyId && {
				modeOfStudyId: {
					value: String(data?.programme?.modeOfStudyId),
					label: data?.programme?.modeOfStudy
				}
			}),
			...(data?.programme?.enrolledBefore && {
				enrolledBefore: {
					value: String(data?.programme?.enrolledBefore),
					label: data?.programme?.enrolledBefore
				}
			}),
			passport: data?.passport ?? null
		},
		basicInformation: {
			id: data?.personalInfoResponse?.id ?? null,
			surname: data?.personalInfoResponse?.surname,
			firstname: data?.personalInfoResponse?.firstname,
			middlename: data?.personalInfoResponse?.middlename,
			homeTown: data?.personalInfoResponse?.homeTown,
			otherNames: data?.personalInfoResponse?.otherNames,
			rrr: data?.personalInfoResponse?.rrr,
			...(data?.personalInfoResponse?.genderId && {
				genderId: {
					value: data?.personalInfoResponse?.genderId,
					label: data?.personalInfoResponse?.gender
				}
			}),
			dateOfBirth: data?.personalInfoResponse?.dateOfBirth,
			...(data?.personalInfoResponse?.country && {
				countryId: {
					value: data?.personalInfoResponse?.countryId,
					label: data?.personalInfoResponse?.country
				}
			}),
			...(data?.personalInfoResponse?.stateId && {
				stateId: {
					value: data?.personalInfoResponse?.stateId,
					label: data?.personalInfoResponse?.state
				}
			}),
			...(data?.personalInfoResponse?.lgaId && {
				lgaId: {
					value: data?.personalInfoResponse?.lgaId,
					label: data?.personalInfoResponse?.lga
				}
			}),
			permanentAddress: data?.personalInfoResponse?.permanentAddress,
			contactAddress: data?.personalInfoResponse?.contactAddress,
			mobileNumber: data?.personalInfoResponse?.mobileNumber,
			...(data?.personalInfoResponse?.religionId && {
				religionId: {
					value: data?.personalInfoResponse?.religionId,
					label: data?.personalInfoResponse?.religion
				}
			}),
			email: data?.personalInfoResponse?.email,
			numberOfChildren: data?.personalInfoResponse?.numberOfChildren,
			...(data?.personalInfoResponse?.maritalStatusId && {
				maritalStatusId: {
					value: data?.personalInfoResponse?.maritalStatusId,
					label: data?.personalInfoResponse?.maritalStatus
				}
			}),
			...(data?.personalInfoResponse?.appliedToUniversity && {
				appliedToUniversity: {
					value: data?.personalInfoResponse?.appliedToUniversity,
					label: data?.personalInfoResponse?.appliedToUniversity
						? "Yes"
						: "No"
				}
			}),
			...(data?.personalInfoResponse?.offeredAdmission && {
				offeredAdmission: {
					value: data?.personalInfoResponse?.offeredAdmission,
					label: data?.personalInfoResponse?.offeredAdmission
						? "Yes"
						: "No"
				}
			}),
			...(data?.personalInfoResponse?.appliedToUniversityDate && {
				appliedToUniversityDate: {
					value: data?.personalInfoResponse?.appliedToUniversityDate,
					label: data?.personalInfoResponse?.appliedToUniversityDate
				}
			}),
			...(data?.programmeInfoResponse?.facultyId
				? {
						facultyId: {
							value: data?.programmeInfoResponse?.facultyId,
							label: data?.programmeInfoResponse?.faculty
						}
				  }
				: null),
			...(data?.programmeInfoResponse?.departmentId && {
				departmentId: {
					value: data?.programmeInfoResponse?.departmentId,
					label: data?.programmeInfoResponse?.department
				}
			}),
			...(data?.programmeInfoResponse?.schoolProgrammeId && {
				schoolProgrammeId: {
					value: data?.programmeInfoResponse?.schoolProgrammeId,
					label: data?.programmeInfoResponse?.schoolProgramme
				}
			}),
			...(data?.programmeInfoResponse?.sandwichCampusId && {
				sandwichCampusId: {
					value: data?.programmeInfoResponse?.sandwichCampusId,
					label: data?.programmeInfoResponse?.sandwichCampus
				}
			})
		},
		nextOfKin: {
			fullname: data?.personalInfoResponse?.sponsorFullName,
			...(data?.personalInfoResponse?.sponsorRelationship && {
				relationship: {
					value: data?.personalInfoResponse?.sponsorRelationshipId,
					label: data?.personalInfoResponse?.sponsorRelationship
				}
			}),
			mobileNumber: data?.personalInfoResponse?.sponsorMobileNumber,
			address: data?.personalInfoResponse?.sponsorContactAddress
		},
		workHistory: data?.employmentResponse,
		sessionId: data?.sessionId,
		...(data?.qualificationDetailResponse && {
			educationHistory: data?.qualificationDetailResponse.map((item) => ({
				...item,
				yearFrom: formatDateFromAPI(item?.yearFrom),
				yearTo: formatDateFromAPI(item?.yearTo),
				countryId: {
					label: item?.country,
					value: item?.countryId
				}
			}))
		}),
		studentTypeId: data?.studentTypeId,
		oLevelResult: {
			sittings: data?.olevelResponse?.map((item) => ({
				...item,
				resultPin: item?.resultPin,
				resultPinSno: item?.resultSerialNumber,
				examNumber: item?.examNumber,
				examCentre: item?.examCenter,
				oLevelType: {
					value: item?.examinationTypeId,
					label: item?.examinationType
				},
				examYear: { value: item?.examYear, label: item?.examYear },
				subjects: [
					...Object?.keys(item?.subjectGrade).map((key, index) => ({
						subject: {
							label: key?.toUpperCase(),
							value: Object?.keys(item?.subjectGradeId)?.[index]
						},
						grade: {
							label: item?.subjectGrade?.[key],
							value: Object?.values(item?.subjectGradeId)?.[index]
						}
					}))
				]
			}))
		},
		aCEDiplomaQualifications: data?.aceDiplomas?.map((ace) => ({
			gradeId: {
				label: ace?.grade,
				value: ace?.gradeId
			},
			year: {
				label: ace?.year,
				value: ace?.year
			},
			subjectId: {
				label: ace?.subject,
				value: ace?.subjectId
			}
		})),
		tcCertificate: data?.tcCertificates?.map((tc) => ({
			gradeId: {
				label: tc?.grade,
				value: tc?.gradeId
			},
			subjectId: {
				label: tc?.subject,
				value: tc?.subjectId
			},
			year: {
				label: tc?.year,
				value: tc?.year
			},
			examNo: tc?.examNo
		})),
		certificates: data?.certificateResponses
			? data?.certificateResponses[0]?.certificates?.map(
					(certificate) => ({
						...(certificate?.certificateType && {
							certificate: certificate?.certificate,
							certificateTypeId: {
								value: certificate?.certificateTypeId,
								label: certificate?.certificateType
							}
						})
					})
			  )
			: []
	};
};

export const fiveYearSandwichReducer = (state = {}, action) => {
	switch (action.type) {
		case SAVE_FIVE_YEAR_SANDWICH_APPLICATION:
			return action.payload;
		case CLEAR_APPLICATION_DATA:
			return {};
		default:
			return state;
	}
};
