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
        {students?.map((student)=> (
          <tr key = {student.id}>
            <td className="td-align-center">{student.id}</td>
            <td className="">
              {student.name}
              <br /> 
              {student.regNo}
            </td>
            <td className="td-align-center">
              {student.entry}
            </td>
            <td className="td-align-center">{student.unit}</td>
            <td className="td-align-center">{student.cgpa}</td>
            <td className="td-align-center">{student.repeatCourses}</td>
            <td className="td-align-center">{student.takeCourses}</td>
            <td className="td-align-center">{student.remarks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}