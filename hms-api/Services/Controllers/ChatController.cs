using AutoMapper;
using HMS.Database;
using HMS.Models;
using HMS.Services.Dtos;
using HMS.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace HMS.Services.Controllers
{
    [Route("api/chat", Name = "Chat - Manage Chats")]
    [ApiController]
    
    public class ChatController : Controller
    {

        private readonly IChat _chat;
        private readonly IUser _user;
        private readonly IMapper _mapper;
        public ChatController(IMapper mapper,IUser user, IChat chat)
        {
            _chat = chat;
            _user = user;
            _mapper = mapper;  

        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsersAsync(string UserId)
        {
            var users = await _user.GetUsersExceptLoggedInUser(UserId);

            return Ok(users);

        }

        [HttpGet("users/{userId}")]
        public async Task<IActionResult> GetUserDetailsAsync(string userId)
        {
            var user = await _user.GetUserByIdAsync(userId);
            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> SaveMessageAsync(ChatMessageDtoForCreate message)
        {
            if (message == null)
            {
                return BadRequest(new { message = "Invalid post attempt" });
            }

            var chatToCreate = _mapper.Map<ChatMessage>(message);
            var response = await _chat.InsertChat(chatToCreate);
            
            if (!response)
            {
                return BadRequest(new { response = "301", message = "Failed to insert chat" });
            }

            return Ok(new
            {
                response,
                message = "Chat created successfully"
            });
        }

        [HttpGet("contactId")]
        public async Task<IActionResult> GetConversationAsync(string contactId, string userId)
        {
            var conversation = await _chat.GetConversation(contactId, userId);

            return Ok(conversation);
        }
    }
}

