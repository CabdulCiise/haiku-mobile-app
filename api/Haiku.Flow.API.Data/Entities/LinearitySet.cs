using System;

namespace Haiku.Flow.API.Data.Entities
{
    public class LinearitySet : BaseEntity
    {
        public DateTime Date { get; set; }
        public bool HasPassed { get; set; }
        public double P1Mean { get; set; }
        public double P2Mean { get; set; }
        public double RatioMean { get; set; }
        public double PercentDiffMinMeanToBaseline { get; set; }
        public double PercentDiffMaxMeanToBaseline { get; set; }
        public double PercentDiffRatioMinMax { get; set; }
        public int LinearityStatisticId { get; set; }

        public Core.Models.LinearitySet ToModel()
        {
            return new Core.Models.LinearitySet
            {
                Id = Id,
                Date = Date,
                HasPassed = HasPassed,
                P1Mean = P1Mean,
                P2Mean = P2Mean,
                RatioMean = RatioMean,
                PercentDiffMinMeanToBaseline = PercentDiffMinMeanToBaseline,
                PercentDiffMaxMeanToBaseline = PercentDiffMaxMeanToBaseline,
                PercentDiffRatioMinMax = PercentDiffRatioMinMax,
            };
        }
    }
}
