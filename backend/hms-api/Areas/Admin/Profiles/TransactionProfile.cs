using AutoMapper;
using HMS.Areas.Admin.Dtos;
using HMS.Models;

namespace HMS.Areas.Admin.Profiles
{
    public class TransactionProfile : Profile
    {
        public TransactionProfile()
        {
            CreateMap<Transactions, AccountDtoForAdminFunding>();
            CreateMap<AccountDtoForAdminFunding, Transactions>();

            CreateMap<Transactions, AccountDtoForPatientFunding>();
            CreateMap<AccountDtoForPatientFunding, Transactions>();
        }
    }
}
