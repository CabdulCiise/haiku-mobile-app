using System;

namespace Haiku.Flow.API.Data.Entities
{
    public class LogMessage : BaseEntity
    {
        public DateTime DateTime { get; set; }
        public string Message { get; set; }
        public string MessageType { get; set; }

        public LogMessage()
        {
        }

        public Core.Models.LogMessage ToModel()
        {
            return new Core.Models.LogMessage
            {
                Id = Id,
                DateTime = DateTime,
                Message = Message,
                MessageType = MessageType
            };
        }
    }
}
