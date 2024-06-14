namespace Haiku.Flow.API.Data.Entities
{
    public class AutoSamplerPosition : BaseEntity
    {
        public int Position { get; set; }
        public int X { get; set; }
        public int Y { get; set; }

        public AutoSamplerPosition()
        {
        }

        public Core.Models.AutoSamplerPosition ToModel()
        {
            return new Core.Models.AutoSamplerPosition
            {
                Id = Id,
                Position = Position,
                X = X,
                Y = Y
            };
        }
    }
}
