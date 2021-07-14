using AutoMapper;
using HMS.Areas.HealthInsurance.Dtos;
using HMS.Models;

namespace HMS.Areas.HealthInsurance.Profiles
{
    public class NHISHealthPlanPatientProfile : Profile
    {
        public NHISHealthPlanPatientProfile()
        {
            CreateMap<NHISHealthPlanPatient, NHISHealthPlanPatientDtoForCreate>().ReverseMap();
            CreateMap<NHISSecondaryHealthplanPatientService, NHISHealthPlanPatientDtoForUpdate>().ReverseMap();
            CreateMap<NHISSecondaryHealthplanPatientService, NHISSecondaryHealthplanPatientServiceDtoForView>().ReverseMap();
            CreateMap<NHISHealthPlanPatient, NHISHealthPlanPatientDtoForUpdate>().ReverseMap();
            CreateMap<NHISHealthPlanPatient, NHISHealthPlanPatientDtoForDelete>().ReverseMap();

        }
    }
}
