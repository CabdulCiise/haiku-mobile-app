namespace Haiku.Flow.API.Core.Models
{
    public class EmbeddedCommandParameterOptionValue : BaseModel
    {
        public string Name { get; set; }
        public string Value { get; set; }
        public int EmbeddedCommandParameterId { get; set; }
    }
}
