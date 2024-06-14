namespace Haiku.Flow.API.Data.Entities
{
    public class Measurement : BaseEntity
    {
        public double P1 { get; set; }
        public double P2 { get; set; }
        public short P1AdcCounts { get; set; }
        public short P2AdcCounts { get; set; }
        public double Ratio => P2 / P1;
        public int InjectionId { get; set; }
        public int Order { get; set; }

        public virtual Injection Injection { get; set; }

        public Measurement()
        {
        }

        public Core.Models.Measurement ToModel()
        {
            return new Core.Models.Measurement
            {
                P1 = P1,
                P2 = P2,
            };
        }
    }
}
