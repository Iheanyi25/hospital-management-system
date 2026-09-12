using System;

namespace HMS.Models
{
    public class AntenatalRecord
    {
        public AntenatalRecord()
        {
            Id = Guid.NewGuid().ToString();
            DateGenerated = DateTime.Now;
        }
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
        public string AntenatalId { get; set; }
        public Antenatal Antenatal { get; set; }
        public string InitiatorId { get; set; }
        public ApplicationUser Initiator { get; set; }
        public DateTime DateOfReturn { get; set; }
        public DateTime DateGenerated { get; set; }
    }
}
