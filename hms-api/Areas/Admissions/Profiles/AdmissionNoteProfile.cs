using AutoMapper;
using HMS.Areas.Admissions.Dtos;
using HMS.Models;

namespace HMS.Areas.Admissions.Profiles
{
    public class AdmissionNoteProfile : Profile
    {
        public AdmissionNoteProfile()
        {
            CreateMap<AdmissionNote, AdmissionNoteDtoForView>()
                .ForMember(dest => dest.FileNumber, opt => opt.MapFrom(src => src.Admission.Patient.Patient))
                .ReverseMap();

            CreateMap<AdmissionNote, AdmissionNoteDtoForCreate>().ReverseMap();
        }
    }
}
