using AutoMapper;
using HMS.Areas.Nurse.Dtos;
using HMS.Areas.Patient.Dtos;
using HMS.Models;

namespace HMS.Areas.Nurse.Profiles
{
    public class AntenatalProfile : Profile
    {
        public AntenatalProfile()
        {
            CreateMap<Antenatal, AntenatalDtoForView>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.Patient.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.Patient.LastName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Patient.Email))
                .ReverseMap();
            CreateMap<Antenatal, AntenatalDtoForCreate>().ReverseMap();
            CreateMap<Antenatal, AntenatalDtoForUpdate>().ReverseMap();

            CreateMap<AntenatalRecord, AntenatalRecordDtoForView>()
              .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.Initiator.FirstName))
              .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.Initiator.LastName))
              .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Initiator.Email))
              .ReverseMap();
            CreateMap<AntenatalRecord, AntenatalRecordDtoForCreate>().ReverseMap();
            CreateMap<AntenatalRecord, AntenatalRecordDtoForUpdate>().ReverseMap();
        }
    }
}
