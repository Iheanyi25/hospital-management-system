using AutoMapper;
using HMS.Areas.Nurse.Dtos;
using HMS.Areas.Nurse.Interfaces;
using HMS.Areas.Patient.Interfaces;
using HMS.Models;
using HMS.Services.Helpers;
using HMS.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace HMS.Areas.Nurse.Controllers
{
    [Route("api/Nurse", Name = "Nurse - Manage Antenatal")]
    [ApiController]
    public class AntenatalController : Controller
    {
        private readonly IAntenatal _antenatal;
        private readonly IMapper _mapper;
        private readonly IPatientProfile _patient;
        private readonly IUser _user;
        public AntenatalController(IAntenatal antenatal, IPatientProfile patient, IUser user, IMapper mapper)
        {
            _antenatal = antenatal;
            _patient = patient;
            _user = user;
            _mapper = mapper;
        }


        [HttpGet("GetAntenatal")]
        public async Task<IActionResult> GetAntenatal(string AntenatalId)
        {
            if (AntenatalId == "")
            {
                return BadRequest();
            }

            var res = await _antenatal.GetAntenatal(AntenatalId);

            if (res == null)
            {
                return NotFound();
            }

            return Ok(new { res, message = "Antenatal returned" });
        }



        [HttpGet("GetAntenatals")]
        public async Task<IActionResult> GetAntenatals([FromQuery] PaginationParameter paginationParameter)
        {
            var antenatals = _antenatal.GetAntenatals(paginationParameter);


            var paginationDetails = new
            {
                antenatals.TotalCount,
                antenatals.PageSize,
                antenatals.CurrentPage,
                antenatals.TotalPages,
                antenatals.HasNext,
                antenatals.HasPrevious
            };

            //This is optional
            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(paginationDetails));

            return Ok(new
            {
                antenatals,
                paginationDetails,
                message = "Antenatals Returned"
            });

        }


        [HttpPost("CreateAntenatal")]
        public async Task<IActionResult> CreateAntenatal(AntenatalDtoForCreate antenatal)
        {
            if (antenatal == null)
            {
                return BadRequest(new { message = "Invalid post attempt" });
            }

            var patient = await _patient.GetPatient(antenatal.PatientId);

            if (patient == null)
            {
                return BadRequest(new { response = "301", message = "Invalid PatientId" });
            }

            var antenatalToCreate = _mapper.Map<Antenatal>(antenatal);


            var res = await _antenatal.CreateAntenatal(antenatalToCreate);
            if (!res)
            {
                return BadRequest(new { response = "301", message = "Antenatal failed to create" });
            }

            return Ok(new
            {
                antenatal,
                message = "Antenatal created successfully"
            });
        }

        [HttpPost("UpdateAntenatal")]
        public async Task<IActionResult> UpdateAntenatal(AntenatalDtoForUpdate antenatal)
        {
            if (antenatal == null)
            {
                return BadRequest(new { message = "Invalid post attempt" });
            }

            
            var antenatalToUpdate = _mapper.Map<Antenatal>(antenatal);


            var res = await _antenatal.UpdateAntenatal(antenatalToUpdate);
            if (!res)
            {
                return BadRequest(new { response = "301", message = "Antenatal failed to create" });
            }

            return Ok(new
            {
                antenatal,
                message = "Antenatal created successfully"
            });
        }

        [HttpGet("GetAntenatalRecord")]
        public async Task<IActionResult> GetAntenatalRecord(string AntenatalRecordId)
        {
            if (AntenatalRecordId == "")
            {
                return BadRequest();
            }

            var antenatalRecord = await _antenatal.GetAntenatalRecord(AntenatalRecordId);

            if (antenatalRecord == null)
            {
                return NotFound();
            }

            return Ok(new { antenatalRecord, message = "Antenatal Record Returned" });
        }



        [HttpGet("GetAntenatalRecordsForAntenatal")]
        public async Task<IActionResult> GetAntenatalRecords([FromQuery] PaginationParameter paginationParameter, string AntenatalId)
        {
            if (AntenatalId == "")
            {
                return BadRequest();
            }

            var antenatalRecords = await _antenatal.GetAntenatalRecords(AntenatalId);


            
     

            return Ok(new
            {
                antenatalRecords,
                message = "Antenatal Records Returned"
            });

        }


        [HttpPost("CreateAntenatalRecord")]
        public async Task<IActionResult> CreateAntenatalRecord(AntenatalRecordDtoForCreate antenatalRecord)
        {
            if (antenatalRecord == null)
            {
                return BadRequest(new { message = "Invalid post attempt" });
            }

            var initiator = await _user.GetUserByIdAsync(antenatalRecord.InitiatorId);

            if (initiator == null)
            {
                return BadRequest(new { response = "301", message = "Invalid InitiatorId" });
            }

            var antenatalToCreate = _mapper.Map<AntenatalRecord>(antenatalRecord);


            var res = await _antenatal.CreateAntenatalRecord(antenatalToCreate);
            if (!res)
            {
                return BadRequest(new { response = "301", message = "Antenatal Record failed to create" });
            }

            return Ok(new
            {
                antenatalRecord,
                message = "Antenatal Record created successfully"
            });
        }

        [HttpPost("UpdateAntenatalRecord")]
        public async Task<IActionResult> UpdateAntenatalRecord(AntenatalRecordDtoForUpdate antenatalRecord)
        {
            if (antenatalRecord == null)
            {
                return BadRequest(new { message = "Invalid post attempt" });
            }

           

            var antenatalRecordToUpdate = _mapper.Map<AntenatalRecord>(antenatalRecord);


            var res = await _antenatal.UpdateAntenatalRecord(antenatalRecordToUpdate);
            if (!res)
            {
                return BadRequest(new { response = "301", message = "Antenatal failed to create" });
            }

            return Ok(new
            {
                antenatalRecord,
                message = "Antenatal Record Updated Successfully"
            });
        }

    }
}
