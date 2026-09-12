using AutoMapper;
using HMS.Areas.Nurse.Dtos;
using HMS.Models;

namespace HMS.Areas.Nurse.Profiles
{
    public class PostnatalProfile : Profile
    {
        public PostnatalProfile()
        {
            CreateMap<Postnatal, PostnatalDtoForView>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.DeliveredBy.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.DeliveredBy.LastName))
                .ReverseMap();
            CreateMap<Postnatal, PostnatalDtoForCreate>().ReverseMap();
            CreateMap<Postnatal, PostnatalDtoForUpdate>().ReverseMap();

        }
    }
}
