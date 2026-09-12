
using HMS.Areas.Patient.Dtos;
using System;

namespace HMS.Areas.Nurse.Dtos
{
    public class AntenatalDtoForView
    {
        public string Id { get; set; }
        public string PatientId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public bool FirstTimePregnancy { get; set; }
        public string PreviousSurgeries { get; set; }
        public string NumberOfDeadChildren { get; set; }
        public string NumberOfLivingChildren { get; set; }
        public string CauseOfDeath { get; set; }
        public string LastPregnancyComplication { get; set; }
    }

    public class AntenatalDtoForCreate
    {
        public string PatientId { get; set; }
        public bool FirstTimePregnancy { get; set; }
        public string PreviousSurgeries { get; set; }
        public string NumberOfDeadChildren { get; set; }
        public string NumberOfLivingChildren { get; set; }
        public string CauseOfDeath { get; set; }
        public string LastPregnancyComplication { get; set; }
    }

    public class AntenatalDtoForUpdate
    {
        public string Id { get; set; }
        public string PatientId { get; set; }
        public bool FirstTimePregnancy { get; set; }
        public string PreviousSurgeries { get; set; }
        public string NumberOfDeadChildren { get; set; }
        public string NumberOfLivingChildren { get; set; }
        public string CauseOfDeath { get; set; }
        public string LastPregnancyComplication { get; set; }
    }


    public class AntenatalRecordDtoForView
    {
        public string Id { get; set; }
        public string FundalHeight { get; set; }
        public string Present { get; set; }
        public string LIE { get; set; }
        public string FeotalHeartRate { get; set; }
        public string UrineAIBumin { get; set; }
        public string UrineSugar { get; set; }
        public string BloodPressure { get; set; }
        public string Weight { get; set; }
        public string HB { get; set; }
        public string Odema { get; set; }
        public string Remarks { get; set; }
        public string InitiatorId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DateOfReturn { get; set; }
        public DateTime DateGenerated { get; set; }
        public AntenatalDtoForView Antenatal { get; set; }
    }

    public class AntenatalRecordDtoForCreate
    {
        public string FundalHeight { get; set; }
        public string Present { get; set; }
        public string LIE { get; set; }
        public string FeotalHeartRate { get; set; }
        public string UrineAIBumin { get; set; }
        public string UrineSugar { get; set; }
        public string BloodPressure { get; set; }
        public string Weight { get; set; }
        public string HB { get; set; }
        public string Odema { get; set; }
        public string Remarks { get; set; }
        public DateTime DateOfReturn { get; set; }
        public string AntenatalId { get; set; }
        public string InitiatorId { get; set; }
    }

    public class AntenatalRecordDtoForUpdate
    {
        public string Id { get; set; }
        public string FundalHeight { get; set; }
        public string Present { get; set; }
        public string LIE { get; set; }
        public string FeotalHeartRate { get; set; }
        public string UrineAIBumin { get; set; }
        public string UrineSugar { get; set; }
        public string BloodPressure { get; set; }
        public string Weight { get; set; }
        public string HB { get; set; }
        public string Odema { get; set; }
        public string Remarks { get; set; }
        public DateTime DateOfReturn { get; set; }
        public string AntenatalId { get; set; }
        public string InitiatorId { get; set; }
    }
}
