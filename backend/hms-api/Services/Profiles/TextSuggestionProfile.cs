using AutoMapper;
using HMS.Models;
using HMS.Services.Dtos;

namespace HMS.Services.Profiles
{
    public class TextSuggestionProfile : Profile
    {
        public TextSuggestionProfile()
        {
            CreateMap<TextSuggestionDtoForCreate, TextSuggestion>().ReverseMap();
            CreateMap<TextSuggestionDtoForUpdate, TextSuggestion>().ReverseMap();
            CreateMap<TextSuggestionDtoForDelete, TextSuggestion>().ReverseMap();
            CreateMap<TextSuggestionDtoForView, TextSuggestion>().ReverseMap();
        }
    }
}
