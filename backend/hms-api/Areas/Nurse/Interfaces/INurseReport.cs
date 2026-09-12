using HMS.Areas.Nurse.Dtos;
using HMS.Models;
using HMS.Services.Helpers;
using System.Threading.Tasks;

namespace HMS.Areas.Nurse.Interfaces
{
    public interface INurseReport
    {
        Task<NurseReport> GetNurseReportById(string NurseReportId);
        Task<NurseReportDtoForView> GetNurseReport(string NurseReportId);
        PagedList<NurseReportDtoForView> GetNurseReports(PaginationParameter paginationParameter);
        PagedList<NurseReportDtoForView> GetNurseReportsByNurse(string NurseId, PaginationParameter paginationParameter);
        Task<bool> CreateNurseReport(NurseReport NurseReport);
        Task<bool> UpdateNurseReport(NurseReport NurseReport);
    }
}
