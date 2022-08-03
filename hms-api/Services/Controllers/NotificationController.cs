using AutoMapper;
using HMS.Models;
using HMS.Services.Dtos;
using HMS.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HMS.Services.Controllers
{
    [Route("api/notification", Name = "Notification - Manage Notifications")]
    [ApiController]
    public class NotificationController : Controller
    {
        private readonly INotification _notification;
        private readonly IUser _user;
        private readonly IMapper _mapper;
        public NotificationController(IMapper mapper, IUser user, INotification notification)
        {
            _notification = notification;
            _user = user;
            _mapper = mapper;

        }

        [HttpGet("GetNotificationCount")]
        public async Task<IActionResult> GetNotificationCount(string UserId)
        {
            var notificationCount = await _notification.GetNotificationCount(UserId);

            return Ok(notificationCount);

        }

        [HttpGet("GetNotifications")]
        public async Task<IActionResult> GetNotifications(string userId)
        {
            var notifications = await _notification.GetNotifications(userId);
            return Ok(notifications);
        }

        [HttpPost]
        [Route("GetTopNotifications")]
        public async Task<IActionResult> GetTopNotifications(string userId)
        {
            var notifications = await _notification.GetTopNotifications(userId);
            return Ok(notifications);
        }

        [HttpPost("CreateNotification")]
        public async Task<IActionResult> CreateNotification(NotificationDtoForCreate notification)
        {
            if (notification == null)
            {
                return BadRequest(new { message = "Invalid post attempt" });
            }

            var notificationToCreate = _mapper.Map<Notification>(notification);
            var response = await _notification.InsertNotification(notificationToCreate);

            if (!response)
            {
                return BadRequest(new { response = "301", notification = "Failed to create notification" });
            }

            return Ok(new
            {
                response,
                notification = "Notification created successfully"
            });
        }
    }
}
