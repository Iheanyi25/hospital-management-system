using HMS.Models;
using System.Threading.Tasks;

namespace HMS.Services.Interfaces
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);
        Task RecieveNotification(Notification notification);
    }
}