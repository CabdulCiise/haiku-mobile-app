namespace Haiku.Flow.API.Data.Entities
{
    public class EmbeddedCommandStepParameterValue : BaseEntity
    {
        public string Value { get; set; }
        public int EmbeddedCommandStepId { get; set; }
        public int EmbeddedCommandParameterId { get; set; }

        public virtual EmbeddedCommandParameter EmbeddedCommandParameter { get; set; }

        public EmbeddedCommandStepParameterValue()
        {
        }

        public Core.Models.EmbeddedCommandStepParameterValue ToModel()
        {
            return new Core.Models.EmbeddedCommandStepParameterValue
            {
                Id = Id,
                Value = Value,
                EmbeddedCommandStepId = EmbeddedCommandStepId,
                EmbeddedCommandParameterId = EmbeddedCommandParameterId,
                EmbeddedCommandParameter = EmbeddedCommandParameter != null ? EmbeddedCommandParameter.ToModel() : null
            };
        }
    }
}
