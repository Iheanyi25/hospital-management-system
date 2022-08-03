using AutoMapper;
using HMS.Database;
using HMS.Models;
using HMS.Services.Dtos;
using HMS.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HMS.Services.Repositories
{
    public class TextSuggestionRepository : ITextSuggestion
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IMapper _mapper;

        public TextSuggestionRepository(ApplicationDbContext applicationDbContext, IMapper mapper)
        {
            _applicationDbContext = applicationDbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TextSuggestionDtoForView>> GetUserTextSuggestions(TextSuggestionDtoForSearch TextSuggestion)
        {
            var textSuggestions = await _applicationDbContext.TextSuggestions
            .Where(t => t.UserId == TextSuggestion.UserId && t.Text.Contains(TextSuggestion.SearchParameter))
            .OrderBy(t => t.Text).ToListAsync();
            var textSuggestionsToReturn = _mapper.Map<IEnumerable<TextSuggestionDtoForView>>(textSuggestions);
            return textSuggestionsToReturn;
        }
        
            
      
        public async Task<bool> CreateTextSuggestion(TextSuggestion textSuggestion)
        {
            try
            {
                if (textSuggestion == null)
                {
                    return false;
                }

                _applicationDbContext.TextSuggestions.Add(textSuggestion);
                await _applicationDbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> UpdateTextSuggestion(TextSuggestion textSuggestion)
        {
            try
            {
                if (textSuggestion == null)
                {
                    return false;
                }

                _applicationDbContext.TextSuggestions.Update(textSuggestion);
                await _applicationDbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteTextSuggestion(TextSuggestion textSuggestion)
        {
            try
            {
                if (textSuggestion == null)
                {
                    return false;
                }

                _applicationDbContext.TextSuggestions.Remove(textSuggestion);
                await _applicationDbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
