using System;

namespace HMS.Models
{
    public class Notification
    {
        public Notification()
        {
            Id = Guid.NewGuid().ToString();
            DateCreated = DateTime.Now;
            IsRead = false;
            
        }
        public string Id { get; set; }
        public string Message { get; set; }
        public string UserId { get; set; }
        public bool IsRead { get; set; }
        public DateTime DateCreated { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
