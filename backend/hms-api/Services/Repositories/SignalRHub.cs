using HMS.Models;
using HMS.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace HMS.Services.Repositories
{
    public class SignalRHub : Hub<IChatClient>
    {
        public async Task SendMessage(ChatMessage message)
        {
            await Clients.All.ReceiveMessage(message);
        }
        public async Task SendNotification(Notification notification)
        {
            await Clients.All.RecieveNotification(notification);
        }
    }
}
