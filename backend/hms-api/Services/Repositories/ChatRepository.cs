using AutoMapper;
using HMS.Database;
using HMS.Models;
using HMS.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HMS.Services.Repositories
{
    public class ChatRepository : IChat
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationDbContext;

        public ChatRepository(ApplicationDbContext applicationDbContext, IMapper mapper)
        {
            _applicationDbContext = applicationDbContext;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ChatMessage>> GetConversation(string contactId, string userId)
        {
            var messages = await _applicationDbContext.ChatMessages
                         .Where(h => (h.FromUserId == contactId && h.ToUserId == userId) || (h.FromUserId == userId && h.ToUserId == contactId))
                         .OrderBy(a => a.CreatedDate)
                         .Include(a => a.FromUser)
                         .Include(a => a.ToUser)
                         .Select(x => new ChatMessage
                         {
                             FromUserId = x.FromUserId,
                             Message = x.Message,
                             CreatedDate = x.CreatedDate,
                             Id = x.Id,
                             ToUserId = x.ToUserId,
                             ToUser = x.ToUser,
                             FromUser = x.FromUser
                         }).ToListAsync();

            return messages;
        }
        public async Task<bool> InsertChat(ChatMessage message)
        {
            try
            {
                if (message == null)
                {
                    return false;
                }

                _applicationDbContext.ChatMessages.Add(message);
                await _applicationDbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
