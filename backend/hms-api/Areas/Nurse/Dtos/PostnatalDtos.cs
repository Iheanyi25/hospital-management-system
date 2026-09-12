
using System;

namespace HMS.Areas.Nurse.Dtos
{
    public class PostnatalDtoForView
    {
        public string Id { get; set; }
        public DateTime DeliveryDate { get; set; }
        public DateTime DeliveryTime { get; set; }
        public string DeliveryMethod { get; set; }
        public string DeliveryNote { get; set; }
        public string DurationOfLabour { get; set; }
        public string Placenta { get; set; }
        public string Oxytocin { get; set; }
        public string Gender { get; set; }
        public string ApgarScoreAtOneMinute { get; set; }
        public string ApgarScoreAtFiveMinutes { get; set; }
        public string Height { get; set; }
        public string Weight { get; set; }
        public string Remarks { get; set; }
        public string DeliveredById { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class PostnatalDtoForCreate
    {
        public DateTime DeliveryDate { get; set; }
        public DateTime DeliveryTime { get; set; }
        public string DeliveryMethod { get; set; }
        public string DeliveryNote { get; set; }
        public string DurationOfLabour { get; set; }
        public string Placenta { get; set; }
        public string Oxytocin { get; set; }
        public string Gender { get; set; }
        public string ApgarScoreAtOneMinute { get; set; }
        public string ApgarScoreAtFiveMinutes { get; set; }
        public string Height { get; set; }
        public string Weight { get; set; }
        public string Remarks { get; set; }
        public string DeliveredById { get; set; }
    }

    public class PostnatalDtoForUpdate
    {
        public string Id { get; set; }
        public DateTime DeliveryDate { get; set; }
        public DateTime DeliveryTime { get; set; }
        public string DeliveryMethod { get; set; }
        public string DeliveryNote { get; set; }
        public string DurationOfLabour { get; set; }
        public string Placenta { get; set; }
        public string Oxytocin { get; set; }
        public string Gender { get; set; }
        public string ApgarScoreAtOneMinute { get; set; }
        public string ApgarScoreAtFiveMinutes { get; set; }
        public string Height { get; set; }
        public string Weight { get; set; }
        public string Remarks { get; set; }
        public string DeliveredById { get; set; }
    }

}
