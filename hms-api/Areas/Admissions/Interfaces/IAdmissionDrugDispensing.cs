using HMS.Areas.Admissions.Dtos;
using HMS.Services.Helpers;

namespace HMS.Areas.Admissions.Interfaces
{
    public interface IAdmissionDrugDispensing
    {
       PagedList<AdmissionDrugDispensingDtoForView> GetAdmissionDrugDispensing(string InvoiceId, PaginationParameter paginationParameter);
    }
}
