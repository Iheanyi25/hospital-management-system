using AutoMapper;
using HMS.Models;
using HMS.Services.Dtos;


namespace HMS.Services.Profiles
{
    public class NotificationProfile : Profile
    {
        public NotificationProfile()
        {
            CreateMap<NotificationDtoForCreate, Notification>().ReverseMap();
        }
    }
}
