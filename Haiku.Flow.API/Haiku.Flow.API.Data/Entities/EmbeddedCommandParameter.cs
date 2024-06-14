using System.Collections.Generic;
using System.Linq;

namespace Haiku.Flow.API.Data.Entities
{
    public class EmbeddedCommandParameter : BaseEntity
    {
        public string Name { get; set; }
        public bool HasOptionValues { get; set; }
        public string Type { get; set; }
        public int EmbeddedCommandId { get; set; }

        public virtual EmbeddedCommand EmbeddedCommand { get; set; }
        public virtual ICollection<EmbeddedCommandParameterOptionValue> EmbeddedCommandParameterOptionValues { get; set; }

        public EmbeddedCommandParameter()
        {
            EmbeddedCommandParameterOptionValues = new HashSet<EmbeddedCommandParameterOptionValue>();
        }

        public EmbeddedCommandParameter(EmbeddedCommandParameter parameter)
        {
            Name = parameter.Name;
            HasOptionValues = parameter.HasOptionValues;
            Type = parameter.Type;
            EmbeddedCommandParameterOptionValues = new List<EmbeddedCommandParameterOptionValue>();
            if (parameter.EmbeddedCommandParameterOptionValues != null)
            {
                parameter.EmbeddedCommandParameterOptionValues.ToList().ForEach(x => EmbeddedCommandParameterOptionValues.Add(new EmbeddedCommandParameterOptionValue(x)));
            }
        }

        public Core.Models.EmbeddedCommandParameter ToModel()
        {
            return new Core.Models.EmbeddedCommandParameter
            {
                Id = Id,
                Name = Name,
                HasOptionValues = HasOptionValues,
                Type = Type,
                EmbeddedCommandId = EmbeddedCommandId,
                EmbeddedCommandParameterOptionValues = EmbeddedCommandParameterOptionValues.Select(x => x.ToModel()).ToList()
            };
        }
    }
}
