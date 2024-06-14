namespace Haiku.Flow.API.Core.Models
{
    public class EmbeddedCommandStepParameterValue : BaseModel
    {
        public string Value { get; set; }
        public int EmbeddedCommandStepId { get; set; }
        public int EmbeddedCommandParameterId { get; set; }
        public EmbeddedCommandParameter EmbeddedCommandParameter { get; set; }
    }
}
