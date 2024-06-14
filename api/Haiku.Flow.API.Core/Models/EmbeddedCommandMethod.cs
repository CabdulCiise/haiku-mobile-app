using System.Collections.Generic;

namespace Haiku.Flow.API.Core.Models
{
    public class EmbeddedCommandMethod : BaseModel
    {
        public string Name { get; set; }
        public virtual List<EmbeddedCommandStep> EmbeddedCommandSteps { get; set; }
    }
}
