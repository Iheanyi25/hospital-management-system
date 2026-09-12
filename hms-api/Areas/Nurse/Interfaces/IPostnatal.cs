using HMS.Areas.Nurse.Dtos;
using HMS.Models;
using HMS.Services.Helpers;
using System.Threading.Tasks;

namespace HMS.Areas.Nurse.Interfaces
{
    public interface IPostnatal
    {
        Task<PostnatalDtoForView> GetPostnatal(string id);
        PagedList<PostnatalDtoForView> GetPostnatals(PaginationParameter paginationParameter);
        Task<bool> CreatePostnatal(Postnatal antenatal);
        Task<bool> UpdatePostnatal(Postnatal antenatal);
    }
}
