
using System.Threading.Tasks;
using AutoMapper;
using HMS.Areas.Nurse.Dtos;
using HMS.Areas.Nurse.Interfaces;
using HMS.Models;
using HMS.Services.Helpers;
using HMS.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace HMS.Areas.Nurse.Controllers
{
    [Route("api/Nurse", Name = "Nurse - Manage Postnatal")]
    [ApiController]
    public class PostnatalController : Controller
    {
        private readonly IPostnatal _postnatal;
        private readonly IMapper _mapper;
        private readonly IUser _user;


        public PostnatalController(IPostnatal postnatal, IUser user, IMapper mapper)
        {
            _postnatal = postnatal;
            _user = user;
            _mapper = mapper;
        }

        [HttpGet("GetPostnatal")]
        public async Task<IActionResult> GetPostNatal(string PostnatalId)
        {
            if (PostnatalId == "")
            {
                return BadRequest();
            }

            var res = await _postnatal.GetPostnatal(PostnatalId);

            if (res == null)
            {
                return NotFound();
            }

            return Ok(new { res, message = "Postnatal returned" });
        }



        [HttpGet("GetPostnatals")]
        public async Task<IActionResult> GetPostnatals([FromQuery] PaginationParameter paginationParameter)
        {
            var postnatals = _postnatal.GetPostnatals(paginationParameter);


            var paginationDetails = new
            {
                postnatals.TotalCount,
                postnatals.PageSize,
                postnatals.CurrentPage,
                postnatals.TotalPages,
                postnatals.HasNext,
                postnatals.HasPrevious
            };

            //This is optional
            Response.Headers.Add("X-Pagination", JsonConvert.SerializeObject(paginationDetails));

            return Ok(new
            {
                postnatals,
                paginationDetails,
                message = "Postnatals Returned"
            });

        }


        [HttpPost("CreatePostnatal")]
        public async Task<IActionResult> CreateAntenatal(PostnatalDtoForCreate postnatal)
        {
            if (postnatal == null)
            {
                return BadRequest(new { message = "Invalid post attempt" });
            }

            var patient = await _user.GetUserByIdAsync(postnatal.DeliveredById);

            if (patient == null)
            {
                return BadRequest(new { response = "301", message = "Invalid User Id" });
            }

            var postnatalToCreate = _mapper.Map<Postnatal>(postnatal);


            var res = await _postnatal.CreatePostnatal(postnatalToCreate);
            if (!res)
            {
                return BadRequest(new { response = "301", message = "Postnatal failed to create" });
            }

            return Ok(new
            {
                postnatal,
                message = "Postnatal created successfully"
            });
        }

        [HttpPost("UpdatePostnatal")]
        public async Task<IActionResult> UpdateAntenatal(PostnatalDtoForUpdate postnatal)
        {
            if (postnatal == null)
            {
                return BadRequest(new { message = "Invalid post attempt" });
            }


            var postnatalToUpdate = _mapper.Map<Postnatal>(postnatal);


            var res = await _postnatal.UpdatePostnatal(postnatalToUpdate);
            if (!res)
            {
                return BadRequest(new { response = "301", message = "Postnatal failed to create" });
            }

            return Ok(new
            {
                postnatal,
                message = "Postnatal updated successfully"
            });
        }
    }
}
