using HMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HMS.Services.Interfaces
{
    public interface INotification
    {
        Task<bool> InsertNotification(Notification notification);
        Task<IEnumerable<Notification>> GetNotifications(string userId);
        Task<IEnumerable<Notification>> GetTopNotifications(string userId);
        Task<int> GetNotificationCount(string userId);
    }
}
