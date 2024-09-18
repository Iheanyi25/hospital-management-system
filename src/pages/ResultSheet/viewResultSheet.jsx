import { useRef, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useApiGet } from "../../api/apiCall";
import { useReactToPrint } from "react-to-print";
import {
  getAllDepartmentsUrl,
  getLevelUrl,
  getSemesterUrl,
  getSessionsUrl,
  getStudentTypeUrl,
  studentCompositeResultsUrl,
  studentSummaryResultsUrl
} from "../../api/urls";
import { Jumbotron, SMSelect, Button, Spinner } from "../../ui_elements";
import { formatSelectItems } from "../../utils/formatSelectItems";
import styles from "./style.module.css";
import { useState } from "react";
import { ResultSheet } from "./component/resultSheet";
import { SummarySheet } from "../SummarySheet/component/summarySheet";

const pageStyle = `
  @page {
    margin-left: 3rem;
    size: landscape;
    page-break-before: always;
  }

  // @media all {
  //   .pagebreak {
  //     display: none;
  //   }
  // }

  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
`;

const ViewResultSheet = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  // const [makeRequest, setMakeRequest] = useState(false);
  const [details, setDetails] = useState({});
  const [tableData, setData] = useState([]);

  const [summaryData, setSummaryData] = useState([])
  const [makeCompositeRequest, setMakeCompositeRequest] = useState(false);
  const [makeSummaryRequest, setMakeSummaryRequest] = useState(false);

  const componentRef = useRef();
  const summaryRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef?.current,
    pageStyle,
  });

  const handleSummaryPrint = useReactToPrint({
    content: () => summaryRef?.current,
    pageStyle,
  });

  const watchData = watch({
    StudentType: "StudentType",
  });

  const {
    data: compositeSheet,
    isLoading: isLoadingCompositeSheet,
    error: errorCompositeSheet,
  } = useApiGet(
    studentCompositeResultsUrl({
      levelId: details?.Level?.value,
      departmentId: details?.Department?.value,
      sessionId: details?.Session?.value,
      semesterId: details?.Semester?.value,
      studentTypeId: details?.StudentType?.value,
    }),
    {
      enabled: makeCompositeRequest,
      refetchOnWindowFocus: false,
    }
  );

  const { data: summarySheet, isLoading: isLoadingSummarySheet, error: errorSummarySheet } = useApiGet(studentSummaryResultsUrl({
    levelId: details?.Level?.value,
    departmentId: details?.Department?.value,
    sessionId: details?.Session?.value,
    semesterId: details?.Semester?.value,
    studentTypeId: details?.StudentType?.value,
  }), {
    enabled: makeSummaryRequest,
    refetchOnWindowFocus: false,
  })

  const getResultSummaryData = () => {
    return summarySheet?.data?.studentCourses?.items.map((student, i) => {
      return {
        id: i + 1,
        name: student?.fullName,
        regNo: student?.registrationNumber,
        coursesToRepeat: student?.coursesToRepeat ?  student?.coursesToRepeat : "-",
        coursesToTake: student?.coursesToTake ? student?.coursesToTake : "-",
        entryReq: student?.entryRequirement,
        cumCourseUnit: student?.cumulatoveCourseUnit,
        cgpa: student?.cgpa,
        cgpaRemark: student?.cgpaRemark
      }
    })
  }

  const getStudentData = () => {
    return compositeSheet?.data?.studentCourses?.map((student, i) => {
      const registerCourses = {};

      student?.registeredCourses.forEach((registeredCourse) => {
        registerCourses[registeredCourse.courseCode] = registeredCourse;
      });

      const subjects = compositeSheet.data.courses?.map((course) => {
        if (registerCourses[course.courseCode]) {
          return {
            courseCode: course.courseCode,
            grade: registerCourses[course.courseCode].grade,
            gradePoint: registerCourses[course.courseCode].gradePoint,
          };
        } else {
          return {
            courseCode: course.courseCode,
            grade: "-",
            gradePoint: "-",
          };
        }
      });

      return {
        id: i + 1,
        name: student?.fullName,
        regNo: student?.registrationNumber,
        cumulativeSemesterDataResponse: student?.cumulativeSemesterDataResponse,
        currentSemesterDataResponse: student?.currentSemesterDataResponse,
        ...(student?.previousSemesterDataResponse && {
          previousSemesterDataResponse: student?.previousSemesterDataResponse,
        }),
        subjects: subjects,
      };
    });
  };

  function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr?.length; i += chunkSize) {
      const chunk = arr?.slice(i, i + chunkSize);
      res.push(chunk);
    }
    return res;
  }

  useEffect(() => {
    if (compositeSheet?.success && makeCompositeRequest && !isLoadingCompositeSheet) {
      setData(sliceIntoChunks(getStudentData(), getStudentData().length));
      setTimeout(() => {
        handlePrint();
      }, 1000);
    }

    if (errorCompositeSheet && makeCompositeRequest && !isLoadingCompositeSheet) {
      setMakeRequest(false);
      const errorFlag = window.AJS.flag({
        type: "error",
        title: "Invalid Action!",
        body:
          errorCompositeSheet?.response?.data?.message ||
          `Invalid action, please enter correct details`,
      });
      setTimeout(() => {
        errorFlag.close();
      }, 5000);
    }

    if (summarySheet?.success && makeSummaryRequest && !isLoadingSummarySheet) {
      setSummaryData(getResultSummaryData());
      setTimeout(() => {
        handleSummaryPrint();
      }, 1000);
    }

    if (errorSummarySheet && makeSummaryRequest && !isLoadingSummarySheet) {
      setMakeRequest(false);
      const errorFlag = window.AJS.flag({
        type: "error",
        title: "Invalid Action!",
        body:
          errorCompositeSheet?.response?.data?.message ||
          `Invalid action, please enter correct details`,
      });
      setTimeout(() => {
        errorFlag.close();
      }, 5000);
    }
  }, [
    compositeSheet,
    errorCompositeSheet,
    makeCompositeRequest,
    isLoadingCompositeSheet,
    summarySheet,
    errorSummarySheet,
    isLoadingSummarySheet,
    makeSummaryRequest
  ]);

  const handleCompositeSubmit = (info) => {
    setDetails({ ...info });
    setMakeCompositeRequest(true);
    setMakeSummaryRequest(false);
  };

  const handleSummarySubmit = (info) => {
    setDetails({ ...info });
    setMakeCompositeRequest(false);
    setMakeSummaryRequest(true);
  }

  const {
    data: sessions,
    isLoading: isLoadingSessions,
    error: errorSessions,
  } = useApiGet(getSessionsUrl());

  const {
    data: studentType,
    isLoading: isLoadingStudentType,
    error: errorStudentType,
  } = useApiGet(getStudentTypeUrl());

  const {
    data: department,
    isLoading: isLoadingDepartment,
    error: errorDepartment,
  } = useApiGet(getAllDepartmentsUrl(watchData?.StudentType?.value), {
    enabled: !!watchData?.StudentType?.value,
  });

  const {
    data: levels,
    isLoading: isLoadingLevels,
    error: errorLevels,
  } = useApiGet(getLevelUrl(watchData?.StudentType?.value), {
    enabled: !!watchData?.StudentType?.value,
  });

  const {
    data: semester,
    isLoading: isLoadingSemester,
    error: errorSemester,
  } = useApiGet(getSemesterUrl());

  const allSessions = formatSelectItems(sessions?.data, "name", "id");

  const allStudentType = formatSelectItems(studentType?.data, "name", "id");

  const allDepartments = formatSelectItems(
    department?.data,
    "department",
    "departmentId"
  );

  const allLevels = formatSelectItems(levels?.data, "name", "id");

  const allSemester = formatSelectItems(semester?.data, "name", "id");

  if (isLoadingSessions || isLoadingStudentType || isLoadingSemester)
    return <Spinner />;

  if (
    errorSessions ||
    errorStudentType ||
    errorDepartment ||
    errorLevels ||
    errorSemester
  )
    return (
      "An error has occurred: " + errorSessions?.message ||
      errorDepartment?.message ||
      errorLevels?.message
    );

  return (
    <>
      <div className="d-none">
        <div ref={componentRef}>
          <ResultSheet compositeSheet={compositeSheet} data={tableData} />
        </div>
        <div ref={summaryRef}>
          <SummarySheet compositeSheet={compositeSheet} data={summaryData} />
        </div>
      </div>
      <Jumbotron
        headerText={"View Result Sheets"}
        footerContent={
          <div className="d-flex justify-content-end">
            <Button
              data-cy="view_record"
              type="button"
              buttonClass="secondary"
              label="Print Summary Sheet"
              loading={isLoadingSummarySheet}
              disabled={isLoadingDepartment || isLoadingLevels}
              onClick={handleSubmit(handleSummarySubmit)}
            />
            <Button
              data-cy="upload_list"
              type="button"
              buttonClass="primary"
              label="Print Composite Sheet"
              customClass="ml-2"
              onClick={handleSubmit(handleCompositeSubmit)}
              loading={isLoadingCompositeSheet}
              disabled={isLoadingDepartment || isLoadingLevels}
            />
          </div>
        }
      >
        <section className="p-4">
          <div className={styles.filter_container}>
            <div>
              <div className="row">
                <div className="col-lg-3  d-flex align-items-center">
                  <label className="font-weight-bold" htmlFor="student_type">
                    Session
                  </label>
                </div>
                <div className="col-lg-9">
                  <Controller
                    name="Session"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <SMSelect
                        {...field}
                        placeholder="Select Session Type"
                        //   onChange={onStudentTypeChange}
                        options={allSessions}
                        searchable={true}
                        id="Session"
                        isError={!!errors.Session}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="row">
                <div className="col-lg-3 d-flex align-items-center">
                  <label className="font-weight-bold" htmlFor="student_type">
                    Student Type
                  </label>
                </div>
                <div className="col-lg-9">
                  <Controller
                    name="StudentType"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <SMSelect
                        {...field}
                        placeholder="Select Student Type"
                        //   onChange={onStudentTypeChange}
                        options={allStudentType}
                        searchable={true}
                        id="StudentType"
                        isError={!!errors.StudentType}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {allDepartments.length > 0 && (
              <div>
                <div className="row">
                  <div className="col-lg-3  d-flex align-items-center">
                    <label className="font-weight-bold" htmlFor="student_type">
                      Department
                    </label>
                  </div>
                  <div className="col-lg-9">
                    <Controller
                      name="Department"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <SMSelect
                          {...field}
                          placeholder="Select a Department"
                          //   onChange={onStudentTypeChange}
                          options={allDepartments}
                          searchable={true}
                          id="Department"
                          isError={!!errors.Department}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
            {isLoadingDepartment && (
              <div>
                <div className="row">
                  <div className="col-lg-3  d-flex align-items-center">
                    <label className="font-weight-bold" htmlFor="student_type">
                      Department
                    </label>
                  </div>
                  <div className="col-lg-9">
                    <Spinner />
                  </div>
                </div>
              </div>
            )}

            {allLevels.length > 0 && (
              <div>
                <div className="row">
                  <div className="col-lg-3  d-flex align-items-center">
                    <label className="font-weight-bold">Level</label>
                  </div>
                  <div className="col-lg-9">
                    <Controller
                      name="Level"
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <SMSelect
                          {...field}
                          placeholder="Select a Level"
                          //   onChange={onStudentTypeChange}
                          options={allLevels}
                          searchable={true}
                          id="Level"
                          isError={!!errors.Level}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            )}

            {isLoadingLevels && (
              <div>
                <div className="row">
                  <div className="col-lg-3  d-flex align-items-center">
                    <label className="font-weight-bold">Levels</label>
                  </div>
                  <div className="col-lg-9">
                    <Spinner />
                  </div>
                </div>
              </div>
            )}

            <div>
              <div className="row">
                <div className="col-lg-3  d-flex align-items-center">
                  <label className="font-weight-bold" htmlFor="student_type">
                    Semester
                  </label>
                </div>
                <div className="col-lg-9">
                  <Controller
                    name="Semester"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <SMSelect
                        {...field}
                        placeholder="Select a Semester"
                        //   onChange={onStudentTypeChange}
                        options={allSemester}
                        searchable={true}
                        id="Semester"
                        isError={!!errors.Semester}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Jumbotron>{" "}
    </>
  );
};

export default ViewResultSheet;