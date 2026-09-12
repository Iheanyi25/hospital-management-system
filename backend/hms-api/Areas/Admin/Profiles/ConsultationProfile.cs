using HMS.Models;
using static HMS.Areas.Patient.ViewModels.PatientConsultationViewModel;
using AutoMapper;
using HMS.Areas.Admin.Dtos;

namespace HMS.Areas.Admin.Profiles
{
    public class ConsultationProfile : Profile
    {
        public ConsultationProfile()
        {
            CreateMap<Consultation, BookConsultation>();
            CreateMap<BookConsultation, Consultation>();

            CreateMap<Consultation, ConsultationDtoForUpdate>();
            CreateMap<ConsultationDtoForUpdate, Consultation>();

            CreateMap<Consultation, ConsultationDtoForView>();
            CreateMap<ConsultationDtoForView, Consultation>();

            CreateMap<Consultation, ReassignConsultationDto>();
            CreateMap<ReassignConsultationDto, Consultation>();
        }
    }
}
