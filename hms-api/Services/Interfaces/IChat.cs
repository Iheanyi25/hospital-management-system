using HMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HMS.Services.Interfaces
{
    public interface IChat
    {
        Task<bool> InsertChat(ChatMessage message);
        Task<IEnumerable<ChatMessage>> GetConversation(string contactId, string userId);
    }
}
