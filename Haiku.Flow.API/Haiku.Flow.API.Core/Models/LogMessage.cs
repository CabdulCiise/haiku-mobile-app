using System;

namespace Haiku.Flow.API.Core.Models
{
    public class LogMessage : BaseModel
    {
        public DateTime DateTime { get; set; }
        public string Message { get; set; }
        public string MessageType { get; set; }
    }
}
