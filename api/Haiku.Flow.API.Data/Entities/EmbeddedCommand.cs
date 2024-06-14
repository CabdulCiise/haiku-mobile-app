using Haiku.Flow.API.Core.Constants;
using System.Collections.Generic;
using System.Linq;

namespace Haiku.Flow.API.Data.Entities
{
    public class EmbeddedCommand : BaseEntity
    {
        public string Name { get; set; }
        public short Data { get; set; }
        public bool IsImmediateCmd { get; set; }
        public bool IsPriorityCmd { get; set; }
        public DeviceType DeviceType { get; set; }

        public virtual ICollection<EmbeddedCommandParameter> EmbeddedCommandParameters { get; set; }

        public EmbeddedCommand()
        {
            EmbeddedCommandParameters = new HashSet<EmbeddedCommandParameter>();
        }

        public EmbeddedCommand(Core.Models.EmbeddedCommand command)
        {
            EmbeddedCommandParameters = new HashSet<EmbeddedCommandParameter>();

            Name = command.Name;
            Data = command.CommandId;
            DeviceType = command.DeviceType;
            IsPriorityCmd = command.IsPriorityCmd;
            IsImmediateCmd = command.IsImmediateCmd;
        }

        public Core.Models.EmbeddedCommand ToModel()
        {
            return new Core.Models.EmbeddedCommand
            {
                Id = Id,
                Name = Name,
                CommandId = Data,
                DeviceType = DeviceType,
                IsPriorityCmd = IsPriorityCmd,
                IsImmediateCmd = IsImmediateCmd,
                EmbeddedCommandParameters = EmbeddedCommandParameters.Select(x => x.ToModel()).ToList()
            };
        }
    }
}
