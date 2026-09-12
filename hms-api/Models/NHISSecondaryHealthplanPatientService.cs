using System;

namespace HMS.Models
{
    public class NHISSecondaryHealthplanPatientService
    {
        public NHISSecondaryHealthplanPatientService()
        {
            Id = Guid.NewGuid().ToString();
            DateCreated = DateTime.Now;
            Status = "Pending";
        }

        public string Id { get; set; }
        public string PatientId { get; set; }
        public virtual ApplicationUser Patient { get; set; }
        public string ServiceId { get; set; }
        public virtual Service Service { get; set; }
        public string AuthorizationCode { get; set; }
        public string Status { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
