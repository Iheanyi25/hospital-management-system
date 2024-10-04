import { useEffect, useMemo, useState } from "react";
import {
  Jumbotron,
  Button,
  TextField,
  SMSelect,
  Spinner
} from "../../../../ui_elements";
import { useLocation, useHistory } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_PUTME_INFO } from "../../../../store/constant";
import { useApiPost } from "../../../../api/apiCall";
import {
  hndJambDetailsFormUrl
} from "../../../../api/urls";
import { yupResolver } from "@hookform/resolvers/yup";
import { JambDetailsSchema } from "../hndSchema";

export const JambDetails = ({

  allPutmeSubjects,
  fromJambState
}) => {
  const putmeStoreData = useSelector((state) => state.putmeData);
  const { programmeInfo, StudentTypeId, personalInfo } = putmeStoreData;
  const dispatch = useDispatch();
  const { replace } = useHistory();
  const { state } = useLocation();

  if (!state) {
    replace("/hnd_login");
  }

  const { mutate, isLoading: isFormLoading } = useApiPost();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      regNo: putmeStoreData?.programmeInfo?.regNo,
      firstSubject: putmeStoreData?.programmeInfo?.firstSubject,
      secondSubject: putmeStoreData?.programmeInfo?.secondSubject,
      thirdSubject: putmeStoreData?.programmeInfo?.thirdSubject,
      fourthSubject: putmeStoreData?.programmeInfo?.fourthSubject,
      firstSubjectUtmeScore: programmeInfo?.firstSubjectUtmeScore || null,
      secondSubjectUtmeScore: programmeInfo?.secondSubjectUtmeScore || null,
      thirdSubjectUtmeScore: programmeInfo?.thirdSubjectUtmeScore || null,
      fourthSubjectUtmeScore: programmeInfo?.fourthSubjectUtmeScore || null,
    },
    resolver: yupResolver(JambDetailsSchema)
  });



  const onSubmit = (programmeInfo) => {
    const requestBody = {
      url: hndJambDetailsFormUrl(),
      data: {
        JambNumber: programmeInfo?.regNo,
        ApplicantId: personalInfo?.postUtmeApplicantBasicInformationId,
        FirstSubjectId: programmeInfo?.firstSubject?.value,
        SecondSubjectId: programmeInfo?.secondSubject?.value,
        ThirdSubjectId: programmeInfo?.thirdSubject?.value,
        FourthSubjectId: programmeInfo?.fourthSubject?.value,
        FirstSubjectScore: programmeInfo?.firstSubjectUtmeScore,
        SecondSubjectScore: programmeInfo?.secondSubjectUtmeScore,
        ThirdSubjectScore: programmeInfo?.thirdSubjectUtmeScore,
        FourthSubjectScore: programmeInfo?.fourthSubjectUtmeScore,
      }
    };
    mutate(requestBody, {
      onSuccess: () => {
        const successFlag = window.AJS.flag({
          type: "success",
          title: "Details saved successfully",
          body: "Your JAMB details has been successfully saved"
        });
        setTimeout(() => {
          successFlag.close();
        }, 5000);
        dispatch({
          type: SAVE_PUTME_INFO,
          payload: {
            ...putmeStoreData,
            programmeInfo
          }
        });
        replace({ hash: "#section_d", state });
      },
      onError: () => {
        const errorFlag = window.AJS.flag({
          type: "error",
          title: "Failed!",
          body: "Something went wrong"
        });
        setTimeout(() => {
          errorFlag.close();
        }, 5000);
      }
    });
  };

  

  useEffect(() => {
    if (errors?.utmeResultSlip) {
      const successFlag = window.AJS.flag({
        type: "error",
        title: "Failed!",
        body: "You have to upload your UTME slip!"
      });
      setTimeout(() => {
        successFlag.close();
      }, 5000);
    }
  }, [errors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Jumbotron
        headerText="JAMB Programme Details"
        endText="Step 3 of 4"
        footerContent={
          <div>
            <Button
              data-cy="back"
              label="Previous"
              buttonClass="secondary"
              type="button"
              disabled={isFormLoading}
              onClick={() => replace({ hash: "#section_b", state })}
            />
            <Button
              data-cy="submit_personal"
              label="Next"
              buttonClass="primary"
              type="submit"
              disabled={isFormLoading}
              loading={isFormLoading}
            />
          </div>

        }
        footerStyle="d-flex justify-content-end"
      >
        <div className="container-fluid px-4 my-4">
          <div className="row">
            <div className="col-lg-3 d-flex align-items-center">
              <label htmlFor="regNo">Reg No</label>
            </div>
            <div className="col-lg-9">
              <TextField
                autoComplete="off"
                placeholder="Enter registration number"
                className="w-100"
                type="text"
                id="regNo"
                name="regNo"
                register={register}
                required
                disabled
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3">
          <span>Please the subject you wrote in JAMB and the score obtained</span>
        </div>
        <div className="container-fluid px-4 my-4">
          <div className="row">
            <div className="col-lg-3  d-flex align-items-center">
              <label htmlFor="firstSubject">Subject 1 / Score*</label>
            </div>
            <div className="col-lg-6">
              <Controller
                name="firstSubject"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <SMSelect
                    {...field}
                    placeholder="Select a first subject"
                    searchable={true}
                    id="firstSubject"
                    disabled={fromJambState}
                    options={allPutmeSubjects}
                    isError={!!errors.firstSubject}
                    errorText={
                      errors.firstSubject &&
                      errors.firstSubject.message
                    }
                  />
                )}
              />
            </div>
            <div className="col-lg-3">
              <TextField
                autoComplete="off"
                placeholder="Enter UTME score"
                className="w-100"
                type="text"
                id="firstSubject"
                name="firstSubjectUtmeScore"
                register={register}
                required
                disabled={fromJambState}
                isError={!!errors.firstSubjectUtmeScore}
                errorText={
                  errors.firstSubjectUtmeScore && errors.firstSubjectUtmeScore.message
                }
              />
            </div>
          </div>
        </div>
        <div className="container-fluid px-4 my-4">
          <div className="row">
            <div className="col-lg-3  d-flex align-items-center">
              <label htmlFor="secondSubject">Subject 2 / Score*</label>
            </div>
            <div className="col-lg-6">
              <Controller
                name="secondSubject"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <SMSelect
                    {...field}
                    placeholder="Select a second subject"
                    searchable={true}
                    id="secondSubject"
                    disabled={fromJambState}
                    options={allPutmeSubjects}
                    isError={!!errors.secondSubject}
                    errorText={
                      errors.secondSubject &&
                      errors.secondSubject.message
                    }
                  />
                )}
              />
            </div>
            <div className="col-lg-3">
              <TextField
                autoComplete="off"
                placeholder="Enter UTME score"
                className="w-100"
                type="text"
                id="secondSubject"
                name="secondSubjectUtmeScore"
                register={register}
                required
                disabled={fromJambState}
                isError={!!errors.secondSubjectUtmeScore}
                errorText={
                  errors.secondSubjectUtmeScore && errors.secondSubjectUtmeScore.message
                }
              />
            </div>
          </div>
        </div>
        <div className="container-fluid px-4 my-4">
          <div className="row">
            <div className="col-lg-3 d-flex align-items-center">
              <label htmlFor="thirdSubject">Subject 3 / Score*</label>
            </div>
            <div className="col-lg-6">
              <Controller
                name="thirdSubject"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <SMSelect
                    {...field}
                    placeholder="Select a third subject"
                    searchable={true}
                    id="thirdSubject"
                    disabled={fromJambState}
                    options={allPutmeSubjects}
                    isError={!!errors.thirdSubject}
                    errorText={
                      errors.thirdSubject &&
                      errors.thirdSubject.message
                    }
                  />
                )}
              />
            </div>
            <div className="col-lg-3">
              <TextField
                autoComplete="off"
                placeholder="Enter UTME score"
                className="w-100"
                type="text"
                id="thirdSubject"
                name="thirdSubjectUtmeScore"
                register={register}
                required
                disabled={fromJambState}
                isError={!!errors.thirdSubjectUtmeScore}
                errorText={
                  errors.thirdSubjectUtmeScore && errors.thirdSubjectUtmeScore.message
                }
              />
            </div>
          </div>
        </div>
        <div className="container-fluid px-4 my-4">
          <div className="row">
            <div className="col-lg-3  d-flex align-items-center">
              <label htmlFor="fourthSubject">Subject 4 / Score*</label>
            </div>
            <div className="col-lg-6">
              <Controller
                name="fourthSubject"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <SMSelect
                    {...field}
                    placeholder="Select a fourth subject"
                    searchable={true}
                    id="fourthSubject"
                    disabled={fromJambState}
                    options={allPutmeSubjects}
                    isError={!!errors.fourthSubject}
                    errorText={
                      errors.fourthSubject &&
                      errors.fourthSubject.message
                    }
                  />
                )}
              />
            </div>
            <div className="col-lg-3">
              <TextField
                autoComplete="off"
                placeholder="Enter UTME score"
                className="w-100"
                type="text"
                id="fourthSubject"
                name="fourthSubjectUtmeScore"
                register={register}
                required
                disabled={fromJambState}
                isError={!!errors.fourthSubjectUtmeScore}
                errorText={
                  errors.fourthSubjectUtmeScore && errors.fourthSubjectUtmeScore.message
                }
              />
            </div>
          </div>
        </div>
      </Jumbotron>
    </form>
  );
};
