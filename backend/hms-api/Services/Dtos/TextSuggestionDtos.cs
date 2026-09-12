using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HMS.Services.Dtos
{
    public class TextSuggestionDtoForSearch
    {
        public string SearchParameter { get; set; }
        public string UserId { get; set; }
    }
    public class TextSuggestionDtoForView
    {
        public string Text { get; set; }
    }

    public class TextSuggestionDtoForCreate
    {
        public string Text { get; set; }
        public string UserId { get; set; }
    }

    public class TextSuggestionDtoForUpdate
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public string UserId { get; set; }
    }
    
    public class TextSuggestionDtoForDelete
    {
        public string Id { get; set; }
    }
}
