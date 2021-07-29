using HMS.Models;
using System;
namespace HMS.Models
{
    public class ChatMessage
    {
        public ChatMessage()
        {
            Id = Guid.NewGuid().ToString();
            CreatedDate = DateTime.Now;
        }
        public string Id { get; set; }
        public string FromUserId { get; set; }
        public string ToUserId { get; set; }
        public string Message { get; set; }
        public DateTime CreatedDate { get; set; }
        public virtual ApplicationUser FromUser { get; set; }
        public virtual ApplicationUser ToUser { get; set; }

    }
}