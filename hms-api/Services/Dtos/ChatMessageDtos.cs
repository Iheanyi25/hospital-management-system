using System;

namespace HMS.Services.Dtos
{
    public class ChatMessageDtoForCreate
    {
        public string FromUserId { get; set; }
        public string ToUserId { get; set; }
        public string Message { get; set; }
    
    }
}
