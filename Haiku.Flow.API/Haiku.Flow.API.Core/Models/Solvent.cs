namespace Haiku.Flow.API.Core.Models
{
    public class Solvent : BaseModel
    {
        public string Name { get; set; }
        public double DensityAt25C { get; set; }
        public double TemperatureCoefficient { get; set; }
    }
}
