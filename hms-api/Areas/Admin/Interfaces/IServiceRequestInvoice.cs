using System.Threading.Tasks;

namespace HMS.Areas.Admin.Interfaces
{
    public interface IServiceRequestInvoice
    {
        Task<int> GetPaidServiceRequestInvoiceCount();
        Task<int> GetUnPaidServiceRequestInvoiceCount();
    }
}
