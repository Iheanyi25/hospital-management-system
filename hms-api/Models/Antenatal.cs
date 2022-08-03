using System;

namespace HMS.Models
{
    public class Antenatal
    {
        public Antenatal()
        {
            Id = Guid.NewGuid().ToString();
            FirstTimePregnancy = false;
        }
        public string Id { get; set; }
        public string PatientId { get; set; }
        public bool FirstTimePregnancy { get; set; }
        public string PreviousSurgeries { get; set; }
        public string NumberOfDeadChildren { get; set; }
        public string NumberOfLivingChildren { get; set; }
        public string CauseOfDeath { get; set; }
        public string LastPregnancyComplication { get; set; }
        public ApplicationUser Patient { get; set; }
    }
}
