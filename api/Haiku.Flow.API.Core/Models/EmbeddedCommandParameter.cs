using System.Collections.Generic;

namespace Haiku.Flow.API.Core.Models
{
    public class EmbeddedCommandParameter : BaseModel
    {
        public string Name { get; set; }
        public bool HasOptionValues { get; set; }
        public string Type { get; set; }
        public int EmbeddedCommandId { get; set; }
        public List<EmbeddedCommandParameterOptionValue> EmbeddedCommandParameterOptionValues { get; set; }
    }
}
