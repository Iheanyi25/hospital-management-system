using HMS.Models;
using System.Threading.Tasks;

namespace HMS.Areas.Admissions.Interfaces
{
    public interface IBed
    {
        Task<Bed> GetBed(string BedId);
        Task<bool> UpdateBed(Bed admission);
        Task<bool> CreateBed(Bed admission);
    }
}
