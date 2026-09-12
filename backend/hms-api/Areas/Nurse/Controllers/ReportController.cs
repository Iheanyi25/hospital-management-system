using AutoMapper;
using HMS.Areas.Nurse.Dtos;
using HMS.Areas.Nurse.Interfaces;
using HMS.Models;
using HMS.Services.Helpers;
using HMS.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace HMS.Areas.Nurse.Controllers
{
    [Route("api/Nurse", Name = "Nurse - Manage Report")]
    [ApiController]
    public class ReportController : Controller
    {
        private readonly INurseReport _report;
        private readonly IUser _user;
        private readonly IMapper _mapper;


        public ReportController(INurseReport report, IUser user, IMapper mapper)
        {
            _report = report;
            _user = user;
            _mapper = mapper;
        }

        [HttpGet("GetNurseReport")]
        public async Task<IActionResult> GetNurseReport(string NurseReportId)
        {
            var report = await _report.GetNurseReport(NurseReportId);
            
            if (report == null)
            {
                return NotFound();
            }

            return Ok(new
            {
                report,

                message = "Report Returned"
            });
        }


        [HttpGet("GetNurseReports")]
        public async Task<IActionResult> GetSurgeries([FromQuery] PaginationParameter paginationParameter)
        {
            var report = _report.GetNurseReports(paginationParameter);

            var paginationDetails = new
            {
                report.TotalCount,
                report.PageSize,
                report.CurrentPage,
                report.TotalPages,
                report.HasNext,
                report.HasPrevious
            };

            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(paginationDetails));

            return Ok(new
            {
                report,
                paginationDetails,
                message = "Nurse Report Returned"
            });
        }

        [HttpGet("GetNurseReportsByNurse")]
        public async Task<IActionResult> GetNurseReportsByNurse([FromQuery] PaginationParameter paginationParameter, string NurseId)
        {
            var report = _report.GetNurseReportsByNurse(NurseId, paginationParameter);

            var paginationDetails = new
            {
                report.TotalCount,
                report.PageSize,
                report.CurrentPage,
                report.TotalPages,
                report.HasNext,
                report.HasPrevious
            };

            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(paginationDetails));

            return Ok(new
            {
                report,
                paginationDetails,
                message = "Nurse Report Returned"
            });
        }



        [Route("CreateNurseReport")]
        [HttpPost]
        public async Task<IActionResult> CreateReport(NurseReportDtoForCreate Report)
        {

            if (Report == null)
            {
                return BadRequest(new { message = "Invalid Post Attempt" });
            }

            var initiator = await _user.GetUserByIdAsync(Report.NurseId);

            if (initiator == null)
            {
                return BadRequest(new { message = "Invalid Initiator Id" });
            }

            var reportToCreate = _mapper.Map<NurseReport>(Report);
            var report = await _report.CreateNurseReport(reportToCreate);
            

            if (report)
            {
                return Ok(new { message = "Report Created Successfully" });
            }
            else
            {
                return BadRequest(new { message = "Something went wrong" });
            }
        }






        [HttpPost("UpdateNursingReport")]
        public async Task<IActionResult> UpdateOperationNoteOne(NursingReportDtoForUpdate Report)
        {
            if (Report == null)
            {
                return BadRequest(new { message = "Invalid post attempt" });
            }
            var nurse = await _user.GetUserByIdAsync(Report.NurseId);
            if (nurse == null)
            {
                return BadRequest(new { response = "301", message = "Invalid Nurse Id" });
            }

            var report = await _report.GetNurseReportById(Report.Id);
            if (report == null)
            {
                return BadRequest(new { response = "301", message = "Invalid Report Id" });
            }

            report.NursingAssessment = Report.NursingAssessment;
            report.NursingDiagnosis = Report.NursingDiagnosis;
            report.NursingObjectives = Report.NursingObjectives;
            report.NursingActions = Report.NursingActions;
            report.NursingEvaluation = Report.NursingEvaluation;

           
    

            var res = await _report.UpdateNurseReport(report);
            if (!res)
            {
                return BadRequest(new { response = "301", message = "Report failed to update" });
            }

            return Ok(new
            {
                Report,
                message = "Report updated successfully"
            });
        }
        
        [HttpPost("UpdateNANDAReport")]
        public async Task<IActionResult> UpdateNANDAReport(NANDAReportDtoForUpdate Report)
        {
            if (Report == null)
            {
                return BadRequest(new { message = "Invalid post attempt" });
            }
            var nurse = await _user.GetUserByIdAsync(Report.NurseId);
            if (nurse == null)
            {
                return BadRequest(new { response = "301", message = "Invalid Nurse Id" });
            }

            var report = await _report.GetNurseReportById(Report.Id);
            if (report == null)
            {
                return BadRequest(new { response = "301", message = "Invalid Report Id" });
            }

            report.NANDAReport = Report.NANDAReport;

            var res = await _report.UpdateNurseReport(report);
            if (!res)
            {
                return BadRequest(new { response = "301", message = "Report failed to update" });
            }

            return Ok(new
            {
                Report,
                message = "Report updated successfully"
            });
        }

        [HttpPost("UpdateDailyReport")]
        public async Task<IActionResult> UpdateDailyReport(DailyReportDtoForUpdate Report)
        {
            if (Report == null)
            {
                return BadRequest(new { message = "Invalid post attempt" });
            }
            var nurse = await _user.GetUserByIdAsync(Report.NurseId);
            if (nurse == null)
            {
                return BadRequest(new { response = "301", message = "Invalid Nurse Id" });
            }

            var report = await _report.GetNurseReportById(Report.Id);
            if (report == null)
            {
                return BadRequest(new { response = "301", message = "Invalid Report Id" });
            }

            report.DailyReport = Report.DailyReport;

            var res = await _report.UpdateNurseReport(report);
            if (!res)
            {
                return BadRequest(new { response = "301", message = "Report failed to update" });
            }

            return Ok(new
            {
                Report,
                message = "Report updated successfully"
            });
        }
    }
}
