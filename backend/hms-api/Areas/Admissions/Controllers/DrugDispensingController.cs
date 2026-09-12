using System.Threading.Tasks;
using AutoMapper;
using HMS.Areas.Admissions.Dtos;
using HMS.Areas.Admissions.Interfaces;
using HMS.Areas.Pharmacy.Interfaces;
using HMS.Services.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HMS.Areas.Admissions.Controllers
{
    [Route("api/Admission", Name = "Admission - Manage Admission Drug Dispensing")]
    [ApiController]
    public class DrugDispensingController : Controller
    {
       
        private readonly IAdmission _admission;
        private readonly IAdmissionDrugDispensing _admissionDrugDispensing;
        private readonly IDrugInvoicing _drugInvoicing;


        public DrugDispensingController(IMapper mapper, IAdmission admission, IAdmissionInvoice admissionInvoice, IAdmissionDrugDispensing admissionDrugDispensing,  IDrugInvoicing drugInvoicing)
        {
            _admission = admission;
            _drugInvoicing = drugInvoicing;
            _admissionDrugDispensing = admissionDrugDispensing;
        }

        [HttpPost("RequestDrug")]
        public async Task<IActionResult> RequestDrug(AdmissionDrugDispensingDtoForCreate AdmissionRequest)
        {
            if (AdmissionRequest == null)
            {
                return BadRequest(new { message = "Invalid post attempt" });
            }

            //check if the admission exists
            var admission = await _admission.GetAdmission(AdmissionRequest.AdmissionId);

            if (admission == null)
                return BadRequest(new
                {
                    response = "301",
                    message = "Invalid Admission Id passed",
                });

            //check if all drugs id passed exist
            if (AdmissionRequest.Drugs != null)
            {
                var drugCheck = await _drugInvoicing.CheckIfDrugsExist(AdmissionRequest.Drugs);
                if (!drugCheck)
                    return BadRequest(new
                    {
                        response = "301",
                        message = "One or more Drugs Passed is/are invalid"
                    });
            }
            return Ok(new { message = "Admission Request submitted successfully" });
        }

        [HttpGet("GetDrugsInAnInvoice")]
        public async Task<IActionResult> GetDrugsInAnInvoice(string invoiceId, [FromQuery] PaginationParameter paginationParameter)
        {
            var drugsInInvoice = _admissionDrugDispensing.GetAdmissionDrugDispensing(invoiceId, paginationParameter);
           
            var paginationDetails = new
            {
                drugsInInvoice.TotalCount,
                drugsInInvoice.PageSize,
                drugsInInvoice.CurrentPage,
                drugsInInvoice.TotalPages,
                drugsInInvoice.HasNext,
                drugsInInvoice.HasPrevious
            };

            //This is optional
            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(paginationDetails));

            return Ok(new
            {
                drugsInInvoice,
                paginationDetails,
                message = "Drug Dispensing Returned"
            });
        }
    }
}
