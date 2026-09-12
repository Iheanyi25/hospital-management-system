using AutoMapper;
using HMS.Database;
using HMS.Models;
using HMS.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HMS.Services.Repositories
{
    public class NotificationRepository : INotification
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _applicationDbContext;

        public NotificationRepository(ApplicationDbContext applicationDbContext, IMapper mapper)
        {
            _applicationDbContext = applicationDbContext;
            _mapper = mapper;
        }
        public async Task<int> GetNotificationCount(string userId) => await _applicationDbContext.Notifications.Where(n => n.UserId == userId && n.IsRead == false).CountAsync();
       

        public async Task<IEnumerable<Notification>> GetNotifications(string userId) => await _applicationDbContext.Notifications.Where(n => n.UserId == userId && n.IsRead == false).OrderByDescending(n => n.DateCreated).ToListAsync();
       

        public async Task<IEnumerable<Notification>> GetTopNotifications(string userId) => await _applicationDbContext.Notifications.Where(n => n.UserId == userId && n.IsRead == false).Take(5).OrderByDescending(n => n.DateCreated).ToListAsync();
       

        public async Task<bool> InsertNotification(Notification notification)
        {
            try
            {
                if (notification == null)
                {
                    return false;
                }

                _applicationDbContext.Notifications.Add(notification);
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
