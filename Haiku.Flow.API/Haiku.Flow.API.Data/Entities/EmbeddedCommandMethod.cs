using System.Collections.Generic;
using System.Linq;

namespace Haiku.Flow.API.Data.Entities
{
    public class EmbeddedCommandMethod : BaseEntity
    {
        public string Name { get; set; }

        public virtual ICollection<EmbeddedCommandStep> EmbeddedCommandSteps { get; set; }

        public EmbeddedCommandMethod()
        {
            EmbeddedCommandSteps = new HashSet<EmbeddedCommandStep>();
        }

        public Core.Models.EmbeddedCommandMethod ToModel()
        {
            return new Core.Models.EmbeddedCommandMethod
            {
                Id = Id,
                Name = Name,
                EmbeddedCommandSteps = EmbeddedCommandSteps.OrderBy(x => x.SequenceValue).Select(x => x.ToModel()).ToList(),
            };
        }
    }
}
