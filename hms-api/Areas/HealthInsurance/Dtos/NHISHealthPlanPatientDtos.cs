
using HMS.Models;

namespace HMS.Areas.HealthInsurance.Dtos
{
    public class NHISHealthPlanPatientDtoForCreate
    {
        public string PatientId { get; set; }
        public string NHISHealthPlanId { get; set; }
    }

    public class NHISHealthPlanPatientDtoForUpdate
    {
        public string PatientId { get; set; }
        public string NHISHealthPlanId { get; set; }
        public string AuthorizationCode { get; set; }
        public string ServiceId { get; set; }
    }

    public class NHISHealthPlanPatientDtoForDelete
    {
        public string Id { get; set; }
    }
    public class NHISSecondaryHealthplanPatientServiceDtoForView
    {
        public string PatientId { get; set; }
        public ApplicationUser Patient { get; set; }
        public string NHISHealthPlanId { get; set; }
        public NHISHealthPlan NHISHealthPlan { get; set; }
        public string ServiceId { get; set; }
        public Service Service { get; set; }
        public string AuthorizationCode { get; set; }
        public string Status { get; set; }
    }
}
