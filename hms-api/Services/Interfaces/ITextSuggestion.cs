using HMS.Models;
using HMS.Services.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HMS.Services.Interfaces
{
    public interface ITextSuggestion
    {
        Task<IEnumerable<TextSuggestionDtoForView>> GetUserTextSuggestions(TextSuggestionDtoForSearch TextSuggestion);
        Task<bool> CreateTextSuggestion(TextSuggestion textSuggestion);
        Task<bool> UpdateTextSuggestion(TextSuggestion textSuggestion);
        Task<bool> DeleteTextSuggestion(TextSuggestion textSuggestion);
    }
}
