using HMS.Areas.Admissions.Dtos;
using HMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HMS.Areas.Admissions.Interfaces
{
    public interface IObservationChart
    {
        Task<IEnumerable<ObservationChart>> GetAdmissionObservationChart(string AdmissionId);
        Task<bool> UpdateObservationChart(ObservationChartDtoForUpdate patientVitals);
    }
}
