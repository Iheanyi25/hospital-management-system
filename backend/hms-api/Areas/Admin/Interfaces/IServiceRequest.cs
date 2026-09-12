using HMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HMS.Areas.Admin.Interfaces
{
    public interface IServiceRequest
    {
        Task<int> GetServiceRequestPaidAndDoneCount();
        Task<int> GetServiceRequestPaidAndNotDoneCount();
        Task<IEnumerable<ServiceRequest>> GetServiceRequestByServiceAsync(string ServiceId);
    }
}
