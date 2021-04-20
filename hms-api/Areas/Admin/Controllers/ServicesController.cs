using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using HMS.Areas.Admin.Dtos;
using HMS.Areas.Admin.Interfaces;
using HMS.Areas.Admissions.Interfaces;
using HMS.Areas.HealthInsurance.Interfaces;
using HMS.Areas.Patient.Interfaces;
using HMS.Models;
using HMS.Services.Helpers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HMS.Areas.Admin.Controllers
{
    [Route("api/Admin", Name = "Admin - Manage Service")]
    [ApiController]
    public class ServicesController : ControllerBase
    {
        private readonly IServices _serviceRepo;
        private readonly IServiceRequest _serviceRequest;
        private readonly IMapper _mapper;
        private readonly IPatientProfile _patientRepo;
        private readonly IAdmissionServiceRequest _admissionService;
        private readonly INHISHealthPlanService _NHISService;
        private readonly IHMOHealthPlanServicePrice _HMOService;


        public ServicesController(IServices serviceRepo, IServiceRequest serviceRequest, IMapper mapper, IPatientProfile patientRepo, IAdmissionServiceRequest admissionService, INHISHealthPlanService NHISService, IHMOHealthPlanServicePrice HMOService)
        {
            _serviceRepo = serviceRepo;
            _serviceRequest = serviceRequest;
            _mapper = mapper;
            _patientRepo = patientRepo;
            _admissionService = admissionService;
            _HMOService = HMOService;
            _NHISService = NHISService;
        }

        //[HttpGet("GetAllServices")]
        //public async Task<IActionResult> Services()
        //{
        //    var services = await _serviceRepo.GetAllServices();

        //    return Ok(services);
           
        //}

        [HttpGet("GetAllServices")]
        public async Task<IActionResult> Services([FromQuery] PaginationParameter paginationParameter)
        {
            var services = _serviceRepo.GetServicesPagnation(paginationParameter);

            var paginationDetails = new
            {
                services.TotalCount,
                services.PageSize,
                services.CurrentPage,
                services.TotalPages,
                services.HasNext,
                services.HasPrevious
            };

            //This is optional
            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(paginationDetails));

            return Ok(new
            {
                services,
                paginationDetails,
                message = "Services Fetched"
            });

        }

        [HttpGet("GetService/{Id}")]
        public async Task<IActionResult> GetService(string Id)
        {
            if (Id == "")
            {
                return BadRequest();
            }

            var res = await _serviceRepo.GetServiceByIdAsync(Id);

            if (res == null)
            {
                return NotFound();
            }

            return Ok(new { res, mwessage = "Service returned" });


        }


        [HttpPost("CreateService")]
        public async Task<IActionResult> CreateService(ServiceDtoForCreate serviceDtoForCreate)
        {
            if (serviceDtoForCreate == null)
            {
                return BadRequest(new { message = "Invalid post attempt" });
            }

            var serviceToCreate = _mapper.Map<Service>(serviceDtoForCreate);

            var res = await _serviceRepo.CreateService(serviceToCreate);
            if (!res)
            {
                return BadRequest(new { response = "301", message = "Service failed to create" });
            }

            return Ok(new
            {
                serviceToCreate,
                message = "Service created successfully"
            });
        }

        [HttpPost("UpdateService")]
        public async Task<IActionResult> UpdateService(ServiceDtoForUpdate serviceDtoForUpdate)
        {
            if (serviceDtoForUpdate == null)
            {
                return BadRequest(new { message = "Invalid post attempt" });
            }

            var serviceToUpdate = _mapper.Map<Service>(serviceDtoForUpdate);

            var res = await _serviceRepo.UpdateService(serviceToUpdate);
            if (!res)
            {
                return BadRequest(new { response = "301", message = "Service failed to update" });
            }

            return Ok(new
            {
                serviceToUpdate,
                message = "Service updated successfully"
            });
        }

        [HttpPost("DeleteService")]
        public async Task<IActionResult> DeleteService(ServiceDtoForDelete serviceDtoForDelete)
        {
            if (serviceDtoForDelete == null)
            {
                return BadRequest(new { message = "Invalid post attempt" });
            }

            var service = await _serviceRepo.GetServiceByIdAsync(serviceDtoForDelete.Id);
            if (service == null)
            {
                return BadRequest(new { message = "Invalid Service Id" });
            }
            var serviceRequest = await _serviceRequest.GetServiceRequestByServiceAsync(serviceDtoForDelete.Id);
            
            if (serviceRequest.Any())
            {
                return BadRequest(new { message = "Service Has Requests Tied To It and Cannot Be Deleted" });
            }

            var admissionServiceRequest = await _admissionService.GetAdmissionServiceRequestByServiceAsync(serviceDtoForDelete.Id);

            if (admissionServiceRequest.Any())
            {
                return BadRequest(new { message = "Service has service request(s) in an admission tied to it and cannot be deleted" });
            }

            var NHISService = await _NHISService.GetHealthPlanServicesByService(serviceDtoForDelete.Id);

            if (NHISService.Any())
            {
                return BadRequest(new { message = "Service is tied to an NHIS Healthplan and cannot be deleted" });
            }

            var HMOService = await _HMOService.GetServicePricesByService(serviceDtoForDelete.Id);

            if (HMOService.Any())
            {
                return BadRequest(new { message = "Service is tied to a HMO healthplan and cannot be deleted" });
            }

            var res = await _serviceRepo.DeleteService(service);
            if (!res)
            {
                return BadRequest(new { response = "301", message = "Service failed to delete" });
            }

            return Ok(new { service, message = "Service Deleted" });
        }

       
    }
}
