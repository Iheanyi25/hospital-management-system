using AutoMapper;
using HMS.Models;
using HMS.Services.Dtos;

namespace HMS.Services.Profiles
{
    public class ChatMessageProfile : Profile
    {
        public ChatMessageProfile()
        {
            CreateMap<ChatMessageDtoForCreate, ChatMessage>().ReverseMap();
        }
    }
}
