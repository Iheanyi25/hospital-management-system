import { TableHeader, SummaryTable } from "../../../ui_elements";

export const SummarySheet = ({ compositeSheet}) => {


  const data =  [
    {
      id: 1,
      name: "NWANKWO CHIDIMMA JUDITH",
      regNo: 2013316001,
      entry: "SATISFIED",
      unit: 5.00,
      cgpa: 5.00,
      repeatCourses: "GLT 111, GNS 121, STC 121",
      takeCourses: "-",
      remarks: "-"
    },
    {
      id: 2,
      name: "KAINE CHIBUEZE FRANKLYN",
      regNo: 2013316001,
      entry: "SATISFIED",
      unit: 5.00,
      cgpa: 5.00,
      repeatCourses: "STC 121",
      takeCourses: "-",
      remarks: "-"
    },
    {
      id: 3,
      name: "NWANKWO CHIDIMMA JUDITH",
      regNo: 2013316001,
      entry: "SATISFIED",
      unit: 5.00,
      cgpa: 5.00,
      repeatCourses: "-",
      takeCourses: "-",
      remarks: "-"
    },
    {
      id: 4,
      name: "KAINE CHIBUEZE FRANKLYN",
      regNo: 2013316001,
      entry: "SATISFIED",
      unit: 5.00,
      cgpa: 5.00,
      repeatCourses: "STP 111, STC 121, GNS 106, GLT 123",
      takeCourses: "-",
      remarks: "-"
    },
    {
      id: 5,
      name: "NWANKWO CHIDIMMA JUDITH",
      regNo: 2013316001,
      entry: "SATISFIED",
      unit: 5.00,
      cgpa: 5.00,
      repeatCourses: "STC 121",
      takeCourses: "-",
      remarks: "-"
    },
    {
      id: 6,
      name: "KAINE CHIBUEZE FRANKLYN	",
      regNo: 2013316001,
      entry: "SATISFIED",
      unit: 5.00,
      cgpa: 5.00,
      repeatCourses: "STP 112, STP 111, STC 121, COM 123",
      takeCourses: "-",
      remarks: "-"
    },
    {
      id: 7,
      name: "NWANKWO CHIDIMMA JUDITH",
      regNo: 2013316001,
      entry: "SATISFIED",
      unit: 5.00,
      cgpa: 5.00,
      repeatCourses: "STP 111, STC 121",
      takeCourses: "-",
      remarks: "-"
    },
    {
      id: 8,
      name: "KAINE CHIBUEZE FRANKLYN	",
      regNo: 2013316001,
      entry: "SATISFIED",
      unit: 5.00,
      cgpa: 5.00,
      repeatCourses: "STP 123",
      takeCourses: "-",
      remarks: "-"
    },
    {
      id: 9,
      name: "NWANKWO CHIDIMMA JUDITH",
      regNo: 2013316001,
      entry: "SATISFIED",
      unit: 5.00,
      cgpa: 5.00,
      repeatCourses: "-",
      takeCourses: "-",
      remarks: "-"
    },
    {
      id: 10,
      name: "KAINE CHIBUEZE FRANKLYN	",
      regNo: 2013316001,
      entry: "SATISFIED",
      unit: 5.00,
      cgpa: 5.00,
      repeatCourses: "-",
      takeCourses: "-",
      remarks: "-"
    },
  ]

  return (
    <>
      <TableHeader
        details={{
          faculty: compositeSheet?.data?.faculty || "-",
          department: compositeSheet?.data?.department || "-",
          semester: compositeSheet?.data?.semester || "-",
          date: compositeSheet?.data?.date || "-",
          programme: compositeSheet?.data?.programme || "-",
          session: compositeSheet?.data?.session || "-",
        }}
        result = {false}
      />
      <SummaryTable
        semester={compositeSheet?.data?.semester}
        subjects={compositeSheet?.data?.courses}
        students={data}
      />
     
    </>
  )

}