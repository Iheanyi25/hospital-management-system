using AutoMapper;
using HMS.Areas.Accountant.Dtos;
using HMS.Models;


namespace HMS.Areas.Accountant.Profiles
{
    public class TransactionsProfile : Profile
    {
        public TransactionsProfile()
        {
            CreateMap<TransactionsDtoForView, Transactions>();
            CreateMap<Transactions, TransactionsDtoForView>();

            CreateMap<TransactionTypeDtoForView, Transactions>();
            CreateMap<Transactions, TransactionTypeDtoForView>();

            CreateMap<Transactions, TransactionInvoiceResponseDto>()
                .ForMember(dest => dest.FileNumber, opt => opt.MapFrom(src => src.Patient.FileNumber))
                .ForMember(dest => dest.BenefactorAdmissionId, opt => opt.MapFrom(src => src.BenefactorAdmissionId))
                .ForMember(dest => dest.BenefactorAccountId, opt => opt.MapFrom(src => src.BenefactorAccountId))
                .ForMember(dest => dest.PatientName, opt => opt.MapFrom(src => src.Patient.FullName))
                .ForMember(dest => dest.BenefactorName, opt => opt.MapFrom(src => $"{src.Benefactor.LastName} {src.Benefactor.FirstName}"))
                .ForMember(dest => dest.InitiatorName, opt => opt.MapFrom(src => $"{src.Initiator.LastName} {src.Initiator.FirstName}"));
        }
    }
}
