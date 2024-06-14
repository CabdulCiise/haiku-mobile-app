namespace Haiku.Flow.API.Core.Models
{
    public class Measurement
    {
        public double P1 { get; set; }
        public double P2 { get; set; }
        public double Ratio => P2 / P1;
    }
}
