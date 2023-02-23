import "./style.css";

export const ResultTable = ({
  semester = "2",
  subjects = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  students = [
    {
      name: "NWANKWO CHIDIMMA JUDITH",
      reg: 2013316001,
      subjects: [
        {
          gr: "A",
          gp: "11.00",
        },
        {
          gr: "A",
          gp: "11.00",
        },
        {
          gr: "A",
          gp: "11.00",
        },
        {
          gr: "A",
          gp: "11.00",
        },
        {
          gr: "A",
          gp: "11.00",
        },
        {
          gr: "A",
          gp: "11.00",
        },
        {
          gr: "A",
          gp: "11.00",
        },
        {
          gr: "A",
          gp: "11.00",
        },
        {
          gr: "A",
          gp: "11.00",
        },
        {
          gr: "A",
          gp: "11.00",
        },
        {
          gr: "A",
          gp: "11.00",
        },
        {
          gr: "A",
          gp: "11.00",
        },
      ],
    },
  ],
}) => {
  return (
    <table className="result-table-th">
      <thead>
        <tr>
          <td></td>
          <td></td>
          {subjects.map((sub, i) => (
            <td colSpan="2" className="vertical-td course-fields" key={i}>
              {sub?.courseTitle}
              <br />
              {sub?.courseCode}
            </td>
          ))}

          <td colSpan="3" rowSpan="1" className="td-align-center">
            CURRENT SEMESTER
          </td>

          {semester !== "FIRST SEMESTER" && (
            <td colSpan="3" rowSpan="1" className="td-align-center">
              PREVIOUS SEMESTER
            </td>
          )}
          <td colSpan="3" rowSpan="1" className="td-align-center">
            CUMULATIVE
          </td>
        </tr>
        <tr>
          <td></td>
          <td>CREDIT UNIT</td>
          {subjects?.map((cred, i) => (
            <td className="td-align-center" colSpan="2" key={i}>
              {cred?.courseUnit}
            </td>
          ))}

          <td rowSpan="2" className="vertical-td">
            TOTAL CREDIT UNITS
          </td>
          <td rowSpan="2" className="vertical-td">
            TOTAL CREDIT POINT
          </td>
          <td rowSpan="2" className="vertical-td">
            GRADE POINT AVERAGE
          </td>

          {semester !== "FIRST SEMESTER" && (
            <>
              <td rowSpan="2" className="vertical-td">
                TOTAL CREDIT UNITS
              </td>
              <td rowSpan="2" className="vertical-td">
                TOTAL CREDIT POINT
              </td>
              <td rowSpan="2" className="vertical-td">
                GRADE POINT AVERAGE
              </td>
            </>
          )}
          <td rowSpan="2" className="vertical-td">
            TOTAL CREDIT UNITS
          </td>
          <td rowSpan="2" className="vertical-td">
            TOTAL CREDIT POINT
          </td>
          <td rowSpan="2" className="vertical-td">
            GRADE POINT AVERAGE
          </td>
        </tr>
        <tr>
          <td>SN</td>
          <td>STUDENT NAME AND REG NO</td>
          {subjects?.map((_, i) => (
            <>
              <td className="td-align-center">GR</td>
              <td className="td-align-center">GP</td>
            </>
          ))}
        </tr>
      </thead>
      <tbody>
        {students.map((students, i) => (
          <tr>
            <td>{i + 1}</td>
            <td className="course-fields-name">
              {students.name}
              <br /> {students.regNo}
            </td>
            {students?.subjects?.map((stud) => (
              <>
                <td>{stud.grade}</td>
                <td>{stud.gradePoint}</td>
              </>
            ))}
            <td>{students?.cumulativeSemesterDataResponse?.creditPoint}</td>
            <td>{students?.cumulativeSemesterDataResponse?.creditUnit}</td>
            <td>
              {Math.floor(students?.cumulativeSemesterDataResponse?.gradePointAverage)}
            </td>
            {semester !== "FIRST SEMESTER" && (
              <>
                <td>{students?.previousSemesterDataResponse?.creditPoint}</td>
                <td>{students?.previousSemesterDataResponse?.creditUnit}</td>
                <td>
                  {Math.floor(students?.previousSemesterDataResponse?.gradePointAverage)}
                </td>
              </>
            )}
            <td>{students?.currentSemesterDataResponse?.creditPoint}</td>
            <td>{students?.currentSemesterDataResponse?.creditUnit}</td>
            <td>{Math.floor(students?.currentSemesterDataResponse?.gradePointAverage)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
