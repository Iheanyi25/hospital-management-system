using System.Threading.Tasks;

namespace HMS.Areas.Admin.Interfaces
{
    public interface IRegistrationInvoice
    {
        Task<int> GetPaidRegistrationInvoicesCount();
        Task<int> GetUnPaidRegistrationInvoicesCount();
    }
}
