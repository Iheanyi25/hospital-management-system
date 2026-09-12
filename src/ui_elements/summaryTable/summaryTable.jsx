import "./style.css";

export const SummaryTable = ({ students }) => {



  return (
    <table className="summary-table">
      <thead>
        <tr>
          <td className="td-align-center">S/N</td>
          <td className="td-align-center">STUDENT NAME AND REG NO</td>
          <td className="td-align-center">ENTRY REQUIREMENT</td>
          <td className="td-align-center">CUM. C. UNIT</td>
          <td className="td-align-center">CGPA</td>
          <td className="td-align-center">COURSE(S) TO REPEAT</td>
          <td className="td-align-center">COURSE(S) TO TAKE</td>
          <td className="td-align-center">REMARKS</td>
        </tr>
      </thead>
      <tbody>
        {students?.map((student, index)=> (
          <tr key = {index}>
            <td className="td-align-center">{student.id}</td>
            <td className="">
              {student.name}
              <br /> 
              {student.regNo}
            </td>
            <td className="td-align-center">
              {student.entryReq}
            </td>
            <td className="td-align-center">{student.cumCourseUnit}</td>
            <td className="td-align-center">{student.cgpa}</td>
            <td className="td-align-center">{student.coursesToRepeat}</td>
            <td className="td-align-center">{student.coursesToTake}</td>
            <td className="td-align-center">{student.cgpaRemark}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}