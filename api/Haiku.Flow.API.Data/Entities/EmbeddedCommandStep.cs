using System.Collections.Generic;
using System.Linq;

namespace Haiku.Flow.API.Data.Entities
{
    public class EmbeddedCommandStep : BaseEntity
    {
        public int SequenceValue { get; set; }
        public bool ShouldWaitForCompletion { get; set; }
        public int? EmbeddedCommandId { get; set; }
        public int EmbeddedCommandMethodId { get; set; }

        public virtual EmbeddedCommand EmbeddedCommand { get; set; }
        public virtual ICollection<EmbeddedCommandStepParameterValue> EmbeddedCommandStepParameterValues { get; set; }

        public EmbeddedCommandStep()
        {
            EmbeddedCommandStepParameterValues = new HashSet<EmbeddedCommandStepParameterValue>();
        }

        public Core.Models.EmbeddedCommandStep ToModel()
        {
            return new Core.Models.EmbeddedCommandStep
            {
                Id = Id,
                SequenceValue = SequenceValue,
                ShouldWaitForCompletion = ShouldWaitForCompletion,
                EmbeddedCommandId = EmbeddedCommandId,
                EmbeddedCommandMethodId = EmbeddedCommandMethodId,
                EmbeddedCommand = EmbeddedCommand != null ? EmbeddedCommand.ToModel() : null,
                EmbeddedCommandStepParameterValues = EmbeddedCommandStepParameterValues.Select(x => x.ToModel()).ToList()
            };
        }
    }
}
