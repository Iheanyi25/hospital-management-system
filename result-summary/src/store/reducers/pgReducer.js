import { CLEAR_APPLICATION_DATA, SAVE_PG_INFO } from "../constant";

export const pgApplicationInitialState = (data) => {
	return {
		programme: {
			id: data?.programme?.id,
			pgApplicationFormId: data?.programme?.pgApplicationFormId ?? null,
			applicationType: data?.applicationType ?? null,
			applicationTypeId: data?.applicationTypeId ?? null,
			rrr: data?.programme?.rrr,
			...(data.programme.facultyId
				? {
						facultyId: {
							value: data?.programme?.facultyId,
							label: data?.programme?.faculty
						}
				  }
				: null),
			...(data.programme.departmentId && {
				departmentId: {
					value: data?.programme?.departmentId,
					label: data?.programme?.department
				}
			}),
			...(data.programme.departmentOptionId && {
				departmentOptionId: {
					value: data?.programme?.departmentOptionId,
					label: data?.programme?.departmentOption
				}
			}),
			...(data.programme.programmeId && {
				programmeId: {
					value: String(data?.programme?.programmeId),
					label: data?.programme?.programme
				}
			}),
			...(data.programme.modeOfStudyId && {
				modeOfStudyId: {
					value: String(data?.programme?.modeOfStudyId),
					label: data?.programme?.modeOfStudy
				}
			}),
			...(data.areaOfSpecialization?.id && {
				areaOfSpecializationId: {
					value: String(data?.areaOfSpecialization?.id),
					label: data?.areaOfSpecialization?.name
				}
			}),
			...(data.programme.enrolledBefore && {
				enrolledBefore: {
					value: String(data?.programme?.enrolledBefore),
					label: data?.programme?.enrolledBefore
				}
			}),
			passport: data?.programme?.passport ?? null
		},
		basicInformation: {
			id: data?.basicInformation?.id ?? null,
			surname: data?.basicInformation?.surname,
			firstname: data?.basicInformation?.firstname,
			lastname: data?.basicInformation?.lastname,
			middlename: data?.basicInformation?.middlename,
			homeTown: data?.basicInformation?.homeTown,
			otherNames: data?.basicInformation?.otherNames,
			...(data?.basicInformation?.genderId && {
				genderId: {
					value: data?.basicInformation?.genderId,
					label: data?.basicInformation?.gender
				}
			}),
			dateOfBirth: data?.basicInformation?.dateOfBirth,
			...(data?.basicInformation?.country && {
				countryId: {
					value: data?.basicInformation?.countryId,
					label: data?.basicInformation?.country
				}
			}),
			...(data?.basicInformation?.stateId && {
				stateId: {
					value: data?.basicInformation?.stateId,
					label: data?.basicInformation?.state
				}
			}),
			...(data?.basicInformation?.lgaId && {
				lgaId: {
					value: data?.basicInformation?.lgaId,
					label: data?.basicInformation?.lga
				}
			}),
			permanentAddress: data?.basicInformation?.permanentAddress,
			contactAddress: data?.basicInformation?.contactAddress,
			mobileNumber: data?.basicInformation?.mobileNumber,
			...(data?.basicInformation?.religionId && {
				religionId: {
					value: data?.basicInformation?.religionId,
					label: data?.basicInformation?.religion
				}
			}),
			email: data?.basicInformation?.email,
			numberOfChildren: data?.basicInformation?.numberOfChildren,
			...(data?.basicInformation?.maritalStatusId && {
				maritalStatusId: {
					value: data?.basicInformation?.maritalStatusId,
					label: data?.basicInformation?.maritalStatus
				}
			})
		},
		nextOfKin: {
			id: data?.nextOfKin?.id,
			fullname: data?.nextOfKin?.fullname,
			...(data?.nextOfKin?.relationshipId && {
				relationshipId: {
					value: data?.nextOfKin?.relationshipId,
					label: data?.nextOfKin?.relationship
				}
			}),
			mobileNumber: data?.nextOfKin?.mobileNumber,
			email: data?.nextOfKin?.email,
			address: data?.nextOfKin?.address
		},
		educationalRecords: data?.educationHistory,
		publications:
			data?.publications?.length > 0
				? data?.publications?.map((publication) => ({
						title: publication?.title,
						pGPublicationStatusId: {
							value: publication?.pgPublicationStatusId,
							label: publication?.pgPublicationStatus
						},
						year: {
							value: publication?.year,
							label: publication?.year
						}
				  }))
				: [],
		honours:
			data?.honours?.length > 0
				? data?.honours?.map((honour) => ({
						honour: honour?.honour ?? "",
						...(honour?.yearObtained && {
							yearObtained: {
								value: honour?.yearObtained,
								label: honour?.yearObtained
							}
						})
				  }))
				: [],
		workHistory: data?.employment,
		referees: data?.referees,
		sessionId: data?.sessionId,
		studentTypeId: data?.studentTypeId,
		languages:
			data?.languages?.length > 0
				? data?.languages?.map((language) => ({
						language: language?.language ?? "",
						...(language?.languageProficiencyId && {
							languageProficiencyId: {
								value: language?.languageProficiencyId,
								label: language?.languageProficiency
							}
						})
				  }))
				: [],
		otherInformation: {
			disability: data?.otherInformation?.disability,
			...(data?.otherInformation?.hearAboutUsId && {
				hearAboutUsId: {
					value: data?.otherInformation?.hearAboutUsId,
					label: data?.otherInformation?.hearAboutUs
				}
			}),
			fieldOfStudy: data?.otherInformation?.fieldOfStudy,
			otherInformation: data?.otherInformation?.otherInformation,
			statement: data?.otherInformation?.statement,
			...(data?.otherInformation?.disability && {
				disabilitySelector: {
					value: data?.otherInformation?.disability ? "Yes" : "No",
					label: data?.otherInformation?.disability ? "Yes" : "No"
				}
			})
		},
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
		certificates:
			data?.certificates?.map((certificate) => ({
				...(certificate.certificateType && {
					certificate: certificate.certificate,
					certificateTypeId: {
						value: certificate.certificateTypeId,
						label: certificate.certificateType
					}
				})
			})) ?? []
	};
};

export const pgReducer = (state = {}, action) => {
	switch (action.type) {
		case SAVE_PG_INFO:
			return action.payload;
		case CLEAR_APPLICATION_DATA:
			return {};
		default:
			return state;
	}
};
