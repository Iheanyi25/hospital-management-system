

using HMS.Models;
using System;

namespace HMS.Areas.Nurse.Dtos
{
    public class NurseReportDtoForView
    {
        public string Id { get; set; }
        public string Shift { get; set; }
        public string NursingAssessment { get; set; }
        public string NursingDiagnosis { get; set; }
        public string NursingObjectives { get; set; }
        public string NursingActions { get; set; }
        public string NursingEvaluation { get; set; }
        public string ReportDescription { get; set; }
        public DateTime DateOfShift { get; set; }
        public DateTime TimeOfShift { get; set; }
        public string NurseId { get; set; }
        public string NANDAReport { get; set; }
        public string DailyReport { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class NurseReportDtoForCreate
    {
        public string NurseId { get; set; }
        public string Shift { get; set; }
    }

    public class NursingReportDtoForUpdate
    {
        public string Id { get; set; }
        public string NursingAssessment { get; set; }
        public string NursingDiagnosis { get; set; }
        public string NursingObjectives { get; set; }
        public string NursingActions { get; set; }
        public string NursingEvaluation { get; set; }
        public string NurseId { get; set; }
    }

    public class NANDAReportDtoForUpdate
    {
        public string Id { get; set; }
        public string NANDAReport { get; set; }
        public string NurseId { get; set; }
    }

    public class DailyReportDtoForUpdate
    {
        public string Id { get; set; }
        public string DailyReport { get; set; }
        public string NurseId { get; set; }
    }
}
