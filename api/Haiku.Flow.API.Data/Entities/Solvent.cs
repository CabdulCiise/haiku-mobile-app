using System.Collections.Generic;

namespace Haiku.Flow.API.Data.Entities
{
    public class Solvent : BaseEntity
    {
        public string Name { get; set; }
        public double DensityAt25C { get; set; }
        public double TemperatureCoefficient { get; set; }

        public Core.Models.Solvent ToModel()
        {
            return new Core.Models.Solvent
            {
                Id = Id,
                Name = Name,
                DensityAt25C = DensityAt25C,
                TemperatureCoefficient = TemperatureCoefficient
            };
        }
    }
}
