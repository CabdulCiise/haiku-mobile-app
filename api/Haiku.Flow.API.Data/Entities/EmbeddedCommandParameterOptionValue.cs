namespace Haiku.Flow.API.Data.Entities
{
    public class EmbeddedCommandParameterOptionValue : BaseEntity
    {
        public string Name { get; set; }
        public string Value { get; set; }
        public int EmbeddedCommandParameterId { get; set; }

        public virtual EmbeddedCommandParameter EmbeddedCommandParameter { get; set; }

        public EmbeddedCommandParameterOptionValue()
        {
        }

        public EmbeddedCommandParameterOptionValue(EmbeddedCommandParameterOptionValue parameterValue)
        {
            Name = parameterValue.Name;
            Value = parameterValue.Value;
            EmbeddedCommandParameterId = EmbeddedCommandParameterId;
        }

        public Core.Models.EmbeddedCommandParameterOptionValue ToModel()
        {
            return new Core.Models.EmbeddedCommandParameterOptionValue
            {
                Id = Id,
                Name = Name,
                Value = Value,
                EmbeddedCommandParameterId = EmbeddedCommandParameterId
            };
        }
    }
}
