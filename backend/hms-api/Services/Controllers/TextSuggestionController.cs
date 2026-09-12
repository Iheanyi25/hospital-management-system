using AutoMapper;
using HMS.Models;
using HMS.Services.Dtos;
using HMS.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HMS.Services.Controllers
{
    public class TextSuggestionController : Controller
    {
        private readonly ITextSuggestion _textSuggestion;
        private readonly IMapper _mapper;

        public TextSuggestionController(ITextSuggestion textSuggestion, IMapper mapper)
        {
            _textSuggestion = textSuggestion;
            _mapper = mapper;
        }

        [Route("GetUserTextSuggestion")]
        [HttpGet]
        public async Task<IActionResult> GetUserTextSuggestion(TextSuggestionDtoForSearch TextSuggestion)
        {
            if (TextSuggestion == null)
            {
                return BadRequest();
            }

            var textSuggestions = await _textSuggestion.GetUserTextSuggestions(TextSuggestion);

            if (textSuggestions == null)
            {
                return NotFound();
            }

            return Ok(new { textSuggestions, message = "Text Suggestion returned" });
        }

        [Route("CreateTextSuggestion")]
        [HttpPost]
        public async Task<IActionResult> CreateTextSuggestion(TextSuggestionDtoForCreate textSuggestion)
        {
            if (textSuggestion == null)
            {
                return BadRequest(new { message = "Invalid post attempt" });
            }

            var textSuggestionToCreate = _mapper.Map<TextSuggestion>(textSuggestion);

            var res = await _textSuggestion.CreateTextSuggestion(textSuggestionToCreate);
            if (!res)
            {
                return BadRequest(new { response = "301", message = "Text Suggestion failed to create" });
            }

            return Ok(new
            {
                textSuggestion,
                message = "Text Suggestion created successfully"
            });
        }



        [HttpPost("UpdateTextSuggestion")]
        public async Task<IActionResult> UpdateTextSuggestion(TextSuggestionDtoForUpdate textSuggestion)
        {
            if (textSuggestion == null)
            {
                return BadRequest(new { message = "Invalid post attempt" });
            }

            var textSuggestionToUpdate = _mapper.Map<TextSuggestion>(textSuggestion);

            var res = await _textSuggestion.UpdateTextSuggestion(textSuggestionToUpdate);

            if (!res)
            {
                return BadRequest(new { response = "301", message = "Text Suggestion failed to update" });
            }

            return Ok(new
            {
                textSuggestion,
                message = "Text Suggestion updated successfully"
            });
        }

        [HttpPost("DeleteTextSuggestion")]
        public async Task<IActionResult> DeleteTextSuggestion(TextSuggestionDtoForDelete textSuggestion)
        {
            if (textSuggestion == null)
            {
                return BadRequest(new { message = "Invalid post attempt" });
            }

            var textSuggestionToDelete = _mapper.Map<TextSuggestion>(textSuggestion);

            var res = await _textSuggestion.DeleteTextSuggestion(textSuggestionToDelete);
            if (!res)
            {
                return BadRequest(new { response = "301", message = "Text Suggestion failed to delete" });
            }

            return Ok(new { textSuggestion, message = "Text Suggestion Deleted" });
        }
    }
}
