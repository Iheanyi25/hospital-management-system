using HMS.Areas.Nurse.Dtos;
using HMS.Models;
using HMS.Services.Helpers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HMS.Areas.Nurse.Interfaces
{
    public interface IAntenatal
    {
        Task<AntenatalDtoForView> GetAntenatal(string id);

        PagedList<AntenatalDtoForView> GetAntenatals(PaginationParameter paginationParameter);
        Task<bool> CreateAntenatal(Antenatal antenatal);
        Task<bool> UpdateAntenatal(Antenatal antenatal);


        Task<AntenatalRecordDtoForView> GetAntenatalRecord(string id);
        Task<IEnumerable<AntenatalRecordDtoForView>> GetAntenatalRecords(string AntenatalId);
        PagedList<AntenatalRecordDtoForView> GetAntenatalRecords(string AntenatalId, PaginationParameter paginationParameter);
        Task<bool> CreateAntenatalRecord(AntenatalRecord antenatal);
        Task<bool> UpdateAntenatalRecord(AntenatalRecord antenatal);
    }
}
