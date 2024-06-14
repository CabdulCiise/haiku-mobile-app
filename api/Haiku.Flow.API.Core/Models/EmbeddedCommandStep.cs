using System.Collections.Generic;

namespace Haiku.Flow.API.Core.Models
{
    public class EmbeddedCommandStep : BaseModel
    {
        public int SequenceValue { get; set; }
        public bool ShouldWaitForCompletion { get; set; }
        public int? EmbeddedCommandId { get; set; }
        public int EmbeddedCommandMethodId { get; set; }
        public EmbeddedCommand EmbeddedCommand { get; set; }
        public List<EmbeddedCommandStepParameterValue> EmbeddedCommandStepParameterValues { get; set; }
    }
}
