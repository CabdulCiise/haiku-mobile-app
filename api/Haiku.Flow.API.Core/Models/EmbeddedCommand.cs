using Haiku.Flow.API.Core.Constants;

namespace Haiku.Flow.API.Core.Models
{
    public class EmbeddedCommand : BaseModel
    {
        public string Name { get; set; }
        public short CommandId { get; set; }
        public DeviceType DeviceType { get; set; }
        public bool IsImmediateCmd { get; set; }
        public bool IsPriorityCmd { get; set; }
        public string ErrorMessage { get; set; }
        public List<EmbeddedCommandParameter> EmbeddedCommandParameters { get; set; }
    }
}
