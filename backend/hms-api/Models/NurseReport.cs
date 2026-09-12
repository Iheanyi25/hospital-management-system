

using System;

namespace HMS.Models
{
    public class NurseReport
    {
        public NurseReport()
        {
            Id = Guid.NewGuid().ToString();
            DateOfShift = DateTime.Now;
            TimeOfShift = DateTime.Now;
        }

        public string Id { get; set; }
        public string Shift { get; set; }
        public string NursingAssessment { get; set; }
        public string NursingDiagnosis { get; set; }
        public string NursingObjectives { get; set; }
        public string NursingActions { get; set; }
        public string NursingEvaluation { get; set; }
       
        public string ReportDescription { get; set; }
        public string NANDAReport { get; set; }
        public string DailyReport { get; set; }
        public DateTime DateOfShift { get; set; }
        public DateTime TimeOfShift { get; set; }
        public string NurseId { get; set; }
        public ApplicationUser Nurse { get; set; }

    }
}
