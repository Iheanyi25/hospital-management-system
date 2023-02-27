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
  const roundUp = (num) => Math.round(num * 100) / 100;

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
        {students.map((students) => (
          <tr key={students.id}>
            <td>{students.id}</td>
            <td className="course-fields-name">
              {students.name}
              <br /> {students.regNo}
            </td>
            {students?.subjects?.map((stud) => (
              <>
                <td className="td-align-center">{stud.grade}</td>
                <td className="td-align-center">{stud.gradePoint}</td>
              </>
            ))}
            <td className="td-align-center">
              {students?.currentSemesterDataResponse?.creditUnit}
            </td>
            <td className="td-align-center">
              {roundUp(students?.currentSemesterDataResponse?.creditPoint)}
            </td>
            <td className="td-align-center">
              {roundUp(
                students?.currentSemesterDataResponse?.gradePointAverage
              )}
            </td>
            {semester !== "FIRST SEMESTER" && (
              <>
                <td className="td-align-center">
                  {students?.previousSemesterDataResponse?.creditUnit}
                </td>
                <td className="td-align-center">
                  {roundUp(students?.previousSemesterDataResponse?.creditPoint)}
                </td>
                <td className="td-align-center">
                  {roundUp(
                    students?.previousSemesterDataResponse?.gradePointAverage
                  )}
                </td>
              </>
            )}
            <td className="td-align-center">
              {students?.cumulativeSemesterDataResponse?.creditUnit}
            </td>
            <td className="td-align-center">
              {roundUp(students?.cumulativeSemesterDataResponse?.creditPoint)}
            </td>
            <td className="td-align-center">
              {roundUp(
                students?.cumulativeSemesterDataResponse?.gradePointAverage
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
