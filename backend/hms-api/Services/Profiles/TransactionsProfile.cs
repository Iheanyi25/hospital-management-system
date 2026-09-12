using AutoMapper;
using HMS.Models;
using HMS.Services.Dtos;

namespace HMS.Services.Profiles
{
    public class TransactionsProfile : Profile
    {
        public TransactionsProfile()
        {
            CreateMap<TransactionsDtoForView, Transactions>();


            CreateMap<Transactions, TransactionsDtoForView>()
               .ForMember(dest => dest.FileNumber, opt => opt.MapFrom(src => src.Patient.FileNumber));
        }

    }
}
