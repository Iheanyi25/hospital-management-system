using AutoMapper;
using HMS.Areas.Nurse.Dtos;
using HMS.Models;

namespace HMS.Areas.Nurse.Profiles
{
    public class ReportProfile : Profile
    {
        public ReportProfile()
        {
            CreateMap<NurseReport, NurseReportDtoForView>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.Nurse.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.Nurse.LastName))
                .ReverseMap();

            CreateMap<NurseReport, NurseReportDtoForCreate>().ReverseMap();
            CreateMap<NurseReport, NursingReportDtoForUpdate>().ReverseMap();
            //CreateMap<NurseReport, NANDADtoForUpdate>().ReverseMap();
            //CreateMap<NurseReport, DailyReportDtoForUpdate>().ReverseMap();
        }
    }
}
